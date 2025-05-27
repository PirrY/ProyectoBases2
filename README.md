# Catálogo de Videojuegos

Aplicación completa para gestionar un catálogo de videojuegos con Angular Frontend, Spring Boot Backend y MongoDB.

## Características

-  **Agregar videojuegos** (nombre, género, plataforma, precio, stock)
-  **Listar todos los videojuegos**
-  **Buscar videojuegos por nombre**
-  **Eliminar videojuegos**
-  **Ranking de juegos más consultados** (usando agregación MongoDB)
-  **API REST** completa
-  **Dockerizado** para fácil despliegue

## Tecnologías

- **Frontend**: Angular 19 + TailwindCSS
- **Backend**: Spring Boot 3.2.5 + MongoDB
- **Base de datos**: MongoDB 7.0
- **Containerización**: Docker + Docker Compose

## Estructura del Proyecto

```
/
├── Frontend/          # Angular app
├── game-service/      # Spring Boot API
├── docker-compose.yml # Orquestación de servicios
└── README.md
```

## Inicio Rápido

### 1. Compilar el backend
```bash
cd game-service
./mvnw clean package -DskipTests
cd ..
```

### 2. Levantar todos los servicios
```bash
docker-compose up --build
```

### 3. Acceder a la aplicación
- **Frontend**: http://localhost
- **API Backend**: http://localhost:8080/api/games
- **MongoDB**: localhost:27017

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/games` | Obtener todos los juegos |
| POST | `/api/games` | Agregar nuevo juego |
| GET | `/api/games/search?name=` | Buscar juego por nombre (registra consulta) |
| GET | `/api/games/search-list?name=` | Buscar juegos que contengan el nombre |
| DELETE | `/api/games/{name}` | Eliminar juego por nombre |
| GET | `/api/games/ranking` | Ranking de juegos más consultados |

## Base de Datos

- **Base**: `catalogoJuegos`
- **Colecciones**:
  - `juegos`: Datos de videojuegos
  - `consultas_juegos`: Registro de consultas para ranking

## Desarrollo

### Backend (Spring Boot)
```bash
cd game-service
./mvnw spring-boot:run
```

### Frontend (Angular)
```bash
cd Frontend
npm install
npm start
```

### MongoDB Local
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```
