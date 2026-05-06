// on importe express et les fichiers de routes
const express = require('express');
const participantsRoutes = require('./routes/participants');
const defisRoutes = require('./routes/defis');

const app = express();

// permet de lire le JSON dans le body des requêtes
app.use(express.json());

// on branche les routes sur leurs d'URL
app.use('/participants', participantsRoutes);
app.use('/defis', defisRoutes);

const PORT = 3000;

// on démarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
