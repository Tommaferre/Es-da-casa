class VisiteMedicheManager {
    constructor() {
        this.visite = [];
        this.animali = [];
        this.veterinari = [];
        this.currentVisitaId = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderTable();
    }

    async loadData() {
        // Carica visite
        try {
            const resVisite = await fetch('/visita');
            if (!resVisite.ok) throw new Error('Errore nel caricamento delle visite');
            this.visite = await resVisite.json();
        } catch (error) {
            alert('Errore nel caricamento delle visite: ' + error.message);
            this.visite = [];
        }
        // Carica animali
        try {
            const resAnimali = await fetch('/animali');
            if (!resAnimali.ok) throw new Error('Errore nel caricamento degli animali');
            this.animali = await resAnimali.json();
        } catch (error) {
            alert('Errore nel caricamento degli animali: ' + error.message);
            this.animali = [];
        }
        // Carica veterinari
        try {
            const resVeterinari = await fetch('/veterinari');
            if (!resVeterinari.ok) throw new Error('Errore nel caricamento dei veterinari');
            this.veterinari = await resVeterinari.json();
        } catch (error) {
            alert('Errore nel caricamento dei veterinari: ' + error.message);
            this.veterinari = [];
        }
    }

    setupEventListeners() {
        document.getElementById('addVisitaBtn').addEventListener('click', () => this.openModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTable(e.target.value));
        document.getElementById('visitaForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('visitaModal')) {
                this.closeModal();
            }
        });
    }

    renderTable() {
        const tbody = document.getElementById('visiteMedicheTableBody');
        tbody.innerHTML = '';

        this.visite.forEach(visita => {
    const animale = this.animali.find(a =>
        (a.id_animale || a.id) === (visita.id_animale || visita.idAnimale)
    );
    const veterinario = this.veterinari.find(v =>
        (v.id_dottore_veterinario || v.id) === (visita.id_dottore_veterinario || visita.idDottoreVeterinario)
    );
    const animale_nome = animale ? animale.nome : '';
    const veterinario_nome = veterinario ? `${veterinario.nome} ${veterinario.cognome}` : '';
    const dataVisita = visita.data_visita ? new Date(visita.data_visita).toLocaleDateString('it-IT') : '';
    tbody.innerHTML += `
        <tr>
            <td>${visita.id_visita || visita.id}</td>
            <td>${animale_nome}</td>
            <td>${veterinario_nome}</td>
            <td>${dataVisita}</td>
            <td>${visita.tipo_visita}</td>
            <td>€${Number(visita.costo).toFixed(2)}</td>
            <td><span class="badge badge-${visita.controllo ? 'warning' : 'success'}">${visita.controllo ? 'Necessario' : 'Non Necessario'}</span></td>
            <td>
                <button class="btn btn-warning btn-small" onclick="visiteMedicheManager.editVisita(${visita.id_visita || visita.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-small" onclick="visiteMedicheManager.deleteVisita(${visita.id_visita || visita.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
});
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#visiteMedicheTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    openModal(visitaId = null) {
        this.currentVisitaId = visitaId;
        const modal = document.getElementById('visitaModal');
        const title = document.getElementById('modalTitle');
        
        // Popola le select
        this.populateAnimaliSelect();
        this.populateVeterinariSelect();
        
        if (visitaId) {
            title.textContent = 'Modifica Visita Medica';
            this.populateForm(visitaId);
        } else {
            title.textContent = 'Nuova Visita Medica';
            document.getElementById('visitaForm').reset();
        }
        
        modal.style.display = 'block';
    }

    populateAnimaliSelect() {
        const select = document.getElementById('animaleSelect');
        select.innerHTML = '<option value="">Seleziona animale</option>';
        this.animali.forEach(animale => {
            select.innerHTML += `<option value="${animale.id || animale.id_animale}">${animale.nome}</option>`;
        });
    }

    populateVeterinariSelect() {
        const select = document.getElementById('veterinarioSelect');
        select.innerHTML = '<option value="">Seleziona veterinario</option>';
        this.veterinari.forEach(veterinario => {
            select.innerHTML += `<option value="${veterinario.id_dottore_veterinario || veterinario.id}">${veterinario.nome} ${veterinario.cognome}</option>`;
        });
    }

    populateForm(visitaId) {
        const visita = this.visite.find(v => (v.id_visita || v.id) === visitaId);
        if (visita) {
            document.getElementById('animaleSelect').value = visita.id_animale || visita.idAnimale;
            document.getElementById('veterinarioSelect').value = visita.id_dottore_veterinario || visita.idDottoreVeterinario;
            document.getElementById('dataVisita').value = visita.data_visita ? visita.data_visita.toString().substring(0,10) : '';
            document.getElementById('tipoVisita').value = visita.tipo_visita || '';
            document.getElementById('costo').value = visita.costo || '';
            document.getElementById('controllo').value = visita.controllo ? 'true' : 'false';
            document.getElementById('terapia').value = visita.terapia || '';
            document.getElementById('farmaci').value = visita.farmaci || '';
            document.getElementById('note').value = visita.note || '';
        }
    }

    closeModal() {
        document.getElementById('visitaModal').style.display = 'none';
        this.currentVisitaId = null;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            id_animale: parseInt(document.getElementById('animaleSelect').value),
            id_dottore_veterinario: parseInt(document.getElementById('veterinarioSelect').value),
            data_visita: document.getElementById('dataVisita').value,
            tipo_visita: document.getElementById('tipoVisita').value,
            costo: parseFloat(document.getElementById('costo').value),
            controllo: document.getElementById('controllo').value === 'true',
            terapia: document.getElementById('terapia').value,
            farmaci: document.getElementById('farmaci').value,
            note: document.getElementById('note').value
        };

        if (this.currentVisitaId) {
            await this.updateVisita(this.currentVisitaId, formData);
        } else {
            await this.addVisita(formData);
        }
    }

    async addVisita(data) {
        try {
            const response = await fetch('/visita', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiunta della visita medica');
            await this.loadData();
            this.renderTable();
            this.closeModal();
            alert('Visita medica aggiunta con successo!');
        } catch (error) {
            alert(error.message);
        }
    }

    async updateVisita(id, data) {
        try {
            const response = await fetch(`/visita/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento della visita medica');
            await this.loadData();
            this.renderTable();
            this.closeModal();
            alert('Visita medica aggiornata con successo!');
        } catch (error) {
            alert(error.message);
        }
    }

    editVisita(id) {
        this.openModal(id);
    }

    async deleteVisita(id) {
        if (confirm('Sei sicuro di voler eliminare questa visita medica?')) {
            try {
                const response = await fetch(`/visita/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Errore nell\'eliminazione della visita medica');
                await this.loadData();
                this.renderTable();
                alert('Visita medica eliminata con successo!');
            } catch (error) {
                alert(error.message);
            }
        }
    }
}

// Inizializza il manager quando la pagina è caricata
let visiteMedicheManager;
document.addEventListener('DOMContentLoaded', () => {
    visiteMedicheManager = new VisiteMedicheManager();
});

// Funzione globale per chiudere il modal
function closeModal() {
    visiteMedicheManager.closeModal();
}