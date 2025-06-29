package com.petflix.petflix.controller;

// Controller REST che gestisce le richieste HTTP per le adozioni.
// Espone endpoint per CRUD e ricerca delle adozioni.

import com.petflix.petflix.model.Adozione;
import com.petflix.petflix.services.AdozioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adozioni")
public class AdozioneREST {
    @Autowired
    private AdozioneService adozioneService; // Service per la logica di business

    // Restituisce tutte le adozioni
    @GetMapping
    public List<Adozione> getAll() {
        return adozioneService.getAll();
    }

    // Restituisce una singola adozione per ID
    @GetMapping("/{id}")
    public ResponseEntity<Adozione> getById(@PathVariable int id) {
        return adozioneService.getById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Crea una nuova adozione
    @PostMapping
    public ResponseEntity<Adozione> crea(@RequestBody Adozione adozione) {
        Adozione salvata = adozioneService.salva(adozione);
        return ResponseEntity.ok(salvata);
    }

    // Endpoint per ricerca per quota donazione
    @GetMapping("/donazione/{quota}")
    public List<Adozione> getByQuotaDonazione(@PathVariable Double quota) {
        return adozioneService.getByQuotaDonazione(quota);
    }

    // Endpoint per ricerca per note donazione
    @GetMapping("/notedonazione/{note}")
    public List<Adozione> getByNoteDonazione(@PathVariable String note) {
        return adozioneService.getByNoteDonazione(note);
    }

    // Aggiorna un'adozione esistente
    @PutMapping("/{id}")
    public ResponseEntity<Adozione> aggiorna(@PathVariable int id, @RequestBody Adozione adozione) {
        if (!adozioneService.getById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        adozione.setIdAdozione(id);
        return ResponseEntity.ok(adozioneService.salva(adozione));
    }

    // Aggiorna parzialmente un'adozione esistente (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<Adozione> patchAdozione(@PathVariable int id, @RequestBody Adozione patch) {
        return adozioneService.getById(id)
            .map(existing -> {
                // Aggiorna solo i campi non nulli del patch
                if (patch.getIdAnimale() != 0) existing.setIdAnimale(patch.getIdAnimale());
                if (patch.getIdModuloAdozione() != 0) existing.setIdModuloAdozione(patch.getIdModuloAdozione());
                if (patch.getIdAdottante() != 0) existing.setIdAdottante(patch.getIdAdottante());
                if (patch.getDataRichiesta() != null) existing.setDataRichiesta(patch.getDataRichiesta());
                if (patch.getDataAdozione() != null) existing.setDataAdozione(patch.getDataAdozione());
                if (patch.getStato() != null) existing.setStato(patch.getStato());
                if (patch.getQuotaAdozione() != null) existing.setQuotaAdozione(patch.getQuotaAdozione());
                if (patch.getQuotaDonazione() != null) existing.setQuotaDonazione(patch.getQuotaDonazione());
                if (patch.getNote() != null) existing.setNote(patch.getNote());
                if (patch.getNoteDonazione() != null) existing.setNoteDonazione(patch.getNoteDonazione());
                return ResponseEntity.ok(adozioneService.salva(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Elimina un'adozione per ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> elimina(@PathVariable int id) {
        boolean esiste = adozioneService.elimina(id);
        return esiste ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
