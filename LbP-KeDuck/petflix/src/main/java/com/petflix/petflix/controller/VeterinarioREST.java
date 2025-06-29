package com.petflix.petflix.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petflix.petflix.model.Veterinario;
import com.petflix.petflix.services.VeterinarioService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/veterinari")
public class VeterinarioREST {

    @Autowired
    private VeterinarioService veterinarioService;

    @GetMapping
    public List<Veterinario> getAllVeterinari() {
        return veterinarioService.getVeterinari();
    }
    
    @GetMapping("/{id}")
    public Veterinario getVeterinarioById(@PathVariable int id) {
        return veterinarioService.getVeterinarioById(id);
    }

    @GetMapping("/nome/{nome}")
    public List<Veterinario> getVeterinariByNome(@PathVariable String nome) {
        return veterinarioService.getVeterinariByNome(nome);
    }

    @GetMapping("/cognome/{cognome}")
    public List<Veterinario> getVeterinariByCognome(@PathVariable String cognome) {
        return veterinarioService.getVeterinariByCognome(cognome);
    }

    @PostMapping
    public Veterinario addVeterinario(@RequestBody Veterinario veterinario) {
        return veterinarioService.addVeterinario(veterinario);
    }

    @PutMapping("/{id}")
    public Veterinario updateVeterinario(@PathVariable int id, @RequestBody Veterinario veterinario) {
        veterinario.setId_dottore_veterinario(id);
        return veterinarioService.updateVeterinario(veterinario);
    }

    @PatchMapping("/{id}")
    public Veterinario patchVeterinario(@PathVariable int id, @RequestBody Veterinario veterinario) {
        return veterinarioService.patchVeterinario(id, veterinario);
    }

    @DeleteMapping("/{id}")
    public Veterinario deleteVeterinario(@PathVariable int id) {
        return veterinarioService.deleteVeterinario(id);
    }

}
