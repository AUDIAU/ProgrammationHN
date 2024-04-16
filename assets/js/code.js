 // Appeler la fonction de segmentation lorsque la page est chargée
 //document.addEventListener("DOMContentLoaded", function() {
    //segmentation_mots();
//});


window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

//Tâche numéro 1 :

//function tokenisation() { //RÉCUPÉRER FILEDISPLAYAREA ICI POUR AVOIR ACCÈS AU FICHIER ET RÉCUPERER CE QUI EST ÉCRIT DANS LA BALISE DÉLIMITEURS ET NON ÉCRIRE LES CARACTÈRES (créer une variable pour les récuperer).
    //var reader = new FileReader();

            //reader.onload = function(e) {
            //fileDisplayArea.innerText = reader.result;
    //const delimiteurs = spring.split["delimID"];
    //const texte = document.getElementById("fileInput").value;
    //const mots = texte.toLowerCase().split(delimiteurs);
    
//}
//}

function segmentation_mots() {
    // Récupération texte fichier.
    var texteEntier = document.getElementById('fileDisplayArea').innerText;
    //Appeler la focntion tokenisation
    //tokenisation(result.reader);
    //const compterlesmots = {};
   

    // Compter les occurrences de chaque mot et leurs fréquences IL FAUT MODIFIER ÇA POUR COMPTER LES OCCURRENCES DE NOMBRE DE CARACTÈRES PAS LES OCCURRENCES DES MOTS
    //mots.forEach(mot => {
        //compterlesmots[mot] = (compterlesmots[mot] || 0) + 1;
    //});
    var motsoccurrences = {};
    var MotsTableau = texteEntier.match(/\b\w+\b/g);
    MotsTableau.forEach(function(Mot) {
        if (motsoccurrences[Mot]) {
            motsoccurrences[Mot]++;
        } else {
            motsoccurrences[Mot] = 1;
        }
    });
    // Trier par longueur croissante.
    var motsTri = Object.keys(motsoccurrences).sort(function(a, b) {
        return a.length - b.length;
    });

    // Afficher le nombre total de mots
    //document.getElementById("page_analysis").innerHTML = `Ce texte contient ${mots.length} mots.`;

        // Trier les mots par leur longueur croissante
        //mots.sort((a, b) => a.length - b.length);
    
        //const tableau_body = document.getElementById("tableau_body");
    
        // Ajouter chaque mot dans le tableau AJOUTER UNE NOUVELLE COLONNE
        //mots.forEach(mot => {
          //  const tr = document.createElement("tr");
            //const tdLongueur = document.createElement("td");
            //tdLongueur.textContent = mot.length;
            //const tdMot = document.createElement("td");
            //tdMot.textContent = mot;
            //tr.appendChild(tdLongueur);
            //tr.appendChild(tdMot);
            //tableau_body.appendChild(tr);
        //});
        var HTMLtableau = '<table>';
        HTMLtableau += '<tr><th>Nombre de caractères :</th><th>Nombre d\'occurrences :</th><th>Forme unique :</th></tr>';
        motsTri.forEach(function(Mot) {
            HTMLtableau += '<tr><td>' + Mot.length + '</td><td>' + motsoccurrences[Mot] + '</td><td>' + Mot + '</td></tr>';
        });
        HTMLtableau += '</table>';

        // Affichage tableau dans "page-analysis" doc html.
    document.getElementById('page_analysis').innerHTML = HTMLtableau;
    }




    
    //function cooccurrences() {

    //}

    //Tâche numéro 2 :

    // Fonction verification pour champ pôle et longueur remplis.
function verification() {
    var pole = document.getElementById('poleID').value;
    var longueur = document.getElementById('lgID').value;
    
    // Vérification si champ pôle et champ longueur remplis.
    if (pole.trim() === '' || longueur.trim() === '') {
        alert("Le champ Pôle et le champ Longueur ont besoin d'être remplis pour cette opération.");
        return false;
    }
    return true;
}

// Fonction calcul affichage des cooccurrences et fréquences.
function calculaffichagecooccurrences() {
    // Vérification validité entrées.
    if (!verification()) {
        return;
    }

    // Récupération texte fichier et mot entré par utilisateur.
    var texteEntier = document.getElementById('fileDisplayArea').innerText;
    var pole = document.getElementById('poleID').value.trim();
    var longueur = parseInt(document.getElementById('lgID').value.trim());

    // Récupération mots du texte.
    var tableauMots = texteEntier.match(/\b\w+\b/g);

    // Création objet pour stockage cooccurences et fréquences des cooccurrences.
    var cooccurrences = {};
    
    // Parcourir chaque mot du texte.
    for (var i = 0; i < tableauMots.length; i++) {
        var Mots = tableauMots[i];
        
        // Vérification mot actuel = mot entré par utilisateur.
        if (Mots === pole) {
            //  Contexte gauche et droit extraction de mot actuel.
            var contextegauche = tableauMots.slice(Math.max(0, i - longueur), i);
            var contextedroite = tableauMots.slice(i + 1, i + longueur + 1);
            
            // Coocurents Fréquences MàJ.
            for (var j = 0; j < contextegauche.length; j++) {
                var motsg = contextegauche[j];
                if (!cooccurrences[motsg]) {
                    cooccurrences[motsg] = { cofrequence: 0, frequenceG: 0, frequenceD: 0 };
                }
                cooccurrences[motsg].frequenceG++;
            }
            for (var k = 0; k < contextedroite.length; k++) {
                var motsd = contextedroite[k];
                if (!cooccurrences[motsd]) {
                    cooccurrences[motsd] = { cofrequence: 0, frequenceG: 0, frequenceD: 0 };
                }
                cooccurrences[motsd].frequenceD++;
            }
            // Co-fréquence MàJ.
            for (var cooccurrence in cooccurrences) {
                cooccurrences[cooccurrence].cofrequence += 1;
            }
        }
    }

    // Construction tableau HTML pour affichage résultats.
    var HTMLtableau = '<table>';
    HTMLtableau += '<tr><th>Coocurrences</th><th>Co-fréquence</th><th>Fréquence gauche</th><th>% Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence droite</th></tr>';
    
    // Affichage résultats et parcourir chaque cooccurence.
    for (var cooccurrence in cooccurrences) {
        var cooccurrenceData = cooccurrences[cooccurrence];
        var pourcentageG = ((cooccurrenceData.frequenceG / cooccurrenceData.cofrequence) * 100).toFixed(2);
        var pourcentageD = ((cooccurrenceData.frequenceD / cooccurrenceData.cofrequence) * 100).toFixed(2);
        
        HTMLtableau += '<tr>';
        HTMLtableau += '<td>' + cooccurrence + '</td>';
        HTMLtableau += '<td>' + cooccurrenceData.cofrequence + '</td>';
        HTMLtableau += '<td>' + cooccurrenceData.frequenceG + '</td>';
        HTMLtableau += '<td>' + pourcentageG + '%</td>';
        HTMLtableau += '<td>' + cooccurrenceData.frequenceD + '</td>';
        HTMLtableau += '<td>' + pourcentageD + '%</td>';
        HTMLtableau += '</tr>';
    }
    HTMLtableau += '</table>';

    // Affichage tableau dans "page-analysis" doc html.
    document.getElementById('page_analysis').innerHTML = HTMLtableau;
}
