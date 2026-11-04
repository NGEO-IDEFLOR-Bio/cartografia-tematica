/**
 * Repositório de Malhas Territoriais e Cartografia Temática
 * Núcleo de Geotecnologias (NGEO) — Instituto de Desenvolvimento Florestal e da Biodiversidade (IDEFLOR-Bio)
 * Governo do Estado do Pará
 */

const REGIONAL_OFFICES = [
  {
    "id": "all",
    "sigla": "TODAS",
    "name": "Todas as Gerências Regionais / Geral Estadual",
    "status": "active"
  },
  {
    "id": "estadual",
    "sigla": "GERAL",
    "name": "Âmbito Estadual Geral (Pará)",
    "status": "active"
  },
  {
    "id": "grcn-1",
    "sigla": "GRCN-I",
    "name": "Gerência Regional da Calha Norte I",
    "status": "pending"
  },
  {
    "id": "grcn-2",
    "sigla": "GRCN-II",
    "name": "Gerência Regional da Calha Norte II",
    "status": "active"
  },
  {
    "id": "grcn-3",
    "sigla": "GRCN-III",
    "name": "Gerência Regional da Calha Norte III",
    "status": "pending"
  },
  {
    "id": "grb",
    "sigla": "GRB",
    "name": "Gerência Regional de Belém / Região Metropolitana",
    "status": "pending"
  },
  {
    "id": "grtuc",
    "sigla": "GRTUC",
    "name": "Gerência Regional de Tucuruí",
    "status": "pending"
  },
  {
    "id": "gra",
    "sigla": "GRA",
    "name": "Gerência Regional do Araguaia",
    "status": "active"
  },
  {
    "id": "grm",
    "sigla": "GRM",
    "name": "Gerência Regional do Marajó",
    "status": "pending"
  },
  {
    "id": "grne",
    "sigla": "GRNE",
    "name": "Gerência Regional do Nordeste",
    "status": "pending"
  },
  {
    "id": "grx",
    "sigla": "GRX",
    "name": "Gerência Regional do Xingu",
    "status": "active"
  }
];

const MAPS_DATABASE = [
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
    "tags": [
      "IDEFLOR-Bio",
      "Gestão Territorial",
      "Folha A1",
      "Amazônia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-areas-ideflor-bio-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "mapa-areas-ideflor-bio-pa-a1.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1EJ3yJY3nWL2xjB_gg9F0783OMYUD3UzQ",
        "size": "3.3 MB",
        "bytes": 3411475,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "Fundiário",
      "Terras Indígenas",
      "Quilombolas",
      "Glebas Públicas"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-categorias-fundiarias-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "mapa-categorias-fundiarias-pa-a1.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1hZ1jj-H95X5L6lqipq0HmVblEegY3TY7",
        "size": "22.0 MB",
        "bytes": 23094193,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "Áreas Protegidas",
      "SNUC",
      "SEUC",
      "Conservação",
      "Biodiversidade"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-areas-protegidas-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "mapa-areas-protegidas-pa-a1.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1dfiXEY-vURnKsoqOnDSE_1OdrOHZe3O9",
        "size": "5.2 MB",
        "bytes": 5497218,
        "extension": "PDF",
        "hosted": "drive"
      }
    ]
  },
  {
    "id": "quelonios-ucs-estaduais-a3",
    "title": "Quelônios em Unidades de Conservação Estaduais do Pará — Infográfico",
    "short_title": "Quelônios nas UCs Estaduais do Pará",
    "regional_id": "estadual",
    "regional_name": "Âmbito Estadual Geral",
    "category": "gestao",
    "category_label": "Áreas Protegidas e Gestão",
    "theme": "Biodiversidade e Fauna das UCs Estaduais",
    "scale": "1:7.500.000",
    "paper_size": "A3 (420 × 297 mm)",
    "datum": "SIRGAS 2000",
    "date": "Novembro de 2026",
    "source_org": "NGEO / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Infográfico das espécies de quelônios registradas em nove Unidades de Conservação estaduais sob gestão do IDEFLOR-Bio, separando o ambiente de água doce (Flota de Faro, PE Charapucu, APA Paytuna, REVIS Tabuleiro do Embaubal, APA do Lago de Tucuruí e APA de São Geraldo do Araguaia) do ambiente marinho (APA do Marajó, APA de Algodoal-Maiandeua e MONA Atalaia). Reúne 12 espécies — entre elas tartaruga-da-amazônia, tracajá, muçuã e as cinco tartarugas marinhas — com as unidades de ocorrência de cada uma.",
    "tags": [
      "Quelônios",
      "Tartaruga-da-Amazônia",
      "Tracajá",
      "Tartaruga-marinha",
      "Biodiversidade",
      "Unidades de Conservação",
      "Infográfico",
      "Folha A3"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-quelonios-ucs-estaduais-a3.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial (A3)",
        "filename": "quelonios-ucs-estaduais-a3.pdf",
        "url": "https://drive.google.com/uc?export=download&id=19ak_NvFsZY_ESwHbA7R8LGopy0HxpV2c",
        "size": "3.5 MB",
        "bytes": 3661888,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "Gerências Regionais",
      "Gestão Ambiental",
      "IDEFLOR-Bio"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-gerencia-regional.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "unidades-de-conservacao-estaduais-por-gerencia-regional.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Vca1jMVoxcXyUAnu0v8U9lfDexSO0zcx",
        "size": "14.6 MB",
        "bytes": 15284440,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "Regiões de Integração",
      "Planejamento Regional",
      "PPA"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-regioes-de-integracao.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "estado-do-para-regioes-de-integracao.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1NYGEexgkve5IuSShka18OFV67bfqQx0H",
        "size": "14.6 MB",
        "bytes": 15305318,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "ZEE",
      "Zoneamento",
      "Macro",
      "Sustentabilidade"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-macrozoneamento-zee.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem PNG (A1, 300 dpi)",
        "filename": "macrozoneamento-ecologico-economico-zee.png",
        "url": "https://drive.google.com/uc?export=download&id=1PZWVpRxIExvOVciE_d3OUWNaiCtnVvV3",
        "size": "7.6 MB",
        "bytes": 8012431,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "Mosaico de UCs",
      "Federal e Estadual",
      "SNUC",
      "Biodiversidade"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-panorama-ucs-para.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "unidades-de-conservacao-no-estado-do-para.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1u_Rnwk3JtZ56D9lXVKquDlj7KvftmNI3",
        "size": "41.0 MB",
        "bytes": 43022577,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "Unidades de Conservação",
      "Pará",
      "Folha A1",
      "IDEFLOR-Bio",
      "SEUC",
      "SNUC"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-estaduais-a1.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG",
        "filename": "mapa-unidades-de-conservacao-estaduais-pa-a1.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1DEsMzQIXLqP5xqRuOlfxkBgL-9NjzpgW",
        "size": "5.0 MB",
        "bytes": 5203731,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Unidades de Conservação",
      "Folha A4",
      "Executivo",
      "IDEFLOR-Bio"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-estaduais-a4.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG Otimizada",
        "filename": "mapa-unidades-de-conservacao-estaduais-pa-a4.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1r7H92CCWhFShdn7IMjn7XFjj1JdvJLCj",
        "size": "1.2 MB",
        "bytes": 1293143,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Tabuleiro do Embaubal",
      "REVIS",
      "Rio Xingu",
      "Quelônios",
      "Praias Fluviais",
      "Xingu"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-revis-tabuleiro-embaubal.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "revis-tabuleiro-do-embaubal-praias.jpg",
        "url": "https://drive.google.com/uc?export=download&id=15QFge6sC2i9wew3939Z6GkHopP2EJAmo",
        "size": "523 KB",
        "bytes": 535535,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Calha Norte II",
      "GRCN-II",
      "Folha A0",
      "Corredor Ecológico",
      "Manejo Florestal"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-mosaico-a0.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A0)",
        "filename": "grcn-ii-mapeamento-unidades-de-conservacao-a0.pdf",
        "url": "https://drive.google.com/uc?export=download&id=157_cau2SEaMlw0j-Vigbg3zIIJD8oXMM",
        "size": "7.9 MB",
        "bytes": 8243873,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG",
        "filename": "grcn-ii-mapeamento-unidades-de-conservacao-a0.jpg",
        "url": "https://drive.google.com/uc?export=download&id=10dz0vxK1cqsgmMy-Mk6sU-uJ9lBJn3Ac",
        "size": "6.1 MB",
        "bytes": 6373621,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Calha Norte II",
      "GRCN-II",
      "Síntese",
      "IDEFLOR-Bio"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-sintese-ucs.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG Otimizada",
        "filename": "grcn-ii-unidades-de-conservacao-sintese.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1UiEhqp1gogkcAq6ODsbVagOw9JhZPHcB",
        "size": "1.2 MB",
        "bytes": 1217042,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Mamuru",
      "ESEC",
      "Proteção Integral",
      "Calha Norte II"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-esec-mamuru.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "grcn-ii-estacao-ecologica-mamuru.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Wfzxmi7z7o1G8azua__ziBNVdhoYr2Ms",
        "size": "3.7 MB",
        "bytes": 3886239,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-estacao-ecologica-mamuru.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1BaGTvka6fPnoYaeaPzYiLKN0iBcx6Xzv",
        "size": "848 KB",
        "bytes": 868177,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "FLOTA Faro",
      "Faro",
      "Uso Sustentável",
      "Concessão Florestal"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-faro.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "grcn-ii-floresta-estadual-de-faro.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1vtN5ayi5rcDkmzIcsBVPLn0lIz0qQOMh",
        "size": "4.0 MB",
        "bytes": 4180376,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-de-faro.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1h4MQwiKsCCW6zBWWmOPFW1XoKR2qE4e3",
        "size": "790 KB",
        "bytes": 808462,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "FLOTA Paru",
      "Castanhais",
      "Manejo Florestal Sustentável",
      "Calha Norte II"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-paru.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "grcn-ii-floresta-estadual-do-paru.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1QTc7jtM4qX_JEEgU5G2a2BTtjEOEQ6Sg",
        "size": "9.1 MB",
        "bytes": 9526999,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-do-paru.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1xD8-jbEcVtJstNXMto18t1ahvym_nQtm",
        "size": "984 KB",
        "bytes": 1008053,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "FLOTA Trombetas",
      "Rio Trombetas",
      "Uso Sustentável",
      "Calha Norte II"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-trombetas.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "grcn-ii-floresta-estadual-do-trombetas.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1mAxKTkN8DaNh7Bo0qTsvCsPYAsERht6n",
        "size": "5.6 MB",
        "bytes": 5904592,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-do-trombetas.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1wrJIAKpkCdhVUREHfBymJQ3EQSw5R9yA",
        "size": "882 KB",
        "bytes": 903661,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "PAGAM",
      "Árvores Gigantes",
      "Parque Estadual",
      "Angelim Vermelho",
      "Proteção Integral"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-pagam.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial",
        "filename": "grcn-ii-parque-estadual-arvores-gigantes-pagam.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1WIdrFTGRNgEU8PKoF8OwGr4oa187HSIj",
        "size": "2.0 MB",
        "bytes": 2085721,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-parque-estadual-arvores-gigantes-pagam.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1O0LrlleuCoPWrmAPbf4WMDE0IsXSvwoz",
        "size": "689 KB",
        "bytes": 705217,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Tabuleiro do Embaubal",
      "Vitória de Souzel",
      "REVIS",
      "RDS",
      "Xingu",
      "Senador José Porfírio",
      "Folha A1",
      "Limites Territoriais",
      "Proteção Integral",
      "Uso Sustentável"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-limites.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-01-limites-territoriais-ucs.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1-gcbANZDLUC4Hh-W4a3Z5FcNLlI4x5g6",
        "size": "6.8 MB",
        "bytes": 7081909,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-01-limites-territoriais-ucs.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1nRKHb6FV0GpRk1BcK8h0nQzESP_HKYX_",
        "size": "994 KB",
        "bytes": 1018080,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Gestão Territorial",
      "Infraestrutura Operacional",
      "Acessos Fluviais",
      "Bases de Monitoramento",
      "Xingu",
      "REVIS",
      "RDS",
      "Pressões Ambientais"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-gestao.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-02-gestao-infraestrutura-acessos.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1H4BZLixwYrDSkJn8Fv-5fPwFuCHWxHu2",
        "size": "7.4 MB",
        "bytes": 7806096,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-02-gestao-infraestrutura-acessos.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1sBPlmi6bHkc1JVl1M9OJMzEwi3Oc_R9c",
        "size": "1.0 MB",
        "bytes": 1094634,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Biodiversidade",
      "Quelônios",
      "Tartaruga-da-Amazônia",
      "Tracajá",
      "Áreas de Desova",
      "Ictiofauna",
      "Curimatã",
      "Árvores Matrizes",
      "Rio Xingu"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-biodiversidade.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-03-biodiversidade-protecao-ambiental.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1saUCN5pi8bmGDvKILj9IpppJpKA1ZuQJ",
        "size": "14.5 MB",
        "bytes": 15219440,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-03-biodiversidade-protecao-ambiental.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1ogdKcP8fskRzUxha8hJp3is6kaammaLb",
        "size": "1017 KB",
        "bytes": 1041321,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Comunidades Tradicionais",
      "Ribeirinhos",
      "Pesca Artesanal",
      "Ranchos Pesqueiros",
      "RDS Vitória de Souzel",
      "Uso Sustentável",
      "Gestão Participativa"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-comunidades.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-04-comunidades-uso-tradicional.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1lsM2jKCbDVscySwzSXoIHKIMeT8jm1jX",
        "size": "12.9 MB",
        "bytes": 13532827,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-04-comunidades-uso-tradicional.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1JzjJo513FtRt4lGCylnbD6U3XhoFJj-T",
        "size": "1.0 MB",
        "bytes": 1061444,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Hidrografia",
      "Rio Xingu",
      "Ilhas Fluviais",
      "Praias Fluviais",
      "Tabuleiros Arenosos",
      "Igarapés",
      "Furos",
      "Toponímia",
      "Navegação"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-hidrografia.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-05-quadro-hidrografico-referencias.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1-cqCXO2cNS4mPotM_2XmKKj4mJUB-6BB",
        "size": "7.8 MB",
        "bytes": 8224990,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-05-quadro-hidrografico-referencias.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1Z9Re564y-9nJ2npVXNN1ECMlX8f4aLOS",
        "size": "1.1 MB",
        "bytes": 1155525,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cobertura do Solo",
      "MapBiomas",
      "Uso da Terra",
      "Floresta Alagável",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "1985",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cobertura-solo-1985.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1985.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1fNRTBbXF8ytJIFNX3QjbUWrTTouLNtOA",
        "size": "6.5 MB",
        "bytes": 6794824,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1985.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1yaTPGxnFVF3faBz0IYapKV-q9nhUkCk-",
        "size": "1.0 MB",
        "bytes": 1081041,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cobertura do Solo",
      "MapBiomas",
      "Uso da Terra",
      "Floresta Alagável",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "1995",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cobertura-solo-1995.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1995.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1g0PJ8qTCRp8TnoeCWNItWsFYBkgfUtmF",
        "size": "6.5 MB",
        "bytes": 6794734,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-1995.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1u0kPg6ubeV9PGqZ_MdGrUlkNxlvICYgH",
        "size": "1.0 MB",
        "bytes": 1085193,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cobertura do Solo",
      "MapBiomas",
      "Uso da Terra",
      "Floresta Alagável",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "2005",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cobertura-solo-2005.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2005.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Po-QIuD3QG5y9O6cOTVJlEGAi18fs50c",
        "size": "6.5 MB",
        "bytes": 6794512,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2005.jpg",
        "url": "https://drive.google.com/uc?export=download&id=104_2dZTVVg69SlCmdTpuLlrlhuB_naR9",
        "size": "1.0 MB",
        "bytes": 1085319,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cobertura do Solo",
      "MapBiomas",
      "Uso da Terra",
      "Floresta Alagável",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "2015",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cobertura-solo-2015.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2015.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1-y2p8wv551TYRxf_itrgzZmmpzXC62_C",
        "size": "6.5 MB",
        "bytes": 6794981,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2015.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1siIKschEOLln6Y-riU0BiP--wBQ4E2VG",
        "size": "1.0 MB",
        "bytes": 1085673,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cobertura do Solo",
      "MapBiomas",
      "Uso da Terra",
      "Floresta Alagável",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "2024",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cobertura-solo-2024.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1FZeUYPBP5-zvdch3r7xgJ5rohD9-gU4O",
        "size": "6.5 MB",
        "bytes": 6795076,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-06-cobertura-solo-2024.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1cR4uXJwDi6pxw4o7ysB-nin3kNGN6fsz",
        "size": "1.0 MB",
        "bytes": 1084595,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cicatrizes de Fogo",
      "Queimadas",
      "Incêndios Florestais",
      "MapBiomas Fogo",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "1985-1994",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cicatrizes-fogo-1985-1994.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1985-1994.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1OyddTz-GdvBZ59IXfLlMuShhgz1duULC",
        "size": "3.9 MB",
        "bytes": 4130109,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1985-1994.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1qb-3bnjmIl39kXXm2rlmeQn6XlxFN7eh",
        "size": "929 KB",
        "bytes": 950885,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cicatrizes de Fogo",
      "Queimadas",
      "Incêndios Florestais",
      "MapBiomas Fogo",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "1995-2004",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cicatrizes-fogo-1995-2004.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1995-2004.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1fV6Iukt5VF3heyyLNzA-t6YC4-K3Sz9D",
        "size": "3.9 MB",
        "bytes": 4128371,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-1995-2004.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1yzGXG1ZTrNsmGYb7yRM_XqiNfroQRNS0",
        "size": "862 KB",
        "bytes": 883138,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cicatrizes de Fogo",
      "Queimadas",
      "Incêndios Florestais",
      "MapBiomas Fogo",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "2005-2014",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cicatrizes-fogo-2005-2014.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2005-2014.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1hR3G4ejf09jNsuvhqmkQGUqUkF1-cRtq",
        "size": "3.9 MB",
        "bytes": 4080497,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2005-2014.jpg",
        "url": "https://drive.google.com/uc?export=download&id=100dqLl1t-kcF6hp41qEGiLAdxB0tPQt1",
        "size": "811 KB",
        "bytes": 830966,
        "extension": "JPG",
        "hosted": "drive"
      }
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
    "tags": [
      "Cicatrizes de Fogo",
      "Queimadas",
      "Incêndios Florestais",
      "MapBiomas Fogo",
      "Xingu",
      "REVIS Tabuleiro do Embaubal",
      "RDS Vitória de Souzel",
      "Série Histórica",
      "2015-2024",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-souzel-cicatrizes-fogo-2015-2024.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A1)",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2015-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1YB9qaWrF-UPNCGJLKQkHL4nXWN5aEsyi",
        "size": "4.0 MB",
        "bytes": 4160220,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grx-tabuleiro-embaubal-vitoria-souzel-07-cicatrizes-fogo-2015-2024.jpg",
        "url": "https://drive.google.com/uc?export=download&id=1KXZ8BGcFbQZsENgv0b1nDte7hDFV9U6j",
        "size": "924 KB",
        "bytes": 946537,
        "extension": "JPG",
        "hosted": "drive"
      }
    ]
  },
  {
    "id": "grx-tabuleiro-embaubal-mapeamento",
    "title": "Mapeamento Temático da REVIS Tabuleiro do Embaubal — 14 Folhas",
    "short_title": "Tabuleiro do Embaubal (Mapeamento por Unidade)",
    "regional_id": "grx",
    "regional_name": "Gerência Regional Xingu",
    "category": "ucs",
    "category_label": "Unidades de Conservação Estaduais",
    "theme": "Mapeamento Temático por Unidade de Conservação",
    "scale": "1:60.000",
    "paper_size": "A1 (594 × 841 mm)",
    "datum": "SIRGAS 2000",
    "date": "Outubro de 2026",
    "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Série completa em 14 folhas do mapeamento temático da REVIS Tabuleiro do Embaubal (município de Senador José Porfírio/PA), recortada por unidade de conservação: limites territoriais e UCs, gestão e acessos, biodiversidade, comunidades e uso tradicional, quadro hidrográfico, cobertura do solo (1985–2024) e cicatrizes de fogo (1985–2024).",
    "tags": [
      "Tabuleiro do Embaubal",
      "REVIS",
      "Rio Xingu",
      "Senador José Porfírio",
      "MapBiomas",
      "Cobertura do Solo",
      "Cicatrizes de Fogo",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-tabuleiro-embaubal-mapeamento.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "01 — Limites Territoriais e UCs Estaduais",
        "filename": "grx-tabuleiro-embaubal-01-limites-territoriais-ucs.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1aLxzEqmHMVkvsZL1vAPIljha93Nm9dvq",
        "size": "3.7 MB",
        "bytes": 3870733,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "02 — Gestão Territorial, Infraestrutura e Acessos",
        "filename": "grx-tabuleiro-embaubal-02-gestao-infraestrutura-acessos.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1bY-pgSLRV_rEwCtPrJKk8YjkxU4kVuX3",
        "size": "3.9 MB",
        "bytes": 4105546,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "03 — Biodiversidade e Proteção Ambiental",
        "filename": "grx-tabuleiro-embaubal-03-biodiversidade-protecao-ambiental.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1yyYsQ2BKAQRdCA7YTXmwDKEPpBaEJ79F",
        "size": "7.6 MB",
        "bytes": 7924270,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "04 — Comunidades e Uso Tradicional",
        "filename": "grx-tabuleiro-embaubal-04-comunidades-uso-tradicional.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1C83bGuCommLpnGGuBLr_ANJ4INWkv5tG",
        "size": "5.0 MB",
        "bytes": 5207508,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "05 — Quadro Hidrográfico e Referências Locais",
        "filename": "grx-tabuleiro-embaubal-05-quadro-hidrografico-referencias.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Mc0vBuAILsVAwpyZJQE5ftx_Xipv_kcC",
        "size": "4.2 MB",
        "bytes": 4392256,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (1985)",
        "filename": "grx-tabuleiro-embaubal-06-cobertura-solo-1985.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1FtIM-135Q9a1Ppkg6nyV5wPqIzTUIoey",
        "size": "4.4 MB",
        "bytes": 4641047,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (1995)",
        "filename": "grx-tabuleiro-embaubal-06-cobertura-solo-1995.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1jQnY4XY8QaxiceolqQBsAAPb4BtJFtKV",
        "size": "4.4 MB",
        "bytes": 4640337,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2005)",
        "filename": "grx-tabuleiro-embaubal-06-cobertura-solo-2005.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1ZLN_ufHg0YuN0CYXAWu0lAOmX7PLKx8H",
        "size": "4.4 MB",
        "bytes": 4640147,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2015)",
        "filename": "grx-tabuleiro-embaubal-06-cobertura-solo-2015.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1nWq004ZpcIZbyUuWdAGuIY_ONyXCf3mg",
        "size": "4.4 MB",
        "bytes": 4640298,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2024)",
        "filename": "grx-tabuleiro-embaubal-06-cobertura-solo-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1JeODwm6L09wSucoEFdXsvVAGWggFFxi4",
        "size": "4.4 MB",
        "bytes": 4640718,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (1985–1994)",
        "filename": "grx-tabuleiro-embaubal-07-cicatrizes-fogo-1985-1994.pdf",
        "url": "https://drive.google.com/uc?export=download&id=121U72v0-kg_OHzMjqcM68e42Zk43nNnr",
        "size": "3.0 MB",
        "bytes": 3182091,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (1995–2004)",
        "filename": "grx-tabuleiro-embaubal-07-cicatrizes-fogo-1995-2004.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1WUhFeJjJMccQmB_gVZbHdCiGKTHk74VY",
        "size": "3.0 MB",
        "bytes": 3156858,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (2005–2014)",
        "filename": "grx-tabuleiro-embaubal-07-cicatrizes-fogo-2005-2014.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1UMnR26rkxI9_B_aoUQ4t5XGM2re5sgbQ",
        "size": "3.0 MB",
        "bytes": 3153264,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (2015–2024)",
        "filename": "grx-tabuleiro-embaubal-07-cicatrizes-fogo-2015-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1xJRufdcne4x04OCimPDSFBjwnvVPXSxk",
        "size": "3.0 MB",
        "bytes": 3168047,
        "extension": "PDF",
        "hosted": "drive"
      }
    ]
  },
  {
    "id": "grx-vitoria-souzel-mapeamento",
    "title": "Mapeamento Temático da RDS Vitória de Souzel — 14 Folhas",
    "short_title": "Vitória de Souzel (Mapeamento por Unidade)",
    "regional_id": "grx",
    "regional_name": "Gerência Regional Xingu",
    "category": "ucs",
    "category_label": "Unidades de Conservação Estaduais",
    "theme": "Mapeamento Temático por Unidade de Conservação",
    "scale": "1:60.000",
    "paper_size": "A1 (594 × 841 mm)",
    "datum": "SIRGAS 2000",
    "date": "Outubro de 2026",
    "source_org": "Núcleo de Geotecnologias — NGEO / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Série completa em 14 folhas do mapeamento temático da RDS Vitória de Souzel (município de Vitória do Xingu/PA), recortada por unidade de conservação: limites territoriais e UCs, gestão e acessos, biodiversidade, comunidades e uso tradicional, quadro hidrográfico, cobertura do solo (1985–2024) e cicatrizes de fogo (1985–2024).",
    "tags": [
      "Vitória de Souzel",
      "RDS",
      "Rio Xingu",
      "Vitória do Xingu",
      "MapBiomas",
      "Cobertura do Solo",
      "Cicatrizes de Fogo",
      "Folha A1"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grx-vitoria-souzel-mapeamento.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "01 — Limites Territoriais e UCs Estaduais",
        "filename": "grx-vitoria-souzel-01-limites-territoriais-ucs.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1XuMKrAtAdFtoQWaGW1Bp1jT5xq1eD0xm",
        "size": "5.9 MB",
        "bytes": 6212707,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "02 — Gestão Territorial, Infraestrutura e Acessos",
        "filename": "grx-vitoria-souzel-02-gestao-infraestrutura-acessos.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1k93wXUUAb3OhPPRWPpY5VlW4eV68OG6W",
        "size": "6.6 MB",
        "bytes": 6940834,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "03 — Biodiversidade e Proteção Ambiental",
        "filename": "grx-vitoria-souzel-03-biodiversidade-protecao-ambiental.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1rqgAY9n-5TlYCZIL7bsZwQy1T22swyGe",
        "size": "13.7 MB",
        "bytes": 14350201,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "04 — Comunidades e Uso Tradicional",
        "filename": "grx-vitoria-souzel-04-comunidades-uso-tradicional.pdf",
        "url": "https://drive.google.com/uc?export=download&id=12Qq7T-I-D-r8VyDPjpZaOo5nGe_Dd0s_",
        "size": "12.1 MB",
        "bytes": 12664046,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "05 — Quadro Hidrográfico e Referências Locais",
        "filename": "grx-vitoria-souzel-05-quadro-hidrografico-referencias.pdf",
        "url": "https://drive.google.com/uc?export=download&id=13XkI_vITl1CuvVkJEL4Zm2NmDxTrWWvs",
        "size": "7.0 MB",
        "bytes": 7337347,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (1985)",
        "filename": "grx-vitoria-souzel-06-cobertura-solo-1985.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1MioGncS2XsRi3t5VFkWX2o1yF_1daiBd",
        "size": "5.7 MB",
        "bytes": 5936350,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (1995)",
        "filename": "grx-vitoria-souzel-06-cobertura-solo-1995.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1AnZnpqZNRAcsUOFnrY3kyycj7Q5TyzFu",
        "size": "5.7 MB",
        "bytes": 5936644,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2005)",
        "filename": "grx-vitoria-souzel-06-cobertura-solo-2005.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1EoAcaSTwAxwaetRwEd_OLOSXaP6Z251R",
        "size": "5.7 MB",
        "bytes": 5936163,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2015)",
        "filename": "grx-vitoria-souzel-06-cobertura-solo-2015.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Tt8_KXN_r7rx_eQ-6w2PTuKkqtPDnUYe",
        "size": "5.7 MB",
        "bytes": 5936579,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "06 — Cobertura do Solo (2024)",
        "filename": "grx-vitoria-souzel-06-cobertura-solo-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1saKPhKcJoPGOqoNdOOfRWitAuyaJ9r-5",
        "size": "5.7 MB",
        "bytes": 5936834,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (1985–1994)",
        "filename": "grx-vitoria-souzel-07-cicatrizes-fogo-1985-1994.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1eCeS9oh0YXreVMhShlYNmjwUWIedtd7C",
        "size": "3.1 MB",
        "bytes": 3281999,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (1995–2004)",
        "filename": "grx-vitoria-souzel-07-cicatrizes-fogo-1995-2004.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1DR086tcRkia6prQsbHAKfT2byacl74Ii",
        "size": "3.1 MB",
        "bytes": 3280533,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (2005–2014)",
        "filename": "grx-vitoria-souzel-07-cicatrizes-fogo-2005-2014.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1kBiC9lKQFReGYdbks4muZFXLEzJupjpk",
        "size": "3.1 MB",
        "bytes": 3233180,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "pdf",
        "label": "07 — Cicatrizes de Fogo (2015–2024)",
        "filename": "grx-vitoria-souzel-07-cicatrizes-fogo-2015-2024.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1w-5POTFbFxl9GRXn85Q-oE_bXibpA2aZ",
        "size": "3.1 MB",
        "bytes": 3296244,
        "extension": "PDF",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Serra dos Martírios",
      "Andorinhas",
      "São Geraldo do Araguaia",
      "Elevação",
      "Hipsometria",
      "Relevo",
      "Folha A4",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-elevacao.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-mapa-elevacao-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=16mQHtYag3rbiNZLjV094l8IDoNlKwF-k",
        "size": "832 KB",
        "bytes": 852033,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-mapa-elevacao-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1l_eDV7TbDer3vn3D1AdfNK4mMxWUVXyZ",
        "size": "1.8 MB",
        "bytes": 1857942,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Geologia",
      "Tempo Geológico",
      "Estratigrafia",
      "Proterozoico",
      "Paleozoico",
      "Cenozoico",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-geologia-tempo.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-geologia-tempo-geologico-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1kUdT-0RsQWvKxCO-eqMYwSv-BqVV4_sl",
        "size": "669 KB",
        "bytes": 685092,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-geologia-tempo-geologico-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1wtzs4QXl_ycPykdHrAYM8PemrLqu1TqU",
        "size": "1.0 MB",
        "bytes": 1080897,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Geologia",
      "Subprovíncias",
      "Faixa Araguaia-Tocantins",
      "Bacia do Parnaíba",
      "Tectônica",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-geologia-subprovincias.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-geologia-subprovincias-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1_NmvOnkFlty0QBeoqw4zaj6kUfxTml1Y",
        "size": "616 KB",
        "bytes": 630407,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-geologia-subprovincias-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1t5JaMCv1KUZT5KbXoBOkAIW3UL9eEDRL",
        "size": "958 KB",
        "bytes": 980922,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Geomorfologia",
      "Relevo",
      "Serras",
      "Platôs",
      "Patamares",
      "Planícies",
      "Depressões",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-geomorfologia.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-geomorfologia-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=12NR2AMJNxXyRjk_vRajALdGCw24Wos20",
        "size": "611 KB",
        "bytes": 625864,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-geomorfologia-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1FmB_wJpPuzBl4PctrATpywGsN5M7xePz",
        "size": "890 KB",
        "bytes": 911380,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "CPAs",
      "Cotas de Proteção",
      "Zonamento",
      "Gestão Ambiental",
      "Plano de Manejo",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-cpas-cotas.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-localizacao-cpas-cotas-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1Rbnd7q0tCcWzIRMSbCntErlUvCaaiC2Z",
        "size": "748 KB",
        "bytes": 765472,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-localizacao-cpas-cotas-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1SDY-A7hL8924s2yH9NOj4mnfENQmARxp",
        "size": "1.1 MB",
        "bytes": 1129697,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Pedologia",
      "Solos",
      "Neossolos Litólicos",
      "Argissolos",
      "Latossolos",
      "Gleissolos",
      "SiBCS",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-pedologia.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-pedologia-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1vantUrU8LNXI08w5roZO42Okr-3ogtE-",
        "size": "602 KB",
        "bytes": 616863,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-pedologia-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1AnggFBARS8fQ7l8oqtxoFzxWe-MnHhHA",
        "size": "921 KB",
        "bytes": 943542,
        "extension": "PNG",
        "hosted": "drive"
      }
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
    "tags": [
      "PESAM",
      "Vegetação",
      "Fitofisionomias",
      "Floresta Ombrófila",
      "Savana",
      "Cerrado Rupestre",
      "Biodiversidade",
      "Botânica",
      "Araguaia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-gra-pesam-vegetacao.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF de Alta Resolução (A4)",
        "filename": "gra-pesam-vegetacao-a4.pdf",
        "url": "https://drive.google.com/uc?export=download&id=1cZb6gT4D5-rSFCSC9bpw5i6SOrYgcQDa",
        "size": "621 KB",
        "bytes": 635497,
        "extension": "PDF",
        "hosted": "drive"
      },
      {
        "key": "image",
        "label": "Imagem PNG (A4, 300 dpi)",
        "filename": "gra-pesam-vegetacao-a4.png",
        "url": "https://drive.google.com/uc?export=download&id=1NPankZaK4zdfH3gizhOkx0OkEWob1lUL",
        "size": "957 KB",
        "bytes": 979770,
        "extension": "PNG",
        "hosted": "drive"
      }
    ]
  }
];
