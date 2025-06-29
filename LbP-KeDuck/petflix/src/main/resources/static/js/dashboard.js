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
            // Simulated data - replace with actual API calls
            const stats = {
                totalAnimals: 45,
                completedAdoptions: 23,
                occupiedBoxes: 12,
                totalDonations: 15420
            };

            document.getElementById('total-animals').textContent = stats.totalAnimals;
            document.getElementById('completed-adoptions').textContent = stats.completedAdoptions;
            document.getElementById('occupied-boxes').textContent = `${stats.occupiedBoxes}/15`;
            document.getElementById('total-donations').textContent = `€${stats.totalDonations.toLocaleString()}`;
        } catch (error) {
            console.error('Errore nel caricamento delle statistiche:', error);
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