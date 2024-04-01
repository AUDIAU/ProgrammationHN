function segmentation_mots() {
    const delimiteurs = /[,;’'~|&#@=`\-\.\?!%*\(\)\[\]{}_:\+«»\/§]/;
    const texte = document.getElementById("fileInput").value;
    const mots = texte.toLowerCase().split(delimiteurs);
    const compterlesmots = {};
   

    // Compter les occurrences de chaque mot
    mots.forEach(mot => {
        compterlesmots[mot] = (compterlesmots[mot] || 0) + 1;
    });

    // Afficher le nombre total de mots
    document.getElementById("page_analysis").innerHTML = `Ce texte contient ${mots.length} mots.`;

        // Trier les mots par leur longueur croissante
        mots.sort((a, b) => a.length - b.length);
    
        const tableau_body = document.getElementById("tableau_body");
    
        // Ajouter chaque mot dans le tableau
        mots.forEach(mot => {
            const tr = document.createElement("tr");
            const tdLongueur = document.createElement("td");
            tdLongueur.textContent = mot.length;
            const tdMot = document.createElement("td");
            tdMot.textContent = mot;
            tr.appendChild(tdLongueur);
            tr.appendChild(tdMot);
            tableau_body.appendChild(tr);
        });
    }

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

            reader.onload = function(e) {
            fileDisplayArea.innerText = reader.result;
            segmentation_mots(reader.result); // Appel de la fonction de segmentation avec le contenu du fichier
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