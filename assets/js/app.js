/**
 * Repositório de Malhas Territoriais e Cartografia Temática
 * NGEO / IDEFLOR-Bio — Governo do Estado do Pará
 * Lógica da Aplicação (Busca, Filtros Regionais, Abas, Grade/Tabela e Modal Pan/Zoom)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado da aplicação
  const state = {
    category: "all",
    regionalOffice: "all",
    searchQuery: "",
    viewMode: localStorage.getItem("ngeo_view_mode") || "grid",
    activeMap: null,
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  };

  // Elementos do DOM
  const gridContainer = document.getElementById("mapsGridContainer");
  const tableContainer = document.getElementById("mapsTableContainer");
  const tableBody = document.getElementById("mapsTableBody");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const resultsCountEl = document.getElementById("resultsCount");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const regionalSelect = document.getElementById("regionalOfficeSelect");
  const regionalPill = document.getElementById("regionalOfficePill");
  const viewGridBtn = document.getElementById("viewGridBtn");
  const viewTableBtn = document.getElementById("viewTableBtn");

  // Modal e Visualizador
  const modalOverlay = document.getElementById("mapModalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalViewerArea = document.getElementById("modalViewerArea");
  const modalViewerImg = document.getElementById("modalViewerImg");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const zoomResetBtn = document.getElementById("zoomResetBtn");
  const zoomLevelDisplay = document.getElementById("zoomLevelDisplay");
  const modalDesc = document.getElementById("modalDesc");
  const modalMetadataList = document.getElementById("modalMetadataList");
  const modalDownloadsList = document.getElementById("modalDownloadsList");
  const modalCitation = document.getElementById("modalCitation");
  const copyCitationBtn = document.getElementById("copyCitationBtn");

  // Acessibilidade: Alto Contraste
  const contrastToggleBtn = document.getElementById("contrastToggleBtn");
  if (localStorage.getItem("ngeo_high_contrast") === "true") {
    document.body.classList.add("high-contrast");
  }

  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
      const isHigh = document.body.classList.contains("high-contrast");
      localStorage.setItem("ngeo_high_contrast", isHigh);
    });
  }

  // Atualizar contadores das abas de categorias
  function updateCategoryCounters() {
    categoryTabs.forEach(tab => {
      const cat = tab.getAttribute("data-category");
      const badge = tab.querySelector(".category-count");
      if (!badge) return;
      if (cat === "all") {
        badge.textContent = MAPS_DATABASE.length;
      } else {
        const count = MAPS_DATABASE.filter(m => m.category === cat).length;
        badge.textContent = count;
      }
    });
  }

  // Filtrar mapas com base em Gerência Regional, Categoria e Pesquisa
  function getFilteredMaps() {
    const q = state.searchQuery.toLowerCase().trim();

    return MAPS_DATABASE.filter(item => {
      // 1. Filtro de Gerência Regional
      if (state.regionalOffice !== "all") {
        if (state.regionalOffice === "estadual") {
          if (item.regional_id !== "estadual") return false;
        } else if (item.regional_id !== state.regionalOffice) {
          return false;
        }
      }

      // 2. Filtro de Categoria Temática
      if (state.category !== "all" && item.category !== state.category) {
        return false;
      }

      // 3. Filtro de Texto (busca global)
      if (!q) return true;
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchShort = item.short_title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTheme = item.theme.toLowerCase().includes(q);
      const matchPaper = item.paper_size.toLowerCase().includes(q);
      const matchReg = item.regional_name.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchShort || matchDesc || matchTheme || matchPaper || matchReg || matchTags;
    });
  }

  // Renderizar modo Grade (Cards)
  function renderGridView(maps) {
    // Se a regional selecionada estiver em status de "catalogação pendente"
    const selectedOffice = REGIONAL_OFFICES.find(r => r.id === state.regionalOffice);
    if (selectedOffice && selectedOffice.status === "pending") {
      gridContainer.innerHTML = getPendingRegionalHTML(selectedOffice);
      return;
    }

    if (maps.length === 0) {
      gridContainer.innerHTML = getEmptyStateHTML();
      return;
    }

    gridContainer.innerHTML = maps.map(map => {
      const dlButtonsHTML = map.downloads.map(dl => {
        const btnClass = dl.extension === "PDF" ? "pdf-btn" : "img-btn";
        const iconSvg = dl.extension === "PDF" 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5h-2v3H6V7.5h3.5c1.1 0 2 .9 2 2s-.9 2-2 2zm1-2h-1v1.5h1c.3 0 .5-.2.5-.5v-.5c0-.3-.2-.5-.5-.5zm6.5 2h-2v1.5h1.5v1.5H15v2h-1.5V7.5H17v1.5zm-3.5 4.5h-1.5v-7H13c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2zm0-5.5v4c.3 0 .5-.2.5-.5v-3c0-.3-.2-.5-.5-.5z"/></svg>`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`;
        return `
          <a href="${dl.url}" download="${dl.filename}" class="btn-download-item ${btnClass}" title="Baixar ${dl.label}">
            ${iconSvg}
            <span>${dl.extension}</span>
            <span class="file-weight-pill">(${dl.size})</span>
          </a>
        `;
      }).join("");

      return `
        <article class="map-card" data-id="${map.id}">
          <div class="card-preview-wrapper" onclick="window.openMapModal('${map.id}')">
            <img src="${map.thumbnail}" alt="${map.title}" class="card-thumbnail" loading="lazy">
            <span class="card-overlay-badge">${map.paper_size.split(' ')[0]}</span>
            <span class="card-overlay-scale">Escala ${map.scale}</span>
          </div>
          <div class="card-body">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="card-category-tag">${map.category_label}</span>
              <span style="font-size: 0.725rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${map.regional_name}</span>
            </div>
            
            <h3 class="card-title">${map.title}</h3>
            <p class="card-description">${map.description}</p>
            
            <div class="card-metadata-list">
              <div class="card-meta-row">
                <span class="card-meta-label">Formato de Folha:</span>
                <span class="card-meta-val">${map.paper_size}</span>
              </div>
              <div class="card-meta-row">
                <span class="card-meta-label">Elaboração / Data:</span>
                <span class="card-meta-val">${map.date}</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-primary-preview" onclick="window.openMapModal('${map.id}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Visualizar mapa
              </button>
              <div class="card-download-buttons">
                ${dlButtonsHTML}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Renderizar modo Tabela (Padrão IBGE)
  function renderTableView(maps) {
    const selectedOffice = REGIONAL_OFFICES.find(r => r.id === state.regionalOffice);
    if (selectedOffice && selectedOffice.status === "pending") {
      tableBody.innerHTML = `<tr><td colspan="6">${getPendingRegionalHTML(selectedOffice)}</td></tr>`;
      return;
    }

    if (maps.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6">${getEmptyStateHTML()}</td></tr>`;
      return;
    }

    tableBody.innerHTML = maps.map(map => {
      const actionsHTML = map.downloads.map(dl => {
        return `
          <a href="${dl.url}" download="${dl.filename}" class="table-action-btn" title="Baixar ${dl.label}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            ${dl.extension} (${dl.size})
          </a>
        `;
      }).join("");

      return `
        <tr>
          <td class="table-thumb-col">
            <img src="${map.thumbnail}" alt="${map.short_title}" class="table-thumb-img" onclick="window.openMapModal('${map.id}')">
          </td>
          <td class="table-title-cell">
            <div class="table-title-text" onclick="window.openMapModal('${map.id}')">${map.title}</div>
            <div class="table-sub-desc">${map.theme}</div>
          </td>
          <td>
            <span class="table-badge-cat">${map.category_label}</span><br>
            <span class="table-sub-desc" style="font-weight: 600;">${map.regional_name}</span>
          </td>
          <td>
            <strong>${map.scale}</strong><br>
            <span class="table-sub-desc">${map.paper_size}</span>
          </td>
          <td>
            <span>${map.datum}</span><br>
            <span class="table-sub-desc">${map.date}</span>
          </td>
          <td>
            <div class="table-actions-cell">
              <button class="table-action-btn" style="background-color: var(--gov-blue-light); color: var(--gov-blue-primary); border-color: rgba(19,81,180,0.3);" onclick="window.openMapModal('${map.id}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path></svg>
                Visualizar
              </button>
              ${actionsHTML}
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Estado de Gerência Regional em Catalogação Pendente
  function getPendingRegionalHTML(office) {
    return `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 8px;">
        <div style="width: 52px; height: 52px; margin: 0 auto 1rem; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; color: var(--gov-blue-primary);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--gov-blue-dark); margin-bottom: 0.5rem;">
          ${office.name} (${office.sigla})
        </h4>
        <p style="color: var(--gov-text-muted); font-size: 0.925rem; max-width: 600px; margin: 0 auto 1.25rem; line-height: 1.5;">
          As cartas temáticas e folhas cartográficas individuais desta Gerência Regional estão atualmente em processo de homologação técnica e validação geoespacial pelo <strong>Núcleo de Geotecnologias (NGEO/IDEFLOR-Bio)</strong>.
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button onclick="window.openMapModal('ucs-gerencia-regional')" class="btn-primary-preview" style="display: inline-flex; width: auto;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Ver Mapa Geral de UCs por Gerência Regional
          </button>
          <button onclick="window.resetFilters()" class="view-btn" style="padding: 0.6rem 1rem;">
            Ver Todas as Cartas
          </button>
        </div>
      </div>
    `;
  }

  // Estado Vazio de Busca
  function getEmptyStateHTML() {
    return `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background-color: var(--gov-card-bg); border: 1px dashed var(--gov-border); border-radius: 6px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gov-text-light)" stroke-width="1.5" style="margin-bottom: 1rem;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--gov-blue-dark); margin-bottom: 0.5rem;">Nenhum mapa encontrado</h4>
        <p style="color: var(--gov-text-muted); font-size: 0.9rem; max-width: 480px; margin: 0 auto 1.25rem;">Não encontramos nenhum mapa correspondente aos critérios da sua pesquisa. Experimente verificar a grafia ou limpar os termos pesquisados.</p>
        <button onclick="window.resetFilters()" class="btn-primary-preview" style="display: inline-flex; width: auto; margin: 0 auto;">Limpar Filtros e Ver Todos</button>
      </div>
    `;
  }

  // Atualizar visualização principal
  function render() {
    const maps = getFilteredMaps();
    const selectedOffice = REGIONAL_OFFICES.find(r => r.id === state.regionalOffice);

    if (selectedOffice && selectedOffice.status === "pending") {
      resultsCountEl.textContent = `Em catalogação pelo NGEO (${selectedOffice.sigla})`;
    } else {
      resultsCountEl.textContent = `${maps.length} ${maps.length === 1 ? 'mapa encontrado' : 'mapas encontrados'}`;
    }

    if (state.viewMode === "grid") {
      gridContainer.style.display = "grid";
      tableContainer.style.display = "none";
      renderGridView(maps);
    } else {
      gridContainer.style.display = "none";
      tableContainer.style.display = "block";
      renderTableView(maps);
    }
  }

  // Evento do Seletor de Gerência Regional
  if (regionalSelect) {
    regionalSelect.addEventListener("change", (e) => {
      state.regionalOffice = e.target.value;
      const office = REGIONAL_OFFICES.find(r => r.id === state.regionalOffice);
      if (office) {
        regionalPill.textContent = office.sigla;
      }
      render();
    });
  }

  // Evento das Abas de Categoria Temática
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.category = tab.getAttribute("data-category");
      render();
    });
  });

  // Campo de busca com debounce
  let searchTimeout = null;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    state.searchQuery = e.target.value;
    clearSearchBtn.style.display = state.searchQuery ? "block" : "none";
    searchTimeout = setTimeout(() => {
      render();
    }, 150);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    render();
  });

  // Alternadores de Modo de Visualização (Grade / Tabela)
  viewGridBtn.addEventListener("click", () => {
    state.viewMode = "grid";
    localStorage.setItem("ngeo_view_mode", "grid");
    viewGridBtn.classList.add("active");
    viewTableBtn.classList.remove("active");
    render();
  });

  viewTableBtn.addEventListener("click", () => {
    state.viewMode = "table";
    localStorage.setItem("ngeo_view_mode", "table");
    viewTableBtn.classList.add("active");
    viewGridBtn.classList.remove("active");
    render();
  });

  // Resetar filtros globalmente
  window.resetFilters = function() {
    state.category = "all";
    state.regionalOffice = "all";
    state.searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    if (regionalSelect) regionalSelect.value = "all";
    if (regionalPill) regionalPill.textContent = "Todas as Regionais";
    categoryTabs.forEach(t => {
      if (t.getAttribute("data-category") === "all") t.classList.add("active");
      else t.classList.remove("active");
    });
    render();
  };

  // ==========================================================================
  // Controle do Modal de Visualização (Zoom e Pan)
  // ==========================================================================
  window.openMapModal = function(mapId) {
    const map = MAPS_DATABASE.find(m => m.id === mapId);
    if (!map) return;
    state.activeMap = map;

    modalTitle.textContent = map.title;
    modalSubtitle.textContent = `${map.regional_name} • ${map.category_label} • Escala ${map.scale}`;
    modalDesc.textContent = map.description;

    // Metadados técnicos no painel lateral
    modalMetadataList.innerHTML = `
      <dt>Gerência Regional:</dt><dd>${map.regional_name}</dd>
      <dt>Categoria:</dt><dd>${map.category_label}</dd>
      <dt>Tema Cartográfico:</dt><dd>${map.theme}</dd>
      <dt>Escala Nominal:</dt><dd>${map.scale}</dd>
      <dt>Formato Folha:</dt><dd>${map.paper_size}</dd>
      <dt>Datum / Sistema:</dt><dd>${map.datum} (EPSG: 4674)</dd>
      <dt>Órgão Produtor:</dt><dd>${map.source_org}</dd>
      <dt>Jurisdição:</dt><dd>${map.jurisdiction}</dd>
      <dt>Publicação:</dt><dd>${map.date}</dd>
    `;

    // Lista de downloads oficiais
    modalDownloadsList.innerHTML = map.downloads.map(dl => {
      return `
        <a href="${dl.url}" download="${dl.filename}" class="sidebar-dl-btn" title="Baixar ${dl.label}">
          <div>
            <strong>Baixar ${dl.extension}</strong><br>
            <span style="font-size: 0.75rem; color: var(--gov-text-light); font-weight: normal;">${dl.label}</span>
          </div>
          <span class="file-weight-pill" style="font-weight: 700; color: var(--gov-blue-primary);">${dl.size}</span>
        </a>
      `;
    }).join("");

    // Sugestão de Citação ABNT
    const citationText = `PARÁ (Estado). Instituto de Desenvolvimento Florestal e da Biodiversidade (IDEFLOR-Bio). Núcleo de Geotecnologias (NGEO). ${map.title}. Escala ${map.scale}. Datum SIRGAS 2000. Belém: IDEFLOR-Bio, ${map.date}. Disponível em: Catálogo de Mapas e Malhas Territoriais do Pará.`;
    modalCitation.textContent = citationText;

    // Carregar imagem no viewer
    modalViewerImg.src = map.thumbnail;
    modalViewerImg.alt = map.title;

    // Resetar Zoom e Pan
    resetZoomAndPan();

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    state.activeMap = null;
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  // Funções de Zoom e Pan
  function updateTransform() {
    modalViewerImg.style.transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
    zoomLevelDisplay.textContent = `${Math.round(state.zoom * 100)}%`;
  }

  function resetZoomAndPan() {
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    updateTransform();
  }

  zoomInBtn.addEventListener("click", () => {
    if (state.zoom < 5) {
      state.zoom += 0.25;
      updateTransform();
    }
  });

  zoomOutBtn.addEventListener("click", () => {
    if (state.zoom > 0.5) {
      state.zoom -= 0.25;
      updateTransform();
    }
  });

  zoomResetBtn.addEventListener("click", resetZoomAndPan);

  // Zoom via Scroll do Mouse
  modalViewerArea.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    const newZoom = state.zoom + delta;
    if (newZoom >= 0.5 && newZoom <= 5) {
      state.zoom = newZoom;
      updateTransform();
    }
  }, { passive: false });

  // Pan / Arrastar com Mouse
  modalViewerArea.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    state.isDragging = true;
    modalViewerArea.classList.add("panning");
    state.startX = e.clientX - state.panX;
    state.startY = e.clientY - state.panY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!state.isDragging) return;
    state.panX = e.clientX - state.startX;
    state.panY = e.clientY - state.startY;
    updateTransform();
  });

  window.addEventListener("mouseup", () => {
    if (state.isDragging) {
      state.isDragging = false;
      modalViewerArea.classList.remove("panning");
    }
  });

  // Copiar citação ABNT
  copyCitationBtn.addEventListener("click", () => {
    const text = modalCitation.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = copyCitationBtn.innerHTML;
      copyCitationBtn.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Copiado
      `;
      copyCitationBtn.style.borderColor = "var(--gov-green-primary)";
      copyCitationBtn.style.color = "var(--gov-green-primary)";
      setTimeout(() => {
        copyCitationBtn.innerHTML = originalText;
        copyCitationBtn.style.borderColor = "";
        copyCitationBtn.style.color = "";
      }, 2500);
    });
  });

  // Configurar visualização inicial
  if (state.viewMode === "table") {
    viewTableBtn.classList.add("active");
    viewGridBtn.classList.remove("active");
  } else {
    viewGridBtn.classList.add("active");
    viewTableBtn.classList.remove("active");
  }

  // Executar renderização inicial
  updateCategoryCounters();
  render();
});
