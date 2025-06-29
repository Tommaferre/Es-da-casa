package com.petflix.petflix.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petflix.petflix.model.CartellaClinica;
import com.petflix.petflix.services.CartellaClinicaService;

/**
 * Controller REST per la gestione delle cartelle cliniche.
 * Espone endpoint per operazioni CRUD e PATCH.
 */
@RestController
@RequestMapping("cartelle")
public class CartellaClinicaREST {
    @Autowired
    private final CartellaClinicaService cartellaClinicaService;

    public CartellaClinicaREST(CartellaClinicaService cartellaClinicaService) {
        this.cartellaClinicaService = cartellaClinicaService;
    }

    // GET tutte le cartelle cliniche
    @GetMapping
    public List<CartellaClinica> getAll() {
        return cartellaClinicaService.findAll();
    }

    // GET cartella clinica per id
    @GetMapping("/{id}")
    public ResponseEntity<CartellaClinica> getById(@PathVariable Integer id) {
        Optional<CartellaClinica> result = cartellaClinicaService.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST nuova cartella clinica
    @PostMapping
    public CartellaClinica create(@RequestBody CartellaClinica cartellaClinica) {
        return cartellaClinicaService.save(cartellaClinica);
    }

    // PUT aggiorna cartella clinica
    @PutMapping("/{id}")
    public ResponseEntity<CartellaClinica> update(@PathVariable Integer id, @RequestBody CartellaClinica cartellaClinica) {
        if (!cartellaClinicaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cartellaClinica.setIdCartellaClinica(id);
        return ResponseEntity.ok(cartellaClinicaService.save(cartellaClinica));
    }

    // PATCH aggiorna parzialmente cartella clinica
    @PatchMapping("/{id}")
    public ResponseEntity<CartellaClinica> patch(@PathVariable Integer id, @RequestBody CartellaClinica patchData) {
        Optional<CartellaClinica> optional = cartellaClinicaService.findById(id);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CartellaClinica entity = optional.get();
        // Esempio di patch: aggiorna solo i campi non nulli
        if (patchData.getGruppoSanguigno() != null) entity.setGruppoSanguigno(patchData.getGruppoSanguigno());
        if (patchData.getSterilizzato() != null) entity.setSterilizzato(patchData.getSterilizzato());
        if (patchData.getPeso() != null) entity.setPeso(patchData.getPeso());
        if (patchData.getSesso() != null) entity.setSesso(patchData.getSesso());
        if (patchData.getEtaStimata() != null) entity.setEtaStimata(patchData.getEtaStimata());
        if (patchData.getAltezza() != null) entity.setAltezza(patchData.getAltezza());
        if (patchData.getAllergieNote() != null) entity.setAllergieNote(patchData.getAllergieNote());
        if (patchData.getAnimaleId() != null) entity.setAnimaleId(patchData.getAnimaleId());
        return ResponseEntity.ok(cartellaClinicaService.save(entity));
    }

    // DELETE cartella clinica
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!cartellaClinicaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cartellaClinicaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
