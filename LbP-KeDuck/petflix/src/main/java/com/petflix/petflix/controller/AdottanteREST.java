package com.petflix.petflix.controller;

// Controller REST che gestisce le richieste HTTP per gli adottanti.
// Espone endpoint per CRUD, ricerca e aggiornamento parziale degli adottanti.

import com.petflix.petflix.model.Adottante;
import com.petflix.petflix.services.AdottanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adottanti")
public class AdottanteREST {
    @Autowired
    private AdottanteService adottanteService; // Service per la logica di business

    // Restituisce tutti gli adottanti
    @GetMapping
    public List<Adottante> getAll() {
        return adottanteService.getAll();
    }

    // Restituisce un adottante per ID
    @GetMapping("/{id}")
    public ResponseEntity<Adottante> getById(@PathVariable int id) {
        return adottanteService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Crea un nuovo adottante
    @PostMapping
    public ResponseEntity<Adottante> crea(@RequestBody Adottante adottante) {
        Adottante salvato = adottanteService.salva(adottante);
        return ResponseEntity.ok(salvato);
    }

    // Aggiorna un adottante esistente
    @PutMapping("/{id}")
    public ResponseEntity<Adottante> aggiorna(@PathVariable int id, @RequestBody Adottante adottante) {
        if (!adottanteService.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        adottante.setIdAdottante(id);
        return ResponseEntity.ok(adottanteService.salva(adottante));
    }

    // Elimina un adottante per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable int id) {
        boolean esiste = adottanteService.elimina(id);
        return esiste ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Ricerca per email
    @GetMapping("/email/{email}")
    public List<Adottante> getByEmail(@PathVariable String email) {
        return adottanteService.getByEmail(email);
    }

    // Ricerca per cognome
    @GetMapping("/cognome/{cognome}")
    public List<Adottante> getByCognome(@PathVariable String cognome) {
        return adottanteService.getByCognome(cognome);
    }

    // Aggiorna parzialmente un adottante esistente (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Adottante> patchAdottante(@PathVariable int id, @RequestBody Adottante patch) {
        return adottanteService.getById(id)
            .map(existing -> {
                if (patch.getNome() != null) existing.setNome(patch.getNome());
                if (patch.getCognome() != null) existing.setCognome(patch.getCognome());
                if (patch.getEmail() != null) existing.setEmail(patch.getEmail());
                if (patch.getTelefono() != null) existing.setTelefono(patch.getTelefono());
                if (patch.getIndirizzo() != null) existing.setIndirizzo(patch.getIndirizzo());
                // RIMOSSA: note per allineamento con il database
                return ResponseEntity.ok(adottanteService.salva(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
