package com.gamestore.game.repository;

import com.gamestore.game.entity.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {
    Optional<Game> findByNombre(String nombre);
    List<Game> findByGenero(String genero);
    List<Game> findByPlataforma(String plataforma);
    List<Game> findByNombreContainingIgnoreCase(String nombre);
}