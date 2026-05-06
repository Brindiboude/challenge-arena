#on a l'image node legere pour pas un conteneur trop lourd #S
FROM node:18-alpine

#on a le code qui sera dans /app dans le conteneur #L
WORKDIR /app

#on copie package.json pour le cache docker #S
COPY package*.json ./

#on installe les dépendances #L
RUN npm install

#on copie le reste du projet #S
COPY . .

#c'est le port que l'app utilise #L
EXPOSE 3000

#commande pour démarrer le serveur #S
CMD ["node", "server.js"]