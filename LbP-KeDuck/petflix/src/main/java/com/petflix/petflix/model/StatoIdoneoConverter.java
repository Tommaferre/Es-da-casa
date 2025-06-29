package com.petflix.petflix.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

// Converter JPA per StatoIdoneo che gestisce valori case-insensitive
@Converter(autoApply = true)
public class StatoIdoneoConverter implements AttributeConverter<Adottante.StatoIdoneo, String> {
    @Override
    public String convertToDatabaseColumn(Adottante.StatoIdoneo attribute) {
        return attribute != null ? attribute.getValore() : null;
    }

    @Override
    public Adottante.StatoIdoneo convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        dbData = dbData.trim().toLowerCase();
        if (dbData.equals("idoneo")) return Adottante.StatoIdoneo.IDONEO;
        if (dbData.equals("non idoneo")) return Adottante.StatoIdoneo.NON_IDONEO;
        throw new IllegalArgumentException("Valore StatoIdoneo non valido: " + dbData);
    }
}
