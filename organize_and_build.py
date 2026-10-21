import os
import sys
import json
import shutil
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
import pdfplumber

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
    {"id": "grcn-2", "sigla": "GRCN-II", "name": "Gerência Regional da Calha Norte II", "status": "active"},
    {"id": "grx", "sigla": "GRX", "name": "Gerência Regional do Xingu", "status": "active"},
    {"id": "grcn-1", "sigla": "GRCN-I", "name": "Gerência Regional da Calha Norte I", "status": "pending"},
    {"id": "grcn-3", "sigla": "GRCN-III", "name": "Gerência Regional da Calha Norte III", "status": "pending"},
    {"id": "grb", "sigla": "GRB", "name": "Gerência Regional de Belém / Região Metropolitana", "status": "pending"},
    {"id": "grtuc", "sigla": "GRTUC", "name": "Gerência Regional de Tucuruí", "status": "pending"},
    {"id": "gra", "sigla": "GRA", "name": "Gerência Regional do Araguaia", "status": "pending"},
    {"id": "grm", "sigla": "GRM", "name": "Gerência Regional do Marajó", "status": "pending"},
    {"id": "grne", "sigla": "GRNE", "name": "Gerência Regional do Nordeste", "status": "pending"}
]

items_config = [
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
        "category": "calha-norte",
        "category_label": "Gerência Regional Calha Norte II",
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
    }
]

processed_items = []

for item in items_config:
    downloads = []
    preferred_img_for_thumb = None
    preferred_pdf_for_thumb = None

    for spec in item["downloads_spec"]:
        dest_file = os.path.join("assets", "downloads", spec["dest"])
        
        # Se o download já existe em assets/downloads, apenas reutiliza
        if not os.path.exists(dest_file):
            src_file = find_file_by_query(spec["dirs"], spec["keywords"], spec["ext"])
            if src_file:
                shutil.copy2(src_file, dest_file)
                print(f"  Copied {src_file} -> {dest_file}")
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

print("SUCCESS: Generated assets/js/data.js with regional offices hierarchy and 17 maps.")
