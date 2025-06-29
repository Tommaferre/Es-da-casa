package com.petflix.petflix.repos;

import com.petflix.petflix.model.CartellaClinica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository per la gestione delle operazioni CRUD sulla tabella cartella_clinica.
 * Estende JpaRepository per fornire i metodi base.
 */
@Repository
public interface CartellaClinicaRepo extends JpaRepository<CartellaClinica, Integer> {
    // Qui puoi aggiungere query custom se necessario
}
