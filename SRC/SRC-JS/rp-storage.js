

 // Initialisation des données et du chrono dans le localStorage
const STORAGE_KEY = "entries";
const CHRONO_KEY = "chrono";


let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let chrono = parseInt(localStorage.getItem(CHRONO_KEY)) || 0;

function updateStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));//<br><br>
  if( data.length == 0 ){
    
    //
    const astuce0 = `Aide #1 Comment ça marche ?                       <br><br> cliquer sur les astuces pour avoir des conseils d'utilisation sur le service Plumebot`;
    const astuce1 = `Aide #1  - Comment ça marche ?                      <br><br>(cliquer sur la plume <i class="fas fa-feather"></i> pour corriger ce texte)<br><br>Plumebot vous aide a corriger et azméliorer vos texte , écrivez votre texte puisquer lciquer surle bouton cirriger. Vous veré tou suite les fauts corriger et votre texte pluss clair et profésionnel !<br><br>Tester le mainteannt avec ce texte plien de faute"`;
    const astuce2 = `Aide #2 - Bouton "Améliorer"                      <br><br>(Choisissez le mode améliorer puis cliquez sur la plume <i class="fas fa-feather"></i>)<br><br>Avec Plumebot, vous pouvez sélectionner le mode « Améliorrer » pour optenir un texte plus fluide et proféssionel.<br><br>
Plumebot mettra en surblirance et surligné les element mdoifié, pour que vous puissiez voir exactement les ajustement proposer.<br><br>
Esséyer dès maintenan pour rendre vos texte impeccable !`; 
    
const astuce3 = `Aide #3 - Utilisation du journal                      <br><br>le bandeau à gauche appelé Journal enregistre tous vos textes, vous pouvez revenir à tout moment sur un texte en cliquant sur un élément du journal. Vous pouvez aussi ajouter directement dans le journal un texte en cliquant sur le bouton d'enregistrement.<BR><BR>Ce journal il est uniquement sur votre machine. Si vous supprimez les données, elles sont perdues pour toujours.`; 



    const astuces = [
      /*[new Date(), "0 "+astuce0.slice(0, 30), astuce0],*/
      [new Date(), "6 "+astuce1.slice(0, 30), astuce1],
      [new Date(), "6 "+astuce2.slice(0, 30), astuce2],
      [new Date(), "6 "+astuce3.slice(0, 30), astuce3],
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
  //return data;
  return data.sort((a, b) => new Date(b[0]) - new Date(a[0])); 
}

// Fonction pour ajouter une entrée
function addEntry(textPanel, Fulltext) {
  const date = new Date();
  const id = `id${chrono++}`; 
  /*if( data[0][2].charAt(0) == "1" && (textPanel.charAt(0) == 2 || textPanel.charAt(0) == 3 || textPanel.charAt(0) == 4 )){
      data.splice(1, 0, [date, id, textPanel, Fulltext]); 
  }
  else{
      data.unshift([date, id, textPanel,Fulltext]); 
  }*/
  data.push([date, id, textPanel,Fulltext]); 
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


