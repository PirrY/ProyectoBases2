package com.gamestore.game.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

@Document(collection = "juegos")
public class Game {
    @Id
    private String id;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotBlank(message = "El género es obligatorio")
    private String genero;
    
    @NotBlank(message = "La plataforma es obligatoria")
    private String plataforma;
    
    @DecimalMin(value = "0.0", message = "El precio debe ser mayor o igual a 0")
    private Double precio;
    
    @Min(value = 0, message = "El stock debe ser mayor o igual a 0")
    private Integer stock;

    public Game() {}

    public Game(String nombre, String genero, String plataforma, Double precio, Integer stock) {
        this.nombre = nombre;
        this.genero = genero;
        this.plataforma = plataforma;
        this.precio = precio;
        this.stock = stock;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }

    public String getPlataforma() { return plataforma; }
    public void setPlataforma(String plataforma) { this.plataforma = plataforma; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }
}