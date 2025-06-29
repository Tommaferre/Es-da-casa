-- dati fake animali

INSERT INTO animali (
    id_box,
    id_cartella_clinica,
    microchip,
    nome,
    specie,
    razza,
    data_arrivo,
    stato,
    backstories
) VALUES
(1, 101, 'ABC123456789', 'Luna', 'Gatto', 'Siberiano', '2023-11-05', 'Adottabile', 'Trovata vicino al parco, molto timida ma affettuosa.'),
(2, 102, 'XYZ987654321', 'Rex', 'Cane', 'Pastore Tedesco', '2024-02-10', 'In cura', 'Abbandonato, ha bisogno di cure veterinarie.'),
(3, 103, 'LMN456123789', 'Maya', 'Coniglio', 'Nano', '2024-05-15', 'Adottabile', 'Arrivata da poco, molto vivace e curiosa.'),
(1, 104, 'DEF321654987', 'Toby', 'Cane', 'Beagle', '2023-09-20', 'Adottato', 'Ha trovato una nuova casa, molto socievole.'),
(4, 105, 'GHI789456123', 'Nina', 'Gatto', 'Persiano', '2024-01-30', 'In osservazione', 'Malata, sotto controllo veterinario.');

-- dati fake donazioni

INSERT INTO donazioni (
    id_donatore,
    tipo, 
    contenuto, 
    data_emissione, 
    note_donatore
) VALUES
(1, 'monetario', '100.00', '2023-10-01', 'Prima donazione di prova'),
(2, 'cibo', 'crocchette', '2025-06-10', 'Seconda donazione di prova'),
(2, 'monetario', '150.00', '2025-06-10', 'Terza donazione di prova');

-- dati fake donatori

INSERT INTO donatori (
    nome,
    cognome,
    telefono,
    email,
    indirizzo
) VALUES
('Marco', 'Rossi', '3456789012', 'marco.rossi@example.com', 'Via Roma 10, Milano'),
('Giulia', 'Bianchi', '3298765432', 'giulia.bianchi@example.com', 'Corso Vittorio Emanuele 25, Torino'),
('Luca', 'Verdi', '3387654321', 'luca.verdi@example.com', 'Piazza Duomo 5, Firenze');

-- dati fake visite veterinarie

INSERT INTO visite_veterinarie (
    id_animale, 
    id_dottore_veterinario,  
    data_visita,
    tipo_visita, 
    terapia, 
    farmaci, 
    controllo,
    costo, 
    note
) 
VALUES 
(1, 2, '2024-05-01', 'Vaccinazione', 'Nessuna', 'Nessuno', false, 50.00, 'Prima vaccinazione annuale'),
(2, 1, '2024-05-10', 'Controllo Dieta', 'Dieta', 'Nessuno', true, 40.00, 'Controllo peso, follow-up necessario'),
(3, 3, '2024-06-15', 'Chirurgia', 'Antibiotici', 'Amoxicillina', false, 200.00, 'Rimozione cisti, recupero previsto 2 settimane'),
(4, 2, '2024-04-20', 'Controllo Generale', 'Nessuna', 'Nessuno', false, 35.00, 'Animale in buona salute'),
(5, 1, '2024-06-01', 'Terapia Antinfiammatoria', 'Antinfiammatorio', 'Ibuprofene', true, 60.00, 'Dolore articolare, rivalutazione tra 1 mese');

-- dati fake box

INSERT INTO box (
    nome,
    capienza
) VALUES
('Box Gatti A', 3),
('Box Cani Grande', 2),
('Box Conigli', 4),
('Box Gatti B', 3),
('Box Cani Piccoli', 4),
('Box Isolamento', 1),
('Box Cuccioli', 5),
('Box Quarantena', 2);
INSERT INTO adozioni (
    id_animale,
    id_modulo_adozione,
    id_adottante,
    data_richiesta,
    data_adozione,
    stato,
    quota_adozione,
    note
) VALUES
(101, 201, 301, '2025-05-10', '2025-05-20', 'completata', 80.00, 'Tutto completato con successo.'),
(102, 202, 302, '2025-06-01', NULL, 'richiesta', 50.00, 'In attesa di approvazione.'),
(103, 203, 303, '2025-04-15', '2025-04-22', 'approvata', 100.00, 'Famiglia già contattata.'),
(104, 204, 304, '2025-05-22', NULL, 'rifiutata', NULL, 'Non idoneo dopo colloquio.'),
(105, 205, 305, '2025-06-05', NULL, 'annullata', NULL, 'Richiesta annullata');

INSERT INTO adottanti (
    nome, cognome, telefono, email, indirizzo, idoneo
) VALUES
('Mario', 'Rossi', '3331234567', 'mario.rossi@email.com', 'Via Roma 1, Milano', 'idoneo'),
('Luca', 'Bianchi', '3339876543', 'luca.bianchi@email.com', 'Via Milano 10, Torino', 'non idoneo');
INSERT INTO dottori_veterinari (
    nome,
    cognome,
    telefono,
    email
) VALUES
('Anna', 'Neri', '3456789012', 'anna.neri@example.com'),
('Marco', 'Bianchi', '3298765432', 'marco.bianchi@example.com'),
('Giulia', 'Verdi', '3387654321', 'giulia.verdi@example.com');


INSERT INTO cartelle_cliniche (
    id_animale,
    gruppo_sanguigno,
    sterilizzato,
    peso,
    sesso,
    eta_stimata,
    altezza,
    allergie_note
) VALUES
( 1, 'A+', true, 4.50, 'F', '2 anni', 30.0, 'Nessuna'),
( 2, '0-', false, 25.00, 'M', '5 anni', 55.0, 'Allergia a penicillina'),
( 3, 'B+', true, 1.20, 'F', '1 anno', 20.0, NULL),
( 4, 'AB-', false, 12.00, 'M', '3 anni', 40.0, 'Intolleranza lattosio'),
( 5, 'A-', true, 3.80, 'F', '4 anni', 28.0, '');
