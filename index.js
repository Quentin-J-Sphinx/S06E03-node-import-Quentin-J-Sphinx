// je récupère un module fourni par node
import readline from 'node:readline';
import validator from 'validator';
import meteoChoices from './app/data/meteo.js'
import { sentence } from './app/data/meteo.js'
import horoscopes from './app/data/horoscope.js';
// qui me permet de crée une interface qui verra les saisies dans le terminal et saura écrire dedans
const rl = readline.createInterface({
  input: process.stdin,
});

// je définis un objet avec des propriétés et des méthodes
const bot = {
  name: 'Toto le robot',
  version: '1.0.0',
  welcome: function () {
    console.log(`Bonjour je suis ${bot.name} dans sa version ${bot.version}`);
  },
  listChoices: function() {
    console.log('Demandez-moi : météo - horoscope - loto');
  },
};

// j'execute les méthodes
bot.welcome();
bot.listChoices();

// fonction qui retourne une nombre entre min et max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

// Objectif : afficher un message aléatoire parmi des choix possibles quand on dit météo
// Tirer un nombre aléatoire (on a déjà fait ça n'hésite pas à t'en inspirer)
const index = getRandomIntInclusive(0, 5);

const meteo = meteoChoices[index];
// Afficher le message quand on dit météo

// on écoute l'événement line qui correspond au fait que l'utilisateur écrit dans le terminal
rl.on('line', (line) => {
  // pour réagir en fonction de la saisie
  if (validator.contains(line, 'météo', { ignoreCase : true}) || validator.contains(line, 'meteo', { ignoreCase : true})) {
    console.log(`${sentence} ${meteo}`);
  }
  else if (validator.contains(line, 'loto', { ignoreCase : true})) {
    // on prépare une liste pour mémoriser le tirage
    let numbers = [];
    // on répète le tirage de 6 nombres
    for (let index = 0; index < 6; index++) {
      // on pioche un nombre aléatoire
      let randomNumber = getRandomIntInclusive(1, 49);
      // tant qu'il est déjà dans la liste
      while (numbers.includes(randomNumber)) {
        // on le repioche
        randomNumber = getRandomIntInclusive(1, 49);
      }
      // une fois qu'on a bien un nombre pas dans la liste on le mémorise
      numbers.push(randomNumber);
    }
    // on ajoute le complémentaire
    numbers.push(getRandomIntInclusive(1, 10));
    // on affiche le tirage
    console.log(numbers);
  }
  else if (validator.contains(line, 'horoscope', { ignoreCase : true})) {
    console.log('Ok mais quel est ton signe astro ?');
  }
  else if (validator.contains(line, 'ciao', { ignoreCase : true})) {
    process.exit();
  }
  else {
    const found = horoscopes.find(function(element) {
      return element.sign === line;
    });
    if (found) {
      console.log(found.message);
    }
    else {
      console.log('Je ne comprends pas');
      bot.listChoices();
    }
  }
});
