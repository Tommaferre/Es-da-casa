package com.petflix.petflix.services;

// Implementazione dell'interfaccia AdozioneService.
// Gestisce la logica di business e interagisce con il repository per le operazioni CRUD sulle adozioni.

import com.petflix.petflix.model.Adozione;
import com.petflix.petflix.repos.AdozioneRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdozioneServiceImpl implements AdozioneService {

    @Autowired
    private AdozioneRepo adozioneRepo; // Repository per l'accesso ai dati delle adozioni

    // Restituisce tutte le adozioni
    public List<Adozione> getAll() {
        return adozioneRepo.findAll();
    }

    // Restituisce un'adozione per ID
    public Optional<Adozione> getById(int id) {
        return adozioneRepo.findById(id);
    }

    // Salva o aggiorna un'adozione
    public Adozione salva(Adozione adozione) {
        return adozioneRepo.save(adozione);
    }

    // Elimina un'adozione se esiste, altrimenti restituisce false
    public boolean elimina(int id) {
        if (adozioneRepo.existsById(id)) {
            adozioneRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // Restituisce le adozioni filtrate per stato
    public List<Adozione> getByStato(String stato) {
        return adozioneRepo.findByStato(stato);
    }

    // Restituisce le adozioni di un determinato adottante
    public List<Adozione> getByAdottante(int idAdottante) {
        return adozioneRepo.findByIdAdottante(idAdottante);
    }

    // Restituisce le adozioni filtrate per quota donazione
    public List<Adozione> getByQuotaDonazione(Double quotaDonazione) {
        return adozioneRepo.findByQuotaDonazione(quotaDonazione);
    }

    // Restituisce le adozioni filtrate per note donazione
    public List<Adozione> getByNoteDonazione(String noteDonazione) {
        return adozioneRepo.findByNoteDonazione(noteDonazione);
    }
}
