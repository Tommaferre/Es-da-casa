package com.petflix.petflix.services;

import com.petflix.petflix.model.CartellaClinica;
import com.petflix.petflix.repos.CartellaClinicaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Implementazione del service per la gestione delle cartelle cliniche.
 * Utilizza il repository CartellaClinicaRepo per le operazioni CRUD.
 */
@Service
public class CartellaClinicaServiceImpl implements CartellaClinicaService {
    @Autowired
    private final CartellaClinicaRepo cartellaClinicaRepo;

    public CartellaClinicaServiceImpl(CartellaClinicaRepo cartellaClinicaRepo) {
        this.cartellaClinicaRepo = cartellaClinicaRepo;
    }

    @Override
    public List<CartellaClinica> findAll() {
        return cartellaClinicaRepo.findAll();
    }

    @Override
    public Optional<CartellaClinica> findById(Integer id) {
        return cartellaClinicaRepo.findById(id);
    }

    @Override
    public CartellaClinica save(CartellaClinica cartellaClinica) {
        return cartellaClinicaRepo.save(cartellaClinica);
    }

    @Override
    public void deleteById(Integer id) {
        cartellaClinicaRepo.deleteById(id);
    }
}
