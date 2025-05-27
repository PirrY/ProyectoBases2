package com.gamestore.game.controller;

import com.gamestore.game.entity.Game;
import com.gamestore.game.service.GameService;
import com.gamestore.game.dto.GameRankingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping
    public Game createGame(@Valid @RequestBody Game game) {
        return gameService.createGame(game);
    }

    @GetMapping("/search")
    public ResponseEntity<Game> getGameByName(@RequestParam String name) {
        Optional<Game> game = gameService.getGameByName(name);
        return game.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search-list")
    public List<Game> searchGames(@RequestParam String name) {
        return gameService.searchGames(name);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deleteGameByName(@PathVariable String name) {
        boolean deleted = gameService.deleteGameByName(name);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable String id, @Valid @RequestBody Game gameDetails) {
        Game updatedGame = gameService.updateGame(id, gameDetails);
        return updatedGame != null ? ResponseEntity.ok(updatedGame) : ResponseEntity.notFound().build();
    }

    @GetMapping("/ranking")
    public List<GameRankingResponse> getGameRanking() {
        return gameService.getGameRanking();
    }

    @GetMapping("/genre/{genre}")
    public List<Game> getGamesByGenre(@PathVariable String genre) {
        return gameService.getGamesByGenre(genre);
    }

    @GetMapping("/platform/{platform}")
    public List<Game> getGamesByPlatform(@PathVariable String platform) {
        return gameService.getGamesByPlatform(platform);
    }

    @PostMapping("/consultations")
    public ResponseEntity<Void> recordConsultation(@RequestParam String gameName) {
        gameService.recordConsultation(gameName);
        return ResponseEntity.ok().build();
    }
}