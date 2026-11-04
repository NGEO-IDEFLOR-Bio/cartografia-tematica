# AGENTS.md — Instruções para agentes de IA

Guia operacional para agentes (OpenCode, Claude Code, Cursor etc.) que forem
editar, ingerir mapas ou publicar este repositório.

Leia este arquivo inteiro antes de alterar qualquer coisa. Em caso de conflito
entre este documento e o código, **o código vence** — e este arquivo deve ser
corrigido.

---

## 1. Contexto do projeto

- Portal estático (HTML5 + CSS3 + JavaScript puro). Não há bundler, npm,
  framework ou etapa de compilação de front-end.
- Publicado por **GitHub Pages** a partir da branch `main`, diretório raiz:
  https://ngeo-ideflor-bio.github.io/cartografia-tematica/
- Produzido pelo **Núcleo de Geotecnologias (NGEO)**, setor técnico do
  IDEFLOR-Bio. O portal **não é** canal oficial da diretoria do IDEFLOR-Bio:
  os créditos ao NGEO são obrigatórios e disclaimers longos não são desejados.
- Os arquivos de download (PDF/JPEG/PNG) **não ficam no Git**: são hospedados
  no Google Drive e referenciados por `drive_manifest.json`.
- Idioma do produto e das mensagens de commit: **português do Brasil**.

## 2. Mapa dos arquivos

| Caminho | Papel |
| --- | --- |
| `index.html` | Estrutura: faixa do Governo, cabeçalho, busca, filtros, grade/tabela, modal, rodapé |
| `assets/css/style.css` | Tokens do Design System gov.br + layout estilo IBGE |
| `assets/js/data.js` | **GERADO** — catálogo (`MAPS_DATABASE`, `REGIONAL_OFFICES`) |
| `assets/js/app.js` | Filtros, busca, grade, tabela, modal, zoom/pan, chips de folha |
| `assets/fonts/rawline/` | Rawline self-hosted (woff2 400–800) |
| `assets/img/thumbnails/` | Miniaturas versionadas (`thumb-<id>.jpg`, 1280 px) |
| `assets/downloads/` | Cópias locais dos downloads — **ignorado pelo Git** |
| `organize_and_build.py` | **Fonte da verdade do catálogo** (metadados + build) |
| `sync_drive.py` | Envia downloads ao Drive e mantém o manifesto |
| `drive_manifest.json` | `filename → {id, sha256, bytes, url}` (93 entradas hoje) |
| `mapas_originais/` | Insumos brutos locais — **ignorado pelo Git** |
| `README.md` | Documentação institucional do repositório |

Estado atual: **40 mapas**, 40 thumbnails, 93 downloads no Drive.

## 3. Regra de ouro

`assets/js/data.js` é **gerado** por `organize_and_build.py`. Nunca edite esse
arquivo à mão: altere a configuração em `organize_and_build.py` e rode o build.
Edição manual é aceitável apenas como diagnóstico temporário.

---

## 4. Fluxo de ingestão de um mapa novo

1. Coloque o(s) arquivo(s) fonte em `mapas_originais/<grupo>/`:
   - `mapas_originais/geral/` — âmbito estadual
   - `mapas_originais/gerencias_regionais/<gerencia>/` — por gerência
   - `mapas_originais/<NOME DA UC OU MOSAICO>/` — coleções por unidade
2. Declare o item em `items_config` (`organize_and_build.py`), no bloco da
   gerência correspondente. Modelo mínimo:

```python
{
    "id": "grx-minha-uc-limites",                    # kebab-case, único
    "title": "Limites Territoriais — REVIS Minha UC", # título completo
    "short_title": "Limites — Minha UC",              # busca/tabela
    "regional_id": "grx",                             # ver REGIONAL_OFFICES
    "regional_name": "Gerência Regional Xingu",
    "category": "ucs",                                # ucs | gestao | fundiario
    "category_label": "Unidades de Conservação Estaduais",
    "theme": "Delimitação Cartográfica",              # aparece sob o título
    "scale": "1:60.000",
    "paper_size": "A1 (594 × 841 mm)",
    "datum": "SIRGAS 2000",
    "date": "Outubro de 2026",
    "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Uma a três frases objetivas sobre o conteúdo da carta.",
    "tags": ["Minha UC", "Rio Xingu", "Folha A1"],
    "downloads_spec": [
        {"dirs": ["mapas_originais/Minha UC"], "keywords": ["limites"],
         "ext": ".pdf", "dest": "grx-minha-uc-limites.pdf",
         "label": "Documento PDF Vetorial (A1)", "key": "pdf"},
        {"dirs": ["mapas_originais/Minha UC"], "keywords": ["limites"],
         "ext": ".jpg", "dest": "grx-minha-uc-limites.jpg",
         "label": "Imagem JPEG de Alta Definição", "key": "image"}
    ]
},
```

3. Rode o build (gera miniatura, copia downloads, recalcula `data.js`):

```bash
python organize_and_build.py
```

4. Suba os downloads ao Drive (só o que mudou, por hash):

```bash
python sync_drive.py
```

5. Rode o build **de novo** para gravar as URLs do Drive no `data.js`:

```bash
python organize_and_build.py
```

6. Valide e publique (seção 9 e 10).

---

## 5. Referência de campos (`items_config`)

| Campo | Regra |
| --- | --- |
| `id` | kebab-case, único, com prefixo regional (`grx-`, `gra-`, `grcn2-`, `estadual-`) |
| `title` | `<Tema> — <Unidade / Folha>`; travessão `—` |
| `short_title` | ≤ ~50 caracteres; sem adjetivos promocionais |
| `regional_id` | Um de `REGIONAL_OFFICES` (`estadual`, `grcn-2`, `gra`, `grx`, …) |
| `category` | `ucs`, `gestao` ou `fundiario` |
| `paper_size` | **Somente A4, A1 ou A0**; em raster, indicar dpi (`A1 (594 × 841 mm) — PNG 300 dpi`) |
| `date` | `Mês de Ano` por extenso (`Outubro de 2026`) |
| `source_org` | `Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio` |
| `tags` | Termos de busca reais (UC, rio, município, tema, folha) |
| `downloads_spec[].dirs` | Pastas de origem, em ordem de busca |
| `downloads_spec[].keywords` | **Minúsculas, sem acento**, ≥ 2 tokens quando houver risco de ambiguidade |
| `downloads_spec[].ext` | `.pdf`, `.jpg`, `.jpeg`, `.png` |
| `downloads_spec[].dest` | kebab-case com prefixo do `id`; é o nome usado no Drive e no link |
| `downloads_spec[].label` | Texto do botão/modal. Em cards multi-folha: `NN — Título da folha` |
| `downloads_spec[].key` | `pdf` ou `image` (define preferência da miniatura) |

## 6. Armadilhas conhecidas

- **`find_file_by_query` usa substring.** `"01"` casa com `2015`. Sempre use
  duas palavras-chave (`["06", "1985"]`, não `["1985"]`).
- **`dirs` é pesquisado em ordem**: o primeiro diretório que casar vence. Se
  existirem versões combinada e por unidade com nomes iguais, restrinja `dirs`
  à pasta correta.
- **Miniatura**: vem do primeiro `key: "image"`; na ausência, do primeiro PDF.
  A folha 01 deve ser o primeiro PDF declarado.
- **Arquivo ausente na máquina** gera `[WARN] Source not found`, mas a entrada
  é mantida se existir no `drive_manifest.json` (evita quebrar clones limpos).
- **Nomes com acento**: compare sempre por trechos sem acento (`hidrog`,
  `gest`, `biodiversidade`).
- **Arquivo > 100 MB** não pode ir para o Git (limite do GitHub) — hoje não é
  problema, pois downloads não são versionados.

## 7. Google Drive (hospedagem dos downloads)

- `rclone` em `C:\Program Files\rclone-v1.74.2-windows-amd64\rclone.exe`
  (não está no `PATH`; `sync_drive.py` resolve sozinho).
- Remote: `gdrive:` — pasta `cartografia-tematica/`.
- O token OAuth fica em `%APPDATA%\rclone\rclone.conf`, **fora do repositório**.
  Nunca copie esse arquivo para dentro do projeto.
- O remote do rclone é compartilhado com o uso pessoal de mídia do responsável:
  **não** rode comandos destrutivos por nome de pasta ampla; opere sempre em
  `gdrive:cartografia-tematica/`.
- `403 rateLimitExceeded` é esperado (client ID compartilhado do rclone): o
  script já tem `--tpslimit`/`--retries`. Basta rodar de novo até aparecer
  `0 falhas`.
- Atualizações usam o **mesmo file ID** (`rclone copyto` sobrescreve), então o
  link publicado nunca muda.
- `drive_manifest.json` **deve** ser commitado; `assets/downloads/` **não**.

## 8. Estilo e design (não negociável)

- Referência visual: IBGE + Design System gov.br. **Menos é melhor.**
- Sem emojis, sem clichês de landing page, sem texto promocional.
- Tokens principais: `--gov-blue-primary #1351b4`, `--gov-blue-dark #071d41`,
  `--gov-blue-hover #0c326f`, `--gov-green-primary #168821`,
  `--gov-gold #c2850c`, `--gov-border #cccccc`, `--gov-bg #f8f8f8`.
- Tipografia: Rawline self-hosted (400–800) com fallback Raleway/system.
- Cards de canto reto, borda superior azul, sem elevação no hover.
- Não criar seções técnicas, avisos legais longos ou badges de destaque.
- Licença no rodapé: CC BY 4.0. Créditos ao NGEO no hero, rodapé e README.
- Links externos atuais: Portal IDEFLOR-Bio, Visualizador WebGIS, Guia de UCs,
  Shapes das UCs. Não reintroduzir ITERPA nem a Resolução IBGE/SIRGAS 2000.

## 9. Checklist de validação (obrigatório antes de commitar)

```bash
python -m py_compile organize_and_build.py sync_drive.py
node --check assets/js/data.js
node --check assets/js/app.js
```

Verificações de conteúdo (esperado: 0 links locais, tudo no manifesto):

```python
import json, re
src = open('assets/js/data.js', encoding='utf-8').read()
m = json.load(open('drive_manifest.json', encoding='utf-8'))
urls = re.findall(r'"url": "([^"]+)"', src)
print('downloads:', len(urls),
      '| drive:', sum(u.startswith('https://drive.google.com/') for u in urls),
      '| manifest:', len(m))
```

Smoke test visual (opcional, mas recomendado em mudanças de layout):

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 1000})
    erros = []
    pg.on("pageerror", lambda e: erros.append(str(e)))
    pg.goto("http://127.0.0.1:8768/", wait_until="networkidle")
    hrefs = [pg.locator(".btn-download-item").nth(i).get_attribute("href")
             for i in range(pg.locator(".btn-download-item").count())]
    print(len(hrefs), 'botoes |', sum(h.startswith('https://drive.google.com/') for h in hrefs), 'no Drive')
    print('erros:', erros)
    b.close()
```

Sirva localmente com `python -m http.server 8768` antes do teste.

## 10. Git

- Commits em português, prefixo convencional: `feat:`, `fix:`, `style:`,
  `docs:`, `chore:`.
- Uma entrega por commit; `main` é publicada direto no GitHub Pages.
- **Nunca** commitar `mapas_originais/`, `assets/downloads/`, credenciais ou
  tokens.
- Antes de push, confirmar `git status --short` sem arquivos inesperados.

## 11. Receitas rápidas

**Substituir um PDF já publicado** (mesmo nome de destino):
1. Sobrescreva o arquivo em `mapas_originais/...`.
2. `python organize_and_build.py` (copia e atualiza a miniatura).
3. `python sync_drive.py` — o hash muda, o upload sobrescreve o mesmo file ID.
4. `python organize_and_build.py` (regrava `data.js`) e commit.

**Coleção por unidade (vários downloads em um card)**: um item por unidade,
com N `downloads_spec`; `label` no formato `NN — Título da folha`. O `app.js`
detecta esse padrão em `getDownloadCode()` e troca o texto do botão pelo
código da folha (`01`, `06 · 1985`). Sem esse formato, os botões ficam
indistinguíveis.

**Nova gerência regional**: adicionar entrada em `REGIONAL_OFFICES`
(`id`, `sigla`, `name`, `status`) e usar o `id` nos itens. `status: "pending"`
exibe a mensagem de catalogação pendente em vez da grade.

## 12. O que não fazer

- Não editar `data.js` à mão.
- Não mover downloads de volta para o Git.
- Não criar formatos A2/A3 (não existem no acervo).
- Não alterar cores/fontes fora dos tokens do DS.
- Não usar emojis ou linguagem de marketing em textos do portal.
- Não rodar comandos rclone fora de `gdrive:cartografia-tematica/`.
- Não commitar arquivos de `mapas_originais/` nem chaves de API.
