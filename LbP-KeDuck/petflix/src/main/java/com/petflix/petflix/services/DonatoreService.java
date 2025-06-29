package com.petflix.petflix.services;

import java.util.List;

import com.petflix.petflix.model.Donatore;

public interface DonatoreService {
    List<Donatore> getAllDonatori();
    Donatore getDonatoreById(int id_donatore);
    Donatore saveDonatore(Donatore donatore);
    void deleteDonatore(int id_donatore);
    void deleteAllDonatori();
    List<Donatore> updateAllDonatori(List<Donatore> donatori);
}
