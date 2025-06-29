package com.petflix.petflix.services;

import com.petflix.petflix.model.CartellaClinica;
import java.util.List;
import java.util.Optional;

/**
 * Interfaccia di servizio per la gestione delle cartelle cliniche.
 * Definisce i metodi CRUD principali.
 */
public interface CartellaClinicaService {
    List<CartellaClinica> findAll();
    Optional<CartellaClinica> findById(Integer id);
    CartellaClinica save(CartellaClinica cartellaClinica);
    void deleteById(Integer id);
}
