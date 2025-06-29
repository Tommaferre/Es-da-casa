package com.petflix.petflix.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cartelle_cliniche")
@JsonPropertyOrder({
        "id_cartella_clinica",
        "gruppo_sanguigno",
        "sterilizzato",
        "peso",
        "sesso",
        "eta_stimata",
        "altezza",
        "allergie_note",
        "animale_id"
})
public class CartellaClinica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cartella_clinica")
    @JsonProperty("id_cartella_clinica")
    private Integer idCartellaClinica;
    private String gruppoSanguigno;
    private Boolean sterilizzato = false;
    private Double peso;
    @Enumerated(EnumType.STRING)
    private Sesso sesso;
    private String etaStimata;
    private Double altezza;
    private String allergieNote;
    @Column(name = "id_animale")
    private Integer animaleId;

    public enum Sesso { M, F }

    // Getter e Setter
    public Integer getIdCartellaClinica() { return idCartellaClinica; }
    public void setIdCartellaClinica(Integer idCartellaClinica) { this.idCartellaClinica = idCartellaClinica; }

    public String getGruppoSanguigno() { return gruppoSanguigno; }
    public void setGruppoSanguigno(String gruppoSanguigno) { this.gruppoSanguigno = gruppoSanguigno; }

    public Boolean getSterilizzato() { return sterilizzato; }
    public void setSterilizzato(Boolean sterilizzato) { this.sterilizzato = sterilizzato; }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }

    public Sesso getSesso() { return sesso; }
    public void setSesso(Sesso sesso) { this.sesso = sesso; }

    public String getEtaStimata() { return etaStimata; }
    public void setEtaStimata(String etaStimata) { this.etaStimata = etaStimata; }

    public Double getAltezza() { return altezza; }
    public void setAltezza(Double altezza) { this.altezza = altezza; }

    public String getAllergieNote() { return allergieNote; }
    public void setAllergieNote(String allergieNote) { this.allergieNote = allergieNote; }

    public Integer getAnimaleId() { return animaleId; }
    public void setAnimaleId(Integer animaleId) { this.animaleId = animaleId; }
}
