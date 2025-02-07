
unlockEngine();

    


/*
Cette partie permet d'accélérer le fichier texte écrit par le PHP
et de le mettre à jour le plus vite possible en simulant l'arrivée de paquets via des sockets.
Obliger de passer par la car ovh bloque le stream en php...
*/
function manageRequest(resp,final){
  if( !final ){
    if( levenshteinDistance(currentOriginalText,resp)/currentOriginalText.length > 1.1){
      if( resp.length > 20 ) currentAnimTextTexte = "Je suis désolé, PlumeBot ne peut pas comprendre le texte. Veuillez le réécrire pour que je puisse vous aider.";
    }else{
      if( currentAnimTextTexte.length < resp.length){
        currentAnimTextTexte = resp; // le BR est gérer à la fin voir boucle 
        }
    }
  }
  if( final ){
    //removeBtIAtrans();
      if( resp == " "){
          //document.getElementById(currentIDUpdateText).innerHTML = "Désolé, il y a eu un problème. Vous pouvez relancer l'opération.";
          //console.log("php revoit une chaine vide");
          const textarea = document.getElementById("input");
          textarea.innerHTML  = "";
      }
      if( levenshteinDistance(currentOriginalText,resp)/currentOriginalText.length > 1.1){
          //document.getElementById(currentIDUpdateText).innerHTML = "Je suis désolé, PlumeBot ne peut pas comprendre le texte. Veuillez le réécrire pour que je puisse vous aider.";
          //console.log("levenshteinDistance > 1.1");
          const textarea = document.getElementById("input");
          textarea.innerHTML  = ""; 
      }else{
          let textenrichi = compare2string(currentOriginalText,resp,false);
          //document.getElementById(currentIDUpdateText).innerHTML = textenrichi.replace(/\n/g, "<br>");
          const textarea = document.getElementById("input");
          textarea.innerHTML  = textenrichi.replace(/\n/g, "<br>"); 
          //addEntry("<div id='panel-icon'><i class='fas fa-feather'></i></div> "+resp.slice(0, 30),textenrichi.replace(/\n/g, "<br>"));
          addEntry("3 "+resp.slice(0, 30),textenrichi.replace(/\n/g, "<br>"));
          

      }
      unlockEngine(); 
      clearInterval(currentTextKeyLoop);
      clearInterval(currentAnimTextLoop);
  }
}

/*
Cette partie permet d'animer agréablement pour l'œil l'arrivée des lettres plutôt que par bloc
comme le fait la fonction d'avant.
On incrémente un string 1 par 1, ça ralentit et stabilise l'écriture.
C'est beaucoup beaucoup plus agréable en termes d'UX.
*/
function manageRequestLoop() {
  let doEnrichissement = false;
  //
  // partie animation
  //
  if( currentAnimTextWrite.length < currentAnimTextTexte.length){
    currentAnimTextWrite = currentAnimTextTexte.substring(0,currentAnimTextWrite.length+1);
    doEnrichissement = true;
  }
  //
  // partie enrichissement html
  //


  if( doEnrichissement ){
    
    if( currentAnimTextTexte  != "Je suis désolé, PlumeBot ne peut pas comprendre le texte. Veuillez le réécrire pour que je puisse vous aider."){
      let textenrichi = compare2string(currentOriginalText,currentAnimTextWrite,true);
      //document.getElementById(currentIDUpdateText).innerHTML = textenrichi.replace(/\n/g, "<br>"); 

      //ICI
      const textarea = document.getElementById("input");;
      textarea.innerHTML  = textenrichi.replace(/\n/g, "<br>"); 
    }
    else{
      //document.getElementById(currentIDUpdateText).innerHTML = currentAnimTextWrite.replace(/\n/g, "<br>");
      const textarea = document.getElementById("input");;
      textarea.innerHTML  = textenrichi.replace(/\n/g, "<br>"); 
    }
    
     
  }
}


function sendDataRequestStreamDisk1_2(mode,data){
  //console.log("mode",mode);
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  formData.append('data_mode', mode);
  formData.append('data_data', data);
  currentTextKeyFile = sendDataRequestStreamDiskBonus(30);
  formData.append('data_key', currentTextKeyFile);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 ) manageRequest(xhr.responseText,true);
  }
  xhr.open('POST', './SRC/SRC-PHP/requestAPIstreamDisk.php', true);
  xhr.send(formData);
  
  currentAnimTextTexte = "";
  currentAnimTextWrite = "";
  currentTextKeyLoop =  setInterval(sendDataRequestStreamDisk2_2, 175);
  currentAnimTextLoop = setInterval(manageRequestLoop, 8);
}
function sendDataRequestStreamDisk2_2() {
  try {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) manageRequest(xhr.responseText,false);
      }
    };
    xhr.onerror = function() {
    };
    xhr.open("GET", "./SRC/SRC-PHP/FRESH/"+currentTextKeyFile, true);
    xhr.send();
  } catch (error) {
  }
}
function sendDataRequestStreamDiskBonus(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
  
function levenshteinDistance(a, b) {
    // initialiser les tableaux de distances
    const distances = [];
    for (let i = 0; i <= a.length; i++) {
      distances[i] = [i];
    }
    for (let j = 0; j <= b.length; j++) {
      distances[0][j] = j;
    }
  
    // calculer la distance
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        if (a.charAt(i - 1) === b.charAt(j - 1)) {
          distances[i][j] = distances[i - 1][j - 1];
        } else {
          distances[i][j] = Math.min(
            distances[i - 1][j] + 1, // suppression
            distances[i][j - 1] + 1, // insertion
            distances[i - 1][j - 1] + 1 // substitution
          );
        }
      }
    }
  
    // retourner la distance
    return distances[a.length][b.length];
}




/*
function compare2string(text1,text2){
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(text1, text2);
  var text3 = "";
  for(var k = 0; k <diffs.length;k++){
    if( diffs[k][0] == 0 ) text3 += diffs[k][1];
    else if( diffs[k][0] == 1 ) text3 += "<div id='rsp_Bold'>" + diffs[k][1] + "</div>";
    //if( diffs[k][0] == -1 ) text3 += "<div id='rsp_Rature'>" + "." + "</div>";
    //if( diffs[k][0] == 1 ) text3 += "<strong>" + diffs[k][1] + "</strong>";
  }
  return text3;
}*/




function compare2string(text1, text2,addlastText) {
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(text1, text2);
  let text3 = "";
  let realLength = 0;
  //let letterdelette = 0;
  /*for (let k = 0; k < diffs.length; k++) {
    
    if (diffs[k][0] == 0) { // do nothing
      text3 += diffs[k][1];
      realLength += diffs[k][1].length;
      letterdelette = 0;
    }
    else if (diffs[k][0] == 1) {  // do corrected
      text3 += "<div id='rsp_Bold'>" + diffs[k][1] + "</div>";
      realLength += diffs[k][1].length;
      letterdelette = 0;
    }
    
  }*/
    for (let k = 0; k < diffs.length; k++) {
      if (diffs[k][0] == 0) { // cas 0
          // Vérifier le caractère précédent
          if (k > 0 && diffs[k - 1][0] == -1) {
              text3 += "<div id='rsp_Bold2'>" + diffs[k][1][0] + "</div>";
              text3 += diffs[k][1].slice(1);
          } 
          // Vérifier le caractère suivant
          /*else if (k < diffs.length - 1 && diffs[k + 1][0] == -1) {
              const lastCharIndex = diffs[k][1].length - 1;
              text3 += diffs[k][1].slice(0, lastCharIndex);
              text3 += "<div id='rsp_Bold2'>" + diffs[k][1][lastCharIndex] + "</div>";
          } */
          else {
              text3 += diffs[k][1];
          }
          realLength += diffs[k][1].length;
          letterdelette = 0;
      } else if (diffs[k][0] == 1) { // cas 1
          text3 += "<div id='rsp_Bold'>" + diffs[k][1] + "</div>";
          realLength += diffs[k][1].length;
          letterdelette = 0;
      }
      // cas -1 : Ne rien ajouter
  }
  const remainingChars = text1.length - realLength;
  if (remainingChars > 0 && addlastText) {
    text3 += "<div id='rsp_Rature'>" + text1.slice(text1.length - remainingChars) + "</div>";
  }
  
  return text3;
}
