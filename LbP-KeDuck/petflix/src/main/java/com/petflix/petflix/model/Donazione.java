package com.petflix.petflix.model;

// Importazioni per le annotazioni JPA e la gestione delle date
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entità che rappresenta una donazione.
 */

@Entity // Indica che questa classe è una tabella del database
@Table(name = "donazioni") // Specifica il nome della tabella nel database
public class Donazione {


    
    @Id// Chiave primaria della tabella
    @GeneratedValue (strategy = GenerationType.IDENTITY) // Generazione automatica dell'ID
    private int id_donazione; 


    // Tipo di donazione (es: denaro, oggetti, ecc.)
    private String tipo;

    // Contenuto della donazione (descrizione)
    private String contenuto;

    // Data di emissione della donazione
    private LocalDate data_emissione;

    // Note aggiuntive del donatore
    private String note_donatore;

    // ID del donatore
    private int id_donatore;


    // Getter e Setter

    /**
     * Restituisce l'ID della donazione.
     */
    public int getId_donazione() { return id_donazione; }

    /**
     * Imposta l'ID della donazione.
     */
    public void setId_donazione(int id_donazione) { this.id_donazione = id_donazione; }

    /**
     * Restituisce il tipo di donazione.
     */
    public String getTipo() { return tipo; }

    /**
     * Imposta il tipo di donazione.
     */
    public void setTipo(String tipo) { this.tipo = tipo; }

    /**
     * Restituisce il contenuto della donazione.
     */
    public String getContenuto() { return contenuto; }

    /**
     * Imposta il contenuto della donazione.
     */
    public void setContenuto(String contenuto) { this.contenuto = contenuto; }

    /**
     * Restituisce la data di emissione.
     */
    public LocalDate getData_emissione() { return data_emissione; }

    /**
     * Imposta la data di emissione.
     */
    public void setData_emissione(LocalDate data_emissione) { this.data_emissione = data_emissione; }

    /**
     * Restituisce le note del donatore.
     */
    public String getNote_donatore() { return note_donatore; }

    /**
     * Imposta le note del donatore.
     */
    public void setNote_donatore(String note_donatore) { this.note_donatore = note_donatore; }

    /**
     * Restituisce l'ID del donatore.
     */
    public int getId_donatore() { return id_donatore; }

    /**
     * Imposta l'ID del donatore.
     */
    public void setId_donatore(int id_donatore) { this.id_donatore = id_donatore; }

}
