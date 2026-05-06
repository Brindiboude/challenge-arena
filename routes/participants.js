import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// __dirname n'existe pas en ES module donc on va le réecrer 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le fichier JSON des participants
const filePath = path.join(__dirname, '../data/participants.json');

// On lit et retourne le contenu du fichier JSON
function lireParticipants() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// On va convertir en JSON et ecraser le ficher
function sauvegarderParticipants(participants) {
    fs.writeFileSync(filePath, JSON.stringify(participants, null, 2));
}

// On recoit un nom puis on va creer le participant
router.post('/', (req, res) => {
    const { nom } = req.body;

    // on va vérifier que le nom est bien donné
    if (!nom) {
        return res.status(400).json({ erreur: 'Le champ nom est obligatoire' });
    }

    const participants = lireParticipants();

    // on va creer le participant avec son id unique et ses 0 points
    const nouveauParticipant = {
        id: Date.now(),
        nom: nom,
        points: 0
    };

    participants.push(nouveauParticipant);
    sauvegarderParticipants(participants);

    return res.status(201).json(nouveauParticipant);
});

// On creer le classement avec les meilleurs points
router.get('/classement', (req, res) => {
    const participants = lireParticipants();

    // on trie du plus grand au plus petit nombre de points
    const classement = participants.sort((a, b) => b.points - a.points);

    return res.status(200).json(classement);
});

export default router;