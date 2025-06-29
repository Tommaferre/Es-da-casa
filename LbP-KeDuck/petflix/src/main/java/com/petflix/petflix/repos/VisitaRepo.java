package com.petflix.petflix.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petflix.petflix.model.Visita;

@Repository
public interface VisitaRepo extends JpaRepository<Visita, Integer> {


    List<Visita> findByIdAnimale(int id_animale);

    
    List<Visita> findByIdDottoreVeterinario(int id_dottore_veterinario);
}
