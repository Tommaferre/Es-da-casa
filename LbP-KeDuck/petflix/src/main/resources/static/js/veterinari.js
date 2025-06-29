class VeterinariManager {
    constructor() {
        this.veterinari = [];
        this.currentVeterinarioId = null;
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.renderTable();
    }

    async loadData() {
        try {
            const response = await fetch('/veterinari');
            if (!response.ok) throw new Error('Errore nel caricamento dei veterinari');
            this.veterinari = await response.json();
        } catch (error) {
            alert('Errore nel caricamento dei dati: ' + error.message);
            this.veterinari = [];
        }
    }

    setupEventListeners() {
        document.getElementById('addVeterinarioBtn').addEventListener('click', () => this.openModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTable(e.target.value));
        document.getElementById('veterinarioForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('veterinarioModal')) {
                this.closeModal();
            }
        });
    }

    renderTable() {
        const tbody = document.getElementById('veterinariTableBody');
        tbody.innerHTML = '';

        this.veterinari.forEach(veterinario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veterinario.id_dottore_veterinario || veterinario.id}</td>
                <td>${veterinario.nome}</td>
                <td>${veterinario.cognome}</td>
                <td>${veterinario.telefono}</td>
                <td>${veterinario.email}</td>
                <td>
                    <button class="btn btn-warning btn-small" onclick="veterinariManager.editVeterinario(${veterinario.id_dottore_veterinario || veterinario.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="veterinariManager.deleteVeterinario(${veterinario.id_dottore_veterinario || veterinario.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#veterinariTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
        });
    }

    openModal(veterinarioId = null) {
        this.currentVeterinarioId = veterinarioId;
        const modal = document.getElementById('veterinarioModal');
        const title = document.getElementById('modalTitle');
        
        if (veterinarioId) {
            title.textContent = 'Modifica Veterinario';
            this.populateForm(veterinarioId);
        } else {
            title.textContent = 'Nuovo Veterinario';
            document.getElementById('veterinarioForm').reset();
        }
        
        modal.style.display = 'block';
    }

    populateForm(veterinarioId) {
        const veterinario = this.veterinari.find(v => (v.id_dottore_veterinario || v.id) === veterinarioId);
        if (veterinario) {
            document.getElementById('nome').value = veterinario.nome;
            document.getElementById('cognome').value = veterinario.cognome;
            document.getElementById('telefono').value = veterinario.telefono;
            document.getElementById('email').value = veterinario.email;
            // document.getElementById('specializzazione').value = veterinario.specializzazione;
        }
    }

    closeModal() {
        document.getElementById('veterinarioModal').style.display = 'none';
        this.currentVeterinarioId = null;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            nome: document.getElementById('nome').value,
            cognome: document.getElementById('cognome').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            // specializzazione: document.getElementById('specializzazione').value
        };

        if (this.currentVeterinarioId) {
            await this.updateVeterinario(this.currentVeterinarioId, formData);
        } else {
            await this.addVeterinario(formData);
        }
    }

    async addVeterinario(data) {
        try {
            const response = await fetch('/veterinari', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiunta del veterinario');
            await this.loadData();
            this.renderTable();
            this.closeModal();
            alert('Veterinario aggiunto con successo!');
        } catch (error) {
            alert(error.message);
        }
    }

    async updateVeterinario(id, data) {
        try {
            const response = await fetch(`/veterinari/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Errore nell\'aggiornamento del veterinario');
            await this.loadData();
            this.renderTable();
            this.closeModal();
            alert('Veterinario aggiornato con successo!');
        } catch (error) {
            alert(error.message);
        }
    }

    editVeterinario(id) {
        this.openModal(id);
    }

    async deleteVeterinario(id) {
        if (confirm('Sei sicuro di voler eliminare questo veterinario?')) {
            try {
                const response = await fetch(`/veterinari/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Errore nell\'eliminazione del veterinario');
                await this.loadData();
                this.renderTable();
                alert('Veterinario eliminato con successo!');
            } catch (error) {
                alert(error.message);
            }
        }
    }
}

// Inizializza il manager quando la pagina è caricata
let veterinariManager;
document.addEventListener('DOMContentLoaded', () => {
    veterinariManager = new VeterinariManager();
});

// Funzione globale per chiudere il modal
function closeModal() {
    veterinariManager.closeModal();
}