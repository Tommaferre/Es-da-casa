package com.petflix.petflix.services;

import java.util.List;
import java.util.Optional;

import com.petflix.petflix.model.Donazione;

/**
 * Interfaccia per la gestione delle donazioni.
 */
public interface DonazioneService {
    List<Donazione> findAll();
    Optional<Donazione> findById(Integer id);
    Donazione save(Donazione donazione);
    void deleteById(Integer id);
}
