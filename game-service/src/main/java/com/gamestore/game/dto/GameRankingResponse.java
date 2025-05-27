package com.gamestore.game.dto;

public class GameRankingResponse {
    private String gameName;
    private Long consultationCount;

    public GameRankingResponse() {}

    public GameRankingResponse(String gameName, Long consultationCount) {
        this.gameName = gameName;
        this.consultationCount = consultationCount;
    }

    public String getGameName() { return gameName; }
    public void setGameName(String gameName) { this.gameName = gameName; }

    public Long getConsultationCount() { return consultationCount; }
    public void setConsultationCount(Long consultationCount) { this.consultationCount = consultationCount; }
}