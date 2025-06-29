package com.petflix.petflix.services;

import java.util.List;
import java.util.Optional;

import com.petflix.petflix.model.Animale;

public interface AnimaleService {

    List<Animale> findAllAnimali();
    Optional<Animale> findAnimaleById(Integer id_animale);
    Optional<Animale> findAnimaleByMicrochip(String microchip);
    List<Animale> findAnimaliByNome(String nome);
    List<Animale> findAnimaliBySpecie(String specie);
    List<Animale> findAnimaliByStato(String stato);
    List<Animale> findByIdBox(Integer idBox);
    Animale saveAnimale(Animale animale);
    Animale updateAnimale(Integer id, Animale animaleDetails);
    void deleteById(Integer id);
    Animale patchAnimale (int id_animale, Animale animale);
    Optional<Animale> findByIdCartellaClinica(Integer id_cartella_clinica);
}
