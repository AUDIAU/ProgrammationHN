//dessiner le cadre pour pouvoir en récupérer ensuite les donner.
//focus ; blur ; change ; submit//

//récuperer les données du cadre si le bouton "analyser le poème" est déclenché. element, bottom, if.

var devoir_6 = document.getElementById("frequenceMots");

//fonction pour indiquer le richesse lexical du poème sous forme de % (sans titre) on peut soit copier le reste dans la première fonction soit appeler les autres fonctions dans la première.:
function calculrichesselexicale(poeme) {
  const mots = poeme.toLowerCase().split(/\W+/);
  const ligne = poeme.split('\n');
  const textesansletitre = ligne.slice(1).join(' ');
  const compterlesmots = {};
    textesansletitre.split(/\W+/).forEach((mots) => {
      if (mots !== '') {
        compterlesmots[mots] = (compterlesmots[mots] || 0) + 1;
      }
    });
  const nombredemotsuniques = Object.keys(compterlesmots).length;
  const nombretotaldesmots = mots.length;
  const pourcentagedelarichesselexicale = (nombredemotsuniques / nombretotaldesmots) * 100;
  
    return pourcentagedelarichesselexicale.toFixed(2);
  
}
//fonction pour indiquer le nombre de phrases du poème (sans titre) :
function compterlesphrases(poeme) {
      const ligne = poeme.split('\n');
    const textesansletitre = ligne.slice(1).join(' ');
    const phrase = textesansletitre.split(/[.!?]/);
    const phrasespasvides = phrase.filter((phrase) => phrase.trim() !== '');
      return phrasespasvides.length;
    
}
//fonction pour indiquer la longueur moyenne des mots par phrases (sans titre) :
function longueurmoyennedesmotsparphrase(poeme) {
      const ligne = poeme.split('\n');
      const textesansletitre = ligne.slice(1).join(' ');
      const phrase = textesansletitre.split(/[.!?]/);
      const phrasespasvides = phrase.filter((phrase) => phrase.trim() !== '');
      const motsparphrase = phrasespasvides.map((phrase) => phrase.split(/\W+/));
      const longueurmoyenne = motsparphrase.reduce((acc, mots) => acc + mots.join('').length, 0) / motsparphrase.length;
      
        return longueurmoyenne.toFixed(2);
      
}

//fonction pour indiquer la typologie des strophes : le nombre total de strophes et une classification des strophes :
function decouperenstrophes(poeme) {
    // Utilise '\n\n' comme séparateur pour les strophes
    const strophes = poeme.split('\n\n');
    // Si le premier élément est vide ou ne contient que des espaces, alors considère que c'est un titre et exclue-le
    if (strophes.length > 0 && strophes[0].trim() === "") {
      return strophes.slice(1); // Exclut le titre
  } else {
    // Retourne le tableau des strophes
    return strophes;
}
}

        function compterlesvers(strophes) {
            for (let i = 0; i < strophes.length; i++) {
                resultatDiv.innerHTML +=("Strophe " + (i + 1) + ":");
                const vers = strophes[i].split('\n');
                resultatDiv.innerHTML +=("Nombre de vers dans la strophe : " + vers.length);
                resultatDiv.innerHTML +=("------------");
            }
        
        // Appel de la fonction pour découper le poème en strophes
        //const strophes = decouperenstrophes(poeme);

        // Boucle pour afficher chaque strophe et compter les vers
        //Cette Boucle devient infinie, je n'arrive pas à l'arrêter. Si je la sors de la fonction, vers n'est plus défini donc ça ne marche pas.
          for (let a = 0; a < strophes.length; a++) {
            resultatDiv.innerHTML +=("Strophe " + (a + 1) + ":");
            resultatDiv.innerHTML +=(strophes[a]);
            resultatDiv.innerHTML +=("Nombre de vers dans la strophe : " + compterlesvers(strophes[a]));
            resultatDiv.innerHTML +=("------------");
          }
        }
      
        function compterlessyllabes(vers) {
          for (let i = 0; i < vers.length; i++) {
            resultatDiv.innerHTML +=("Vers " + (i + 1) + ":");
            const syllabe = vers[i].split('\n');
            resultatDiv.innerHTML +=("Nombre de syllabes dans le vers : " + syllabe.length);
            resultatDiv.innerHTML +=("------------");
        }   
        }  
       
//fonction pour indiquer la typologie des vers (le nombre de syllabes par vers, celui peut être approximatif à une voire 2 syllabes près) :
        function analyserlepoeme(poeme) {
          const strophe = decouperenstrophes(poeme);
        
          var resultat = `Ce poème contient ${strophe.length} strophes :`;
        
          for (var i = 0; i < strophe.length; i++) {
            const strophe = strophe[i];
            const nombredevers = compterlesvers(strophe);
            resultat += `\n${i + 1}. ${nombredevers} vers`;
        
            const vers = strophe.split('\n');
            for (var j = 0; j < vers.length; j++) {
              const syllabe = compterlessyllabes(vers[j]);
              resultat += `, ${syllabe} syllabes`;
            }
          }
        }
    
//création des fonctions :
//fonction pour indiquer les 10 mots les plus fréquents du poème (sans titre) :
function frequenceMots() {
    const poeme = document.getElementById("poeme").value;
    const mots = poeme.toLowerCase().split(/\W+/);
    const ligne = poeme.split('\n');
    const textesansletitre = ligne.slice(1).join('');
    const compterlesmots = {};
    const resultatDiv=document.getElementById("resultatDiv");
    textesansletitre.split(/\W+/).forEach((mots) => {
        if (mots !== '') {
            compterlesmots[mots] = (compterlesmots[mots] || 0) + 1;
          }
        });
      const frequencepairesdemots = Object.entries(compterlesmots);
      frequencepairesdemots.sort((a, b) => b[1] - a[1]);
      const frequencedesmots = frequencepairesdemots.slice(0, 10);
        
      
      resultatDiv.innerHTML +=(`Poèmes d'essai : À la Femme aimée de Renée Vivien (le mien), Liberté de Maurice Carême et La Déesse de Germain Nouveau.`)
      resultatDiv.innerHTML +=("Les 10 mots les plus fréquents (sans le titre) :");
      frequencedesmots.forEach((pair) => {
        resultatDiv.innerHTML +=(`${pair[0]}: ${pair[1]} fois`);
        
      });
    
      const richesselexicale = calculrichesselexicale(poeme);
      resultatDiv.innerHTML +=(`La richesse lexicale (sans le titre) est de ${richesselexicale}%.`);

     
      const nombredephrases = compterlesphrases(poeme);
      resultatDiv.innerHTML +=(`Le poème (sans le titre) contient ${nombredephrases} phrases.`);

    
      const moyennedesmotsparphrase = longueurmoyennedesmotsparphrase(poeme);
      resultatDiv.innerHTML +=(`La longueur moyenne des mots par phrase (sans le titre) est de ${moyennedesmotsparphrase} caractères.`);
      

      
      const strophe = decouperenstrophes(poeme);

     
      const nombredevers = compterlesvers(strophe);

      const syllabe = compterlessyllabes(vers);

      
      const resultat = analyserlepoeme(poeme);

      resultatDiv.innerHTML +=(`Ce poème contient ${strophe} strophes :`);
      resultatDiv.innerHTML +=(`Ce poème contient ${nombredevers} vers par strophe :${resultat}.`);
      resultatDiv.innerHTML +=(`Ce poème contient ${syllabe} syllabes par vers :${resultat}.`);
      
    }



      

/*
function analysedupoemerecu (poeme){
  return (frequenceMots)
}*/
//calculrichesselexicale, compterlesphrases, longueurmoyennedesmotsparphrase, decouperenstrophes, analyserlepoeme// 

