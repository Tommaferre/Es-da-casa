class CartelleClinicheManager {
    constructor() {
        this.cartelle = [];
        this.currentEditId = null;
        this.baseUrl = '/cartelle';
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch(this.baseUrl);
            if (response.ok) {
                this.cartelle = await response.json();
                this.renderTable();
            } else {
                console.error('Errore nel caricamento delle cartelle cliniche:', response.status);
                alert('Errore nel caricamento dei dati');
            }
        } catch (error) {
            console.error('Errore di rete:', error);
            alert('Errore di connessione al server');
        }
    }

    setupEventListeners() {
        document.getElementById('addCartellaBtn').addEventListener('click', () => this.openModal());
        document.getElementById('cartellaForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTable(e.target.value));
        
        // Event listeners per il modal dei dettagli
        document.getElementById('detailsModalClose').addEventListener('click', () => this.closeDetailsModal());
        document.getElementById('closeDetailsBtn').addEventListener('click', () => this.closeDetailsModal());
        
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('cartellaModal')) {
                this.closeModal();
            }
            if (e.target === document.getElementById('detailsModal')) {
                this.closeDetailsModal();
            }
        });
    }

    renderTable() {
        const tbody = document.getElementById('cartelleTableBody');
        tbody.innerHTML = '';

        this.cartelle.forEach(cartella => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cartella.id_cartella_clinica || cartella.idCartellaClinica || 'N/A'}</td>
                <td>${cartella.animaleId || 'N/A'}</td>
                <td>${cartella.gruppoSanguigno || 'N/A'}</td>
                <td>${cartella.sterilizzato ? 'Sì' : 'No'}</td>
                <td>${cartella.peso || 'N/A'}</td>
                <td>${cartella.sesso || 'N/A'}</td>
                <td>${cartella.etaStimata || 'N/A'}</td>
                <td>${cartella.altezza || 'N/A'}</td>
                <td>
                    <button class="btn btn-warning btn-small" onclick="cartelleManager.editCartella(${cartella.id_cartella_clinica || cartella.idCartellaClinica})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="cartelleManager.deleteCartella(${cartella.id_cartella_clinica || cartella.idCartellaClinica})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-info btn-small" onclick="cartelleManager.viewDetails(${cartella.id_cartella_clinica || cartella.idCartellaClinica})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    openModal(cartella = null) {
        const modal = document.getElementById('cartellaModal');
        const form = document.getElementById('cartellaForm');
        const title = document.getElementById('modalTitle');

        if (cartella) {
            title.textContent = 'Modifica Cartella Clinica';
            this.currentEditId = cartella.id_cartella_clinica || cartella.idCartellaClinica;
            this.populateForm(cartella);
        } else {
            title.textContent = 'Nuova Cartella Clinica';
            this.currentEditId = null;
            form.reset();
            // Imposta valori di default
            document.getElementById('sterilizzato').value = 'false';
        }

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('cartellaModal').style.display = 'none';
        this.currentEditId = null;
    }

    populateForm(cartella) {
        document.getElementById('animaleId').value = cartella.animaleId || '';
        document.getElementById('gruppoSanguigno').value = cartella.gruppoSanguigno || '';
        document.getElementById('sterilizzato').value = cartella.sterilizzato ? 'true' : 'false';
        document.getElementById('peso').value = cartella.peso || '';
        document.getElementById('sesso').value = cartella.sesso || '';
        document.getElementById('etaStimata').value = cartella.etaStimata || '';
        document.getElementById('altezza').value = cartella.altezza || '';
        document.getElementById('allergieNote').value = cartella.allergieNote || '';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = {
            animaleId: parseInt(document.getElementById('animaleId').value) || null,
            gruppoSanguigno: document.getElementById('gruppoSanguigno').value || null,
            sterilizzato: document.getElementById('sterilizzato').value === 'true',
            peso: parseFloat(document.getElementById('peso').value) || null,
            sesso: document.getElementById('sesso').value || null,
            etaStimata: document.getElementById('etaStimata').value || null,
            altezza: parseFloat(document.getElementById('altezza').value) || null,
            allergieNote: document.getElementById('allergieNote').value || null
        };

        try {
            if (this.currentEditId) {
                await this.updateCartella(this.currentEditId, formData);
            } else {
                await this.addCartella(formData);
            }
        } catch (error) {
            console.error('Errore nell\'operazione:', error);
            alert('Errore nell\'operazione. Riprova.');
        }
    }

    async addCartella(data) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await this.loadData();
                this.closeModal();
                alert('Cartella clinica aggiunta con successo!');
            } else {
                const errorText = await response.text();
                console.error('Errore nella creazione:', errorText);
                alert('Errore nella creazione della cartella clinica');
            }
        } catch (error) {
            console.error('Errore di rete:', error);
            alert('Errore di connessione al server');
        }
    }

    async updateCartella(id, data) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                await this.loadData();
                this.closeModal();
                alert('Cartella clinica aggiornata con successo!');
            } else {
                const errorText = await response.text();
                console.error('Errore nell\'aggiornamento:', errorText);
                alert('Errore nell\'aggiornamento della cartella clinica');
            }
        } catch (error) {
            console.error('Errore di rete:', error);
            alert('Errore di connessione al server');
        }
    }

    async editCartella(id) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);
            if (response.ok) {
                const cartella = await response.json();
                this.openModal(cartella);
            } else {
                alert('Errore nel caricamento della cartella clinica');
            }
        } catch (error) {
            console.error('Errore nel caricamento:', error);
            alert('Errore di connessione al server');
        }
    }

    async deleteCartella(id) {
        if (confirm('Sei sicuro di voler eliminare questa cartella clinica?')) {
            try {
                const response = await fetch(`${this.baseUrl}/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    await this.loadData();
                    alert('Cartella clinica eliminata con successo!');
                } else {
                    alert('Errore nell\'eliminazione della cartella clinica');
                }
            } catch (error) {
                console.error('Errore nell\'eliminazione:', error);
                alert('Errore di connessione al server');
            }
        }
    }

    async viewDetails(id) {
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);
            if (response.ok) {
                const cartella = await response.json();
                this.showDetailsModal(cartella);
            } else {
                alert('Errore nel caricamento dei dettagli');
            }
        } catch (error) {
            console.error('Errore nel caricamento dei dettagli:', error);
            alert('Errore di connessione al server');
        }
    }

    showDetailsModal(cartella) {
        // Popola i campi del modal con i dati della cartella
        document.getElementById('detailId').textContent = cartella.id_cartella_clinica || cartella.idCartellaClinica || 'N/A';
        document.getElementById('detailAnimaleId').textContent = cartella.animaleId || 'N/A';
        document.getElementById('detailGruppoSanguigno').textContent = cartella.gruppoSanguigno || 'N/A';
        document.getElementById('detailSesso').textContent = cartella.sesso || 'N/A';
        document.getElementById('detailSterilizzato').textContent = cartella.sterilizzato ? 'Sì' : 'No';
        document.getElementById('detailEtaStimata').textContent = cartella.etaStimata || 'N/A';
        document.getElementById('detailPeso').textContent = cartella.peso ? `${cartella.peso} kg` : 'N/A';
        document.getElementById('detailAltezza').textContent = cartella.altezza ? `${cartella.altezza} cm` : 'N/A';
        document.getElementById('detailAllergieNote').textContent = cartella.allergieNote || 'Nessuna nota';
        
        // Mostra il modal
        document.getElementById('detailsModal').style.display = 'block';
    }

    closeDetailsModal() {
        document.getElementById('detailsModal').style.display = 'none';
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#cartelleTableBody tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm.toLowerCase());
            row.style.display = isVisible ? '' : 'none';
        });
    }
}

// Inizializza il manager quando la pagina è caricata
let cartelleManager;
document.addEventListener('DOMContentLoaded', () => {
    cartelleManager = new CartelleClinicheManager();
});