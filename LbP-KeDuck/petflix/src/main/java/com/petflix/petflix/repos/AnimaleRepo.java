package com.petflix.petflix.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petflix.petflix.model.Animale;


@Repository
public interface AnimaleRepo extends JpaRepository<Animale, Integer> {
        
    // Trova animale per microchip è optional perchè ci aspettiamo al max un solo animale
    // con quel microchip
    // SELECT * FROM animale WHERE microchip = ?
    Optional<Animale> findByMicrochip(String microchip);
    
    // Trova animali per nome (potrebbe esserci più animali con lo stesso nome) quindi lista
    // SELECT * FROM animale WHERE nome =?
    List<Animale> findByNome(String nome);
    
    // Trova animali per specie
    // SELECT * FROM animale WHERE specie =?
    List<Animale> findBySpecie(String specie);
    
    // Trova animali per stato
    // SELECT * FROM animale WHERE stato =?
    List<Animale> findByStato(String stato);
    
    // Trova animali per id_box
    // SELECT * FROM animale WHERE id_box =?
    List<Animale> findByIdBox(int id_box);
    
    // Trova animali per id_cartella_clinica
    // SELECT * FROM animale WHERE id_cartella_clinica =?
    Optional<Animale> findByIdCartellaClinica(int id_cartella_clinica);
}

