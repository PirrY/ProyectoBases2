package com.gamestore.game.service;

import com.gamestore.game.entity.Game;
import com.gamestore.game.entity.Consultation;
import com.gamestore.game.repository.GameRepository;
import com.gamestore.game.repository.ConsultationRepository;
import com.gamestore.game.dto.GameRankingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GameService {
    
    @Autowired
    private GameRepository gameRepository;
    
    @Autowired
    private ConsultationRepository consultationRepository;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Optional<Game> getGameByName(String name) {
        Optional<Game> game = gameRepository.findByNombre(name);
        if (game.isPresent()) {
            consultationRepository.save(new Consultation(game.get().getId(), game.get().getNombre()));
        }
        return game;
    }

    public List<Game> searchGames(String name) {
        return gameRepository.findByNombreContainingIgnoreCase(name);
    }

    public boolean deleteGameByName(String name) {
        Optional<Game> game = gameRepository.findByNombre(name);
        if (game.isPresent()) {
            gameRepository.delete(game.get());
            return true;
        }
        return false;
    }

    public Game updateGame(String id, Game gameDetails) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        if (optionalGame.isPresent()) {
            Game game = optionalGame.get();
            game.setNombre(gameDetails.getNombre());
            game.setGenero(gameDetails.getGenero());
            game.setPlataforma(gameDetails.getPlataforma());
            game.setPrecio(gameDetails.getPrecio());
            game.setStock(gameDetails.getStock());
            return gameRepository.save(game);
        }
        return null;
    }

    public List<GameRankingResponse> getGameRanking() {
        List<Consultation> allConsultations = consultationRepository.findAll();
        
        List<GameRankingResponse> gameList = new ArrayList<>();
        for (Consultation consultation : allConsultations) {
            gameList.add(new GameRankingResponse(consultation.getGameName(), 1L));
        }
        
        for (int i = 0; i < gameList.size(); i++) {
            GameRankingResponse current = gameList.get(i);
            for (int j = i + 1; j < gameList.size(); j++) {
                GameRankingResponse other = gameList.get(j);
                if (current.getGameName().equals(other.getGameName())) {
                    current.setConsultationCount(current.getConsultationCount() + 1);
                    gameList.remove(j);
                    j--;
                }
            }
        }
        
        gameList.sort((a, b) -> Long.compare(b.getConsultationCount(), a.getConsultationCount()));
        
        return gameList;
    }

    public List<Game> getGamesByGenre(String genre) {
        return gameRepository.findByGenero(genre);
    }

    public List<Game> getGamesByPlatform(String platform) {
        return gameRepository.findByPlataforma(platform);
    }

    public void recordConsultation(String gameName) {
        Optional<Game> game = gameRepository.findByNombre(gameName);
        if (game.isPresent()) {
            consultationRepository.save(new Consultation(game.get().getId(), gameName));
        }
    }
}