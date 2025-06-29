-- Tabella Modulo Adozioni
CREATE TABLE modulo_adozioni (
    id_modulo_adozione INT PRIMARY KEY AUTO_INCREMENT,
    id_adottante INT NOT NULL,
    id_animale INT NOT NULL
);

-- Tabella Adottanti
CREATE TABLE adottanti (
    id_adottante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(150),
    indirizzo TEXT NOT NULL,
    idoneo ENUM('idoneo', 'non idoneo') DEFAULT 'non idoneo'
);

-- Tabella Donatori
CREATE TABLE donatori (
    id_donatore INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    telefono VARCHAR(15),
    email VARCHAR(150),
    indirizzo TEXT
);

-- Tabella Dottori Veterinari
CREATE TABLE dottori_veterinari (
    id_dottore_veterinario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(150)
);

-- Tabella Volontari
CREATE TABLE volontari (
    id_volontario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    telefono VARCHAR(15),
    email VARCHAR(150),
    data_iscrizione DATE,
    note TEXT
);

-- Tabella Box
CREATE TABLE box (
    id_box INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20),
    capienza INT NOT NULL
);

-- Tabella Animali
CREATE TABLE animali (
    id_animale INT PRIMARY KEY AUTO_INCREMENT,
    id_box INT NOT NULL,
    id_cartella_clinica INT NOT NULL,
    microchip VARCHAR(15) NOT NULL UNIQUE,
    nome VARCHAR(100),
    specie VARCHAR(50),
    razza VARCHAR(100),
    data_arrivo DATE,
    stato VARCHAR(50),
    backstories TEXT
);

-- Tabella Cartelle Cliniche
-- Ricordarsi la join per il microchip e per id_animale (dipendenza circolare può dare problemi)
CREATE TABLE cartelle_cliniche (
    id_cartella_clinica INT PRIMARY KEY AUTO_INCREMENT,
    id_animale INT NOT NULL,
    gruppo_sanguigno VARCHAR(10),
    sterilizzato BOOLEAN DEFAULT FALSE,
    peso DECIMAL(5,2),
    sesso ENUM('M', 'F'),
    eta_stimata VARCHAR(20),
    altezza DECIMAL(5,2),
    allergie_note TEXT
);

-- Tabella Adozioni
-- join per microchip
CREATE TABLE IF NOT EXISTS adozioni (
    id_adozione INT PRIMARY KEY AUTO_INCREMENT,
    id_animale INT NOT NULL,
    id_modulo_adozione INT NOT NULL,
    id_adottante INT NOT NULL,
    data_richiesta DATE NOT NULL,
    data_adozione DATE,
    stato ENUM('richiesta', 'approvata', 'completata', 'rifiutata', 'annullata') NOT NULL DEFAULT 'richiesta',
    quota_adozione DECIMAL(10,2),
    note TEXT
);

-- Tabella Donazioni
CREATE TABLE donazioni (
    id_donazione INT PRIMARY KEY AUTO_INCREMENT,
    id_donatore INT NOT NULL,
    tipo VARCHAR(100), -- monetario o materiale
    contenuto TEXT, -- somma o quantità
    data_emissione DATE,
    note_donatore TEXT
);

-- Tabella Visite Veterinarie
-- join microchip
CREATE TABLE visite_veterinarie (
    id_visita INT PRIMARY KEY AUTO_INCREMENT,
    id_animale INT NOT NULL,
    id_dottore_veterinario INT NOT NULL,
    data_visita DATE,
    tipo_visita VARCHAR(100),
    terapia TEXT,
    farmaci TEXT,
    controllo BOOLEAN DEFAULT FALSE,
    visite_rimanenti INT DEFAULT 0,
    costo DECIMAL(10,2),
    note TEXT
);

-- -- Aggiunta delle foreign key
-- -- Foreign key per modulo_adozioni
-- ALTER TABLE modulo_adozioni 
-- ADD FOREIGN KEY (id_adottante) REFERENCES adottanti(id_adottante),
-- ADD FOREIGN KEY (id_animale) REFERENCES animali(id_animale);

-- -- Foreign key per animali
-- ALTER TABLE animali 
-- ADD FOREIGN KEY (id_box) REFERENCES box(id_box),
-- ADD FOREIGN KEY (id_cartella_clinica) REFERENCES cartelle_cliniche(id_cartella_clinica);

-- -- Foreign key per cartelle_cliniche
-- ALTER TABLE cartelle_cliniche 
-- ADD FOREIGN KEY (id_animale) REFERENCES animali(id_animale);

-- -- Foreign key per adozioni
-- ALTER TABLE adozioni 
-- ADD FOREIGN KEY (id_animale) REFERENCES animali(id_animale),
-- ADD FOREIGN KEY (id_modulo_adozione) REFERENCES modulo_adozioni(id_modulo_adozione),
-- ADD FOREIGN KEY (id_adottante) REFERENCES adottanti(id_adottante);

-- -- Foreign key per donazioni
-- ALTER TABLE donazioni 
-- ADD FOREIGN KEY (id_donatore) REFERENCES donatori(id_donatore);

-- -- Foreign key per visite_veterinarie
-- ALTER TABLE visite_veterinarie 
-- ADD FOREIGN KEY (id_animale) REFERENCES animali(id_animale),
-- ADD FOREIGN KEY (id_dottore_veterinario) REFERENCES dottori_veterinari(id_dottore_veterinario);

-- -- Aggiunta di indici per migliorare le performance
-- CREATE INDEX idx_animali_microchip ON animali(microchip);
-- CREATE INDEX idx_adozioni_data ON adozioni(data_adozione);
-- CREATE INDEX idx_visite_data ON visite_veterinarie(data_visita);
-- CREATE INDEX idx_donazioni_data ON donazioni(data_emissione);