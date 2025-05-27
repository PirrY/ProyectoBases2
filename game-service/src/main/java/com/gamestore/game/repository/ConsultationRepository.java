package com.gamestore.game.repository;

import com.gamestore.game.entity.Consultation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {
    List<Consultation> findByGameId(String gameId);
    
    @Aggregation(pipeline = {
        "{ '$group': { '_id': '$gameName', 'count': { '$sum': 1 } } }",
        "{ '$sort': { 'count': -1 } }",
        "{ '$project': { '_id': 0, 'gameName': '$_id', 'consultationCount': '$count' } }"
    })
    List<Object> getGameRanking();
}