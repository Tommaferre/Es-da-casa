package com.petflix.petflix.model;

// Modello che rappresenta una richiesta di adozione di un animale.
// Contiene tutte le informazioni necessarie per gestire il processo di adozione.

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@Table(name = "adozioni")
@JsonPropertyOrder({
    "idAdozione", "idAnimale", "idModuloAdozione", "idAdottante",
    "dataRichiesta", "dataAdozione", "stato", "quotaAdozione", "note"
})
public class Adozione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAdozione; // Identificativo univoco dell'adozione

    
    private int idAnimale; // ID dell'animale adottato


    private int idModuloAdozione; // ID del modulo di adozione compilato

    private int idAdottante; // ID della persona che adotta

    private LocalDate dataRichiesta; // Data in cui è stata fatta la richiesta

    private LocalDate dataAdozione; // Data effettiva dell'adozione

    private String stato; // Stato attuale dell'adozione (richiesta, approvata, ecc.)

    private Double quotaAdozione; // Quota economica associata all'adozione

    private Double quotaDonazione; // Quota donazione associata all'adozione

    private String note; // Note aggiuntive

    private String noteDonazione; // Note donazione (campo text)

    // Enum che rappresenta i possibili stati dell'adozione
    public enum StatoAdozione {
        RICHIESTA("richiesta"),
        APPROVATA("approvata"),
        COMPLETATA("completata"),
        RIFIUTATA("rifiutata"),
        ANNULLATA("annullata");

        private final String valore;

        StatoAdozione(String valore) {
            this.valore = valore;
        }

        public String getValore() {
            return valore;
        }

        // Restituisce lo stato corrispondente a una stringa, default RICHIESTA
        public static StatoAdozione fromString(String stato) {
            for (StatoAdozione s : StatoAdozione.values()) {
                if (s.valore.equalsIgnoreCase(stato)) {
                    return s;
                }
            }
            return RICHIESTA;
        }
    }

    // Getter e Setter per tutti i campi

    public int getIdAdozione() {
        return idAdozione;
    }

    public void setIdAdozione(int idAdozione) {
        this.idAdozione = idAdozione;
    }

    public int getIdAnimale() {
        return idAnimale;
    }

    public void setIdAnimale(int idAnimale) {
        this.idAnimale = idAnimale;
    }

    public int getIdModuloAdozione() {
        return idModuloAdozione;
    }

    public void setIdModuloAdozione(int idModuloAdozione) {
        this.idModuloAdozione = idModuloAdozione;
    }

    public int getIdAdottante() {
        return idAdottante;
    }

    public void setIdAdottante(int idAdottante) {
        this.idAdottante = idAdottante;
    }

    public LocalDate getDataRichiesta() {
        return dataRichiesta;
    }

    public void setDataRichiesta(LocalDate dataRichiesta) {
        this.dataRichiesta = dataRichiesta;
    }

    public LocalDate getDataAdozione() {
        return dataAdozione;
    }

    public void setDataAdozione(LocalDate dataAdozione) {
        this.dataAdozione = dataAdozione;
    }

    public String getStato() {
        return stato;
    }

    public void setStato(String stato) {
        this.stato = stato;
    }

    public Double getQuotaAdozione() {
        return quotaAdozione;
    }

    public void setQuotaAdozione(Double quotaAdozione) {
        this.quotaAdozione = quotaAdozione;
    }

    public Double getQuotaDonazione() {
        return quotaDonazione;
    }

    public void setQuotaDonazione(Double quotaDonazione) {
        this.quotaDonazione = quotaDonazione;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getNoteDonazione() {
        return noteDonazione;
    }

    public void setNoteDonazione(String noteDonazione) {
        this.noteDonazione = noteDonazione;
    }
}
