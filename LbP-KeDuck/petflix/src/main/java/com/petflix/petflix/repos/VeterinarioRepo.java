package com.petflix.petflix.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petflix.petflix.model.Veterinario;

public interface VeterinarioRepo extends JpaRepository<Veterinario, Integer> {
    // Interfaccia per le operazioni CRUD sui Veterinari
    // Estende JpaRepository per fornire metodi predefiniti
    // per la gestione dei Veterinari nel database.

    List<Veterinario> findByNome(String nome);

    List<Veterinario> findByCognome(String cognome);

}
