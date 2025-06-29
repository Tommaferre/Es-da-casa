class DonazioniManager {
    constructor() {
        this.donazioni = [];
        this.donatori = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.loadDonatori();
        this.loadDonazioni();
        this.setupEventListeners();
        // Event delegation per i bottoni modifica
        document.getElementById('donazioniTableBody').addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-edit-donazione');
            if (btn) {
                const id = parseInt(btn.getAttribute('data-id'));
                this.editDonazione(id);
            }
        });
    }

    setupEventListeners() {
        document.getElementById('donazioneForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveDonazione();
        });
    }

    async loadDonatori() {
        try {
            const response = await fetch('/donatori');
            if (!response.ok) throw new Error('Errore nel caricamento dei donatori');
            const data = await response.json();
            // Normalizza id
            this.donatori = data.map(d => ({
                ...d,
                id: d.id || d.id_donatore // usa id se esiste, altrimenti id_donatore
            }));
            this.populateDonatoriSelect();
        } catch (error) {
            console.error('Errore nel caricamento dei donatori:', error);
        }
    }

    populateDonatoriSelect() {
        const select = document.getElementById('idDonatore');
        select.innerHTML = '<option value="">Seleziona donatore</option>';
        
        this.donatori.forEach(donatore => {
            const option = document.createElement('option');
            option.value = donatore.id;
            option.textContent = `${donatore.nome} ${donatore.cognome}`;
            select.appendChild(option);
        });
    }

    async loadDonazioni() {
        try {
            // Simulated data - replace with actual API call
            this.donazioni = [
                {
                    id: 1,
                    idDonatore: 1,
                    tipo: 'monetario',
                    contenuto: '€500',
                    dataEmissione: '2024-01-15',
                    noteDonatore: 'Donazione per cure veterinarie'
                },
                {
                    id: 2,
                    idDonatore: 2,
                    tipo: 'materiale',
                    contenuto: '20kg cibo per cani',
                    dataEmissione: '2024-02-10',
                    noteDonatore: 'Cibo di alta qualità'
                }
            ];
            this.renderTable();
        } catch (error) {
            console.error('Errore nel caricamento delle donazioni:', error);
        }
    }

    renderTable() {
        const tbody = document.getElementById('donazioniTableBody');
        tbody.innerHTML = '';

        this.donazioni.forEach(donazione => {
            const donatore = this.donatori.find(d => d.id === donazione.idDonatore);
            const donatoreNome = donatore ? `${donatore.nome} ${donatore.cognome}` : 'Sconosciuto';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donazione.id}</td>
                <td>${donatoreNome}</td>
                <td><span class="badge ${this.getTipoClass(donazione.tipo)}">${donazione.tipo}</span></td>
                <td>${donazione.contenuto}</td>
                <td>${new Date(donazione.dataEmissione).toLocaleDateString('it-IT')}</td>
                <td>${donazione.noteDonatore || '-'}</td>
                <td>
                    <button class="btn btn-warning btn-small btn-edit-donazione" data-id="${donazione.id}">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="btn btn-danger btn-small" onclick="donazioniManager.deleteDonazione(${donazione.id})">
                        <i class="fas fa-trash"></i> 
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getTipoClass(tipo) {
        return tipo === 'monetario' ? 'badge-success' : 'badge-info';
    }

    editDonazione(id) {
        const donazione = this.donazioni.find(d => d.id === id);
        if (donazione) {
            this.currentEditId = id;
            document.getElementById('modalTitle').textContent = 'Modifica Donazione';
            
            // Populate form
            document.getElementById('idDonatore').value = donazione.idDonatore;
            document.getElementById('tipo').value = donazione.tipo;
            document.getElementById('contenuto').value = donazione.contenuto;
            document.getElementById('dataEmissione').value = donazione.dataEmissione;
            document.getElementById('noteDonatore').value = donazione.noteDonatore || '';
            
            document.getElementById('donazioneModal').style.display = 'block';
        }
    }

    deleteDonazione(id) {
        if (confirm('Sei sicuro di voler eliminare questa donazione?')) {
            this.donazioni = this.donazioni.filter(d => d.id !== id);
            this.renderTable();
            // Here you would make an API call to delete from backend
        }
    }

    saveDonazione() {
        const formData = new FormData(document.getElementById('donazioneForm'));
        const donazioneData = {
            idDonatore: parseInt(formData.get('idDonatore')),
            tipo: formData.get('tipo'),
            contenuto: formData.get('contenuto'),
            dataEmissione: formData.get('dataEmissione'),
            noteDonatore: formData.get('noteDonatore')
        };

        if (this.currentEditId) {
            // Update existing
            const index = this.donazioni.findIndex(d => d.id === this.currentEditId);
            if (index !== -1) {
                this.donazioni[index] = { ...this.donazioni[index], ...donazioneData };
            }
        } else {
            // Add new
            const newId = Math.max(...this.donazioni.map(d => d.id), 0) + 1;
            this.donazioni.push({ id: newId, ...donazioneData });
        }

        this.renderTable();
        this.closeModal();
        // Here you would make an API call to save to backend
    }

    closeModal() {
        document.getElementById('donazioneModal').style.display = 'none';
        document.getElementById('donazioneForm').reset();
        this.currentEditId = null;
    }
}

// Global functions
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Aggiungi Donazione';
    document.getElementById('donazioneModal').style.display = 'block';
}

function closeModal() {
    donazioniManager.closeModal();
}

// Initialize
let donazioniManager;
document.addEventListener('DOMContentLoaded', () => {
    donazioniManager = new DonazioniManager();
    window.donazioniManager = donazioniManager; // Rende accessibili i metodi dall'HTML
    const refreshBtn = document.getElementById('refreshDonatoriBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => donazioniManager.loadDonatori());
    }
});