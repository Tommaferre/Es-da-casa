package com.petflix.petflix.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "visite_veterinarie")
@JsonPropertyOrder({
    "id_visita",
    "id_animale",
    "id_dottore_veterinario",
    "data_visita",
    "tipo_visita",
    "terapia",
    "farmaci",
    "controllo",
    "costo",
    "note"
})
public class Visita {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id_visita;

    @Column(name = "id_animale")
    @JsonProperty("id_animale")
    private int idAnimale;

    @Column(name = "id_dottore_veterinario")
    @JsonProperty("id_dottore_veterinario")
    private int idDottoreVeterinario;

    private Date data_visita;

    private String tipo_visita;
    
    private String terapia;
    
    private String farmaci;
    
    private boolean controllo;
    
    private double costo;
    
    private String note;
    
    
    public int getId_visita() {
        return id_visita;
    }
    
    public void setId_visita(int id_visita) {
        this.id_visita = id_visita;
    }
    
    public int getIdAnimale() {
        return idAnimale;
    }
    
    public void setIdAnimale(int id_animale) {
        this.idAnimale = id_animale;
    }
    
    public int getIdDottoreVeterinario() {
        return idDottoreVeterinario;
    }
    
    public void setIdDottoreVeterinario(int id_dottore_veterinario) {
        this.idDottoreVeterinario = id_dottore_veterinario;
    }
    
    public Date getData_visita() {
        return data_visita;
    }
    
    public void setData_visita(Date data_visita) {
        this.data_visita = data_visita;
    }
    
    public String getTipo_visita() {
        return tipo_visita;
    }

    public void setTipo_visita(String tipo_visita) {
        this.tipo_visita = tipo_visita;
    }

    public String getTerapia() {
        return terapia;
    }
    
    public void setTerapia(String terapia) {
        this.terapia = terapia;
    }

    public String getFarmaci() {
        return farmaci;
    }

    public void setFarmaci(String farmaci) {
        this.farmaci = farmaci;
    }

    public boolean isControllo() {
        return controllo;
    }

    public void setControllo(boolean controllo) {
        this.controllo = controllo;
    }

    public double getCosto() {
        return costo;
    }

    public void setCosto(double costo) {
        this.costo = costo;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}