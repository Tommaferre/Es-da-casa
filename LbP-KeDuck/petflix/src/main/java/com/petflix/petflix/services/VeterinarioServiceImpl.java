package com.petflix.petflix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petflix.petflix.model.Veterinario;
import com.petflix.petflix.repos.VeterinarioRepo;


@Service
public class VeterinarioServiceImpl implements VeterinarioService {

    @Autowired
    private VeterinarioRepo veterinarioRepo;



    /**
     * Implementazione dei metodi dell'interfaccia VeterinarioService.
     * Questa classe fornisce le operazioni CRUD per i Veterinari.
     */
    @Override
    public List<Veterinario> getVeterinari() {
        return veterinarioRepo.findAll();
    }

    @Override
    public Veterinario getVeterinarioById(int id_veterinario) {
        return veterinarioRepo.findById(id_veterinario)
                .orElseThrow(() -> new RuntimeException("Veterinario not found with id: " + id_veterinario));
    }

    @Override
    public List<Veterinario> getVeterinariByNome(String nome) {
        return veterinarioRepo.findByNome(nome);
    }

    @Override
    public List<Veterinario> getVeterinariByCognome(String cognome) {
        return veterinarioRepo.findByCognome(cognome);
    }

    @Override
    public Veterinario addVeterinario(Veterinario veterinario) {
        return veterinarioRepo.save(veterinario);
    }

    @Override
    public Veterinario updateVeterinario(Veterinario veterinario) {
        if (veterinarioRepo.existsById(veterinario.getId_dottore_veterinario())) {
            return veterinarioRepo.save(veterinario);
        } else {
            throw new RuntimeException("Veterinario not found with id: " + veterinario.getId_dottore_veterinario());
        }
        
    }

    
    @Override
    public Veterinario deleteVeterinario(int id_veterinario) {
        Veterinario veterinario = veterinarioRepo.findById(id_veterinario)
                .orElseThrow(() -> new RuntimeException("Veterinario not found with id: " + id_veterinario));
        veterinarioRepo.delete(veterinario);
        return veterinario;
        
    }

    @Override
    public Veterinario patchVeterinario(int id_veterinario, Veterinario veterinario) {
        
        Veterinario existingVeterinario = veterinarioRepo.findById(id_veterinario)
                .orElseThrow(() -> new RuntimeException("Veterinario not found with id: " + id_veterinario));

        // Update only the fields that are not null
        if (veterinario.getNome() != null) {
            existingVeterinario.setNome(veterinario.getNome());
        }
        if (veterinario.getCognome() != null) {
            existingVeterinario.setCognome(veterinario.getCognome());
        }
        if (veterinario.getTelefono() != null) {
            existingVeterinario.setTelefono(veterinario.getTelefono());
        }
        if (veterinario.getEmail() != null) {
            existingVeterinario.setEmail(veterinario.getEmail());
        }
        return veterinarioRepo.save(existingVeterinario);
    }
}
