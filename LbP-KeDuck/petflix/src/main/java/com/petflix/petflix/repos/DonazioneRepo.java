package com.petflix.petflix.repos;
import com.petflix.petflix.model.Donazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interfaccia repository per la gestione delle Donazioni.
 * Estende JpaRepository per fornire metodi CRUD già pronti.
 */
@Repository // Indica che questa interfaccia è un componente di accesso ai dati
public interface DonazioneRepo extends JpaRepository<Donazione, Integer> {
    // Qui puoi aggiungere metodi personalizzati per query specifiche, se necessario.
}
