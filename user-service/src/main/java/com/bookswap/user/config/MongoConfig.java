package com.bookswap.user.config;

import com.mongodb.ConnectionString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {
    
    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Bean
    @Primary
    public MongoClientFactoryBean mongoClientFactoryBean() {
        logger.info("Configurando conexión a MongoDB Atlas con URI: {}", 
                mongoUri.replaceAll(":[^:@]+@", ":****@"));
        
        MongoClientFactoryBean clientFactory = new MongoClientFactoryBean();
        clientFactory.setConnectionString(new ConnectionString(mongoUri));
        
        return clientFactory;
    }
    
    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClientFactoryBean().getObject(), getDatabaseName());
    }
    
    private String getDatabaseName() {
        // Extraer el nombre de la base de datos de la URI
        String dbName = "bookswap_user"; // Valor predeterminado
        
        try {
            String[] parts = mongoUri.split("/");
            if (parts.length > 3) {
                String lastPart = parts[3];
                int queryParamIndex = lastPart.indexOf('?');
                if (queryParamIndex > 0) {
                    dbName = lastPart.substring(0, queryParamIndex);
                } else {
                    dbName = lastPart;
                }
                logger.info("Nombre de base de datos extraído de URI: {}", dbName);
            } else {
                logger.warn("No se pudo extraer nombre de BD de URI, usando valor predeterminado: {}", dbName);
            }
        } catch (Exception e) {
            logger.warn("Error al extraer nombre de BD, usando valor predeterminado: {}", dbName, e);
        }
        
        return dbName;
    }
    
    @Bean
    public MongoTransactionManager transactionManager(MongoDatabaseFactory dbFactory) {
        return new MongoTransactionManager(dbFactory);
    }
}