/*
0 aide
1 et 2 = bt corriger 1 petit 2 grand
3 et 4 = retour corriger +améliorer
5 = nouveau 
6 = aide bersion 2
*/
var activity = 1;


//
// fonction relatives a longlet de selection du mode
//
var selectedMode = "Corriger";
function selectTab(selectedTab) {
    const tabs = document.querySelectorAll('.tabs-container > div');
    tabs.forEach(tab => {
        tab.classList.remove('selectedTab');
    });
    selectedMode = selectedTab.innerText;
    selectedTab.classList.add('selectedTab');
}

//
// fonction relatives au chnagement de visuel suivant si on attend la correction ou pas
//
var lockerEngine = 0;
function lockEngine(){
  lockerEngine = 1;
  document.getElementById('bt2').classList.add('notVisible');
  document.getElementById('input').contentEditable = 'false';
}
function unlockEngine(){
  lockerEngine = 0;
  let bt2 = document.getElementById('bt2');
  bt2.classList.remove('notVisible', 'hover'); // Retirer toute classe appliquée
  document.getElementById('input').contentEditable = 'true';
}

//
// appel du bouton plume 
//
var currentOriginalText= ""; //permet d'accéder au texte envoyer par l'utilisateur pendant la correction
function sendPost() {
    if (nbcounter <= 0) return;
    if (nbcounter >= 2001) return;
    if( lockerEngine == 1) return;  //on eject direct
    lockEngine();
    currentOriginalText = document.getElementById("input").innerText;
    let mode = 1;
    if( selectedMode == "Corriger" )        mode = 1;
    else if (selectedMode == "Améliorer")  mode = 2;
    addEntry(activity+" "+document.getElementById("input").innerText.slice(0, 30),document.getElementById("input").innerHTML);
    activity = 2;
    this.sendDataRequestStreamDisk1_2(mode,currentOriginalText);
}


