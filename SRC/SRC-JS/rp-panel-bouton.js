

//
// Gestion du panel
//
var positionPanel = 1; // 1 = open 0 = close
const dimMaxPanel = 1100;
const leftPanel = document.getElementById('left-panel');
const rightPanel = document.querySelector('.right-panel');
const buttonPanelDecrease = document.getElementById('bt-panel-journal');

document.addEventListener('click', function(event) {
    if (window.innerWidth < dimMaxPanel && positionPanel == 1) {
       adjustPanelLayoutDecrease();
    }
  
});

function adjustPanelLayout() {
  if (window.innerWidth < dimMaxPanel) {
    leftPanel.style.position = 'absolute';
    leftPanel.style.width = '0';
    positionPanel = 0;
    
  }
  else{
    
  }
}
function adjustPanelLayoutBT(){
  if( positionPanel == 0 ){
    adjustPanelLayoutIncrease();
  }
  else if( positionPanel == 1 ){
    adjustPanelLayoutDecrease();
  }
}
function adjustPanelLayoutDecrease() {
  if (window.innerWidth < dimMaxPanel) leftPanel.style.position = 'absolute';
  else                          leftPanel.style.position = 'relative';

  leftPanel.style.width = '0';
  leftPanel.style.transition = 'width 0.5s ease-in-out';
  rightPanel.style.transition = 'width 0.5s ease-in-out';
  positionPanel = 0;
}
function adjustPanelLayoutIncrease() {
  if (window.innerWidth < dimMaxPanel) leftPanel.style.position = 'absolute';
  else                          leftPanel.style.position = 'relative';
  if (window.innerWidth >= dimMaxPanel)   leftPanel.style.width = '280px';
  else                                    leftPanel.style.width = window.innerWidth+"px";

  leftPanel.style.transition = 'width 0.5s ease-in-out';
  rightPanel.style.transition = 'width 0.5s ease-in-out';
  positionPanel = 1;
}

buttonPanelDecrease.addEventListener('click', () => {
  event.stopPropagation();
  adjustPanelLayoutBT();
});


var winHeight = 0;
function preResize(){
  if( winHeight != window.innerHeight){
      winHeight = window.innerHeight;
  }
  else{
      adjustPanelLayout();
  }
}
window.addEventListener('resize', preResize);
window.addEventListener('load', adjustPanelLayout);

//
// gestion du bouton new
//

const buttonPanelNew = document.getElementById('bt-panel-new');
buttonPanelNew.addEventListener('click', () => {
  if( nbcounter >= 1 ){
    addEntry("5 "+document.getElementById("input").innerText.slice(0, 30),document.getElementById("input").innerHTML);
    activity = 1;
    addplacerOrder();
  }
});