class DonatoriManager {
    constructor() {
        this.donatori = [];
        this.currentDonatore = null;
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        // Event delegation per i bottoni modifica e cancella donatore
        const tbody = document.querySelector('#donatoriTable tbody');
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const btnEdit = e.target.closest('.btn-edit-donatore');
                if (btnEdit) {
                    const id = parseInt(btnEdit.getAttribute('data-id'));
                    this.editDonatore(id);
                    return;
                }
                const btnDelete = e.target.closest('.btn-delete-donatore');
                if (btnDelete) {
                    const id = parseInt(btnDelete.getAttribute('data-id'));
                    this.deleteDonatore(id);
                }
            });
        }
    }

    async loadData() {
        try {
            const response = await fetch('/donatori');
            if (!response.ok) throw new Error('Errore nel caricamento dei donatori');
            this.donatori = await response.json();
            this.renderTable();
        } catch (error) {
            alert('Errore nel caricamento dei donatori: ' + error.message);
        }
    }

    bindEvents() {
        // Filter functionality
        const nameFilter = document.getElementById('nameFilter');
        const emailFilter = document.getElementById('emailFilter');
        
        if (nameFilter) {
            nameFilter.addEventListener('input', () => this.applyFilters());
        }
        if (emailFilter) {
            emailFilter.addEventListener('input', () => this.applyFilters());
        }

        // Add button
        const addBtn = document.getElementById('addBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.openModal();
            });
        }

        // Print button
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }

        // Gestione submit del form SOLO tramite classe
        const form = document.getElementById('donatoreForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveDonatore();
            });
        }

        // Gestione chiusura modal SOLO tramite classe
        const modal = document.getElementById('donatoreModal');
        const closeBtn = modal?.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Gestione annulla SOLO tramite classe
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    renderTable() {
        const tbody = document.querySelector('#donatoriTable tbody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.donatori.forEach(donatore => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${donatore.id_donatore}</td>
                <td>${donatore.nome}</td>
                <td>${donatore.cognome}</td>
                <td>${donatore.email}</td>
                <td>${donatore.telefono}</td>
                <td>${donatore.indirizzo || ''}</td>
                <td>
                    <button class="btn btn-warning btn-small btn-edit-donatore" data-id="${donatore.id_donatore}">
                        <i class="fas fa-edit"></i> 
                    </button>
                    <button class="btn btn-danger btn-small btn-delete-donatore" data-id="${donatore.id_donatore}">
                        <i class="fas fa-trash"></i> 
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#donatoriTable tbody tr');
        const term = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    openModal(donatore = null) {
        const modal = document.getElementById('donatoreModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('donatoreForm');

        this.currentDonatore = donatore;

        if (donatore) {
            modalTitle.textContent = 'Modifica Donatore';
            document.getElementById('nome').value = donatore.nome;
            document.getElementById('cognome').value = donatore.cognome;
            document.getElementById('telefono').value = donatore.telefono;
            document.getElementById('email').value = donatore.email;
            document.getElementById('indirizzo').value = donatore.indirizzo;
        } else {
            modalTitle.textContent = 'Aggiungi Nuovo Donatore';
            form.reset();
        }

        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('donatoreModal');
        modal.style.display = 'none';
        this.currentDonatore = null;
    }

    editDonatore(id) {
        const donatore = this.donatori.find(d => d.id_donatore === id);
        if (donatore) {
            this.openModal(donatore);
        }
    }

    async deleteDonatore(id) {
        showConfirmModal('Sei sicuro di voler eliminare questo donatore?', async () => {
            try {
                const response = await fetch(`/donatori/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Errore durante l\'eliminazione');
                this.loadData();
                showConfirmModal('Donatore eliminato con successo!');
            } catch (error) {
                showConfirmModal('Errore durante l\'eliminazione: ' + error.message);
            }
        });
    }

    async saveDonatore() {
        const formData = new FormData(document.getElementById('donatoreForm'));
        const donatoreData = {
            nome: formData.get('nome'),
            cognome: formData.get('cognome'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            indirizzo: formData.get('indirizzo')
        };
        try {
            let response;
            if (this.currentEditId) {
                response = await fetch(`/donatori/${this.currentEditId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(donatoreData)
                });
                if (!response.ok) throw new Error('Errore durante la modifica');
            } else {
                response = await fetch('/donatori', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(donatoreData)
                });
                if (!response.ok) throw new Error('Errore durante la creazione');
            }
            this.closeModal();
            this.loadData();
            showConfirmModal('Donatore salvato con successo!');
        } catch (error) {
            showConfirmModal('Errore durante il salvataggio: ' + error.message);
        }
    }

    applyFilters() {
        const nameFilter = document.getElementById('nameFilter')?.value.toLowerCase() || '';
        const emailFilter = document.getElementById('emailFilter')?.value.toLowerCase() || '';
        
        const rows = document.querySelectorAll('#donatoriTable tbody tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const name = (cells[1]?.textContent + ' ' + cells[2]?.textContent).toLowerCase();
            const email = cells[3]?.textContent.toLowerCase() || '';
            
            const nameMatch = name.includes(nameFilter);
            const emailMatch = email.includes(emailFilter);
            
            row.style.display = nameMatch && emailMatch ? '' : 'none';
        });
    }
}

// Inizializza il manager quando la pagina è caricata
let donatoriManager;
document.addEventListener('DOMContentLoaded', () => {
    donatoriManager = new DonatoriManager();
});