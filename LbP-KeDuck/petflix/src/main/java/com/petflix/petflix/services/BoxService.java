package com.petflix.petflix.services;

import java.util.List;
import java.util.Optional;

import com.petflix.petflix.model.Box;

public interface BoxService {

    List<Box> findAllBox();
    Optional<Box> findBoxById(Integer id_box);
    Optional<Box> findBoxByNome(String nome);
    List<Box> findBoxByCapienzaMinima(Integer capienza);
    Box saveBox(Box box);
    Box updateBox(Integer id, Box boxDetails);
    void deleteById(Integer id);
    Box patchBox(int id_box, Box box);
}