/**
 * Repositório de Malhas Territoriais e Cartografia Temática Oficial
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
    "id": "grcn-2",
    "sigla": "GRCN-II",
    "name": "Gerência Regional Calha Norte II",
    "status": "active"
  },
  {
    "id": "grx",
    "sigla": "GRX",
    "name": "Gerência Regional Xingu",
    "status": "active"
  },
  {
    "id": "grcn-1",
    "sigla": "GRCN-I",
    "name": "Gerência Regional Calha Norte I",
    "status": "pending"
  },
  {
    "id": "grb",
    "sigla": "GRB",
    "name": "Gerência Regional Belém / Região Metropolitana",
    "status": "pending"
  },
  {
    "id": "grmr",
    "sigla": "GRMR",
    "name": "Gerência Regional Marajó",
    "status": "pending"
  },
  {
    "id": "gret",
    "sigla": "GRET",
    "name": "Gerência Regional Tocantins / Estrada de Ferro",
    "status": "pending"
  },
  {
    "id": "grba",
    "sigla": "GRBA",
    "name": "Gerência Regional Baixo Amazonas",
    "status": "pending"
  },
  {
    "id": "grt",
    "sigla": "GRT",
    "name": "Gerência Regional Tapajós",
    "status": "pending"
  },
  {
    "id": "gra",
    "sigla": "GRA",
    "name": "Gerência Regional Araguaia",
    "status": "pending"
  }
];

const MAPS_DATABASE = [
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
    "description": "Carta temática oficial em alta resolução abrangendo a totalidade das Unidades de Conservação sob administração estadual no Pará (APAs, ESECs, FLOTAs, MONAs, Parques Estaduais, REVIS, REBIOs e RDS). Apresenta os limites municipais, malha hidrográfica estadual e encartes detalhados com zoom na Região Metropolitana de Belém, Arquipélago do Marajó e Mosaicos Regionais.",
    "tags": [
      "Unidades de Conservação",
      "Pará",
      "Folha A1",
      "SIRGAS 2000",
      "IDEFLOR-Bio",
      "SEUC",
      "SNUC"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-estaduais-a1.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Resolução",
        "filename": "mapa-unidades-de-conservacao-estaduais-pa-a1.jpg",
        "url": "assets/downloads/mapa-unidades-de-conservacao-estaduais-pa-a1.jpg",
        "size": "5.0 MB",
        "bytes": 5203731,
        "extension": "JPG"
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
      "SIRGAS 2000",
      "IDEFLOR-Bio"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-estaduais-a4.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG Otimizada",
        "filename": "mapa-unidades-de-conservacao-estaduais-pa-a4.jpg",
        "url": "assets/downloads/mapa-unidades-de-conservacao-estaduais-pa-a4.jpg",
        "size": "1.2 MB",
        "bytes": 1293143,
        "extension": "JPG"
      }
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
    "source_org": "NGEO / DGMUC / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Mapeamento oficial integral das áreas sob jurisdição, monitoramento e fiscalização direta do IDEFLOR-Bio no Pará. Integra unidades de Uso Sustentável, Proteção Integral e perímetros prioritários para concessões florestais e restauração da biodiversidade.",
    "tags": [
      "IDEFLOR-Bio",
      "Gestão Territorial",
      "Folha A1",
      "SIRGAS 2000",
      "Amazônia"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-areas-ideflor-bio-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "mapa-areas-ideflor-bio-pa-a1.pdf",
        "url": "assets/downloads/mapa-areas-ideflor-bio-pa-a1.pdf",
        "size": "3.3 MB",
        "bytes": 3411475,
        "extension": "PDF"
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
    "source_org": "NGEO / IDEFLOR-Bio / ITERPA",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Mapeamento abrangente da malha fundiária estadual e federal em território paraense. Discrimina Terras Indígenas demarcadas e homologadas, Territórios Quilombolas titulados, Projetos de Assentamento da Reforma Agrária (PA, PAF, PDS), Glebas Públicas Estaduais e Federais e Imóveis Rurais.",
    "tags": [
      "Fundiário",
      "Terras Indígenas",
      "Quilombolas",
      "Glebas Públicas",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-categorias-fundiarias-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "mapa-categorias-fundiarias-pa-a1.pdf",
        "url": "assets/downloads/mapa-categorias-fundiarias-pa-a1.pdf",
        "size": "22.0 MB",
        "bytes": 23094193,
        "extension": "PDF"
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
    "description": "Balanço geoespacial oficial das áreas protegidas do Estado do Pará com dados quantitativos consolidados: Terras Indígenas (30.952.071 ha / 24,8%), UCs de Proteção Integral (13.763.504 ha / 11,0%), UCs de Uso Sustentável (19.102.263 ha / 15,3%) e Territórios Quilombolas (867.747 ha / 0,7%), totalizando mais de 51% do território estadual sob regime de salvaguarda.",
    "tags": [
      "Áreas Protegidas",
      "SNUC",
      "SEUC",
      "Conservação",
      "Biodiversidade",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-areas-protegidas-a1.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "mapa-areas-protegidas-pa-a1.pdf",
        "url": "assets/downloads/mapa-areas-protegidas-pa-a1.pdf",
        "size": "5.2 MB",
        "bytes": 5497218,
        "extension": "PDF"
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
    "source_org": "NGEO / DGMUC / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Espacialização de todas as Unidades de Conservação estaduais agrupadas por suas respectivas Gerências Regionais da DGMUC/IDEFLOR-Bio (Calha Norte I e II, Belém/Metropolitana, Marajó, Tocantins/Estrada de Ferro, Baixo Amazonas, Xingu, Tapajós e Araguaia).",
    "tags": [
      "Gerências Regionais",
      "Gestão Ambiental",
      "IDEFLOR-Bio",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-ucs-gerencia-regional.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "unidades-de-conservacao-estaduais-por-gerencia-regional.pdf",
        "url": "assets/downloads/unidades-de-conservacao-estaduais-por-gerencia-regional.pdf",
        "size": "14.6 MB",
        "bytes": 15286366,
        "extension": "PDF"
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
    "description": "Delimitação oficial das 12 Regiões de Integração do Estado do Pará adotadas na formulação do Plano Plurianual (PPA) e políticas setoriais: Araguaia, Baixo Amazonas, Carajás, Guajará, Guamá, Lago de Tucuruí, Marajó, Rio Caeté, Rio Capim, Tapajós, Tocantins e Xingu.",
    "tags": [
      "Regiões de Integração",
      "Planejamento Regional",
      "PPA",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-regioes-de-integracao.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "estado-do-para-regioes-de-integracao.pdf",
        "url": "assets/downloads/estado-do-para-regioes-de-integracao.pdf",
        "size": "7.5 MB",
        "bytes": 7875932,
        "extension": "PDF"
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
    "description": "Carta mestra do Macrozoneamento Ecológico-Econômico (ZEE) do Estado do Pará. Instrumento legal e técnico de ordenamento do território que estabelece diretrizes e zonas de consolidação produtiva, expansão ordenada e conservação dos recursos naturais.",
    "tags": [
      "ZEE",
      "Zoneamento",
      "Macro",
      "Sustentabilidade",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-macrozoneamento-zee.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem PNG em Alta Resolução (A1, 300 dpi)",
        "filename": "macrozoneamento-ecologico-economico-zee.png",
        "url": "assets/downloads/macrozoneamento-ecologico-economico-zee.png",
        "size": "7.6 MB",
        "bytes": 8012431,
        "extension": "PNG"
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
    "description": "Acervo cartográfico completo em alta fidelidade vetorial apresentando a totalidade das Unidades de Conservação federais, estaduais e municipais cadastradas no território paraense, com limites geodésicos oficiais e zonas de amortecimento.",
    "tags": [
      "Mosaico de UCs",
      "Federal e Estadual",
      "SNUC",
      "Biodiversidade",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-panorama-ucs-para.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "unidades-de-conservacao-no-estado-do-para.pdf",
        "url": "assets/downloads/unidades-de-conservacao-no-estado-do-para.pdf",
        "size": "41.0 MB",
        "bytes": 43022577,
        "extension": "PDF"
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
    "description": "Cartografia temática de alta precisão espacial delimitando as praias fluviais situadas no interior da UC REVIS Tabuleiro do Embaubal (Rio Xingu, município de Senador José Porfírio/PA). Essas faixas de praia são ecossistemas prioritários para a desova e monitoramento da Tartaruga-da-Amazônia e Tracajá.",
    "tags": [
      "Tabuleiro do Embaubal",
      "REVIS",
      "Rio Xingu",
      "Quelônios",
      "Praias Fluviais",
      "SIRGAS 2000",
      "Xingu"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-revis-tabuleiro-embaubal.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "revis-tabuleiro-do-embaubal-praias.jpg",
        "url": "assets/downloads/revis-tabuleiro-do-embaubal-praias.jpg",
        "size": "523 KB",
        "bytes": 535535,
        "extension": "JPG"
      }
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
    "paper_size": "A0 Cartográfico Oficial (841 × 1189 mm)",
    "datum": "SIRGAS 2000",
    "date": "2025/2026",
    "source_org": "NGEO / IDEFLOR-Bio",
    "jurisdiction": "Governo do Estado do Pará",
    "description": "Carta mestra em formato A0 abrangendo todo o megacorredor de conservação da Calha Norte do Rio Amazonas na porção oeste paraense. Consolida a ESEC Mamuru, Florestas Estaduais de Faro, Paru e Trombetas, e o Parque Estadual PAGAM.",
    "tags": [
      "Calha Norte II",
      "GRCN-II",
      "Folha A0",
      "Corredor Ecológico",
      "Manejo Florestal",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-mosaico-a0.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Plotter (A0)",
        "filename": "grcn-ii-mapeamento-unidades-de-conservacao-a0.pdf",
        "url": "assets/downloads/grcn-ii-mapeamento-unidades-de-conservacao-a0.pdf",
        "size": "7.9 MB",
        "bytes": 8243873,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Resolução",
        "filename": "grcn-ii-mapeamento-unidades-de-conservacao-a0.jpg",
        "url": "assets/downloads/grcn-ii-mapeamento-unidades-de-conservacao-a0.jpg",
        "size": "6.1 MB",
        "bytes": 6373621,
        "extension": "JPG"
      }
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
    "tags": [
      "Calha Norte II",
      "GRCN-II",
      "Síntese",
      "SIRGAS 2000",
      "IDEFLOR-Bio"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-sintese-ucs.jpg",
    "downloads": [
      {
        "key": "image",
        "label": "Imagem JPEG Otimizada",
        "filename": "grcn-ii-unidades-de-conservacao-sintese.jpg",
        "url": "assets/downloads/grcn-ii-unidades-de-conservacao-sintese.jpg",
        "size": "1.2 MB",
        "bytes": 1217042,
        "extension": "JPG"
      }
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
    "description": "Cartografia temática oficial da Estação Ecológica Mamuru (ESEC Mamuru), unidade de proteção integral destinada à salvaguarda da biodiversidade e à realização de pesquisas científicas.",
    "tags": [
      "Mamuru",
      "ESEC",
      "Proteção Integral",
      "Calha Norte II",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-esec-mamuru.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "grcn-ii-estacao-ecologica-mamuru.pdf",
        "url": "assets/downloads/grcn-ii-estacao-ecologica-mamuru.pdf",
        "size": "3.7 MB",
        "bytes": 3886239,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-estacao-ecologica-mamuru.jpg",
        "url": "assets/downloads/grcn-ii-estacao-ecologica-mamuru.jpg",
        "size": "848 KB",
        "bytes": 868177,
        "extension": "JPG"
      }
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
    "description": "Carta territorial da Floresta Estadual de Faro (FLOTA Faro), situada no oeste paraense na fronteira com o Estado do Amazonas. Delimita zonas de manejo florestal sustentável e proteção dos recursos hídricos.",
    "tags": [
      "FLOTA Faro",
      "Faro",
      "Uso Sustentável",
      "Concessão Florestal",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-faro.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "grcn-ii-floresta-estadual-de-faro.pdf",
        "url": "assets/downloads/grcn-ii-floresta-estadual-de-faro.pdf",
        "size": "4.0 MB",
        "bytes": 4180376,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-de-faro.jpg",
        "url": "assets/downloads/grcn-ii-floresta-estadual-de-faro.jpg",
        "size": "790 KB",
        "bytes": 808462,
        "extension": "JPG"
      }
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
    "tags": [
      "FLOTA Paru",
      "Castanhais",
      "Manejo Florestal Sustentável",
      "Calha Norte II",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-paru.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "grcn-ii-floresta-estadual-do-paru.pdf",
        "url": "assets/downloads/grcn-ii-floresta-estadual-do-paru.pdf",
        "size": "9.1 MB",
        "bytes": 9526999,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-do-paru.jpg",
        "url": "assets/downloads/grcn-ii-floresta-estadual-do-paru.jpg",
        "size": "984 KB",
        "bytes": 1008053,
        "extension": "JPG"
      }
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
    "description": "Carta territorial da Floresta Estadual do Trombetas (FLOTA Trombetas) na bacia do Rio Trombetas. Ilustra as áreas limítrofes a Terras Indígenas e corredores contíguos de conservação ambiental.",
    "tags": [
      "FLOTA Trombetas",
      "Rio Trombetas",
      "Uso Sustentável",
      "Calha Norte II",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-flota-trombetas.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "grcn-ii-floresta-estadual-do-trombetas.pdf",
        "url": "assets/downloads/grcn-ii-floresta-estadual-do-trombetas.pdf",
        "size": "5.6 MB",
        "bytes": 5904592,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-floresta-estadual-do-trombetas.jpg",
        "url": "assets/downloads/grcn-ii-floresta-estadual-do-trombetas.jpg",
        "size": "882 KB",
        "bytes": 903661,
        "extension": "JPG"
      }
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
    "description": "Cartografia oficial do Parque Estadual Ambiental das Árvores Gigantes da Amazônia (PAGAM). Unidade de conservação criada para salvaguardar os maiores espécimes arbóreos da América do Sul (*Dinizia excelsa* de até 88,5 metros de altura) entre os rios Jari e Cupixi.",
    "tags": [
      "PAGAM",
      "Árvores Gigantes",
      "Parque Estadual",
      "Angelim Vermelho",
      "Proteção Integral",
      "SIRGAS 2000"
    ],
    "thumbnail": "assets/img/thumbnails/thumb-grcn2-pagam.jpg",
    "downloads": [
      {
        "key": "pdf",
        "label": "Documento PDF Vetorial Oficial",
        "filename": "grcn-ii-parque-estadual-arvores-gigantes-pagam.pdf",
        "url": "assets/downloads/grcn-ii-parque-estadual-arvores-gigantes-pagam.pdf",
        "size": "2.0 MB",
        "bytes": 2085721,
        "extension": "PDF"
      },
      {
        "key": "image",
        "label": "Imagem JPEG de Alta Definição",
        "filename": "grcn-ii-parque-estadual-arvores-gigantes-pagam.jpg",
        "url": "assets/downloads/grcn-ii-parque-estadual-arvores-gigantes-pagam.jpg",
        "size": "689 KB",
        "bytes": 705217,
        "extension": "JPG"
      }
    ]
  }
];
