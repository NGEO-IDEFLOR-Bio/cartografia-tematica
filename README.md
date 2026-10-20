# Repositório de Malhas Territoriais e Cartografia Temática Oficial

**Instituto de Desenvolvimento Florestal e da Biodiversidade do Estado do Pará (IDEFLOR-Bio)**  
**Diretoria de Gestão e Desenvolvimento de Unidades de Conservação (DGMUC)**  
**Núcleo de Geotecnologias (NGEO)**  

---

## 1. Descrição do Repositório

O presente repositório constitui o catálogo digital oficial de malhas territoriais, cartas temáticas e produtos cartográficos elaborados pelo Núcleo de Geotecnologias (NGEO) do Instituto de Desenvolvimento Florestal e da Biodiversidade do Estado do Pará (IDEFLOR-Bio). 

A infraestrutura foi concebida sob padrões de dados abertos governamentais para fornecer acesso público, padronizado e rastreável às bases cartográficas que subsidiam o planejamento territorial, a gestão das Unidades de Conservação da Natureza no âmbito do Sistema Estadual de Unidades de Conservação (SEUC), a regularização ambiental e as políticas públicas florestais no Estado do Pará.

---

## 2. Parâmetros Geodésicos e Cartográficos

Todos os produtos cartográficos estruturados neste acervo atendem às normas técnicas e resoluções cartográficas vigentes no Brasil, conforme preconizado pela Infraestrutura Nacional de Dados Espaciais (INDE) e pelo Instituto Brasileiro de Geografia e Estatística (IBGE):

* **Sistema Geodésico de Referência:** SIRGAS 2000 (Sistema de Referência Geocêntrico para as Américas), código EPSG 4674.
* **Elipsoide de Referência:** GRS 1980 (Geodetic Reference System 1980).
* **Sistemas de Coordenadas:** Coordenadas Geográficas (Graus Decimais e Sexagesimais) e Projeção Cartográfica Transversa de Mercator (UTM), Fusos 21N, 21S, 22N e 22S.
* **Formatos Disponibilizados:** Vetorial de alta precisão (PDF em conformidade para plotagem nas normas ISO A0, A1 e A4) e matricial georreferenciado (JPEG e PNG em alta definição).

---

## 3. Estruturação do Acervo e Gerências Regionais

A divisão do acervo reflete a estrutura de governança territorial da DGMUC/IDEFLOR-Bio, dividindo-se entre cartas de abrangência estadual geral e conjuntos temáticos descentralizados por Gerência Regional:

| Identificador | Nomenclatura Regional | Abrangência e Status |
| :--- | :--- | :--- |
| **GERAL** | Âmbito Geral do Estado do Pará | Acervo ativo: ZEE Macro, Mosaicos Gerais e Ordenamento Territorial |
| **GRCN-II** | Gerência Regional Calha Norte II | Acervo ativo: Cartas em folha A0, ESEC Mamuru, FLOTAs Faro, Paru e Trombetas, e PE PAGAM |
| **GRX** | Gerência Regional Xingu | Acervo ativo: REVIS Tabuleiro do Embaubal e sítios críticos |
| **GRCN-I** | Gerência Regional Calha Norte I | Em processo de homologação técnica |
| **GRB** | Gerência Regional Belém / Região Metropolitana | Em processo de homologação técnica |
| **GRMR** | Gerência Regional Marajó | Em processo de homologação técnica |
| **GRET** | Gerência Regional Tocantins / Estrada de Ferro | Em processo de homologação técnica |
| **GRBA** | Gerência Regional Baixo Amazonas | Em processo de homologação técnica |
| **GRT** | Gerência Regional Tapajós | Em processo de homologação técnica |
| **GRA** | Gerência Regional Araguaia | Em processo de homologação técnica |

---

## 4. Arquitetura de Diretórios

O repositório adota arquitetura desacoplada para suportar publicação estática contínua sem dependências em tempo de execução:

```
maps/
├── index.html                   Arquivo principal da interface de consulta e distribuição
├── assets/
│   ├── css/
│   │   └── style.css            Folha de estilo conforme Design System Governamental
│   ├── js/
│   │   ├── data.js              Catálogo estruturado de metadados cartográficos
│   │   └── app.js               Controladores de busca, filtros regionais e visualizador
│   ├── img/
│   │   ├── brasao-para.png      Brasão de Armas do Estado do Pará
│   │   ├── logo-ideflor-bio.png Logomarca institucional do IDEFLOR-Bio
│   │   ├── logo-ngeo.png        Logomarca do Núcleo de Geotecnologias
│   │   └── thumbnails/          Representações matriciais otimizadas para visualização web
│   └── downloads/               Repositório de arquivos finais padronizados para download
├── mapas_originais/             Diretório de custódia dos arquivos fontes e insumos cartográficos
│   ├── geral/                   Insumos cartográficos de âmbito estadual
│   ├── gerencias_regionais/     Insumos organizados por gerência descentralizada
│   └── logos_e_brasoes/         Elementos gráficos e institucionais originais
├── organize_and_build.py        Rotina de processamento, cálculo de integridade e metadados
└── .gitignore                   Definições de exclusão para versionamento
```

---

## 5. Procedimento para Publicação no GitHub Pages

O portal opera como uma aplicação web estática nativa (HTML5, CSS3 e JavaScript ES6+), compatível com qualquer provedor estático ou serviço de hospedagem de páginas:

1. Clonar ou inicializar o repositório no namespace institucional:
   ```bash
   git init
   git add .
   git commit -m "docs: publicacao do repositorio de cartografia tematica"
   git branch -M main
   git remote add origin https://github.com/NGEO-IDEFLOR-Bio/cartografia-tematica.git
   git push -u origin main
   ```
2. Acessar as opções do repositório no GitHub:
   * Navegar até **Settings** > **Pages**.
   * Em **Build and deployment** > **Source**, selecionar a opção `Deploy from a branch`.
   * Indicar a branch `main` e o diretório `/ (root)`.
   * Salvar a configuração.
3. O serviço será provisionado em:
   https://ngeo-ideflor-bio.github.io/cartografia-tematica/

---

## 6. Rotina de Ingestão de Novas Cartas

A inclusão de novas folhas e cartas das demais Gerências Regionais deve observar o fluxo:

1. Armazenamento do arquivo de alta fidelidade em `mapas_originais/gerencias_regionais/[id_gerencia]/`.
2. Declaração do objeto de metadados no arquivo de automação `organize_and_build.py`, indicando identificador regional (`regional_id`), escala nominal, formato ISO da folha e data de levantamento.
3. Execução da rotina:
   ```bash
   python organize_and_build.py
   ```
4. O script valida a existência dos insumos, gera as miniaturas em resolução calibrada, calcula as métricas de tamanho de arquivo e atualiza o arquivo `assets/js/data.js`.

---

## 7. Sistemas Correlatos

* Portal Oficial do IDEFLOR-Bio: https://ideflorbio.pa.gov.br/
* Visualizador WebGIS do Estado do Pará: https://ngeo-ideflor-bio.github.io/visualizador/
* Guia Interativo de Unidades de Conservação: https://ngeo-ideflor-bio.github.io/guia-uc-para/

---

## 8. Licenciamento e Atribuição

Os dados e produtos cartográficos contidos neste repositório são públicos e regidos pela licença **Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)**. A utilização, reprodução e derivação são livres, mediante citação da fonte:

> PARÁ (Estado). Instituto de Desenvolvimento Florestal e da Biodiversidade (IDEFLOR-Bio). Núcleo de Geotecnologias (NGEO). *Repositório de Malhas Territoriais e Cartografia Temática Oficial*. Belém: IDEFLOR-Bio, 2026.
