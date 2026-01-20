(() => {
    const pagesCount = 2;
    const blocsPerPage = 4;

    const pagesWrapper = document.getElementById('pages-wrapper');
    const pageNumber = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentPage = 0;

    /* ===============================
       DONNÉES (injectées par TM)
    =============================== */
    const badgeFilter = '0001';
    const missions = window.__WMS_DATA__?.missions ?? [];
    const filtered = missions.filter(m => m.personnel?.badge === badgeFilter);

    /* ===============================
       TABLE
    =============================== */
    function createTable(blocMissions) {
        const table = document.createElement('table');
        table.className = 'missions-table';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr class="badge-header">
                <th colspan="7">Badge : ${badgeFilter}</th>
            </tr>
            <tr>
                <th>Fiche</th>
                <th>Train</th>
                <th>Support</th>
                <th>Tournée</th>
                <th>Nb UL</th>
                <th>Poids</th>
                <th>État</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        blocMissions.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${m.codeFichePreparation ?? ''}</td>
                <td>${m.posTrain ?? ''}</td>
                <td>${m.aliasSupport ?? ''}</td>
                <td>${m.tournee ?? ''}</td>
                <td>${m.nombreUl ?? ''}</td>
                <td>${m.poidsBrut ? m.poidsBrut.toFixed(3) : ''}</td>
                <td>${m.state?.label ?? ''}</td>
            `;
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        return table;
    }

    /* ===============================
       PAGE / GRID
    =============================== */
    function createPage(pageIndex) {
        const page = document.createElement('main');
        page.className = 'grid-main';

        const start = pageIndex * blocsPerPage;
        const end = start + blocsPerPage;

        const pageMissions = filtered.slice(start * 10, end * 10);

        for (let i = 0; i < blocsPerPage; i++) {
            const bloc = document.createElement('div');
            bloc.className = 'bloc';

            const blocData = pageMissions.slice(i * 10, (i + 1) * 10);
            bloc.appendChild(createTable(blocData));

            page.appendChild(bloc);
        }

        page.style.gridTemplateColumns = 'repeat(2, 1fr)';
        page.style.gridTemplateRows = 'auto';

        return page;
    }

    /* ===============================
       INIT
    =============================== */
    for (let i = 0; i < pagesCount; i++) {
        pagesWrapper.appendChild(createPage(i));
    }

    function updatePageNumber() {
        pageNumber.textContent = `Page ${currentPage + 1} / ${pagesCount}`;
    }

    function updateSlider() {
        const pageHeight = pagesWrapper.children[0].clientHeight;
        pagesWrapper.style.transform = `translateY(${-currentPage * pageHeight}px)`;
        updatePageNumber();
    }

    prevBtn.onclick = () => {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < pagesCount - 1) {
            currentPage++;
            updateSlider();
        }
    };

    updateSlider();
})();
