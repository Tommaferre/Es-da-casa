package com.petflix.petflix.repos;

// Repository JPA per la gestione degli adottanti.
// Fornisce metodi per accedere e filtrare gli adottanti nel database.

import com.petflix.petflix.model.Adottante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdottanteRepo extends JpaRepository<Adottante, Integer> {
    // Ricerca per email
    List<Adottante> findByEmail(String email);
    // Ricerca per cognome
    List<Adottante> findByCognome(String cognome);
}
