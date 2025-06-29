class AnimaliManager {
    constructor() {
        this.animali = [];
        this.currentAnimaleId = null;
        console.log('AnimaliManager creato');
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderTable();
        this.populateFilterOptions();
    }

    async loadData() {
        try {
            const response = await fetch('/animali');
            if (!response.ok) throw new Error('Errore nel caricamento degli animali');
            this.animali = await response.json();
            console.log('Animali caricati:', this.animali);
            this.renderTable();
            this.populateFilterOptions();
        } catch (error) {
            console.error('Errore nel caricamento:', error);
            alert('Errore nel caricamento degli animali: ' + error.message);
        }
    }

    setupEventListeners() {
        document.getElementById('addAnimaleBtn').addEventListener('click', () => this.openModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTable(e.target.value));
        document.getElementById('animaleForm').addEventListener('submit', (e) => this.handleSubmit(e));

        // EVENT DELEGATION per i pulsanti della tabella - QUESTA È LA CHIAVE
        document.getElementById('animaliTableBody').addEventListener('click', (e) => {
            console.log('Click su tabella:', e.target);

            // Trova il pulsante cliccato (anche se si clicca sull'icona)
            const button = e.target.closest('button');
            if (!button) return;

            const animaleId = parseInt(button.getAttribute('data-id'));
            console.log('ID animale:', animaleId);

            if (button.classList.contains('edit-btn')) {
                console.log('Modifica animale:', animaleId);
                this.editAnimale(animaleId);
            } else if (button.classList.contains('delete-btn')) {
                console.log('Elimina animale:', animaleId);
                this.deleteAnimale(animaleId);
            }
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('animaleModal')) {
                this.closeModal();
            }
        });
    }

    renderTable(animaliDaMostrare = this.animali) {
        const tbody = document.getElementById('animaliTableBody');
        tbody.innerHTML = '';

        console.log('Rendering tabella con', animaliDaMostrare.length, 'animali');

        animaliDaMostrare.forEach(animale => {
            let rawData = animale.dataArrivo;
            let data_arrivo = '-';
            if (rawData) {
                if (typeof rawData === 'object' && rawData.year && rawData.month && rawData.day) {
                    data_arrivo = `${rawData.day.toString().padStart(2, '0')}/${rawData.month.toString().padStart(2, '0')}/${rawData.year}`;
                } else {
                    const d = new Date(rawData);
                    data_arrivo = isNaN(d) ? '-' : d.toLocaleDateString('it-IT');
                }
            }
            let box = animale.idBox || animale.id_box || animale.box_nome || '-';
            let cartella = animale.idCartellaClinica || animale.id_cartella_clinica || '-';
            let backstories = animale.backstories || '-';

            const row = document.createElement('tr');
            // NIENTE ONCLICK INLINE - solo data attributes e classi
            row.innerHTML = `
                <td>${animale.id_animale}</td>
                <td>${animale.nome}</td>
                <td>${animale.specie}</td>
                <td>${animale.razza}</td>
                <td>${animale.microchip}</td>
                <td>${data_arrivo}</td>
                <td><span class="badge badge-${this.getStatoBadgeClass(animale.stato)}">${animale.stato}</span></td>
                <td>${box}</td>
                <td>${cartella}</td>
                <td>${backstories}</td>
                <td>
                    <button class="btn btn-warning btn-small edit-btn" data-id="${animale.id_animale}" title="Modifica">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small delete-btn" data-id="${animale.id_animale}" title="Elimina">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getStatoBadgeClass(stato) {
        switch (stato) {
            case 'Adottabile': return 'success';
            case 'In cura': return 'warning';
            case 'In osservazione': return 'info';
            case 'Adottato': return 'secondary';
            default: return 'secondary';
        }
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#animaliTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    openModal(animaleId = null) {
        console.log('Apertura modal per:', animaleId);
        this.currentAnimaleId = animaleId;
        const modal = document.getElementById('animaleModal');
        const title = document.getElementById('modalTitle');

        if (animaleId) {
            title.textContent = 'Modifica Animale';
            this.populateForm(animaleId);
        } else {
            title.textContent = 'Nuovo Animale';
            document.getElementById('animaleForm').reset();
        }

        modal.style.display = 'block';
    }

    populateForm(animaleId) {
        console.log('Popolamento form per ID:', animaleId);
        const animale = this.animali.find(a => a.id_animale === animaleId);
        console.log('Animale trovato:', animale);

        if (animale) {
            document.getElementById('nome').value = animale.nome || '';
            document.getElementById('specie').value = animale.specie || '';
            document.getElementById('razza').value = animale.razza || '';
            document.getElementById('microchip').value = animale.microchip || '';

            let rawData = animale.dataArrivo;
            let dateValue = '';
            if (rawData) {
                if (typeof rawData === 'object' && rawData.year && rawData.month && rawData.day) {
                    dateValue = `${rawData.year}-${rawData.month.toString().padStart(2, '0')}-${rawData.day.toString().padStart(2, '0')}`;
                } else {
                    const d = new Date(rawData);
                    if (!isNaN(d)) {
                        dateValue = d.toISOString().slice(0, 10);
                    }
                }
            }
            document.getElementById('data_arrivo').value = dateValue;
            document.getElementById('stato').value = animale.stato || '';
            document.getElementById('backstories').value = animale.backstories || '';
            document.getElementById('note').value = animale.note || '';
            document.getElementById('idBox').value = animale.idBox || animale.id_box || '';
            document.getElementById('idCartellaClinica').value = animale.idCartellaClinica || animale.id_cartella_clinica || '';
        } else {
            alert('Animale non trovato!');
        }
    }

    closeModal() {
        document.getElementById('animaleModal').style.display = 'none';
        this.currentAnimaleId = null;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            nome: document.getElementById('nome').value,
            specie: document.getElementById('specie').value,
            razza: document.getElementById('razza').value,
            microchip: document.getElementById('microchip').value,
            dataArrivo: document.getElementById('data_arrivo').value,
            stato: document.getElementById('stato').value,
            backstories: document.getElementById('backstories').value,
            note: document.getElementById('note').value,
            idBox: parseInt(document.getElementById('idBox').value),
            idCartellaClinica: parseInt(document.getElementById('idCartellaClinica').value)
        };
        if (this.currentAnimaleId) {
            this.updateAnimale(this.currentAnimaleId, formData);
        } else {
            this.addAnimale(formData);
        }
    }

    async addAnimale(data) {
        try {
            const response = await fetch('/animali', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Errore durante la creazione: ' + errorText);
            }
            this.closeModal();
            this.loadData();
            alert('Animale aggiunto con successo!');
        } catch (error) {
            alert(error.message);
        }
    }

    async updateAnimale(id, data) {
        try {
            const response = await fetch(`/animali/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore durante la modifica');
            this.closeModal();
            this.loadData();
            alert('Animale aggiornato con successo!');
        } catch (error) {
            alert('Errore durante la modifica: ' + error.message);
        }
    }

    editAnimale(id) {
        console.log('Edit animale chiamato con ID:', id);
        this.openModal(id);
    }

    async deleteAnimale(id) {
        console.log('Delete animale chiamato con ID:', id);
        if (confirm('Sei sicuro di voler eliminare questo animale?')) {
            try {
                const response = await fetch(`/animali/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Errore durante l\'eliminazione');
                this.loadData();
                alert('Animale eliminato con successo!');
            } catch (error) {
                alert('Errore durante l\'eliminazione: ' + error.message);
            }
        }
    }

    populateFilterOptions() {
        // Popola filtro razze
        const razze = [...new Set(this.animali.map(a => a.razza))].sort();
        const razzaSelect = document.getElementById('razzaFilter');
        razzaSelect.innerHTML = '<option value="">Tutte</option>';
        razze.forEach(razza => {
            const option = document.createElement('option');
            option.value = razza;
            option.textContent = razza;
            razzaSelect.appendChild(option);
        });

        // Popola filtro box
        const boxes = [...new Set(this.animali.map(a => a.box_nome || a.idBox || a.id_box || '-'))].sort();
        const boxSelect = document.getElementById('boxFilter');
        boxSelect.innerHTML = '<option value="">Tutti</option>';
        boxes.forEach(box => {
            const option = document.createElement('option');
            option.value = box;
            option.textContent = box;
            boxSelect.appendChild(option);
        });

        // Aggiungi event listeners per i filtri
        document.getElementById('searchInput').addEventListener('input', () => this.applyFilters());
        document.getElementById('specieFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('razzaFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('boxFilter').addEventListener('change', () => this.applyFilters());
    }

    applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const razzaFilter = document.getElementById('razzaFilter').value;
        const boxFilter = document.getElementById('boxFilter').value;
        const specieFilter = document.getElementById('specieFilter').value;

        const rows = document.querySelectorAll('#animaliTableBody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const nome = cells[1].textContent.toLowerCase();
            const specie = cells[2].textContent;
            const razza = cells[3].textContent;
            const box = cells[7].textContent;

            const matchesSearch = nome.includes(searchTerm);
            const matchesRazza = !razzaFilter || razza === razzaFilter;
            const matchesBox = !boxFilter || box === boxFilter;
            const matchesSpecie = !specieFilter || specie === specieFilter;

            const isVisible = matchesSearch && matchesRazza && matchesBox && matchesSpecie;
            row.style.display = isVisible ? '' : 'none';
        });
    }

    filtraPerSpecie(specie) {
        const filtrati = this.animali.filter(a => a.specie && a.specie.toLowerCase().includes(specie.toLowerCase()));
        this.renderTable(filtrati);
    }
}

// Inizializza il manager quando la pagina è caricata
let animaliManager = null;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM caricato, creazione AnimaliManager...');
    try {
        animaliManager = new AnimaliManager();
        window.animaliManager = animaliManager; // backup globale
        console.log('AnimaliManager creato con successo:', animaliManager);
    } catch (error) {
        console.error('Errore nella creazione di AnimaliManager:', error);
    }
});

// Funzioni globali per compatibilità
function closeModal() {
    if (animaliManager) {
        animaliManager.closeModal();
    }
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('specieFilter').value = '';
    document.getElementById('razzaFilter').value = '';
    document.getElementById('boxFilter').value = '';
    if (animaliManager) {
        animaliManager.renderTable();
    }
}