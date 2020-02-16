# Projet d'exemple API en haxe avec Express

## Installation

1. Installer haxe depuis https://haxe.org. (Version 4.0.2 testée)
2. Installer NodeJS depuis https://nodejs.org/en/ (Version 10.17.0 testée)
3. Copier le fichier ".env.example" en ".env" et configurer le fichier pour votre environnement
4.
```sh
npm install
haxelib install crypto
haxelib install hxnodejs
haxelib install hxnodejs-ws
haxelib git js-kit https://github.com/clemos/haxe-js-kit
```

## Compiler et lancer

```
haxe build.hxml
npx nodemon dist/main.js
```

## Description

Haxe est un langage pouvant être transpilé et exécuté dans de nombreux environnement. Nous utilisons ici haxe pour créer un fichier JavaScript qui sera exécuté par NodeJS. haxe utilisera des bibliothèque javascript existantes comme express. Pour conserver le typage fort dans les interactions entre notre application haxe/js et les bibliothèques JavaScript, des types "extern" sont déclarés. js-kit (bibliothèque haxe) permet de générer automatiquement un certain nombre d'extern, hxnodejs viens également avec des extern pré-configurés pour express.


## Informations

nodemon permet de redémarrer automatiquement le serveur node au changement de fichier.

Une configuration de deboggage "Debug main.js" permet de débogger le serveur depuis vscode.


## Configurer le débogueur VSCode pour une application NodeJS

Pour configurer le débogueur depuis un projet vide :
1. Dans build.hxml, ajouter l'instruction -debug pour générer les source-maps.
2. Cliquer sur l'onglet Debug de vscode
3. Créer une nouvelle configuration pour NodeJS
4. Modifier la valeur de `program` dans la configuration de `launch.json` pour indiquer le chemin du fichier main.js: `"program": "${workspaceFolder}\\dist\\main.js"`

## Documentation

Une documentation automatique des api peut être générée avec la commande 
`npm run doc`