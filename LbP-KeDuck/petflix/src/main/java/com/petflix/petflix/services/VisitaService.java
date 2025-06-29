package com.petflix.petflix.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.petflix.petflix.model.Visita;

@Service
public interface VisitaService {


    // Metodi GET 
    List<Visita> getVisita();
    
    Visita getVisitaById(int id_visita);

    List<Visita> getVisitaByVeterinarioId(int id_dottore_veterinario);

    List<Visita> getVisitaByAnimaleId(int id_animale);
    
    // Metodi POST
    Visita AddVisita(Visita visita);

    // Metodi PUT
    Visita UpdateVisita(Visita visita);

    // Metodi PATCH
    Visita PatchVisita(int id_visita, Visita visita);
    
    // Metodi DELETE
    Visita DeleteVisita(int id_visita);
}
