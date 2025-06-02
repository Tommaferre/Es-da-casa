// Global variables
        let currentSection = 'dashboard';
        let currentAnimalsView = 'table';

        // Toggle profile dropdown
        function toggleDropdown() {
            const menu = document.getElementById('profileMenu');
            menu.classList.toggle('show');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.querySelector('.profile-dropdown');
            if (!dropdown.contains(event.target)) {
                document.getElementById('profileMenu').classList.remove('show');
            }
        });

        // Show section
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.add('hidden'));
            
            // Remove active class from all sidebar items
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            sidebarItems.forEach(item => item.classList.remove('active'));
            
            // Show selected section
            document.getElementById(sectionId).classList.remove('hidden');
            
            // Add active class to clicked sidebar item
            event.target.closest('.sidebar-item').classList.add('active');
            
            currentSection = sectionId;
        }

        // Toggle animals view
        function toggleAnimalsView(viewType) {
            const tableView = document.getElementById('animalsTable');
            const cardsView = document.getElementById('animalsCards');
            const toggleBtns = document.querySelectorAll('#animals .toggle-btn');
            
            toggleBtns.forEach(btn => btn.classList.remove('active'));
            
            if (viewType === 'table') {
                tableView.classList.remove('hidden');
                cardsView.classList.add('hidden');
                toggleBtns[0].classList.add('active');
            } else {
                tableView.classList.add('hidden');
                cardsView.classList.remove('hidden');
                toggleBtns[1].classList.add('active');
            }
            
            currentAnimalsView = viewType;
        }

        // Show adoption tab
        function showAdoptionTab(tabType) {
            const tabs = document.querySelectorAll('#adoptions .nav-tab');
            const pending = document.getElementById('pendingAdoptions');
            const completed = document.getElementById('completedAdoptions');
            const forms = document.getElementById('adoptionForms');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            [pending, completed, forms].forEach(section => section.classList.add('hidden'));
            
            if (tabType === 'pending') {
                tabs[0].classList.add('active');
                pending.classList.remove('hidden');
            } else if (tabType === 'completed') {
                tabs[1].classList.add('active');
                completed.classList.remove('hidden');
            } else if (tabType === 'forms') {
                tabs[2].classList.add('active');
                forms.classList.remove('hidden');
            }
        }

        // Show visit tab
        function showVisitTab(tabType) {
            const tabs = document.querySelectorAll('#visits .nav-tab');
            const upcoming = document.getElementById('upcomingVisits');
            const completed = document.getElementById('completedVisits');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            [upcoming, completed].forEach(section => section.classList.add('hidden'));
            
            if (tabType === 'upcoming') {
                tabs[0].classList.add('active');
                upcoming.classList.remove('hidden');
            } else if (tabType === 'completed') {
                tabs[1].classList.add('active');
                completed.classList.remove('hidden');
            }
        }

        // Show adoption form
        function showAdoptionForm() {
            document.getElementById('adoptions').classList.add('hidden');
            document.getElementById('adoptionFormModal').classList.remove('hidden');
        }

        // Hide adoption form
        function hideAdoptionForm() {
            document.getElementById('adoptionFormModal').classList.add('hidden');
            document.getElementById('adoptions').classList.remove('hidden');
        }

        // Search functions
        function searchAnimals() {
            const searchTerm = document.getElementById('animalsSearch').value.toLowerCase();
            const tableRows = document.querySelectorAll('#animalsTableBody tr');
            const cards = document.querySelectorAll('#animalsCards .animal-card');
            
            // Search in table
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
            
            // Search in cards
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                card.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }

        function searchAdoptions() {
            const searchTerm = document.getElementById('adoptionsSearch').value.toLowerCase();
            const tableRows = document.querySelectorAll('#adoptionsTableBody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }

        function searchVisits() {
            const searchTerm = document.getElementById('visitsSearch').value.toLowerCase();
            const tableRows = document.querySelectorAll('#visitsTableBody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }

        function searchDonations() {
            const searchTerm = document.getElementById('donationsSearch').value.toLowerCase();
            const tableRows = document.querySelectorAll('#donationsTableBody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
        function showMedicalTab(tabType) {
            const tabs = document.querySelectorAll('#medical-records .nav-tab');
            const records = document.getElementById('medicalRecords');
            const vaccinations = document.getElementById('medicalVaccinations');
            const treatments = document.getElementById('medicalTreatments');
            
            tabs.forEach(tab => tab.classList.remove('active'));
            [records, vaccinations, treatments].forEach(section => section.classList.add('hidden'));
            
            if (tabType === 'records') {
                tabs[0].classList.add('active');
                records.classList.remove('hidden');
            } else if (tabType === 'vaccinations') {
                tabs[1].classList.add('active');
                vaccinations.classList.remove('hidden');
            } else if (tabType === 'treatments') {
                tabs[2].classList.add('active');
                treatments.classList.remove('hidden');
            }
        }

        function searchMedicalRecords() {
            const searchTerm = document.getElementById('medicalSearch').value.toLowerCase();
            const tableRows = document.querySelectorAll('#medicalRecordsTableBody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }

       function showMedicalDetail(animalId) {
    console.log("Apro cartella per:", animalId);
    
    const medicalRecords = document.getElementById('medical-records');
    const medicalDetailModal = document.getElementById('medicalDetailModal');
    
    if (medicalRecords && medicalDetailModal) {
        // Nascondi la sezione delle cartelle
        medicalRecords.classList.add('hidden');
        // Mostra il modal
        medicalDetailModal.classList.remove('hidden');
        console.log("Modal aperto con successo");
    }
}
function hideMedicalDetail() {
    const medicalDetailModal = document.getElementById('medicalDetailModal');
    const medicalRecords = document.getElementById('medical-records');
    
    if (medicalDetailModal && medicalRecords) {
        medicalDetailModal.classList.add('hidden');
        medicalRecords.classList.remove('hidden');
        console.log("Modal chiuso con successo");
    }
}

        function showNewMedicalRecord() {
            alert('Funzione per creare nuova cartella clinica - Da implementare');
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            showSection('dashboard');
        });

        // Funzioni per la gestione degli animali
        
        // Mostra il modal per aggiungere un nuovo animale
        function showAddAnimalModal() {
            document.getElementById('animals').classList.add('hidden');
            document.getElementById('addAnimalModal').classList.remove('hidden');
            
            // Imposta la data di oggi come default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('animalArrivalDate').value = today;
        }
        
        // Nascondi il modal per aggiungere un nuovo animale
        function hideAddAnimalModal() {
            document.getElementById('addAnimalModal').classList.add('hidden');
            document.getElementById('animals').classList.remove('hidden');
            
            // Reset del form
            document.getElementById('addAnimalModal').querySelector('form').reset();
        }
        
        // Salva un nuovo animale
        function saveNewAnimal() {
            // In un'applicazione reale, qui ci sarebbe il codice per salvare i dati nel database
            // Per questo mockup, simuliamo l'aggiunta alla tabella
            
            const name = document.getElementById('animalName').value;
            const species = document.getElementById('animalSpecies').value;
            const breed = document.getElementById('animalBreed').value;
            const age = document.getElementById('animalAge').value;
            const microchip = document.getElementById('animalMicrochip').value;
            const status = document.getElementById('animalStatus').value;
            const arrivalDate = document.getElementById('animalArrivalDate').value;
            
            // Validazione base
            if (!name || !species || !age || !microchip) {
                alert('Per favore compila tutti i campi obbligatori');
                return;
            }
            
            // Formatta la data
            const formattedDate = new Date(arrivalDate).toLocaleDateString('it-IT');
            
            // Crea una nuova riga nella tabella
            const tableBody = document.getElementById('animalsTableBody');
            const newRow = document.createElement('tr');
            
            newRow.innerHTML = `
                <td><strong>${microchip}</strong></td>
                <td><strong>${name}</strong></td>
                <td>${species} - ${breed}</td>
                <td>${age} anni</td>
                <td><span class="animal-status status-${status.toLowerCase()}">${status}</span></td>
                <td>${formattedDate}</td>
                <td>
                    <button class="btn btn-primary btn-icon" title="Dettagli">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-secondary btn-icon" title="Cartella Clinica">
                        <i class="fas fa-file-medical"></i>
                    </button>
                    <button class="btn btn-warning btn-icon" title="Modifica" onclick="showEditAnimalModal(this)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-icon" title="Elimina" onclick="showDeleteConfirmModal(this)">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            
            tableBody.prepend(newRow);
            
            // Aggiungi anche alla vista a schede
            const cardsContainer = document.getElementById('animalsCards');
            const newCard = document.createElement('div');
            newCard.className = 'animal-card';
            
            const icon = species === 'Cane' ? 'dog' : (species === 'Gatto' ? 'cat' : 'paw');
            
            newCard.innerHTML = `
                <div class="animal-image"><i class="fas fa-${icon}"></i></div>
                <div class="animal-info">
                    <div class="animal-name">${name}</div>
                    <div class="animal-details">${breed} • ${age} anni</div>
                    <span class="animal-status status-${status.toLowerCase()}">${status}</span>
                    <div class="card-actions">
                        <button class="btn btn-primary btn-icon" title="Dettagli">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-secondary btn-icon" title="Cartella Clinica">
                            <i class="fas fa-file-medical"></i>
                        </button>
                        <button class="btn btn-warning btn-icon" title="Modifica" onclick="showEditAnimalModal(this)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-icon" title="Elimina" onclick="showDeleteConfirmModal(this)">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cardsContainer.prepend(newCard);
            
            // Nascondi il modal
            hideAddAnimalModal();
            
            // Mostra un messaggio di successo
            alert('Animale aggiunto con successo!');
        }
        
        // Mostra il modal per modificare un animale
        function showEditAnimalModal(button) {
            const row = button.closest('tr') || button.closest('.animal-card');
            
            // Ottieni i dati dalla riga o dalla scheda
            let name, microchip, speciesBreed, age, status;
            
            if (row.tagName === 'TR') {
                const cells = row.querySelectorAll('td');
                microchip = cells[0].textContent.trim();
                name = cells[1].textContent.trim();
                speciesBreed = cells[2].textContent.trim();
                age = cells[3].textContent.trim();
                status = cells[4].querySelector('.animal-status').textContent.trim();
            } else {
                name = row.querySelector('.animal-name').textContent.trim();
                const details = row.querySelector('.animal-details').textContent.trim().split('•');
                speciesBreed = details[0].trim();
                age = details[1].trim();
                status = row.querySelector('.animal-status').textContent.trim();
                microchip = ''; // Potrebbe non essere visibile nella vista a schede
            }
            
            // Separa specie e razza
            const speciesBreedParts = speciesBreed.split('-');
            const species = speciesBreedParts[0].trim();
            const breed = speciesBreedParts.length > 1 ? speciesBreedParts[1].trim() : '';
            
            // Estrai solo il numero dall'età
            const ageNumber = age.replace(/[^0-9.]/g, '');
            
            // Popola il form di modifica
            document.getElementById('editAnimalName').value = name;
            document.getElementById('editAnimalSpecies').value = species;
            document.getElementById('editAnimalBreed').value = breed;
            document.getElementById('editAnimalAge').value = ageNumber;
            document.getElementById('editAnimalMicrochip').value = microchip;
            document.getElementById('editAnimalStatus').value = status;
            
            // Nascondi la sezione animali e mostra il modal di modifica
            document.getElementById('animals').classList.add('hidden');
            document.getElementById('editAnimalModal').classList.remove('hidden');
            
            // Salva un riferimento alla riga/scheda per l'aggiornamento
            document.getElementById('editAnimalId').value = name + '-' + microchip; // Identificatore univoco
        }
        
        // Nascondi il modal per modificare un animale
        function hideEditAnimalModal() {
            document.getElementById('editAnimalModal').classList.add('hidden');
            document.getElementById('animals').classList.remove('hidden');
        }
        
        // Aggiorna un animale esistente
        function updateAnimal() {
            // In un'applicazione reale, qui ci sarebbe il codice per aggiornare i dati nel database
            // Per questo mockup, simuliamo l'aggiornamento nella tabella
            
            const name = document.getElementById('editAnimalName').value;
            const species = document.getElementById('editAnimalSpecies').value;
            const breed = document.getElementById('editAnimalBreed').value;
            const age = document.getElementById('editAnimalAge').value;
            const microchip = document.getElementById('editAnimalMicrochip').value;
            const status = document.getElementById('editAnimalStatus').value;
            
            // Validazione base
            if (!name || !species || !age) {
                alert('Per favore compila tutti i campi obbligatori');
                return;
            }
            
            // Trova e aggiorna la riga nella tabella
            const tableRows = document.querySelectorAll('#animalsTableBody tr');
            for (const row of tableRows) {
                const cells = row.querySelectorAll('td');
                if (cells[0].textContent.trim() === microchip || cells[1].textContent.trim() === name) {
                    cells[1].innerHTML = `<strong>${name}</strong>`;
                    cells[2].textContent = `${species} - ${breed}`;
                    cells[3].textContent = `${age} anni`;
                    cells[4].innerHTML = `<span class="animal-status status-${status.toLowerCase()}">${status}</span>`;
                    break;
                }
            }
            
            // Trova e aggiorna la scheda
            const cards = document.querySelectorAll('#animalsCards .animal-card');
            for (const card of cards) {
                const cardName = card.querySelector('.animal-name').textContent.trim();
                if (cardName === name) {
                    card.querySelector('.animal-name').textContent = name;
                    card.querySelector('.animal-details').textContent = `${breed} • ${age} anni`;
                    card.querySelector('.animal-status').textContent = status;
                    card.querySelector('.animal-status').className = `animal-status status-${status.toLowerCase()}`;
                    
                    // Aggiorna anche l'icona se necessario
                    const icon = species === 'Cane' ? 'dog' : (species === 'Gatto' ? 'cat' : 'paw');
                    card.querySelector('.animal-image i').className = `fas fa-${icon}`;
                    break;
                }
            }
            
            // Nascondi il modal
            hideEditAnimalModal();
            
            // Mostra un messaggio di successo
            alert('Animale aggiornato con successo!');
        }
        
        // Mostra il modal di conferma eliminazione
        function showDeleteConfirmModal(button) {
            const row = button.closest('tr') || button.closest('.animal-card');
            
            // Ottieni i dati dalla riga o dalla scheda
            let name, microchip;
            
            if (row.tagName === 'TR') {
                const cells = row.querySelectorAll('td');
                microchip = cells[0].textContent.trim();
                name = cells[1].textContent.trim();
            } else {
                name = row.querySelector('.animal-name').textContent.trim();
                microchip = ''; // Potrebbe non essere visibile nella vista a schede
            }
            
            // Popola il modal di conferma
            document.getElementById('deleteAnimalName').textContent = name;
            document.getElementById('deleteAnimalMicrochip').textContent = microchip;
            document.getElementById('deleteAnimalId').value = name + '-' + microchip; // Identificatore univoco
            
            // Nascondi la sezione animali e mostra il modal di conferma
            document.getElementById('animals').classList.add('hidden');
            document.getElementById('deleteConfirmModal').classList.remove('hidden');
        }

        // Nascondi il modal di conferma eliminazione
        function hideDeleteConfirmModal() {
            document.getElementById('deleteConfirmModal').classList.add('hidden');
            document.getElementById('animals').classList.remove('hidden');
        }

        // Conferma eliminazione animale
        function confirmDeleteAnimal() {
            // In un'applicazione reale, qui ci sarebbe il codice per eliminare i dati dal database
            // Per questo mockup, simuliamo l'eliminazione dalla tabella
            
            const animalId = document.getElementById('deleteAnimalId').value;
            const [name, microchip] = animalId.split('-');
            
            // Trova ed elimina la riga dalla tabella
            const tableRows = document.querySelectorAll('#animalsTableBody tr');
            for (const row of tableRows) {
                const cells = row.querySelectorAll('td');
                if (cells[0].textContent.trim() === microchip || cells[1].textContent.trim() === name) {
                    row.remove();
                    break;
                }
            }
            
            // Trova ed elimina la scheda
            const cards = document.querySelectorAll('#animalsCards .animal-card');
            for (const card of cards) {
                const cardName = card.querySelector('.animal-name').textContent.trim();
                if (cardName === name) {
                    card.remove();
                    break;
                }
            }
            
            // Nascondi il modal
            hideDeleteConfirmModal();
            
            // Mostra un messaggio di successo
            alert('Animale eliminato con successo!');
        }