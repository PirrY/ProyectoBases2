// MongoDB initialization script
db = db.getSiblingDB('catalogoJuegos');

// Create the Juegos collection
db.createCollection('Juegos');

// Optional: Insert a sample document to ensure the collection exists
db.Juegos.insertOne({
  _id: ObjectId(),
  nombre: "Sample Game",
  genero: "Action",
  plataforma: "PC",
  fechaLanzamiento: new Date(),
  createdAt: new Date()
});

print('Database catalogoJuegos and collection Juegos initialized successfully');