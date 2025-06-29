package com.petflix.petflix.model;

// Modello che rappresenta un adottante, ovvero una persona che può adottare un animale.
// I campi rispecchiano la struttura della tabella 'adottanti' nel database.

import jakarta.persistence.*;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonCreator;

@Entity
@Table(name = "adottanti")
public class Adottante implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAdottante; // Identificativo univoco
    private String nome; // Nome dell'adottante
    private String cognome; // Cognome dell'adottante
    private String telefono; // Telefono
    private String email; // Email
    private String indirizzo; // Indirizzo di residenza
    
    @Convert(converter = StatoIdoneoConverter.class)
    private StatoIdoneo idoneo = StatoIdoneo.NON_IDONEO; // Stato idoneità

    // Enum per lo stato di idoneità
    public enum StatoIdoneo {
        IDONEO("idoneo"),
        NON_IDONEO("non idoneo");

        private final String valore;

        StatoIdoneo(String valore) {
            this.valore = valore;
        }

        public String getValore() {
            return valore;
        }

        @JsonCreator
        public static StatoIdoneo fromString(String value) {
            value = value.toLowerCase();
            if (value.equals("idoneo")) return IDONEO;
            if (value.equals("non idoneo")) return NON_IDONEO;
            throw new IllegalArgumentException("Valore StatoIdoneo non valido: " + value);
        }
    }

    // Getter e Setter
    public int getIdAdottante() { return idAdottante; }
    public void setIdAdottante(int idAdottante) { this.idAdottante = idAdottante; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getCognome() { return cognome; }
    public void setCognome(String cognome) { this.cognome = cognome; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getIndirizzo() { return indirizzo; }
    public void setIndirizzo(String indirizzo) { this.indirizzo = indirizzo; }
    public StatoIdoneo getIdoneo() { return idoneo; }
    public void setIdoneo(StatoIdoneo idoneo) { this.idoneo = idoneo; }
}
