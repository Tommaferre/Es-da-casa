package com.petflix.petflix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petflix.petflix.model.Veterinario;

@Service
public interface VeterinarioService {


    // Metodi GET
    List<Veterinario> getVeterinari();

    Veterinario getVeterinarioById(int id_veterinario);

    List<Veterinario> getVeterinariByNome(String nome);
    
    List<Veterinario> getVeterinariByCognome(String cognome);

    // Metodi POST
    Veterinario addVeterinario(Veterinario veterinario);

    //Metodi PUT
    Veterinario updateVeterinario(Veterinario veterinario);

    // Metodi PATCH
    Veterinario patchVeterinario(int id_veterinario, Veterinario veterinario);

    // Metodi DELETE
    Veterinario deleteVeterinario(int id_veterinario);

    

}
