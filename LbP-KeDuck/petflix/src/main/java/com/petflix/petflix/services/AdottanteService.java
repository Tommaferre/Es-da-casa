package com.petflix.petflix.services;

// Interfaccia che definisce i servizi disponibili per la gestione degli adottanti.
// Permette di astrarre la logica di business dal controller.

import com.petflix.petflix.model.Adottante;
import java.util.List;
import java.util.Optional;

public interface AdottanteService {
    // Restituisce tutti gli adottanti
    List<Adottante> getAll();
    // Salva o aggiorna un adottante
    Adottante salva(Adottante adottante);
    // Elimina un adottante per ID
    boolean elimina(int id);
    // Restituisce un adottante per ID
    Optional<Adottante> getById(int id);
    // Ricerca per email
    List<Adottante> getByEmail(String email);
    // Ricerca per cognome
    List<Adottante> getByCognome(String cognome);
}
