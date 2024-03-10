//création des fonctions :
//fonction pour indiquer les 10 mots les plus fréquents du poème (sans titre) :
function frequenceMots(poeme) {
    const mots = poeme.toLowerCase().split(/\W+/);
    const ligne = poeme.split('\n');
    const textesansletitre = ligne.slice(1).join('');
    const compterlesmots = {};
    textesansletitre.split(/\W+/).forEach((mots)
    => {
        if (mots !== '') {
            compterlesmots[mots] = (compterlesmots[mots] || 0) + 1;
          }
        });
      const frequencepairesdemots = Object.entries(compterlesmots);
      frequencepairesdemots.sort((a, b) => b[1] - a[1]);
      const frequencedesmots = frequencepairesdemots.slice(0, 10);
        return frequencedesmots;
      }
      const frequencedesmots = frequenceMots(poeme); 
      console.log("Les 10 mots les plus fréquents (sans le titre) :");
      frequencedesmots.forEach((pair) => {
        console.log(`${pair[0]}: ${pair[1]} fois`);
      });
//fonction pour indiquer le richesse lexical du poème sous forme de % (sans titre) :
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
        const richesselexicale = calculrichesselexicale(poeme);
        console.log(`La richesse lexicale (sans le titre) est de ${richesselexicale}%.`);
//fonction pour indiquer le nombre de phrases du poème (sans titre) :
function compterlesphrases(poeme) {
            const ligne = poeme.split('\n');
          const textesansletitre = ligne.slice(1).join(' ');
          const phrase = textesansletitre.split(/[.!?]/);
          const phrasespasvides = phrase.filter((phrase) => phrase.trim() !== '');
            return phrasespasvides.length;
          }
          const nombredephrases = compterlesphrases(poeme);
          console.log(`Le poème (sans le titre) contient ${nombredephrases} phrases.`);
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
            const moyennedesmotsparphrase = longueurmoyennedesmotsparphrase(poeme);
            console.log(`La longueur moyenne des mots par phrase (sans le titre) est de ${moyennedesmotsparphrase} caractères.`);
//fonction pour indiquer la typologie des strophes : le nombre total de strophes et une classification des strophes :
function decouperenstrophes(poeme) {
                const strophe = poeme.split('\n\n');
                return strophe.filter(strophe => strophe.trim() !== '');
              }
              function compterlessyllabes(vers) {
                const syllabe = vers.split(/[aeiouyAEIOUY]+/).length - 1;
                return syllabe;
              }
              function compterlesvers(strophe) {
                const vers = strophe.split('\n');
                return vers.length;
              }
//fonction pour indiquer la typologie des vers (le nombre de syllabes par vers, celui peut être approximatif à une voire 2 syllabes près) :
function analyserlepoeme(poeme) {
                const strophe = decouperenstrophes(poeme);
              
                let resultat = `Ce poème contient ${strophe.length} strophes :`;
              
                for (let i = 0; i < strophe.length; i++) {
                  const strophe = strophe[i];
                  const nombredevers = compterlesvers(strophe);
                  resultat += `\n${i + 1}. ${nombredevers} vers`;
              
                  const vers = strophe.split('\n');
                  for (let j = 0; j < vers.length; j++) {
                    const syllabe = compterlessyllabes(vers[j]);
                    resultat += `, ${syllabe} syllabes`;
                  }
                }
              
                console.log(resultat);
              }
              analyserlepoeme(poeme);
