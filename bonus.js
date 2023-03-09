const fs = require('fs');
const readline = require('readline');
const childProcess = require("child_process");
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pwd = __dirname;

console.log('Vous êtes ici');
console.log(pwd);
console.log('Indiquez le chemin relatif de l\'emplacement du dossier à créer, exemple : ../mon-projet');

rl.on('line', (line) => {
  const projectPath = path.join(pwd, line);
  if (!fs.existsSync(projectPath)){
    const pathParts = projectPath.split(path.sep);
    const projectName = pathParts[pathParts.length - 1];
    console.log('-- création des dossiers');
    fs.mkdirSync(projectPath);
    fs.mkdirSync(path.join(projectPath, 'src'));
    fs.mkdirSync(path.join(projectPath, 'src', 'assets'));
    console.log('-- création des fichiers');
    fs.writeFileSync(path.join(projectPath, 'src', 'index.html'), 'Hello world');
    fs.writeFileSync(path.join(projectPath, 'package.json'), `{
  "name": "${projectName}",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build"
  }
}`);
    fs.writeFileSync(path.join(projectPath, 'README.md'), `# ${projectName}`);
    fs.writeFileSync(path.join(projectPath, '.gitignore'), `dist
node_modules
.parcel-cache`);
    console.log('-- installation des dépendances, veuillez patienter...');
    childProcess.execSync(`npm install --prefix ${line} parcel --save-dev`);
    console.log('Fin du processus de création');
    process.exit();
  }
  else {
    console.log('Dossier existant');
  }
});