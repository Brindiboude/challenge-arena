// on importe express et les fichiers de routes
import express from 'express';
import participantsRoutes from './routes/participants.js';
import defisRoutes from './routes/defis.js';

const app = express();

// permet de lire le JSON dans le body des requêtes
app.use(express.json());

// on branche les routes sur leurs URL
app.use('/participants', participantsRoutes);
app.use('/defis', defisRoutes);

const PORT = 3000;

// on demarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});