
# Confronto tra architetture software: Monolitica, a Strati (N‑tier) e Microservizi

## Introduzione
L’**architettura software** definisce la struttura complessiva del sistema, le sue caratteristiche non funzionali (“-ilità” come scalabilità e manutenibilità) e le decisioni progettuali. Ogni stile architetturale ha vantaggi e svantaggi specifici, e non esiste una soluzione “perfetta” in assoluto. Nei paragrafi seguenti definiamo ciascun tipo (monolitico, a strati, microservizi), elenchiamo pro e contro, citiamo esempi di utilizzo e discutiamo considerazioni chiave come modularità, coesione, accoppiamento, scalabilità, deploy e manutenibilità.

## Architettura Monolitica

### Definizione
Un’**architettura monolitica** è il modello tradizionale in cui l’intera applicazione è costruita come un’unica base di codice e distribuita come un unico unitario. Tutti i componenti risiedono nello stesso applicativo e sono fortemente interdipendenti.

### Vantaggi
- Semplicità iniziale elevata.
- Unico pacchetto da distribuire.
- Testing e sviluppo in un unico contesto.
- Performance elevate per chiamate interne.

### Svantaggi
- Accoppiamento elevato.
- Bassa modularità.
- Scalabilità limitata (si scala tutto).
- Rilascio lento, richiede rebuild totale.
- Manutenzione difficile su larga scala.

### Quando adottarla
Applicazioni semplici o prototipi, siti web di piccole-medie dimensioni, MVP, strumenti interni.

## Architettura a Strati (N‑tier)

### Definizione
L’**architettura a strati** suddivide il codice in livelli gerarchici, ciascuno con responsabilità ben definite: presentazione, logica di business, accesso ai dati.

### Vantaggi
- Separazione delle responsabilità.
- Modularità e chiarezza nel codice.
- Facilita test e manutenzione.
- Migliora la riusabilità.

### Svantaggi
- Tipicamente è ancora monolitica.
- Scalabilità limitata come i monoliti.
- Overhead dovuto all'interazione tra strati.

### Quando adottarla
Applicazioni enterprise client-server, gestionali, CRM, sistemi con architettura classica.

## Architettura a Microservizi

### Definizione
L’**architettura a microservizi** scompone l’applicazione in servizi piccoli, autonomi, indipendenti e distribuibili separatamente. Ogni microservizio incapsula una funzionalità di business.

### Vantaggi
- Massima modularità e coesione.
- Basso accoppiamento (API tra servizi).
- Scalabilità indipendente per servizio.
- Sviluppo e deploy indipendenti.

### Svantaggi
- Infrastruttura complessa.
- Comunicazione distribuita e latenza.
- Debug più complesso.
- Richiede competenze cloud/devops.

### Quando adottarla
Sistemi grandi e distribuiti, SaaS, piattaforme cloud-native, aziende con team multipli (es. Netflix, Amazon).

## Considerazioni Architetturali

### Modularità e coesione
- Monoliti: bassa modularità, coesione variabile.
- A strati: modularità media, buona coesione a livello di layer.
- Microservizi: alta modularità e coesione.

### Accoppiamento
- Monoliti: elevato.
- A strati: medio (dipendenze verticali).
- Microservizi: basso (contratti API).

### Scalabilità
- Monoliti: scala tutto il sistema.
- A strati: scala il sistema ma non facilmente sezionabile.
- Microservizi: scala ogni componente indipendentemente.

### Deployabilità
- Monoliti: semplice (un file).
- A strati: simile al monolite.
- Microservizi: complesso, molti artefatti.

### Manutenibilità
- Monoliti: difficile su larga scala.
- A strati: buona se ben progettata.
- Microservizi: ottima ma distribuita.

## Tabella Comparativa

| Caratteristica         | Monolitica                             | A Strati (N-tier)                        | Microservizi                                |
|------------------------|-----------------------------------------|------------------------------------------|---------------------------------------------|
| Modularità             | Bassa                                   | Media                                    | Alta                                        |
| Coesione               | Variabile                               | Alta nei layer                           | Molto alta                                  |
| Accoppiamento          | Elevato                                 | Medio (verticale)                        | Basso                                       |
| Deployabilità          | Semplice (1 artefatto)                  | Simile al monolite                       | Complessa (molti artefatti)                |
| Scalabilità            | Tutto il sistema                        | Parziale                                 | Ogni servizio individualmente               |
| Manutenibilità         | Bassa oltre certa scala                 | Buona con separazione netta              | Ottima ma richiede disciplina               |
| Esempi                 | MVP, siti semplici                      | CRM, gestionali                          | SaaS, e-commerce su larga scala             |
| Team richiesto         | Piccolo                                 | Medio                                    | Multipli, con competenze devops/cloud       |
