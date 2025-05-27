package com.gamestore.game.service;

import com.gamestore.game.entity.Game;
import com.gamestore.game.entity.Consultation;
import com.gamestore.game.repository.GameRepository;
import com.gamestore.game.repository.ConsultationRepository;
import com.gamestore.game.dto.GameRankingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

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
        Aggregation aggregation = Aggregation.newAggregation(
            Aggregation.group("gameName").count().as("consultationCount"),
            Aggregation.sort(org.springframework.data.domain.Sort.Direction.DESC, "consultationCount"),
            Aggregation.project("consultationCount").and("gameName").previousOperation()
        );
        
        AggregationResults<Map> results = mongoTemplate.aggregate(
            aggregation, "consultas_juegos", Map.class
        );
        
        return results.getMappedResults().stream()
            .map(result -> {
                String gameName = (String) result.get("gameName");
                Integer count = (Integer) result.get("consultationCount");
                return new GameRankingResponse(gameName, count.longValue());
            })
            .collect(Collectors.toList());
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