package com.petflix.petflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petflix.petflix.model.Animale;
import com.petflix.petflix.services.AnimaleServiceImpl;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("animali")
public class AnimaleREST {

    @Autowired
    private AnimaleServiceImpl animaleService;

    @GetMapping
    public List<Animale> getAnimali() {
        return animaleService.findAllAnimali();
    }

    @GetMapping("/{id}")
    public Animale getAnimale(@PathVariable int id) {
        return animaleService.findAnimaleById(id).orElse(null);
    }

    @GetMapping("/microchip/{microchip}")
    public Animale getAnimaleByMicrochip(@PathVariable String microchip) {
        return animaleService.findAnimaleByMicrochip(microchip).orElse(null);
    }

    @GetMapping("/nome/{nome}")
    public List<Animale> getAnimaliByNome(@PathVariable String nome) {
        return animaleService.findAnimaliByNome(nome);
    }

    @GetMapping("/specie/{specie}")
    public List<Animale> getAnimaliBySpecie(@PathVariable String specie) {
        return animaleService.findAnimaliBySpecie(specie);
    }

    @GetMapping("/stato/{stato}")
    public List<Animale> getAnimaliByStato(@PathVariable String stato) {
        return animaleService.findAnimaliByStato(stato);
    }

    @GetMapping("/box/{idBox}")
    public List<Animale> getAnimaliByBox(@PathVariable Integer idBox) {
        return animaleService.findByIdBox(idBox);
    }

    @GetMapping("/cartella-clinica/{idCartellaClinica}")
    public Animale getAnimaleByCartellaClinica(@PathVariable Integer idCartellaClinica) {
        return animaleService.findByIdCartellaClinica(idCartellaClinica).orElse(null);
    }

    @PostMapping()
    public Animale addAnimale(@RequestBody Animale animale) {
        return animaleService.saveAnimale(animale);
    }

    @PutMapping("/{id}")
    public Animale updateAnimale(@PathVariable int id, @RequestBody Animale animale) {
        animale.setId_animale(id);
        return animaleService.updateAnimale(id, animale);
    }

    @DeleteMapping("/{id}")
    public void deleteAnimale(@PathVariable int id) {
        animaleService.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Animale patchAnimale(@PathVariable int id, @RequestBody Animale animale) {
        return animaleService.patchAnimale(id, animale);
    }
}
