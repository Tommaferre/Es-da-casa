package com.petflix.petflix.services;

import com.petflix.petflix.model.Donatore;
import com.petflix.petflix.repos.DonatoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonatoreServiceImpl implements DonatoreService {
    @Autowired
    private DonatoreRepo donatoreRepos;

    @Override
    public List<Donatore> getAllDonatori() {
        return donatoreRepos.findAll();
    }

    @Override
    public Donatore getDonatoreById(int id_donatore) {
        Optional<Donatore> donatore = donatoreRepos.findById(id_donatore);
        return donatore.orElse(null);
    }

    @Override
    public Donatore saveDonatore(Donatore donatore) {
        return donatoreRepos.save(donatore);
    }

    @Override
    public void deleteDonatore(int id_donatore) {
        donatoreRepos.deleteById(id_donatore);
    }

    @Override
    public void deleteAllDonatori() {
        donatoreRepos.deleteAll();
    }

    @Override
    public List<Donatore> updateAllDonatori(List<Donatore> donatori) {
        return donatoreRepos.saveAll(donatori);
    }
}
