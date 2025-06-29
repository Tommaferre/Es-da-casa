package com.petflix.petflix.repos;

import com.petflix.petflix.model.Donatore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonatoreRepo extends JpaRepository<Donatore, Integer> {
    // ...aggiungi query personalizzate se necessario...
}
