package com.petflix.petflix.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.*;

@Entity
@Table(name = "animali")
@JsonPropertyOrder({
    "id_animale",
    "id_box",
    "id_cartella_clinica",
    "microchip",
    "nome",
    "specie",
    "razza",
    "data_arrivo",
    "stato",
    "backstories", // aggiungi qui
    "note"
})
public class Animale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_animale;

    @Column(name = "id_box")
    private Integer idBox;

    @Column(name = "id_cartella_clinica")
    private Integer idCartellaClinica;

    private String microchip;
    private String nome;
    private String specie;
    private String razza;

    @Column(name = "data_arrivo")
    private Date data_arrivo;

    private String stato;

    @Column(name = "backstories")
    private String backstories;

    @Column(name = "note")
    private String note;

    // Getters and Setters
    public Integer getId_animale() {
        return id_animale;
    }

    public void setId_animale(Integer id_animale) {
        this.id_animale = id_animale;
    }

    public Integer getIdBox() {
        return idBox;
    }

    public void setIdBox(Integer idBox) {
        this.idBox = idBox;
    }

    public Integer getIdCartellaClinica() {
        return idCartellaClinica;
    }

    public void setIdCartellaClinica(Integer idCartellaClinica) {
        this.idCartellaClinica = idCartellaClinica;
    }

    public String getMicrochip() {
        return microchip;
    }

    public void setMicrochip(String microchip) {
        this.microchip = microchip;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSpecie() {
        return specie;
    }

    public void setSpecie(String specie) {
        this.specie = specie;
    }

    public String getRazza() {
        return razza;
    }

    public void setRazza(String razza) {
        this.razza = razza;
    }

    public Date getDataArrivo() {
        return data_arrivo;
    }

    public void setDataArrivo(Date data_arrivo) {
        this.data_arrivo = data_arrivo;
    }

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public String getBackstories() {
        return backstories;
    }

    public void setBackstories(String backstories) {
        this.backstories = backstories;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
