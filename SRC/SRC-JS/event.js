



function PlumeBot_getTextforClipBoard($text){
  var textWithLineBreaks = $text.replace(/<br\s*[\/]?>/gi, "\n"); //BR par saut d eligne
  return textWithLineBreaks.replace(/<\/?[^>]+(>|$)/g, ""); //surpime les autres balise
}
function PlumeBot_CopyToClipboard($text){
  let text = PlumeBot_getTextforClipBoard($text);
  var textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  
}

document.getElementById("btForm1").addEventListener('click', (event) => {
    PlumeBot_CopyToClipboard(document.getElementById("input").innerText);
});
document.getElementById("btForm2").addEventListener('click', (event) => {
    if( document.getElementById("input").innerHTML != ""  &&  document.getElementById("input").innerHTML != placeholder){
        addEntry("7 "+document.getElementById("input").innerText.slice(0, 30),document.getElementById("input").innerHTML);
        activity = 1;
        addplacerOrder();
    }
    
    document.getElementById("input").innerHTML = ""; 
    document.getElementById("input").innerText = ""; 
    addplacerOrder();
    formulaireChanged();
    activity = 1;
});



document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'Enter') {
    sendPost("Correction");
  }
});


var nbcounter = 0;
const placeholder = "Écrivez ou copiez votre texte... puis cliquez sur la plume";
document.getElementById("input").addEventListener('blur', () => {
  addplacerOrder();
});

function addplacerOrder(){
  if (document.getElementById("input").innerText.trim() === "") {
    document.getElementById("input").innerHTML = placeholder; 
    document.getElementById("input").classList.add("placeholder");
  }
}


function formulaireChanged(nameevent) {
  
  if(document.getElementById("input").innerText.trim().length <= 1){ //pour catcher le ctrl A + la premeire lettre
    activity = 1; //reset le panel
  }
  if (document.getElementById("input").innerText.trim() === placeholder) {
      document.getElementById("input").innerHTML = ""; 
      document.getElementById("input").classList.remove("placeholder");
  }
  else if(document.getElementById("input").innerText.trim().length > 0){
      document.getElementById("input").classList.remove("placeholder");
  }
  
  let size = document.getElementById("input").innerText.trim().length;
  document.getElementById("counter").innerHTML = size + "/2000";
  nbcounter = size;
  if( size >= 1 && nameevent == "focus"){
    let editableDiv = document.getElementById("input");
    editableDiv.innerHTML = editableDiv.innerText.replace(/\n/g, '<br>');

  }

  if (size == 0 && lockerEngine == 0) {
      document.getElementById('bt2').classList.add('notVisible');
  }
  if (size >= 1 && lockerEngine == 0) {
      document.getElementById('bt2').classList.remove('notVisible');
  }

  const isMobileWidth = window.innerWidth <= 768;
  const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobile = isMobileWidth || isMobileAgent;
  if (isMobile) {
      const ancre1 = document.getElementById('plumebotTop');
      ancre1.scrollIntoView();
  }
}


const form = document.querySelector('#input'); // sélectionne le formulaire
form.addEventListener('focus', (event) => { formulaireChanged("focus"); });
//form.addEventListener('blur', (event) => { formulaireChanged(); });
form.addEventListener('input', (event) => { formulaireChanged(); });
form.addEventListener('click', (event) => { formulaireChanged(); });
form.addEventListener('dblclick', (event) => { formulaireChanged(); });

form.addEventListener('keydown', (event) => { formulaireChanged(); });
form.addEventListener('keyup', (event) => { formulaireChanged(); });
form.addEventListener('keypress', (event) => { formulaireChanged(); });
form.addEventListener('contextmenu', (event) => { formulaireChanged(); });
form.addEventListener("paste", (event) => {
  event.preventDefault();
  const text = (event.clipboardData || window.clipboardData).getData("text");
  /*const selection = window.getSelection();
  const input = event.target;
  if (input.value.length === input.selectionEnd - input.selectionStart) {
    //TODO
  }*/
  activity = 1;
  document.execCommand("insertText", false, text);
  formulaireChanged();
});


