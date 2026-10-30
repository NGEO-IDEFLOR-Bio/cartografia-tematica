import os
import sys
import json
import shutil
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
import pdfplumber
import pypdfium2 as pdfium

def format_size(bytes_num):
    if bytes_num >= 1024 * 1024 * 1024:
        return f"{bytes_num / (1024*1024*1024):.1f} GB"
    elif bytes_num >= 1024 * 1024:
        return f"{bytes_num / (1024*1024):.1f} MB"
    elif bytes_num >= 1024:
        return f"{bytes_num / 1024:.0f} KB"
    return f"{bytes_num} B"

os.makedirs("assets/downloads", exist_ok=True)
os.makedirs("assets/img/thumbnails", exist_ok=True)

# Helper para encontrar arquivo em diretórios com fallback
def find_file_by_query(directories, keywords, extension):
    ext = extension.lower()
    for d in directories:
        if not os.path.exists(d):
            continue
        for f in os.listdir(d):
            f_lower = f.lower()
            if f_lower.endswith(ext):
                if all(k.lower() in f_lower for k in keywords):
                    return os.path.join(d, f)
    return None

# Lista de Gerências Regionais do IDEFLOR-Bio.
# Estrutura oficial da DGMUC para as 29 UCs estaduais sob gestão do IDEFLOR-Bio
# (9 Gerências Regionais), conforme "Shapes de cada unidade" do portal IDEFLOR-Bio
# (https://ideflorbio.pa.gov.br/shapes-de-cada-unidade) e o shapefile consolidado
# Shapefile_UCs_Estaduais_IDEFLOR-Bio. Registro de alteração (21/10/2026): GRCN-III,
# GRTUC, GRM e GRNE foram incorporadas; GRMR, GRET, GRBA e GRT não integram a estrutura
# vigente e foram removidas (constavam apenas como "em homologação técnica", sem
# acervo e sem respaldo no cadastro oficial). GRCN-II e GRX mantiveram os
# identificadores, preservando os vínculos dos produtos já publicados.
REGIONAL_OFFICES = [
    {"id": "all", "sigla": "TODAS", "name": "Todas as Gerências Regionais / Geral Estadual", "status": "active"},
    {"id": "estadual", "sigla": "GERAL", "name": "Âmbito Estadual Geral (Pará)", "status": "active"},
    {"id": "grcn-1", "sigla": "GRCN-I", "name": "Gerência Regional da Calha Norte I", "status": "pending"},
    {"id": "grcn-2", "sigla": "GRCN-II", "name": "Gerência Regional da Calha Norte II", "status": "active"},
    {"id": "grcn-3", "sigla": "GRCN-III", "name": "Gerência Regional da Calha Norte III", "status": "pending"},
    {"id": "grb", "sigla": "GRB", "name": "Gerência Regional de Belém / Região Metropolitana", "status": "pending"},
    {"id": "grtuc", "sigla": "GRTUC", "name": "Gerência Regional de Tucuruí", "status": "pending"},
    {"id": "gra", "sigla": "GRA", "name": "Gerência Regional do Araguaia", "status": "active"},
    {"id": "grm", "sigla": "GRM", "name": "Gerência Regional do Marajó", "status": "pending"},
    {"id": "grne", "sigla": "GRNE", "name": "Gerência Regional do Nordeste", "status": "pending"},
    {"id": "grx", "sigla": "GRX", "name": "Gerência Regional do Xingu", "status": "active"}
]

items_config = [
    {
        "id": "areas-ideflor-bio-a1",
        "title": "Mapa de Áreas sob Gestão do IDEFLOR-Bio — Folha A1",
        "short_title": "Áreas sob Gestão do IDEFLOR-Bio",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "gestao",
        "category_label": "Áreas Protegidas e Gestão",
        "theme": "Jurisdição e Gestão Territorial Ambiental",
        "scale": "1:3.000.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento das áreas sob jurisdição, monitoramento e fiscalização direta do IDEFLOR-Bio no Pará. Integra unidades de Uso Sustentável, Proteção Integral e perímetros prioritários para concessões florestais e restauração da biodiversidade.",
        "tags": ["IDEFLOR-Bio", "Gestão Territorial", "Folha A1", "Amazônia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["Mapa_Areas_IDEFLOR-Bio"], "ext": ".pdf", "dest": "mapa-areas-ideflor-bio-pa-a1.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "categorias-fundiarias-a1",
        "title": "Mapa de Categorias Fundiárias do Estado do Pará — Folha A1",
        "short_title": "Categorias Fundiárias do Pará",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "fundiario",
        "category_label": "Ordenamento Territorial & ZEE",
        "theme": "Estrutura Fundiária e Territórios Coletivos",
        "scale": "1:2.500.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento da malha fundiária estadual e federal em território paraense. Discrimina Terras Indígenas demarcadas e homologadas, Territórios Quilombolas titulados, Projetos de Assentamento da Reforma Agrária (PA, PAF, PDS), Glebas Públicas Estaduais e Federais e Imóveis Rurais.",
        "tags": ["Fundiário", "Terras Indígenas", "Quilombolas", "Glebas Públicas"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["Mapa_Categorias_Fundiarias"], "ext": ".pdf", "dest": "mapa-categorias-fundiarias-pa-a1.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "areas-protegidas-a1",
        "title": "Mapa de Áreas Protegidas do Estado do Pará — Folha A1",
        "short_title": "Áreas Protegidas do Pará",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "gestao",
        "category_label": "Áreas Protegidas e Gestão",
        "theme": "Mosaico de Conservação e Territórios Tradicionais",
        "scale": "1:2.800.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Balanço geoespacial das áreas protegidas do Estado do Pará com dados quantitativos consolidados: Terras Indígenas (30.952.071 ha / 24,8%), UCs de Proteção Integral (13.763.504 ha / 11,0%), UCs de Uso Sustentável (19.102.263 ha / 15,3%) e Territórios Quilombolas (867.747 ha / 0,7%), totalizando mais de 51% do território estadual sob regime de salvaguarda.",
        "tags": ["Áreas Protegidas", "SNUC", "SEUC", "Conservação", "Biodiversidade"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["Mapa_Areas_Protegidas"], "ext": ".pdf", "dest": "mapa-areas-protegidas-pa-a1.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "ucs-gerencia-regional",
        "title": "Unidades de Conservação Estaduais por Gerência Regional",
        "short_title": "UCs por Gerência Regional",
        "regional_id": "estadual",
        "regional_name": "Mosaico das Gerências Regionais",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Divisão Administrativa Operacional do IDEFLOR-Bio",
        "scale": "1:3.200.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Espacialização de todas as Unidades de Conservação estaduais agrupadas por suas respectivas Gerências Regionais da DGMUC/IDEFLOR-Bio (Calha Norte I e II, Belém/Metropolitana, Marajó, Tocantins/Estrada de Ferro, Baixo Amazonas, Xingu, Tapajós e Araguaia).",
        "tags": ["Gerências Regionais", "Gestão Ambiental", "IDEFLOR-Bio"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["GERENCIA", "REGIONAL"], "ext": ".pdf", "dest": "unidades-de-conservacao-estaduais-por-gerencia-regional.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "regioes-de-integracao",
        "title": "Estado do Pará — Regiões de Integração",
        "short_title": "Regiões de Integração do Pará",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "fundiario",
        "category_label": "Ordenamento Territorial & ZEE",
        "theme": "Planejamento Regional e Governança Governamental",
        "scale": "1:3.000.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio / SEPLAN / FAPESPA",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Delimitação das 12 Regiões de Integração do Estado do Pará adotadas na formulação do Plano Plurianual (PPA) e políticas setoriais: Araguaia, Baixo Amazonas, Carajás, Guajará, Guamá, Lago de Tucuruí, Marajó, Rio Caeté, Rio Capim, Tapajós, Tocantins e Xingu.",
        "tags": ["Regiões de Integração", "Planejamento Regional", "PPA"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["INTEGRA"], "ext": ".pdf", "dest": "estado-do-para-regioes-de-integracao.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "macrozoneamento-zee",
        "title": "Macrozoneamento Ecológico-Econômico do Estado do Pará (ZEE)",
        "short_title": "ZEE — Macrozoneamento do Pará",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "fundiario",
        "category_label": "Ordenamento Territorial & ZEE",
        "theme": "Zoneamento Ecológico-Econômico",
        "scale": "1:2.000.000",
        "paper_size": "A1 (594 × 841 mm) — PNG 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "Governo do Estado do Pará / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa do Macrozoneamento Ecológico-Econômico (ZEE) do Estado do Pará. Instrumento legal e técnico de ordenamento do território que estabelece diretrizes e zonas de consolidação produtiva, expansão ordenada e conservação dos recursos naturais.",
        "tags": ["ZEE", "Zoneamento", "Macro", "Sustentabilidade"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["ZEE", "MACRO"], "ext": ".png", "dest": "macrozoneamento-ecologico-economico-zee.png", "label": "Imagem PNG (A1, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "panorama-ucs-para",
        "title": "Mosaico Geral de Unidades de Conservação no Estado do Pará",
        "short_title": "Panorama Geral de UCs no Pará",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Cadastro Geral de Unidades de Conservação",
        "scale": "1:2.500.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa das Unidades de Conservação federais, estaduais e municipais cadastradas no território paraense, com limites geodésicos e zonas de amortecimento.",
        "tags": ["Mosaico de UCs", "Federal e Estadual", "SNUC", "Biodiversidade"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["ucs_no_estado"], "ext": ".pdf", "dest": "unidades-de-conservacao-no-estado-do-para.pdf", "label": "Documento PDF Vetorial", "key": "pdf"}
        ]
    },
    {
        "id": "ucs-estaduais-a1",
        "title": "Unidades de Conservação Estaduais do Pará — Folha A1",
        "short_title": "UCs Estaduais do Pará (A1)",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Cartografia Geral de Unidades de Conservação",
        "scale": "1:3.000.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Agosto de 2025",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Carta temática das Unidades de Conservação sob administração estadual no Pará (APAs, ESECs, FLOTAs, MONAs, Parques Estaduais, REVIS, REBIOs e RDS). Apresenta os limites municipais, malha hidrográfica estadual e encartes detalhados com zoom na Região Metropolitana de Belém, Arquipélago do Marajó e Mosaicos Regionais.",
        "tags": ["Unidades de Conservação", "Pará", "Folha A1", "IDEFLOR-Bio", "SEUC", "SNUC"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["MAPA_A1"], "ext": ".jpeg", "dest": "mapa-unidades-de-conservacao-estaduais-pa-a1.jpg", "label": "Imagem JPEG", "key": "image"}
        ]
    },
    {
        "id": "ucs-estaduais-a4",
        "title": "Unidades de Conservação Estaduais do Pará — Formato Executivo A4",
        "short_title": "UCs Estaduais do Pará (A4)",
        "regional_id": "estadual",
        "regional_name": "Âmbito Estadual Geral",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Cartografia Sintética para Relatórios Técnicos",
        "scale": "1:9.200.000",
        "paper_size": "A4 (210 × 297 mm)",
        "datum": "SIRGAS 2000",
        "date": "Agosto de 2025",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Edição compacta e diagramada para relatórios técnicos, pareceres jurídicos e consultas executivas rápidas em padrão folha A4. Ilustra as categorias do SEUC distribuídas ao longo dos 144 municípios paraenses.",
        "tags": ["Unidades de Conservação", "Folha A4", "Executivo", "IDEFLOR-Bio"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["MAPA_A4"], "ext": ".jpeg", "dest": "mapa-unidades-de-conservacao-estaduais-pa-a4.jpg", "label": "Imagem JPEG Otimizada", "key": "image"}
        ]
    },
    {
        "id": "revis-tabuleiro-embaubal",
        "title": "Refúgio de Vida Silvestre Tabuleiro do Embaubal — Praias Interiores",
        "short_title": "REVIS Tabuleiro do Embaubal (Praias)",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Mapeamento Temático de Habitats e Biodiversidade",
        "scale": "1:57.600",
        "paper_size": "A4 Especial (4092 × 2893 px)",
        "datum": "SIRGAS 2000",
        "date": "Dezembro de 2025",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa das praias fluviais situadas no interior da UC REVIS Tabuleiro do Embaubal (Rio Xingu, município de Senador José Porfírio/PA). Essas faixas de praia são ecossistemas prioritários para a desova e monitoramento da Tartaruga-da-Amazônia e Tracajá.",
        "tags": ["Tabuleiro do Embaubal", "REVIS", "Rio Xingu", "Quelônios", "Praias Fluviais", "Xingu"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/geral", "."], "keywords": ["modelo"], "ext": ".jpeg", "dest": "revis-tabuleiro-do-embaubal-praias.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grcn2-mosaico-a0",
        "title": "Mapeamento de Unidades de Conservação — GRCN-II (Calha Norte II) — Folha A0",
        "short_title": "Mosaico Calha Norte II — Folha A0",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Corredor Ecológico da Calha Norte Paraense",
        "scale": "1:1.000.000",
        "paper_size": "A0 (841 × 1189 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Carta em formato A0 das Unidades de Conservação da Calha Norte do Rio Amazonas, na porção oeste paraense. Consolida a ESEC Mamuru, Florestas Estaduais de Faro, Paru e Trombetas, e o Parque Estadual PAGAM.",
        "tags": ["Calha Norte II", "GRCN-II", "Folha A0", "Corredor Ecológico", "Manejo Florestal"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["MAPEAMENTO", "A0"], "ext": ".pdf", "dest": "grcn-ii-mapeamento-unidades-de-conservacao-a0.pdf", "label": "Documento PDF Vetorial Plotter (A0)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["MAPEAMENTO", "A0"], "ext": ".jpeg", "dest": "grcn-ii-mapeamento-unidades-de-conservacao-a0.jpg", "label": "Imagem JPEG", "key": "image"}
        ]
    },
    {
        "id": "grcn2-sintese-ucs",
        "title": "Unidades de Conservação — Gerência Regional Calha Norte II (Síntese)",
        "short_title": "Calha Norte II (Síntese)",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Visão Territorial Integrada GRCN-II",
        "scale": "1:1.500.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Visão integrada das Unidades de Conservação administradas pela Gerência Regional Calha Norte II, ressaltando os limites dos rios Trombetas, Paru, Nhamundá, Erepecuru e o Rio Amazonas.",
        "tags": ["Calha Norte II", "GRCN-II", "Síntese", "IDEFLOR-Bio"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["UNIDADES DE CONSERVA", "GRCN-II."], "ext": ".jpeg", "dest": "grcn-ii-unidades-de-conservacao-sintese.jpg", "label": "Imagem JPEG Otimizada", "key": "image"}
        ]
    },
    {
        "id": "grcn2-esec-mamuru",
        "title": "Estação Ecológica Mamuru — GRCN-II",
        "short_title": "ESEC Mamuru",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Unidade de Conservação de Proteção Integral",
        "scale": "1:250.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa da Estação Ecológica Mamuru (ESEC Mamuru), unidade de proteção integral destinada à salvaguarda da biodiversidade e à realização de pesquisas científicas.",
        "tags": ["Mamuru", "ESEC", "Proteção Integral", "Calha Norte II"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["mamuru"], "ext": ".pdf", "dest": "grcn-ii-estacao-ecologica-mamuru.pdf", "label": "Documento PDF Vetorial", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["mamuru"], "ext": ".jpeg", "dest": "grcn-ii-estacao-ecologica-mamuru.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grcn2-flota-faro",
        "title": "Floresta Estadual de Faro — GRCN-II",
        "short_title": "FLOTA de Faro",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Unidade de Conservação de Uso Sustentável",
        "scale": "1:350.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa da Floresta Estadual de Faro (FLOTA Faro), situada no oeste paraense na fronteira com o Estado do Amazonas. Delimita zonas de manejo florestal sustentável e proteção dos recursos hídricos.",
        "tags": ["FLOTA Faro", "Faro", "Uso Sustentável", "Concessão Florestal"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["faro"], "ext": ".pdf", "dest": "grcn-ii-floresta-estadual-de-faro.pdf", "label": "Documento PDF Vetorial", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["faro"], "ext": ".jpeg", "dest": "grcn-ii-floresta-estadual-de-faro.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grcn2-flota-paru",
        "title": "Floresta Estadual do Paru — GRCN-II",
        "short_title": "FLOTA do Paru",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Unidade de Conservação de Uso Sustentável",
        "scale": "1:500.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento da Floresta Estadual do Paru, que com 3,6 milhões de hectares é uma das maiores UCs estaduais de uso sustentável do mundo. Detalha zonas de castanhais, planos de manejo florestal e bacias hidrográficas.",
        "tags": ["FLOTA Paru", "Castanhais", "Manejo Florestal Sustentável", "Calha Norte II"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["paru"], "ext": ".pdf", "dest": "grcn-ii-floresta-estadual-do-paru.pdf", "label": "Documento PDF Vetorial", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["paru"], "ext": ".jpeg", "dest": "grcn-ii-floresta-estadual-do-paru.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grcn2-flota-trombetas",
        "title": "Floresta Estadual do Trombetas — GRCN-II",
        "short_title": "FLOTA do Trombetas",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Unidade de Conservação de Uso Sustentável",
        "scale": "1:400.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa da Floresta Estadual do Trombetas (FLOTA Trombetas) na bacia do Rio Trombetas. Ilustra as áreas limítrofes a Terras Indígenas e corredores contíguos de conservação ambiental.",
        "tags": ["FLOTA Trombetas", "Rio Trombetas", "Uso Sustentável", "Calha Norte II"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["trombetas"], "ext": ".pdf", "dest": "grcn-ii-floresta-estadual-do-trombetas.pdf", "label": "Documento PDF Vetorial", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["trombetas"], "ext": ".jpeg", "dest": "grcn-ii-floresta-estadual-do-trombetas.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grcn2-pagam",
        "title": "Parque Estadual das Árvores Gigantes da Amazônia (PAGAM) — GRCN-II",
        "short_title": "Parque Estadual PAGAM",
        "regional_id": "grcn-2",
        "regional_name": "Gerência Regional Calha Norte II",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Unidade de Conservação de Proteção Integral",
        "scale": "1:300.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "2025/2026",
        "source_org": "NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapa do Parque Estadual Ambiental das Árvores Gigantes da Amazônia (PAGAM). Unidade de conservação criada para salvaguardar os maiores espécimes arbóreos da América do Sul (Dinizia excelsa de até 88,5 metros de altura) entre os rios Jari e Cupixi.",
        "tags": ["PAGAM", "Árvores Gigantes", "Parque Estadual", "Angelim Vermelho", "Proteção Integral"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["PAGAM"], "ext": ".pdf", "dest": "grcn-ii-parque-estadual-arvores-gigantes-pagam.pdf", "label": "Documento PDF Vetorial", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/calha_norte_ii", "calhanorte-II"], "keywords": ["PAGAM"], "ext": ".jpeg", "dest": "grcn-ii-parque-estadual-arvores-gigantes-pagam.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-limites",
        "title": "Limites Territoriais e Unidades de Conservação Estaduais — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Limites e UCs — Tabuleiro do Embaubal e Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Delimitação Cartográfica e Regime Jurídico das UCs",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Delimitação territorial e espacialização do Refúgio de Vida Silvestre (REVIS) Tabuleiro do Embaubal (Proteção Integral) e da Reserva de Desenvolvimento Sustentável (RDS) Vitória de Souzel (Uso Sustentável). Destaca os limites municipais de Senador José Porfírio e Vitória do Xingu, a calha do Rio Xingu e os perímetros legais das unidades de conservação.",
        "tags": ["Tabuleiro do Embaubal", "Vitória de Souzel", "REVIS", "RDS", "Xingu", "Senador José Porfírio", "Folha A1", "Limites Territoriais", "Proteção Integral", "Uso Sustentável"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["01", "limites"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-01-limites-territoriais-ucs.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["01", "limites"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-01-limites-territoriais-ucs.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-gestao",
        "title": "Gestão Territorial, Infraestrutura Operacional e Acessos — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Gestão, Infraestrutura e Acessos — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Gestão Operacional, Acessos Fluviais e Infraestrutura",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento da infraestrutura pública e operacional de apoio à gestão das UCs: bases de observação e monitoramento, trapiches e trajetos fluviais de acesso, escolas ribeirinhas, construções comunitárias e registro de pressões antrópicas, áreas afetadas por fogo/incêndio e criação de búfalos.",
        "tags": ["Gestão Territorial", "Infraestrutura Operacional", "Acessos Fluviais", "Bases de Monitoramento", "Xingu", "REVIS", "RDS", "Pressões Ambientais"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["02", "gest"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-02-gestao-infraestrutura-acessos.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["02", "gest"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-02-gestao-infraestrutura-acessos.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-biodiversidade",
        "title": "Biodiversidade e Proteção Ambiental — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Biodiversidade e Proteção Ambiental — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Fauna, Flora e Habitats Críticos de Reprodução",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Zoneamento da biodiversidade com ênfase nas áreas de reprodução e desova de quelônios aquáticos (Tartaruga-da-Amazônia — Podocnemis expansa e Tracajá — Podocnemis unifilis) nos tabuleiros e praias fluviais do Rio Xingu, sítios de desova e refúgio de ictiofauna (curimatã e peixes migradores) e inventário de árvores matrizes da vegetação e flora amazônica.",
        "tags": ["Biodiversidade", "Quelônios", "Tartaruga-da-Amazônia", "Tracajá", "Áreas de Desova", "Ictiofauna", "Curimatã", "Árvores Matrizes", "Rio Xingu"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["03", "biodiversidade"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-03-biodiversidade-protecao-ambiental.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["03", "biodiversidade"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-03-biodiversidade-protecao-ambiental.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-comunidades",
        "title": "Comunidades e Uso Tradicional — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Comunidades e Uso Tradicional — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Populações Tradicionais e Modo de Vida Ribeirinho",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento socioambiental das comunidades ribeirinhas residentes e usuárias do território da RDS Vitória de Souzel e entorno do REVIS. Espacializa residências de moradores ribeirinhos, pontos de apoio pesqueiro e ranchos artesanais, fornecendo base cartográfica para acordos de gestão participativa e o plano de manejo da unidade.",
        "tags": ["Comunidades Tradicionais", "Ribeirinhos", "Pesca Artesanal", "Ranchos Pesqueiros", "RDS Vitória de Souzel", "Uso Sustentável", "Gestão Participativa"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["04", "comunidades"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-04-comunidades-uso-tradicional.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["04", "comunidades"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-04-comunidades-uso-tradicional.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-hidrografia",
        "title": "Quadro Hidrográfico e Referências Locais — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Quadro Hidrográfico e Referências — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Malha Hidrográfica, Ilhas Fluviais, Praias e Toponímia",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Levantamento cartográfico do complexo hidrográfico do Rio Xingu no setor das unidades. Mapeia detalhadamente ilhas fluviais, praias, tabuleiros arenosos sazonais, furos, igarapés, lagos marginais e marcos de referência geográfica fundamentais à navegação fluvial, fiscalização e proteção territorial.",
        "tags": ["Hidrografia", "Rio Xingu", "Ilhas Fluviais", "Praias Fluviais", "Tabuleiros Arenosos", "Igarapés", "Furos", "Toponímia", "Navegação"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["05", "hidrog"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-05-quadro-hidrografico-referencias.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["05", "hidrog"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-05-quadro-hidrografico-referencias.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cobertura-solo-1985",
        "title": "Cobertura do Solo 1985 — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cobertura do Solo (1985) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Uso e Cobertura da Terra (MapBiomas Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento temático da cobertura da terra em 1985 para o mosaico REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer envoltório de 2 km (área total de 27.023 ha), processado a partir do MapBiomas Coleção 11. Espacializa a distribuição de Floresta Alagável (50,5%), Corpos D'água (37,2%), Campo Pantanoso (11,2%) e Mosaico de Usos (1,1%), fornecendo o marco temporal inicial da série histórica de 40 anos.",
        "tags": ["Cobertura do Solo", "MapBiomas", "Uso da Terra", "Floresta Alagável", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "1985", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "1985"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1985.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "1985"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1985.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cobertura-solo-1995",
        "title": "Cobertura do Solo 1995 — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cobertura do Solo (1995) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Uso e Cobertura da Terra (MapBiomas Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento temático da cobertura da terra em 1995 para o mosaico REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer de 2 km, processado a partir do MapBiomas Coleção 11. Registra a estabilidade e dinâmica da vegetação alagável e ambientes aquáticos no Rio Xingu ao término do primeiro decênio analisado.",
        "tags": ["Cobertura do Solo", "MapBiomas", "Uso da Terra", "Floresta Alagável", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "1995", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "1995"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1995.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "1995"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1995.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cobertura-solo-2005",
        "title": "Cobertura do Solo 2005 — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cobertura do Solo (2005) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Uso e Cobertura da Terra (MapBiomas Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento temático da cobertura da terra em 2005 para as UCs REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel e buffer de 2 km, processado a partir do MapBiomas Coleção 11. Subsídio histórico do uso do solo e preservação de habitats ripários no médio Xingu.",
        "tags": ["Cobertura do Solo", "MapBiomas", "Uso da Terra", "Floresta Alagável", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "2005", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2005"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2005.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2005"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2005.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cobertura-solo-2015",
        "title": "Cobertura do Solo 2015 — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cobertura do Solo (2015) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Uso e Cobertura da Terra (MapBiomas Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento temático da cobertura da terra em 2015 para as UCs REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel e buffer de 2 km, processado a partir do MapBiomas Coleção 11. Permite avaliar a dinâmica de conservação e ocupação anterior à criação oficial do mosaico estadual.",
        "tags": ["Cobertura do Solo", "MapBiomas", "Uso da Terra", "Floresta Alagável", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "2015", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2015"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2015.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2015"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2015.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cobertura-solo-2024",
        "title": "Cobertura do Solo 2024 — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cobertura do Solo (2024) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Uso e Cobertura da Terra (MapBiomas Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento temático atualizado da cobertura da terra em 2024 para as UCs REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel e buffer de 2 km, processado a partir do MapBiomas Coleção 11. Retrata o estado atual de conservação florestal e áreas alagáveis das unidades.",
        "tags": ["Cobertura do Solo", "MapBiomas", "Uso da Terra", "Floresta Alagável", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "2024", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2024"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2024.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["06", "2024"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2024.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cicatrizes-fogo-1985-1994",
        "title": "Cicatrizes de Fogo (1985–1994) — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cicatrizes de Fogo (1985–1994) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Dinâmica Histórica de Queimadas e Cicatrizes de Fogo (MapBiomas Fogo Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Espacialização das cicatrizes de fogo e áreas queimadas no decênio de 1985 a 1994 no REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer envoltório de 2 km, derivadas do MapBiomas Fogo Coleção 11. Quantifica uma área total queimada de 5.317 ha no período (69,7% na RDS Souzel, 29,2% no buffer e 1,1% no REVIS).",
        "tags": ["Cicatrizes de Fogo", "Queimadas", "Incêndios Florestais", "MapBiomas Fogo", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "1985-1994", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "1985"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1985-1994.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "1985"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1985-1994.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cicatrizes-fogo-1995-2004",
        "title": "Cicatrizes de Fogo (1995–2004) — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cicatrizes de Fogo (1995–2004) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Dinâmica Histórica de Queimadas e Cicatrizes de Fogo (MapBiomas Fogo Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Espacialização das cicatrizes de fogo e áreas queimadas no decênio de 1995 a 2004 no mosaico REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer de 2 km, derivadas do MapBiomas Fogo Coleção 11.",
        "tags": ["Cicatrizes de Fogo", "Queimadas", "Incêndios Florestais", "MapBiomas Fogo", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "1995-2004", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "1995"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1995-2004.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "1995"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1995-2004.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cicatrizes-fogo-2005-2014",
        "title": "Cicatrizes de Fogo (2005–2014) — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cicatrizes de Fogo (2005–2014) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Dinâmica Histórica de Queimadas e Cicatrizes de Fogo (MapBiomas Fogo Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Espacialização das cicatrizes de fogo e áreas queimadas no decênio de 2005 a 2014 no mosaico REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer de 2 km, derivadas do MapBiomas Fogo Coleção 11.",
        "tags": ["Cicatrizes de Fogo", "Queimadas", "Incêndios Florestais", "MapBiomas Fogo", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "2005-2014", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "2005"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2005-2014.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "2005"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2005-2014.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "grx-tabuleiro-souzel-cicatrizes-fogo-2015-2024",
        "title": "Cicatrizes de Fogo (2015–2024) — REVIS Tabuleiro do Embaubal e RDS Vitória de Souzel",
        "short_title": "Cicatrizes de Fogo (2015–2024) — Souzel",
        "regional_id": "grx",
        "regional_name": "Gerência Regional Xingu",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Dinâmica Histórica de Queimadas e Cicatrizes de Fogo (MapBiomas Fogo Coleção 11)",
        "scale": "1:60.000",
        "paper_size": "A1 (594 × 841 mm)",
        "datum": "SIRGAS 2000",
        "date": "Outubro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Espacialização das cicatrizes de fogo e áreas queimadas no decênio recente de 2015 a 2024 no mosaico REVIS Tabuleiro do Embaubal, RDS Vitória de Souzel e buffer de 2 km, derivadas do MapBiomas Fogo Coleção 11. Apresenta o comportamento mais recente do fogo na vigência das UCs.",
        "tags": ["Cicatrizes de Fogo", "Queimadas", "Incêndios Florestais", "MapBiomas Fogo", "Xingu", "REVIS Tabuleiro do Embaubal", "RDS Vitória de Souzel", "Série Histórica", "2015-2024", "Folha A1"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "2015"], "ext": ".pdf", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2015-2024.pdf", "label": "Documento PDF Vetorial Plotter (A1)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/xingu", "mapas_originais/TABULEIRO DO EMBAUBAL E VITÓRIA DE SOUZEL"], "keywords": ["07", "2015"], "ext": ".jpg", "dest": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2015-2024.jpg", "label": "Imagem JPEG de Alta Definição", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-elevacao",
        "title": "Mapa de Elevação do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Elevação e Hipsometria",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Hipsometria e Modelado do Relevo",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento hipsométrico do Parque Estadual Serra dos Martírios/Andorinhas (PESAM) e seu entorno em São Geraldo do Araguaia e Palestina do Pará (fronteira com Tocantins). Representa as faixas altimétricas em classes desde cotas fluviais basais (<= 200 m) até picos e cristas quartzíticas superiores a 500 metros de altitude.",
        "tags": ["PESAM", "Serra dos Martírios", "Andorinhas", "São Geraldo do Araguaia", "Elevação", "Hipsometria", "Relevo", "Folha A4", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["elevacao"], "ext": ".pdf", "dest": "gra-pesam-mapa-elevacao-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["elevacao"], "ext": ".png", "dest": "gra-pesam-mapa-elevacao-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-geologia-tempo",
        "title": "Geologia (Tempo Geológico) do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Geologia (Tempo Geológico)",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Cronoestratigrafia e Épocas Geológicas",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Carta cronoestratigráfica do PESAM e bacia do Rio Araguaia. Identifica terrenos do Fanerozoico (Cenozoica Quaternário Holoceno e Neógeno Mioceno; Paleozoica Carbonífero Pensilvaniano e Devoniano Médio Givetiano) e formações antigas do Pré-Cambriano / Proterozoico (Neoproterozoico Ediacarano e Criogeniano) que sustentam o arcabouço da Serra.",
        "tags": ["PESAM", "Geologia", "Tempo Geológico", "Estratigrafia", "Proterozoico", "Paleozoico", "Cenozoico", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["tempo"], "ext": ".pdf", "dest": "gra-pesam-geologia-tempo-geologico-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["tempo"], "ext": ".png", "dest": "gra-pesam-geologia-tempo-geologico-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-geologia-subprovincias",
        "title": "Geologia (Subprovíncias) do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Geologia (Subprovíncias)",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Províncias Estruturais e Tectônica Regional",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento das subprovíncias e domínios estruturais geológicos na região do PESAM. Destaca a Faixa Móvel Araguaia-Tocantins, a Borda Sul/Ocidental da Bacia Sedimentar do Parnaíba e as Coberturas Cenozoicas Indiscriminadas no vale aluvial do Rio Araguaia.",
        "tags": ["PESAM", "Geologia", "Subprovíncias", "Faixa Araguaia-Tocantins", "Bacia do Parnaíba", "Tectônica", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["subprovincias"], "ext": ".pdf", "dest": "gra-pesam-geologia-subprovincias-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["subprovincias"], "ext": ".png", "dest": "gra-pesam-geologia-subprovincias-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-geomorfologia",
        "title": "Geomorfologia do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Geomorfologia",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Macroformas de Relevo e Morfoestrutura",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Compartimentação geomorfológica do PESAM identificando os domínios morfoestruturais: Serras escarpadas e platôs quartzíticos (relevo residual sustentado pela Serra das Andorinhas e dos Martírios), Patamares estruturais periféricos, Depressões interplanálticas e Planícies fluviais ao longo do canal do Rio Araguaia.",
        "tags": ["PESAM", "Geomorfologia", "Relevo", "Serras", "Platôs", "Patamares", "Planícies", "Depressões", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["geomorfologia"], "ext": ".pdf", "dest": "gra-pesam-geomorfologia-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["geomorfologia"], "ext": ".png", "dest": "gra-pesam-geomorfologia-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-cpas-cotas",
        "title": "Localização das CPAs no Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Localização das CPAs",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Zonamento, Cotas de Proteção e Fitofisionomias",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento das Áreas Ocupadas por Cotas / Compartimentos de Proteção e Amortecimento (CPAs) no interior do Parque Estadual Serra dos Martírios/Andorinhas. Espacializa a poligonal de cotas sobre as classes fitofisionômicas nativas (florestas ombrófilas e savanas), subsidiando o plano de manejo, regularização e fiscalização do parque.",
        "tags": ["PESAM", "CPAs", "Cotas de Proteção", "Zonamento", "Gestão Ambiental", "Plano de Manejo", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["cotas"], "ext": ".pdf", "dest": "gra-pesam-localizacao-cpas-cotas-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["cotas"], "ext": ".png", "dest": "gra-pesam-localizacao-cpas-cotas-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-pedologia",
        "title": "Pedologia do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Pedologia (Solos)",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Classificação Pedológica e Aptidão de Solos",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Carta pedológica do PESAM estruturada pelo SiBCS/IBGE. Discrimina Neossolos Litólicos (RLd) associados aos terrenos escarpados e rochosos, Argissolos Vermelho-Amarelos Distróficos (PVAd), Neossolos Quartzarênicos Órticos (RQo), Gleissolos Háplicos Tb Distróficos (GXbd), Latossolos Amarelos (LAd) e Plintossolos Pétricos Concrecionários (FFc).",
        "tags": ["PESAM", "Pedologia", "Solos", "Neossolos Litólicos", "Argissolos", "Latossolos", "Gleissolos", "SiBCS", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["pedologia"], "ext": ".pdf", "dest": "gra-pesam-pedologia-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["pedologia"], "ext": ".png", "dest": "gra-pesam-pedologia-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    },
    {
        "id": "gra-pesam-vegetacao",
        "title": "Vegetação do Parque Estadual Serra dos Martírios/Andorinhas (PESAM)",
        "short_title": "PESAM — Cobertura Vegetal",
        "regional_id": "gra",
        "regional_name": "Gerência Regional Araguaia",
        "category": "ucs",
        "category_label": "Unidades de Conservação Estaduais",
        "theme": "Fitofisionomias e Cobertura Vegetal Nativa",
        "scale": "1:215.000",
        "paper_size": "A4 (210 × 297 mm) — 300 dpi",
        "datum": "SIRGAS 2000",
        "date": "Setembro de 2026",
        "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
        "jurisdiction": "Governo do Estado do Pará",
        "description": "Mapeamento das tipologias vegetais e cobertura da terra no PESAM e zona de amortecimento. Mapeia a Floresta Ombrófila Densa Aluvial nas margens do Rio Araguaia, Floresta Ombrófila Aberta Submontana, Savana Florestada e Savana Arborizada (Cerrado Rupestre / Savana Metalófila nos cumes rochosos), além de áreas de pastagens e vegetação secundária.",
        "tags": ["PESAM", "Vegetação", "Fitofisionomias", "Floresta Ombrófila", "Savana", "Cerrado Rupestre", "Biodiversidade", "Botânica", "Araguaia"],
        "downloads_spec": [
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["vegetacao"], "ext": ".pdf", "dest": "gra-pesam-vegetacao-a4.pdf", "label": "Documento PDF de Alta Resolução (A4)", "key": "pdf"},
            {"dirs": ["mapas_originais/gerencias_regionais/araguaia", "mapas_originais/PESAM"], "keywords": ["vegetacao"], "ext": ".png", "dest": "gra-pesam-vegetacao-a4.png", "label": "Imagem PNG (A4, 300 dpi)", "key": "image"}
        ]
    }
]

processed_items = []

for item in items_config:
    downloads = []
    preferred_img_for_thumb = None
    preferred_pdf_for_thumb = None

    for spec in item["downloads_spec"]:
        dest_file = os.path.join("assets", "downloads", spec["dest"])
        src_file = find_file_by_query(spec["dirs"], spec["keywords"], spec["ext"])

        if src_file:
            # Se o arquivo fonte for mais recente ou o destino não existir, copia
            if not os.path.exists(dest_file) or os.path.getmtime(src_file) > os.path.getmtime(dest_file):
                shutil.copy2(src_file, dest_file)
                print(f"  Copied/Updated {src_file} -> {dest_file}")
        elif spec["ext"].lower() in [".jpg", ".jpeg"]:
            # Se não há JPEG original, renderiza em alta definição a partir do PDF
            pdf_src = find_file_by_query(spec["dirs"], spec["keywords"], ".pdf")
            if not pdf_src:
                pdf_candidates = [s["dest"] for s in item["downloads_spec"] if s["ext"].lower() == ".pdf"]
                if pdf_candidates and os.path.exists(os.path.join("assets", "downloads", pdf_candidates[0])):
                    pdf_src = os.path.join("assets", "downloads", pdf_candidates[0])
            
            if pdf_src and os.path.exists(pdf_src):
                if not os.path.exists(dest_file) or os.path.getmtime(pdf_src) > os.path.getmtime(dest_file):
                    doc = pdfium.PdfDocument(pdf_src)
                    page = doc[0]
                    w_pt, h_pt = page.get_size()
                    scale = 4092.0 / w_pt if w_pt > 0 else 1.7165
                    bm = page.render(scale=scale)
                    pil_img = bm.to_pil().convert("RGB")
                    pil_img.save(dest_file, "JPEG", quality=88, optimize=True)
                    print(f"  Rendered high-res JPEG from {pdf_src} -> {dest_file}")
            else:
                print(f"  [WARN] Source not found for {spec['dest']}")
        elif spec["ext"].lower() == ".pdf":
            img_src = find_file_by_query(spec["dirs"], spec["keywords"], ".png") or find_file_by_query(spec["dirs"], spec["keywords"], ".jpg")
            if img_src and os.path.exists(img_src):
                if not os.path.exists(dest_file) or os.path.getmtime(img_src) > os.path.getmtime(dest_file):
                    with Image.open(img_src) as im:
                        im_rgb = im.convert("RGB")
                        im_rgb.save(dest_file, "PDF", resolution=300.0)
                        print(f"  Generated PDF from image {img_src} -> {dest_file}")
            else:
                print(f"  [WARN] Source not found for {spec['dest']}")
        else:
            print(f"  [WARN] Source not found for {spec['dest']}")

        if os.path.exists(dest_file):
            real_size = os.path.getsize(dest_file)
            downloads.append({
                "key": spec["key"],
                "label": spec["label"],
                "filename": spec["dest"],
                "url": f"assets/downloads/{spec['dest']}",
                "size": format_size(real_size),
                "bytes": real_size,
                "extension": os.path.splitext(spec["dest"])[1].upper().replace(".", "")
            })
            if spec["key"] == "image":
                preferred_img_for_thumb = dest_file
            elif spec["key"] == "pdf":
                preferred_pdf_for_thumb = dest_file

    thumb_filename = f"thumb-{item['id']}.jpg"
    thumb_path = os.path.join("assets", "img", "thumbnails", thumb_filename)
    thumb_src = preferred_img_for_thumb or preferred_pdf_for_thumb

    # Gera ou atualiza thumbnail otimizado para web se necessário
    needs_thumb = (not os.path.exists(thumb_path)) or (thumb_src and os.path.exists(thumb_src) and os.path.getmtime(thumb_src) > os.path.getmtime(thumb_path))
    if needs_thumb:
        if preferred_img_for_thumb and os.path.exists(preferred_img_for_thumb):
            with Image.open(preferred_img_for_thumb) as im:
                im_rgb = im.convert("RGB")
                im_rgb.thumbnail((1280, 1280), Image.Resampling.LANCZOS)
                im_rgb.save(thumb_path, "JPEG", quality=85, optimize=True)
                print(f"  Generated thumbnail from image -> {thumb_path}")
        elif preferred_pdf_for_thumb and os.path.exists(preferred_pdf_for_thumb):
            doc = pdfium.PdfDocument(preferred_pdf_for_thumb)
            page = doc[0]
            w_pt, h_pt = page.get_size()
            scale = 1280.0 / w_pt if w_pt > 0 else 0.537
            bm = page.render(scale=scale)
            pil_img = bm.to_pil().convert("RGB")
            pil_img.save(thumb_path, "JPEG", quality=85, optimize=True)
            print(f"  Generated thumbnail from PDF -> {thumb_path}")

    processed_items.append({
        "id": item["id"],
        "title": item["title"],
        "short_title": item["short_title"],
        "regional_id": item["regional_id"],
        "regional_name": item["regional_name"],
        "category": item["category"],
        "category_label": item["category_label"],
        "theme": item["theme"],
        "scale": item["scale"],
        "paper_size": item["paper_size"],
        "datum": item["datum"],
        "date": item["date"],
        "source_org": item["source_org"],
        "jurisdiction": item["jurisdiction"],
        "description": item["description"],
        "tags": item["tags"],
        "thumbnail": f"assets/img/thumbnails/{thumb_filename}",
        "downloads": downloads
    })

# Escrever assets/js/data.js com REGIONAL_OFFICES e MAPS_DATABASE
js_code = "/**\n * Repositório de Malhas Territoriais e Cartografia Temática\n * Núcleo de Geotecnologias (NGEO) — Instituto de Desenvolvimento Florestal e da Biodiversidade (IDEFLOR-Bio)\n * Governo do Estado do Pará\n */\n\n"
js_code += f"const REGIONAL_OFFICES = {json.dumps(REGIONAL_OFFICES, indent=2, ensure_ascii=False)};\n\n"
js_code += f"const MAPS_DATABASE = {json.dumps(processed_items, indent=2, ensure_ascii=False)};\n"

with open("assets/js/data.js", "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"SUCCESS: Generated assets/js/data.js with regional offices hierarchy and {len(processed_items)} maps.")
