package com.petflix.petflix.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petflix.petflix.model.Visita;
import com.petflix.petflix.repos.VisitaRepo;

@Service
public class VisitaServiceImpl implements VisitaService {
    
    @Autowired
    private VisitaRepo visitaRepo;
    
    @Override
    public List<Visita> getVisita() {
        
        return visitaRepo.findAll();
    }
    
    @Override
    public Visita AddVisita(Visita visita) {
        
        return visitaRepo.save(visita);
    }
    
    @Override
    public Visita UpdateVisita(Visita visita) {
        if (visitaRepo.existsById(visita.getId_visita())) {
            return visitaRepo.save(visita);
        } else {
            throw new RuntimeException("Visita not found with id: " + visita.getId_visita());
        }
    }
    
    @Override
    public List<Visita> getVisitaByVeterinarioId(int id_dottore_veterinario) {
        return visitaRepo.findByIdDottoreVeterinario(id_dottore_veterinario);
    }
    
    @Override
    public List<Visita> getVisitaByAnimaleId(int id_animale) {
        return visitaRepo.findByIdAnimale(id_animale);
    }

    @Override
    public Visita getVisitaById(int id_visita) {
        return visitaRepo.findById(id_visita)
                .orElseThrow(() -> new RuntimeException("Visita not found with id: " + id_visita));
    }

    @Override
    public Visita DeleteVisita(int id_visita) {
        Visita visita = visitaRepo.findById(id_visita)
                .orElseThrow(() -> new RuntimeException("Visita not found with id: " + id_visita));
        visitaRepo.delete(visita);
        return visita;  
    }

    @Override
    public Visita PatchVisita(int id_visita, Visita patchVisita) {
        // Recupera la visita esistente dal database
        Visita existingVisita = visitaRepo.findById(id_visita)
                .orElseThrow(() -> new RuntimeException("Visita not found with id: " + id_visita));
        
        // Aggiorna solo i campi non nulli
        if (patchVisita.getIdAnimale() != 0) {
            existingVisita.setIdAnimale(patchVisita.getIdAnimale());
        }
        
        if (patchVisita.getIdDottoreVeterinario() != 0) {
            existingVisita.setIdDottoreVeterinario(patchVisita.getIdDottoreVeterinario());
        }
        
        if (patchVisita.getData_visita() != null) {
            existingVisita.setData_visita(patchVisita.getData_visita());
        }
        
        if (patchVisita.getTerapia() != null) {
            existingVisita.setTerapia(patchVisita.getTerapia());
        }
        
        if (patchVisita.getFarmaci() != null) {
            existingVisita.setFarmaci(patchVisita.getFarmaci());
        }
        
        // Per i tipi primitivi come boolean, non possiamo verificare se sono null
        // Quindi dobbiamo decidere se vogliamo sempre aggiornare o usare un altro approccio
        existingVisita.setControllo(patchVisita.isControllo());
        
        if (patchVisita.getCosto() != 0) {
            existingVisita.setCosto(patchVisita.getCosto());
        }
        
        if (patchVisita.getNote() != null) {
            existingVisita.setNote(patchVisita.getNote());
        }
        
        // Salva la visita aggiornata nel database
        return visitaRepo.save(existingVisita);
    }

}
