package com.petflix.petflix.services;

// Interfaccia che definisce i servizi disponibili per la gestione delle adozioni.
// Permette di astrarre la logica di business dal controller.

import java.util.List;
import java.util.Optional;

import com.petflix.petflix.model.Adozione;

public interface AdozioneService {

    // Restituisce tutte le adozioni
    List<Adozione> getAll();

    // Salva o aggiorna un'adozione
    Adozione salva(Adozione adozione);

    // Elimina un'adozione per ID
    boolean elimina(int id);

    // Restituisce le adozioni filtrate per stato
    List<Adozione> getByStato(String stato);

    // Restituisce le adozioni di un determinato adottante
    List<Adozione> getByAdottante(int idAdottante);
    
    // Restituisce un'adozione per ID
    Optional<Adozione> getById(int id);

    // Ricerca per quota donazione
    List<Adozione> getByQuotaDonazione(Double quotaDonazione);

    // Ricerca per note donazione
    List<Adozione> getByNoteDonazione(String noteDonazione);


}
