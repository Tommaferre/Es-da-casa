package com.petflix.petflix.repos;

// Repository JPA per la gestione delle entità Adozione.
// Fornisce metodi per accedere e filtrare le adozioni nel database.

import com.petflix.petflix.model.Adozione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdozioneRepo extends JpaRepository<Adozione, Integer> {

    // Trova adozioni per stato (es. "richiesta", "approvata", ecc.)
    List<Adozione> findByStato(String stato);

    // Trova adozioni per ID adottante
    List<Adozione> findByIdAdottante(int idAdottante);

    // Trova adozioni per quota donazione
    List<Adozione> findByQuotaDonazione(Double quotaDonazione);

    // Trova adozioni per note donazione
    List<Adozione> findByNoteDonazione(String noteDonazione);
}

