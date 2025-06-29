package com.petflix.petflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petflix.petflix.model.Visita;
import com.petflix.petflix.services.VisitaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
@RequestMapping("visita")
public class VisitaREST {

    @Autowired
    private VisitaService visitaService;

    
    @GetMapping
    public List<Visita> getVisite() {
        return visitaService.getVisita();
    }

    @GetMapping("/{id}")
    public Visita getVisita(@PathVariable int id) {
        return visitaService.getVisitaById(id);
    }

    @GetMapping("/veterinario/{id}")
    public List<Visita> getVisiteByVeterinarioId(@PathVariable int id) {
        return visitaService.getVisitaByVeterinarioId(id);
    }

    @GetMapping("/animale/{id}")
    public List<Visita> getVisiteByAnimaleId(@PathVariable int id) {
        return visitaService.getVisitaByAnimaleId(id);
    }
    

    @PostMapping()
    public  Visita addVisita(@RequestBody Visita visita) {
        return visitaService.AddVisita(visita);
    }

    @PutMapping("/{id}")
    public Visita updateVisita(@PathVariable int id, @RequestBody Visita visita) {
        visita.setId_visita(id);
        return visitaService.UpdateVisita(visita);
    }

    @DeleteMapping("/{id}")
    public void deleteVisita(@PathVariable int id) {
        visitaService.DeleteVisita(id);
    }

    @PatchMapping("/{id}")
    public Visita patchVisita(@PathVariable int id, @RequestBody Visita visita) {
        return visitaService.PatchVisita(id, visita);
    }

}