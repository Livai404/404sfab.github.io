(() => {
    const pagesCount = 2;
    const blocsPerPage = 4;

    const pagesWrapper = document.getElementById('pages-wrapper');
    const pageNumber = document.getElementById('pageNumber');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const missions = window.__MISSIONS__ || [];
    let currentPage = 0;

    function createTable() {
        const table = document.createElement('table');
        table.className = 'missions-table';

        const colgroup = document.createElement('colgroup');
        for (let i = 0; i < 7; i++) {
            const col = document.createElement('col');
            col.style.width = '10px';
            colgroup.appendChild(col);
        }
        table.appendChild(colgroup);

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr class="badge-header">
                <th colspan="7">Missions</th>
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

        missions.forEach(m => {
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

    function createPage() {
        const page = document.createElement('main');
        page.className = 'grid-main';

        for (let i = 0; i < blocsPerPage; i++) {
            const bloc = document.createElement('div');
            bloc.className = 'bloc';
            bloc.appendChild(createTable());
            page.appendChild(bloc);
        }

        page.style.gridTemplateColumns = `repeat(2, 1fr)`;
        page.style.gridTemplateRows = `repeat(${Math.ceil(blocsPerPage / 2)}, 1fr)`;

        return page;
    }

    for (let i = 0; i < pagesCount; i++) {
        pagesWrapper.appendChild(createPage());
    }

    function updateSlider() {
        const pageHeight = pagesWrapper.children[0].clientHeight;
        pagesWrapper.style.transform = `translateY(${-currentPage * pageHeight}px)`;
        pageNumber.textContent = `Page ${currentPage + 1} / ${pagesCount}`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < pagesCount - 1) {
            currentPage++;
            updateSlider();
        }
    });

    updateSlider();
})();
