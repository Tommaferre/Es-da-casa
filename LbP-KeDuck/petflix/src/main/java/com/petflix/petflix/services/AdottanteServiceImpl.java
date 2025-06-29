package com.petflix.petflix.services;

// Implementazione dell'interfaccia AdottanteService.
// Gestisce la logica di business e interagisce con il repository per le operazioni CRUD sugli adottanti.

import com.petflix.petflix.model.Adottante;
import com.petflix.petflix.repos.AdottanteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdottanteServiceImpl implements AdottanteService {
    @Autowired
    private AdottanteRepo adottanteRepo; // Repository per l'accesso ai dati degli adottanti

    // Restituisce tutti gli adottanti
    public List<Adottante> getAll() {
        return adottanteRepo.findAll();
    }

    // Restituisce un adottante per ID
    public Optional<Adottante> getById(int id) {
        return adottanteRepo.findById(id);
    }

    // Salva o aggiorna un adottante
    public Adottante salva(Adottante adottante) {
        return adottanteRepo.save(adottante);
    }

    // Elimina un adottante se esiste, altrimenti restituisce false
    public boolean elimina(int id) {
        if (adottanteRepo.existsById(id)) {
            adottanteRepo.deleteById(id);
            return true;
        }
        return false;
    }

    // Ricerca per email
    public List<Adottante> getByEmail(String email) {
        return adottanteRepo.findByEmail(email);
    }

    // Ricerca per cognome
    public List<Adottante> getByCognome(String cognome) {
        return adottanteRepo.findByCognome(cognome);
    }
}
