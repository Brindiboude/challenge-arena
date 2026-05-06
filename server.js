// on importe express et les fichiers de routes #S
import express from 'express';
import participantsRoutes from './routes/participants.js';
import defisRoutes from './routes/defis.js';

const app = express();

// permet de lire le JSON dans le body des requêtes #L
app.use(express.json());

// on branche les routes sur leurs URL #L
app.use('/participants', participantsRoutes);
app.use('/defis', defisRoutes);

const PORT = 3001;

// on demarre le serveur #S
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
