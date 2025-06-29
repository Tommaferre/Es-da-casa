package com.petflix.petflix.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petflix.petflix.model.Box;
import com.petflix.petflix.repos.BoxRepo;

@Service
public class BoxServiceImpl implements BoxService {

    @Autowired
    private BoxRepo boxRepo;

    @Override
    public List<Box> findAllBox() {
        return boxRepo.findAll();
    }

    @Override
    public Optional<Box> findBoxById(Integer id_box) {
        return boxRepo.findById(id_box);
    }

    @Override
    public Optional<Box> findBoxByNome(String nome) {
        return boxRepo.findByNome(nome);
    }

    @Override
    public List<Box> findBoxByCapienzaMinima(Integer capienza) {
        return boxRepo.findByCapienzaGreaterThanEqual(capienza);
    }

    @Override
    public Box saveBox(Box box) {
        return boxRepo.save(box);
    }

    @Override
    public Box updateBox(Integer id, Box boxDetails) {
        Box box = boxRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Box non trovato con id: " + id));

        box.setNome(boxDetails.getNome());
        box.setCapienza(boxDetails.getCapienza());

        return boxRepo.save(box);
    }

    @Override
    public Box patchBox(int id_box, Box patchBox) {
        // Recupera il box esistente dal database
        Box existingBox = boxRepo.findById(id_box)
                .orElseThrow(() -> new RuntimeException("Box not found with id: " + id_box));

        // Aggiorna solo i campi non nulli
        if (patchBox.getNome() != null) {
            existingBox.setNome(patchBox.getNome());
        }

        if (patchBox.getCapienza() != 0) {
            existingBox.setCapienza(patchBox.getCapienza());
        }

        // Salva il box aggiornato nel database
        return boxRepo.save(existingBox);
    }

    @Override
    public void deleteById(Integer id) {
        boxRepo.deleteById(id);
    }
}