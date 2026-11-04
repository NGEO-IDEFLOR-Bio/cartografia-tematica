#!/usr/bin/env python3
"""Sobe assets/downloads para o Google Drive e registra links estáveis.

Cada arquivo recebe um *file ID* fixo no Drive, guardado em drive_manifest.json.
Atualizações futuras são feitas por cima do mesmo ID — o link nunca muda.

Uso:
    python sync_drive.py            # sobe só o que mudou (hash)
    python sync_drive.py --force    # resube tudo
    python sync_drive.py --dry-run  # só mostra o que faria

Requer: rclone autenticado no remote "gdrive" (rclone config).
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys

# Remote rclone e pasta de destino no Drive.
REMOTE = "gdrive:"
REMOTE_DIR = "cartografia-tematica"
DOWNLOADS_DIR = "assets/downloads"
MANIFEST_PATH = "drive_manifest.json"

# rclone pode não estar no PATH nesta máquina.
RCLONE_FALLBACKS = [
    r"C:\Program Files\rclone-v1.74.2-windows-amd64\rclone.exe",
]

# O client ID compartilhado do rclone sofre rate limit na API do Drive;
# throttling + backoff evitam o erro 403 rateLimitExceeded.
RCLONE_FLAGS = [
    "--tpslimit", "2",
    "--tpslimit-burst", "2",
    "--retries", "6",
    "--retries-sleep", "20s",
    "--low-level-retries", "6",
    "--drive-chunk-size", "32M",
]


def find_rclone():
    path = shutil.which("rclone")
    if path:
        return path
    for candidate in RCLONE_FALLBACKS:
        if os.path.exists(candidate):
            return candidate
    sys.exit("ERRO: rclone nao encontrado (PATH nem em RCLONE_FALLBACKS).")


def run_rclone(rclone, args):
    result = subprocess.run(
        [rclone] + args,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"rclone {args[0]} falhou (codigo {result.returncode}): "
            f"{(result.stderr or result.stdout).strip()[:400]}"
        )
    return (result.stdout or "").strip()


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def id_from_url(url):
    match = re.search(r"[?&]id=([A-Za-z0-9_-]+)", url or "")
    return match.group(1) if match else None


def load_manifest():
    if not os.path.exists(MANIFEST_PATH):
        return {}
    with open(MANIFEST_PATH, encoding="utf-8") as fh:
        return json.load(fh)


def save_manifest(manifest):
    with open(MANIFEST_PATH, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, ensure_ascii=False, sort_keys=True)
        fh.write("\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="resube todos os arquivos")
    parser.add_argument("--dry-run", action="store_true", help="nao envia nada")
    args = parser.parse_args()

    rclone = find_rclone()
    manifest = load_manifest()

    if not os.path.isdir(DOWNLOADS_DIR):
        sys.exit(f"ERRO: pasta {DOWNLOADS_DIR} nao existe.")

    files = sorted(
        f for f in os.listdir(DOWNLOADS_DIR)
        if os.path.isfile(os.path.join(DOWNLOADS_DIR, f))
    )
    print(f"{len(files)} arquivos em {DOWNLOADS_DIR} | remote {REMOTE}{REMOTE_DIR}/")

    uploaded = updated = skipped = failed = 0

    for name in files:
        local = os.path.join(DOWNLOADS_DIR, name)
        digest = sha256_of(local)
        size = os.path.getsize(local)
        entry = manifest.get(name)

        if entry and entry.get("sha256") == digest and not args.force:
            skipped += 1
            continue

        remote_path = f"{REMOTE}{REMOTE_DIR}/{name}"
        action = "atualizando" if entry else "subindo"

        if args.dry_run:
            print(f"  [dry-run] {action} {name} ({size / 1024 / 1024:.1f} MB)")
            updated += bool(entry)
            uploaded += not entry
            continue

        try:
            # copyto mantem o mesmo file ID quando o nome ja existe no Drive.
            run_rclone(rclone, ["copyto", local, remote_path] + RCLONE_FLAGS)

            file_id = entry.get("id") if entry else None
            if not file_id:
                url = run_rclone(rclone, ["link", remote_path] + RCLONE_FLAGS)
                file_id = id_from_url(url)
                if not file_id:
                    raise RuntimeError(f"nao foi possivel obter o link: {url[:200]}")

            manifest[name] = {
                "id": file_id,
                "sha256": digest,
                "bytes": size,
                "url": f"https://drive.google.com/uc?export=download&id={file_id}",
            }
            save_manifest(manifest)

            if entry:
                updated += 1
                print(f"  atualizado {name} (id {file_id[:12]}...)")
            else:
                uploaded += 1
                print(f"  subido {name} -> id {file_id[:12]}... ({size / 1024 / 1024:.1f} MB)")
        except RuntimeError as err:
            failed += 1
            print(f"  [FALHA] {name}: {err}")

    print(
        f"OK: {uploaded} novos, {updated} atualizados, {skipped} ja sincronizados, "
        f"{failed} falhas | manifesto: {MANIFEST_PATH}"
    )
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
