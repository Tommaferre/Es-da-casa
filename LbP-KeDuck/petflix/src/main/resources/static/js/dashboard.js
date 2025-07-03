// Dashboard functionality
class Dashboard {
    constructor() {
        this.init();
    }

    init() {
        this.loadStats();
    }

    async loadStats() {
        try {
            // Animali
            const animaliRes = await fetch('/animali');
            const animali = await animaliRes.json();
            document.getElementById('total-animals').textContent = animali.length;

            // Adozioni
            const adozioniRes = await fetch('/adozioni');
            const adozioni = await adozioniRes.json();
            document.getElementById('completed-adoptions').textContent = adozioni.length;

            // Box
            const boxRes = await fetch('/box');
            const boxes = await boxRes.json();
            document.getElementById('occupied-boxes').textContent = boxes.length; // oppure filtra se vuoi solo quelli occupati

            // Donazioni
            const donazioniRes = await fetch('/donazioni');
            const donazioni = await donazioniRes.json();
            // Somma importi se sono donazioni monetarie
            const totale = donazioni
                .filter(d => d.importo) // solo quelle con campo importo
                .reduce((sum, d) => sum + Number(d.importo), 0);
            document.getElementById('total-donations').textContent = `€${totale.toLocaleString()}`;
        } catch (error) {
            showConfirmModal('Errore nel caricamento delle statistiche: ' + error.message);
        }
    }
}

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});