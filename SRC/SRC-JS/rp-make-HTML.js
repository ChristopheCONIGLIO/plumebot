//document.addEventListener('DOMContentLoaded', function () {
  // Fonction pour générer le HTML
  function generateHTML(data) {
    const leftPanel = document.getElementById("left-panel-ctn");

    leftPanel.innerHTML = '';
    // Fonction pour ajouter une section avec la date
    function addDateSection(date) {
      const section = document.createElement("div");
      section.classList.add("section");

      const text = document.createElement("div");
      text.classList.add("text-left-bold");
      text.textContent = date;

      section.appendChild(text);
      leftPanel.appendChild(section);
    }

    // Fonction pour ajouter une section avec l'id et le texte
    function addEntrySection(id, text) {
      const section = document.createElement("div");
      section.classList.add("section");
      /*section.style.backgroundColor = "rgb(255, 0, 0)";*/

      const buttonText = document.createElement("button");
      
      buttonText.id = id;

      if( text.charAt(0) == 0)  buttonText.classList.add("text-left");
      if( text.charAt(0) == 6)  buttonText.classList.add("text-left", "text-leftS");
      if( text.charAt(0) == 1)  buttonText.classList.add("text-left");
      if( text.charAt(0) == 2)  buttonText.classList.add("text-left", "text-leftS");
      if( text.charAt(0) == 3)  buttonText.classList.add("text-left", "text-leftS");
      if( text.charAt(0) == 4)  buttonText.classList.add("text-left", "text-leftS");
      if( text.charAt(0) == 5)  buttonText.classList.add("text-left");
      if( text.charAt(0) == 7)  buttonText.classList.add("text-left");
      
      if( text.charAt(0) == 0)  buttonText.innerHTML += "<div id='panel-iconS'><i class='fas fa-atom'></i></div> ";
      if( text.charAt(0) == 6)  buttonText.innerHTML += "<div id='panel-iconL'><i class='far fa-question-circle'></i></div> ";
      if( text.charAt(0) == 1)  buttonText.innerHTML += "<div id='panel-iconS'><i class='fas fa-feather'></i></div> ";//far fa-dot-circle
      if( text.charAt(0) == 2)  buttonText.innerHTML += "<div id='panel-iconL2'><i class='fas fa-ellipsis-v'></i></div> ";
      if( text.charAt(0) == 3)  buttonText.innerHTML += "<div id='panel-iconL'><i class='far fa-check-circle'></i></div> ";//
      if( text.charAt(0) == 4)  buttonText.innerHTML += "<div id='panel-iconL'><i class='far fa-check-circle'></i></div> ";//
      if( text.charAt(0) == 5)  buttonText.innerHTML += "<div id='panel-iconS'><i class='far fa-save'></i></div> ";
      if( text.charAt(0) == 7)  buttonText.innerHTML += "<div id='panel-iconS'><i class='fas fa-times'></i></div> ";
      buttonText.innerHTML += text.slice(2);

      // Ajouter un événement au bouton texte
      buttonText.addEventListener("click", () => {
        document.getElementById("input").innerHTML = getTextById(id);
        formulaireChanged();
        activity = 1;
      });

      const buttonDelete = document.createElement("button");
      buttonDelete.classList.add("btn-right");
      buttonDelete.id = id;

      const icon = document.createElement("i");
      icon.classList.add("far", "fa-times-circle");
      buttonDelete.appendChild(icon);
      
      // Ajouter un événement au bouton corbeille
      buttonDelete.addEventListener("click", () => {
        deleteEntry(id);
        generateHTML(getEntries());
        activity = 1;
      });

      section.appendChild(buttonText);
      section.appendChild(buttonDelete);
      leftPanel.appendChild(section);
      /*buttonDelete.style.display = "none";
      section.addEventListener("mouseenter", () => {
        buttonDelete.style.display = "inline-block"; // Afficher le bouton corbeille
      });
    
      section.addEventListener("mouseleave", () => {
        buttonDelete.style.display = "none"; // Masquer le bouton corbeille
      });*/
    }

    // Fonction pour formater une date au format "mm/dd/yyyy"
    function formatDate(date) {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }

    // Fonction pour obtenir "Aujourd'hui" ou "Hier" ou la date réelle
    function getFormattedDate(date) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1); // Décrémenter d'un jour pour obtenir hier

      const formattedToday = formatDate(today);
      const formattedYesterday = formatDate(yesterday);
      const formattedDate = formatDate(date);

      if (formattedDate === formattedToday) {
        return "Aujourd'hui";
      } else if (formattedDate === formattedYesterday) {
        return "Hier";
      } else {
        return formattedDate; // Afficher la date sous son format réel
      }
    }

    // Variable pour suivre la date actuelle
    let currentDate = '';

    // Parcours des données et ajout des sections
    data.forEach(entry => {
      const [date, id, text] = entry;

      // Obtenir la date formatée (Aujourd'hui, Hier ou réelle)
      const formattedDate = getFormattedDate(new Date(date));

      // Si la date a changé, on ajoute une nouvelle section de date
      if (formattedDate !== currentDate) {
        addDateSection(formattedDate);
        currentDate = formattedDate;
      }

      // Ajouter les entrées associées à cette date
      addEntrySection(id, text);
    });
  }

  
//});

