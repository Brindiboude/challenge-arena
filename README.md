# Challenge Arena

API REST pour organiser des défis techniques entre participants et afficher un classement.

## Installation

```bash
git clone https://github.com/Brindiboude/challenge-arena.git
cd challenge-arena
npm install
```

## Lancement

```bash
node server.js
```

L'API tourne sur http://localhost:3000

## Lancement avec Docker

```bash
docker compose up
```

## Routes

### Participants

- `POST /participants` — créer un participant
```json
{ "nom": "Sarah" }
```

- `GET /participants/classement` — afficher le classement

### Défis

- `POST /defis` — créer un défi
```json
{ "titre": "Inverser une chaîne de caractères", "difficulte": "facile", "points": 10 }
```

- `POST /defis/:idDefi/valider/:idParticipant` — valider un défi pour un participant
