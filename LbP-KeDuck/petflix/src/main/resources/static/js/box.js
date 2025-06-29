class BoxManager {
    constructor() {
        this.boxes = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadBoxes();
    }

    setupEventListeners() {
        document.getElementById('addBoxBtn').addEventListener('click', () => this.openModal());
        document.getElementById('boxForm').addEventListener('submit', (e) => this.handleSubmit(e));
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('searchInput').addEventListener('input', (e) => this.filterTable(e.target.value));
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('boxModal')) {
                this.closeModal();
            }
        });
    }

    renderTable() {
        const tbody = document.getElementById('boxTableBody');
        tbody.innerHTML = '';
        this.boxes.forEach(box => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${box.id_box}</td>
                <td>${box.nome}</td>
                <td>${box.capienza}</td>
                <td>
                    <button class="btn btn-warning btn-small" onclick="boxManager.editBox(${box.id_box})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="boxManager.deleteBox(${box.id_box})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    openModal(box = null) {
        const modal = document.getElementById('boxModal');
        const form = document.getElementById('boxForm');
        const title = document.getElementById('modalTitle');
        if (box) {
            title.textContent = 'Modifica Box';
            this.currentEditId = box.id_box;
            this.populateForm(box);
        } else {
            title.textContent = 'Nuovo Box';
            this.currentEditId = null;
            form.reset();
        }
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('boxModal').style.display = 'none';
        this.currentEditId = null;
    }

    async loadBoxes() {
        const response = await fetch('/box');
        if (response.ok) {
            this.boxes = await response.json();
            this.renderTable();
        }
    }

    populateForm(box) {
        document.getElementById('nomeBox').value = box.nome;
        document.getElementById('capienzaBox').value = box.capienza;
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            nome: document.getElementById('nomeBox').value,
            capienza: parseInt(document.getElementById('capienzaBox').value)
        };
        if (this.currentEditId) {
            this.updateBox(this.currentEditId, formData);
        } else {
            this.addBox(formData);
        }
    }

    async addBox(data) {
        const response = await fetch('/box', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            await this.loadBoxes();
            this.closeModal();
            alert('Box aggiunto con successo!');
        } else {
            alert('Errore durante l\'aggiunta del box');
        }
    }

    async updateBox(id, data) {
        const response = await fetch(`/box/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            await this.loadBoxes();
            this.closeModal();
            alert('Box aggiornato con successo!');
        } else {
            alert('Errore durante l\'aggiornamento del box');
        }
    }

    editBox(id) {
        const box = this.boxes.find(b => b.id_box === id);
        if (box) {
            this.openModal(box);
        }
    }

    async deleteBox(id) {
        if (confirm('Sei sicuro di voler eliminare questo box?')) {
            const response = await fetch(`/box/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await this.loadBoxes();
                alert('Box eliminato con successo!');
            } else {
                alert('Errore durante l\'eliminazione del box');
            }
        }
    }

    filterTable(searchTerm) {
        const rows = document.querySelectorAll('#boxTableBody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm.toLowerCase());
            row.style.display = isVisible ? '' : 'none';
        });
    }
}

let boxManager;
document.addEventListener('DOMContentLoaded', () => {
    boxManager = new BoxManager();
});