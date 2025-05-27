package com.gamestore.game.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "consultas_juegos")
public class Consultation {
    @Id
    private String id;
    private String gameId;
    private String gameName;
    private LocalDateTime consultationDate;

    public Consultation() {}

    public Consultation(String gameId, String gameName) {
        this.gameId = gameId;
        this.gameName = gameName;
        this.consultationDate = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }

    public String getGameName() { return gameName; }
    public void setGameName(String gameName) { this.gameName = gameName; }

    public LocalDateTime getConsultationDate() { return consultationDate; }
    public void setConsultationDate(LocalDateTime consultationDate) { this.consultationDate = consultationDate; }
}