

 // Initialisation des données et du chrono dans le localStorage
const STORAGE_KEY = "entries";
const CHRONO_KEY = "chrono";


let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let chrono = parseInt(localStorage.getItem(CHRONO_KEY)) || 0;

function updateStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));//<br><br>
  if( data.length == 0 ){
    
    //
    const astuce0 = `Comment ça marche ?                       <br><br> cliquer sur les astuces pour avoir des conseils d'utilisation sur le service Plumebot`;
    const astuce1 = `"Corriger" votre texte                      <br><br> (cliquer sur la plume pour corriger ce texte)<br><br>Plumebot vous aide a corriger et azméliorer vos texte , écrivez votre texte puisquer lciquer surle bouton cirriger. Vous veré tou suite les fauts corriger et votre texte pluss clair et profésionnel !<br><br>Tester le mainteannt avec ce texte plien de faute"`;
    const astuce2 = `"Améliorer" votre texte                      <br><br>(cliquer sur la plume pour corriger ce texte)<br><br>Choisissez le mode « Améliorer » pour voir renforcer votre texte<BR><BR>Avec Plumebot, vous pouvez sélectionner le mode « Améliorrer » pour optenir un texte plus fluide et proféssionel.<br><br>
Plumebot mettra en surblirance et surligné les element mdoifié, pour que vous puissiez voir exactement les ajustement proposer.<br><br>
Esséyer dès maintenan pour rendre vos texte impeccable !`; 
    
    const astuces = [
      [new Date(), "0 "+astuce0.slice(0, 30), astuce0],
      [new Date(), "6 "+astuce1.slice(0, 30), astuce1],
      [new Date(), "6 "+astuce2.slice(0, 30), astuce2],
    ];
  
    // Ajout en une seule opération
    astuces.forEach(astuce => {
      const date = new Date();
      const id = `id${chrono++}`;
      data.push([date, id, astuce[1], astuce[2]]);
    });
  
    updateStorage();
  }
  localStorage.setItem(CHRONO_KEY, chrono.toString());
}

function getEntries() {
  return data;
  return data.sort((a, b) => new Date(b[0]) - new Date(a[0])); 
}

// Fonction pour ajouter une entrée
function addEntry(textPanel, Fulltext) {
  const date = new Date();
  const id = `id${chrono++}`; 
  if( data[0][2].charAt(0) == "1" && (textPanel.charAt(0) == 2 || textPanel.charAt(0) == 3 || textPanel.charAt(0) == 4 )){
      data.splice(1, 0, [date, id, textPanel, Fulltext]); 
  }
  else{
      data.unshift([date, id, textPanel,Fulltext]); 
  }
  updateStorage(); 
  generateHTML(getEntries());
}

// Fonction pour supprimer une entrée par ID
function deleteEntry(id) {
  data = data.filter(entry => entry[1] !== id); 
  updateStorage(); 
  generateHTML(getEntries());
}

// Fonction pour récupérer le texte à partir d'un ID
function getTextById(id) {
  // Chercher l'entrée correspondant à l'ID
  const entry = data.find(entry => entry[1] === id);
  
  // Si l'entrée existe, renvoyer le texte
  if (entry) {
    return entry[3];
  } else {
    //console.log(`Entrée avec l'ID ${id} non trouvée.`);
    return null;  // Retourne null si l'ID n'existe pas
  }
}



updateStorage();
generateHTML(getEntries());


