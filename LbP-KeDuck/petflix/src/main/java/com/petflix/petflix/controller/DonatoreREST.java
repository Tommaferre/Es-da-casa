package com.petflix.petflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.petflix.petflix.model.Donatore;
import com.petflix.petflix.services.DonatoreService;

/**
 * Controller REST per la gestione dei Donatori.
 * Espone endpoint per operazioni CRUD sui donatori.
 */
@RestController
@RequestMapping("/donatori")
public class DonatoreREST {
    @Autowired
    private DonatoreService donatoreService;

    @GetMapping
    public List<Donatore> getAllDonatori() {
        return donatoreService.getAllDonatori();
    }

    @GetMapping("/{id_donatore}")
    public ResponseEntity<Donatore> getDonatoreById(@PathVariable int id_donatore) {
        Donatore donatore = donatoreService.getDonatoreById(id_donatore);
        if (donatore == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(donatore);
    }

    @PostMapping
    public Donatore saveDonatore(@RequestBody Donatore donatore) {
        return donatoreService.saveDonatore(donatore);
    }

    @DeleteMapping("/{id_donatore}")
    public ResponseEntity<Void> deleteDonatore(@PathVariable int id_donatore) {
        Donatore esistente = donatoreService.getDonatoreById(id_donatore);
        if (esistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        donatoreService.deleteDonatore(id_donatore);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id_donatore}")
    public ResponseEntity<Donatore> updateDonatore(@PathVariable int id_donatore, @RequestBody Donatore donatore) {
        Donatore esistente = donatoreService.getDonatoreById(id_donatore);
        if (esistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        esistente.setNome(donatore.getNome());
        esistente.setCognome(donatore.getCognome());
        esistente.setEmail(donatore.getEmail());
        esistente.setIndirizzo(donatore.getIndirizzo());
        esistente.setTelefono(donatore.getTelefono());
        return ResponseEntity.ok(donatoreService.saveDonatore(esistente));
    }

    @PatchMapping("/{id_donatore}")
    public ResponseEntity<Donatore> patchDonatore(@PathVariable int id_donatore, @RequestBody Donatore donatore) {
        Donatore esistente = donatoreService.getDonatoreById(id_donatore);
        if (esistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (donatore.getNome() != null) esistente.setNome(donatore.getNome());
        if (donatore.getCognome() != null) esistente.setCognome(donatore.getCognome());
        if (donatore.getEmail() != null) esistente.setEmail(donatore.getEmail());
        if (donatore.getTelefono() != null) esistente.setTelefono(donatore.getTelefono());
        if (donatore.getIndirizzo() != null) esistente.setIndirizzo(donatore.getIndirizzo());
        return ResponseEntity.ok(donatoreService.saveDonatore(esistente));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllDonatori() {
        donatoreService.deleteAllDonatori();
        return ResponseEntity.noContent().build();
    }
}
