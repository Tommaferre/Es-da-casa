package com.petflix.petflix.controller;
import com.petflix.petflix.model.Donazione;
import com.petflix.petflix.services.DonazioneServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

/**
 * Controller REST per la gestione delle Donazioni.
 * Espone le API per operazioni CRUD sulle donazioni.
 */
@RestController // Indica che questa classe è un controller REST
@RequestMapping("/donazioni") // Mappa tutte le richieste su /donazioni
public class DonazioneREST {
    @Autowired // Inietta automaticamente il service
    private DonazioneServiceImpl donazioneService;

    /**
     * Restituisce tutte le donazioni
     * GET /donazioni
     */
    @GetMapping
    public List<Donazione> getAll() {
        return donazioneService.findAll();
    }

    /**
     * Restituisce una donazione tramite ID
     * GET /donazioni/{id}
     */
    @GetMapping("/{id}")
    public Optional<Donazione> getById(@PathVariable int id) {
        return donazioneService.findById(id);
    }

    /**
     * Crea una nuova donazione
     * POST /donazioni
     */
    @PostMapping
    public Donazione create(@RequestBody Donazione donazione) {
        return donazioneService.save(donazione);
    }

    /**
     * Cancella una donazione tramite ID
     * DELETE /donazioni/{id}
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        donazioneService.deleteById(id);
    }

    /**
     * Aggiorna parzialmente una donazione tramite PATCH
     * PATCH /donazioni/{id}
     */
    @PatchMapping("/{id}")
    public Donazione patchDonazione(@PathVariable int id, @RequestBody Donazione patch) {
        Donazione donazione = donazioneService.findById(id).orElseThrow();
        if (patch.getTipo() != null) donazione.setTipo(patch.getTipo());
        if (patch.getContenuto() != null) donazione.setContenuto(patch.getContenuto());
        if (patch.getNote_donatore() != null) donazione.setNote_donatore(patch.getNote_donatore());
        if (patch.getData_emissione() != null) donazione.setData_emissione(patch.getData_emissione());

        return donazioneService.save(donazione);
    }

    /**
     * Aggiorna completamente una donazione tramite PUT
     * PUT /donazioni/{id}
     */
    @PutMapping("/{id}")
    public Donazione updateDonazione(@PathVariable int id, @RequestBody Donazione nuovaDonazione) {
        Donazione esistente = donazioneService.findById(id).orElseThrow();
        // Aggiorna tutti i campi
        esistente.setTipo(nuovaDonazione.getTipo());
        esistente.setContenuto(nuovaDonazione.getContenuto());
        esistente.setNote_donatore(nuovaDonazione.getNote_donatore());
        esistente.setData_emissione(nuovaDonazione.getData_emissione());
        // esistente.setId_donatore(nuovaDonazione.getId_donatore()); // rimosso id_donatore
        // aggiungi qui altri campi se necessario
        return donazioneService.save(esistente);
    }
}
