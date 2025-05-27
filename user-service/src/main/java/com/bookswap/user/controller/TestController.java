package com.bookswap.user.controller;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controlador específico para pruebas de diagnóstico
 * Este controlador solo se usa para verificar la conexión con MongoDB y diagnosticar problemas
 */
@RestController
@RequestMapping("/test")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Autowired
    private MongoClient mongoClient;
    
    @GetMapping("/mongo-info")
    public ResponseEntity<Map<String, Object>> getMongoInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("mongo_uri", mongoUri.replaceAll(":[^:@]+@", ":****@"));
        
        try {
            // Lista de bases de datos
            List<String> databases = new ArrayList<>();
            mongoClient.listDatabaseNames().into(databases);
            info.put("databases", databases);
            
            // Verificar la base de datos actual
            String databaseName = extractDatabaseName(mongoUri);
            info.put("current_database", databaseName);
            
            MongoDatabase database = mongoClient.getDatabase(databaseName);
            
            // Lista de colecciones
            List<String> collections = new ArrayList<>();
            database.listCollectionNames().into(collections);
            info.put("collections", collections);
            
            // Estadísticas de la base de datos
            Document stats = database.runCommand(new Document("dbStats", 1));
            info.put("db_stats", stats);
            
            // Información sobre usuarios
            if (collections.contains("users")) {
                MongoCollection<Document> usersCollection = database.getCollection("users");
                long userCount = usersCollection.countDocuments();
                info.put("user_count", userCount);
            }
            
            info.put("status", "connected");
            logger.info("Conexión a MongoDB exitosa. Base de datos: {}, Colecciones: {}", 
                    databaseName, collections);
            
            return ResponseEntity.ok(info);
        } catch (Exception e) {
            logger.error("Error al conectar con MongoDB: {}", e.getMessage(), e);
            info.put("status", "error");
            info.put("error", e.getMessage());
            info.put("error_type", e.getClass().getName());
            
            if (e.getCause() != null) {
                info.put("cause", e.getCause().getMessage());
            }
            
            return ResponseEntity.ok(info);
        }
    }
    
    private String extractDatabaseName(String uri) {
        String dbName = "bookswap_user"; // valor por defecto
        
        try {
            String[] parts = uri.split("/");
            if (parts.length > 3) {
                String lastPart = parts[3];
                int queryParamIndex = lastPart.indexOf('?');
                if (queryParamIndex > 0) {
                    dbName = lastPart.substring(0, queryParamIndex);
                } else {
                    dbName = lastPart;
                }
            }
        } catch (Exception e) {
            logger.warn("Error al extraer nombre de BD: {}", e.getMessage());
        }
        
        return dbName;
    }
    
    @GetMapping("/env")
    public ResponseEntity<Map<String, String>> getEnvironmentVariables() {
        Map<String, String> envVars = new HashMap<>();
        
        // Variables relacionadas con MongoDB
        envVars.put("SPRING_DATA_MONGODB_URI", sanitizeUri(System.getenv("SPRING_DATA_MONGODB_URI")));
        envVars.put("MONGODB_URI", sanitizeUri(System.getenv("MONGODB_URI")));
        
        // Variables relacionadas con servicios
        envVars.put("AUTH_SERVICE_URL", System.getenv("AUTH_SERVICE_URL"));
        
        // Variables de logging
        envVars.put("LOGGING_LEVEL_ORG_MONGODB_DRIVER", System.getenv("LOGGING_LEVEL_ORG_MONGODB_DRIVER"));
        envVars.put("LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_DATA_MONGODB", 
                System.getenv("LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_DATA_MONGODB"));
        
        // Variables de JWT
        envVars.put("JWT_SECRET", System.getenv("JWT_SECRET") != null ? "****" : null);
        
        logger.info("Variables de entorno recuperadas con éxito");
        return ResponseEntity.ok(envVars);
    }
    
    private String sanitizeUri(String uri) {
        if (uri == null) return null;
        return uri.replaceAll(":[^:@]+@", ":****@");
    }
}