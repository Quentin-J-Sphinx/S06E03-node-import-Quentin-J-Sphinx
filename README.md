# NostradaBot

Aujourd'hui on va coder un programme en JavaScript et l'executer avec Node.

Au sein de Node, on peut faire tourner toutes sortes de programmes. Dans quelques jours on fera des serveurs HTTP. Mais avant ça pourquoi pas prendre nos marques en développant un robot à executer dans le terminal.

Cela présentera 3 intérêts :

- Réviser les fondamentaux de JavaScript
- Tester quelques modules spécifiques à Node pour développer notre côté "aventurier"
- Faire un premier programme qui répond à des demandes pour bien préparer la suite

Notre objectif est de coder _NostradaBot_, un robot qui nous donnera ses prédictions sur l'avenir.

Voilà le scénario souhaité : 

1. L'utilisateur lance le programme dans son terminal avec Node
2. Le programme écoute les saisies de l'utilisateur
3. Le programme affiche un message de bienvenue et liste des choix possibles
4. Quand l'utilisateur demande la météo, le programme annonce une météo aléatoire parmi une liste
5. Quand l'utilisateur demande le loto, le programme affiche un tirage aléatoire
6. Quand l'utilisateur demande l'horoscope et indique son signe astrologique, le programme affiche sa prédiction parmi une liste
7. En cas de saisie incorrecte on liste à nouveau les choix
8. On peut quitter le programme

## Exercice 1 - Lancer le programme

Crée un fichier `.js` et place un premier `console.log` dedans. Execute ce fichier avec Node pour vérifier si tout est prêt pour démarrer

_PS_ : à chaque modification on doit relancer notre programme. Pour cela on le stoppe avec `CTRL C` et on le relance ensuite.

## Exercice 2 - Ecouter les saisies de l'utilisateur

Node propose le module `readline` qui permet de créer une interface via la méthode [createInterface](https://nodejs.org/dist/latest-v18.x/docs/api/readline.html#readlinecreateinterfaceoptions). C'est à dire que l'utilisateur va pouvoir écrire dans le terminal dans lequel Node s'execute. Le programme pourra récupérer ce qui est écrit et réagir en retour.

Plutôt que de lire la documentation en entier on va tester les exemples, voilà ce qu'on trouve dans la doc, on a ajouter quelques commentaires.

> The readline.createInterface() method creates a new readline.Interface instance.

```js
// On part d'un module fourni par node
const readline = require('node:readline');
// on execute une méthode fournie pour récupérer un objet nommé ici "rl"
// il représente notre interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

> Once the readline.Interface instance is created, the most common case is to listen for the 'line' event:

```js
// via la méthode "on" de notre interface on réagira à chaque ligne saisie par l'utilisateur
// On passe une fonction callback qui sera executée plus tard, à chaque saisie, 
// de plus elle aura accès aux saisies de l'utilisateur
rl.on('line', (line) => {
  console.log(`Received: ${line}`);
});
```

A priori ceci correspond parfaitement à notre besoin, on réagit aux saisie de l'utilisateur. Cela constitue la base de notre programme, on peut continuer pour faire en sorte de réagir de différente manière.

## Exercice 3 - Définition du robot

Notre robot est caractérisé par son nom `NostradaBot` et son numéro de version `1`. Il doit également avoir la capacité de se présenter et de lister les choix possibles. On affichera les choix plusieurs fois, au démarrage mais aussi en cas de saisie incorrecte par la suite, on va donc chercher à éviter les répétitions.

Définis un objet représentant le robot
- il doit avoir 2 propriétés représentant 
  - son nom 
  - et sa version
- il doit avoir 2 méthodes
  - une qui dis bonjour en console et affiche son nom et sa version
  - une qui affiche les 3 choix possibles en console : météo, loto et horoscope  

On exécute nos méthodes au lancement du programme une première fois.

## Exercice 4 - Météo

Le but est désormais de réagir au cas par cas à chaque ligne entrée par l'utilisateur

- Quand l'utilisateur écrit `météo` on va réagir en affichant une prévision aléatoire parmis une liste

Voici la liste des météo possibles que tu peux mémoriser dans le programme

```
  ensoleillé,
  pluvieux,
  nuageux,
  orageux,
  venteux,
  caniculaire
```

Pour effectuer le tirage du message tu pourrais :

- Tirer un nombre aléatoire (on a déjà fait ça n'hésite pas à t'en inspirer)
- Se servir du nombre obtenu pour identifier une valeur dans notre liste
- Afficher le message quand on dit `météo`

Comme toujours veille à bien travailler par étape et à tester

## Exercice 5 - Loto

- Quand l'utilisateur écrit `loto` on va réagir en affichant un tirage

Un tirage est composé

- de 6 numéro allant de 1 à 49
- d'un numéro supplémentaire allant de 1 à 10

Tire à chaque fois des nombres aléatoires.

Bonus: essaye si possible d'empêcher le fait d'avoir des nombres en double

## Exercice 6 - Horoscope

- Quand l'utilisateur écrit `horoscope` on va réagir en lui disant d'indiquer son signe astrologique

On a représenté la liste des messages de prédiction par signe astrologique, tu peux la reprendre dans ton programme

<details>
  <summary>Prédictions</summary>

```js
const horoscopes = [
  {
    sign: 'bélier',
    message: 'Tout va bien',
  },
  {
    sign: 'taureau',
    message: 'Demain est un nouveau jour',
  },
  {
    sign: 'gémeaux',
    message: 'Hier, c\'est du passé',
  },
  {
    sign: 'cancer',
    message: 'Aujourd\'hui le présent vous attend',
  },
  {
    sign: 'lion',
    message: 'Le tigre est en toi',
  },
  {
    sign: 'vierge',
    message: 'Vous allez de l\'avant',
  },
  {
    sign: 'balance',
    message: 'Ça plane pour vous',
  },
  {
    sign: 'scorpion',
    message: 'Vous apprenez beaucoup de choses',
  },
  {
    sign: 'verseau',
    message: 'Faites vous confiance',
  },
  {
    sign: 'capricorne',
    message: 'Vous progressez à vu d\'oeil',
  },
  {
    sign: 'poisson',
    message: 'Vous êtes dans votre élément',
  },
  {
    sign: 'sagitaire',
    message: 'Le temps est beau fixe',
  }
];
```

</details>

Maintenant il faut afficher la prédiction quand l'utilisateur donne son signe :

- Quand l'utilisateur écrit une ligne, on regarde si on trouve une valeur dans le tableau pour laquelle le signe correspond
- Si on a trouvé on affiche le message associé

## Exercice 7 - Saisie incorrecte

Si l'utilisateur écrit quoi que ce soit d'autre on doit afficher à nouveau la liste des choix

## Exercice 8 - Quitter

Chercher un moyen d'interrompre la programme de manière automatisée quand l'utilisateur écrit `ciao`

Plusieurs moyen son possible, soit pour interrompre le processus Node, soit pour fermer l'interface, fais des recherches pour en trouver un.

## Aller plus loin

Si tu souhaites aller plus loin, pourquoi pas construire un deuxième programme complètement différent cette fois.

Dans les saisons passé on a souvent du démarrer des projets de 0 incluant Parcel pour nos projets Front. 

C'était chaque fois la même chose :

- Créer un dossier pour le projet
- Créer un dossier src
- Créer un fichier index.html
- Créer un fichier package.json
- Créer un fichier .gitignore
- Ajouter les scripts de parcel
- Installer parcel

On répète toujours la même procédure ? Pourquoi pas chercher à l'automatiser alors, c'est ça la force d'un développeur.

Node va nous permettre d'executer du javascript qui s'occupe précisemment de faire tout ça !

Pour cela voici quelques pistes à assembler :

- On a vu le module `readline` qui pourrait nous permettre de demander à l'utilisateur de saisir le chemin de l'emplacement ou démarrer son projet parcel
- Node fourni également le module `path` pour construire des chemins, notamment via la méthode [`join`](https://nodejs.org/dist/latest-v18.x/docs/api/path.html#pathjoinpaths). D'ailleurs si tu as besoin d'un chemin absolu, teste `console.log(__dirname)`.
- Le module `fs` te sera également utile ici pour accéder au système de fichier, donc pour créer des dossier et des fichers. Tu peux trouver
  - [`fs.mkdirSync`](https://nodejs.org/docs/latest/api/fs.html#fsmkdirsyncpath-options) pour créer des dossiers
  - [`fs.writeFileSync`](https://nodejs.org/docs/latest/api/fs.html#fswritefilesyncfile-data-options) pour créer des fichiers
- Le module `child_process` te permettrea d'executer des commandes comme si on était dans le terminal via sa méthode [`execSync`](https://nodejs.org/dist/latest-v18.x/docs/api/child_process.html#child_processexecsynccommand-options). Tu peux l'utiliser pour installer parcel. Par ailleurs si tu veux faire un `npm install` dans un autre dossier utilise l'option `--prefix` avec un chemin relatif.

_PS_ si la doc manque d'exemples pour une méthode, n'hésite pas compléter par des recherches sur ton moteur de recherche.

C'est de l'exploration donc pas d'indications supplémentaires, à toi de faire tes tests s'il te reste du temps.
