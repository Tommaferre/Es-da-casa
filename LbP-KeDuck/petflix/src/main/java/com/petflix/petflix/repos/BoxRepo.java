package com.petflix.petflix.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petflix.petflix.model.Box;

@Repository
public interface BoxRepo extends JpaRepository<Box, Integer> {
    
    // Trova box per nome
    // SELECT * FROM box WHERE nome = ?
    Optional<Box> findByNome(String nome);
    
    // Trova box per capienza maggiore o uguale
    // SELECT * FROM box WHERE capienza >= ?
    List<Box> findByCapienzaGreaterThanEqual(Integer capienza);
}