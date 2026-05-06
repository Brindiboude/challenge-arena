import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// __dirname existe pas en ES modules donc on va le recrée #S
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// C'est les chemins vers les deux fichiers JSON #s
const filePath = path.join(__dirname, '../data/defis.json');
const participantsPath = path.join(__dirname, '../data/participants.json');

// On lit et on retourne le contenu du fichier JSON #L
function lireDefis() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// On fait la meme chose mais pour les participants #L
function lireParticipants() {
    const data = fs.readFileSync(participantsPath, 'utf-8');
    return JSON.parse(data);
}

// On va convertie en JSON et écraser le fichier #S
function sauvegarder(fichier, data) {
    fs.writeFileSync(fichier, JSON.stringify(data, null, 2));
}

// on reçoit un titre, une difficulté et des points puis on crée le défi #L
router.post('/', (req, res) => {
    try {
        const { titre, difficulte, points } = req.body;

        // si un des champs manque on refuse #S
        if (!titre || !difficulte || !points) {
            return res.status(400).json({ erreur: 'Les champs titre, difficulte et points sont obligatoires' });
        }

        const defis = lireDefis();
	
        const nouveauDefi = {
            id: Date.now(),
            titre: titre,
            difficulte: difficulte,
            points: points
        };

        defis.push(nouveauDefi);
        sauvegarder(filePath, defis);

        return res.status(201).json(nouveauDefi);
    } catch (err) {
        // si le serveur plante #L
        return res.status(500).json({ erreur: 'Erreur serveur' });
    }
});

// on ajoute les points du défi au participant #S
router.post('/:idDefi/valider/:idParticipant', (req, res) => {
    try {
        const { idDefi, idParticipant } = req.params;

        const defis = lireDefis();
        const participants = lireParticipants();

        // on cherche le défi et le participant #L
        const defi = defis.find(d => d.id == idDefi);
        const participant = participants.find(p => p.id == idParticipant);

        // Si l'un des deux existe pas, on renvoie une erreur 404 #S
        if (!defi) return res.status(404).json({ erreur: 'Défi introuvable' });
        if (!participant) return res.status(404).json({ erreur: 'Participant introuvable' });
	
        // On ajoute les points et on sauvegarde #S
        participant.points += defi.points;
        sauvegarder(participantsPath, participants);
	
        return res.status(200).json({ message: `${participant.nom} a gagné ${defi.points} points !`, participant });
    } catch (err) {
        // si le serveur plante #L
        return res.status(500).json({ erreur: 'Erreur serveur' });
    }
});

export default router;
