package com.petflix.petflix.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.*; // Import delle annotazioni JPA

/**
 * Entità Donatore rappresenta un donatore nel sistema.
 */
@Entity // Indica che questa classe è una tabella del database
@Table(name = "donatori") // Specifica il nome della tabella nel database
@JsonPropertyOrder({"id_donatore", "nome", "cognome", "telefono", "email", "indirizzo"})
// Ordine delle proprietà nella serializzazione JSON
public class Donatore {
    @Id // Chiave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    @Column(name = "id_donatore") // Nome della colonna nel database
    @JsonProperty("id_donatore") // Nome della proprietà JSON

    private int id_donatore; // Identificativo univoco del donatore
    private String nome; // Nome del donatore
    private String cognome; // Cognome del donatore
    private String telefono; // Telefono del donatore
    private String email; // Email del donatore
    private String indirizzo; // Indirizzo del donatore
    
    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    // Getter e Setter
    public int getId_donatore() { return id_donatore; }
    public void setId_donatore(int id_donatore) { this.id_donatore = id_donatore; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getIndirizzo() { return indirizzo; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
}
