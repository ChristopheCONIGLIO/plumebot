<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-B8L6FVGESD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-B8L6FVGESD');
  </script>
  <link rel="icon" type="image/x-icon" href="/SRC/SRC-FAVICON/favicon.ico" />
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlumeBot - Gagnez en productivité avec notre outil de correction, d'analyse, d'amélioration et de synthèse de texte</title>
  <meta name="description" content="PlumeBot est un outil de correction, d'analyse, d'amélioration et de synthèse de texte qui vous aide à gagner en productivité en rédigeant des textes clairs, précis et sans faute.">
  <script>var g_menu_depth = "../";</script><script src="../10-COMMON-CSS/SRC-JS/MENU-PB.js"></script>
  
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-HEADER.css?v=21">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-HEADER2.css?v=21">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-INTRO.css?v=22">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-FORMULAIRE.css?v=22">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-FOOTER.css?v=22">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-RESULTAT.css?v=21">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-OPTIONS-CONTAINER.css">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-PANEL-TEXT.css">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-PANEL-BT.css">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-PANEL.css">
  <link rel="stylesheet" type="text/css" href="SRC/SRC-CSS/CSS-FORMULAIRE-TOOLS-BAR.css">
  
  <link href="./SRC/COTS/SRC-FONT/Poppins,Roboto/Poppins/Poppins-Medium.ttf" rel="stylesheet">
  <link href="./SRC/COTS/SRC-FONT/Poppins,Roboto/Poppins/Poppins-Bold.ttf" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
  
<style>
    @font-face {
      font-family: 'Poppins'; 
      src: url('./SRC/COTS/SRC-FONT/Poppins,Roboto/Poppins/Poppins-Medium.ttf') format('truetype');
      font-weight: 500; 
      font-style: normal;
    }
    @font-face {
      font-family: 'Poppins';
      src: url('./SRC/COTS/SRC-FONT/Poppins,Roboto/Poppins/Poppins-Bold.ttf') format('truetype');
      font-weight: 700; 
      font-style: normal;
    }
    @font-face {
      font-family: 'Poppins';
      src: url('./SRC/COTS/SRC-FONT/Poppins,Roboto/Poppins/Poppins-Light.ttf') format('truetype');
      font-weight: 300; 
      font-style: normal;
    }  
    :root {
      --longeur-general: 1250px;
      --couleur-general: #4b5fe0;
    }
    body {
      background-color: white;
      font-family: 'Poppins', sans-serif;
      font-size: 10px;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }

    
  </style>
</head>
<body>
  <div class="container">
    <?php
      include('../10-COMMON-CSS/SRC-PHP/MENU-PB-PHP.php');
      MENU_PB_generateMenu("../");
    ?>
    <div class="post-body">
      <div class="left-panel" id="left-panel">
        <div id="left-panel-ctn"></div>
      </div>
      <div class="right-panel">
        <a id="plumebotTop"></a>
        <div class="preToolbarUp0">
          <div class="toolbarUp0">
            <span id="accrochePetitArcencielN"> <i class="fas fa-feather"></i> PlumeBot_v2</span>
            <div id="intro">
              <div id="accroche">
                « Un <span id="accrochePetitArcenciel">éditeur de texte</span> simple et clair, <span id="accrochePetitArcenciel">Open Source</span> <br> propulsé par <span id="accrochePetitArcenciel">l’IA générative</span> pour <span id="accrochePetitArcenciel">corriger</span> et <span id="accrochePetitArcenciel">améliorer</span> vos textes. »
              </div>
            </div>
          </div>
        </div>
        <div class="preToolbarUp2">
          <div class="toolbarUp2">
            <div id="barreOutils">
              <button type="button" id="btForm2">
                <i class="fas fa-times" color="#2c2f5d" title="Supprimer"></i> <span></span>
              </button>
              <button type="button" id="btForm1">
                <i class="far fa-copy" color="#2c2f5d" title="Copier"></i> <span></span>
              </button>
              <button type="button" id="bt-panel-new" title="Sauvegarder">
                <i class="far fa-save" color="#2c2f5d"></i> <span></span>
              </button>
              <button type="button" id="bt-panel-journal">
                <i class="far fa-compass" color="#2c2f5d" title="Journal"></i> <span></span>
              </button>
              <button type="button" id="bt2" onclick="sendPost()">
                <i class="fas fa-feather"></i>
              </button>
              <div class="tabs-container">
                <div class="tab selectedTab" onclick="selectTab(this)">Corriger</div>
                <div class="tab" onclick="selectTab(this)">Améliorer</div>
              </div>
            </div>
          </div>
        </div>
        <div id="form-container">
          <div id="formulaire">
            <div id="counter">0/2000</div>
            <div id="input" class="placeholder" contenteditable="true">Écrivez ou copiez votre texte...</div>
          </div>
        </div>
        <a name="plumebotAide"></a>
        <div id="bandexplicationfooter">
          <div id="bandexplicationfooterTexte">
            <strong><i class='fas fa-lightbulb'></i> Comment utiliser PlumeBot ? <i class='fas fa-lightbulb'></i></strong>
          </div>
          <div id="explicationfooter">
            Ecrivez ou copiez votre texte, sélectionnez le mode <strong>"Corriger"</strong> ou <strong>"Améliorer"</strong>, et Plumebot corrigera ou améliorera automatiquement votre contenu
          </div>
          <div id="explicationfooter">
            Les ajouts seront soulignés en <div id='rsp_Bold'>rouge</div> et les suppressions en <div id='rsp_Bold2'>bleu</div> pour une visualisation rapide des corrections.
          </div>
          <div id="explicationfooter">
            Utilisez les boutons <strong>Copier</strong> et <strong>Effacer</strong> pour gagner du temps.
          </div>
          <div id="explicationfooter">
            <strong>Confidentialité</strong>, aucun de vos textes n'est analysé ni sauvegardé sur nos serveurs, tout est gardé en local sur votre machine. Pour traiter les textes, nous passons par la technologie OpenAI GPT-4 et sommes soumis à leur <a href="https://openai.com/enterprise-privacy" target="_blank" title="politique de confidentialité" rel="noopener">politique de confidentialité</a> :
          </div>
        </div>
        <div id="bandexplicationfooter">
          <div id="bandexplicationfooterTexte">
            <strong><i class="fas fa-rocket"></i> Vous avez envie d'une nouvelle fonctionnalité ? <i class="fas fa-rocket"></i></strong>
          </div>
          <div id="explicationfooter">
            <strong>PlumeBot</strong> évolue de jour en jour, partager votre avis en me contactant à <a href="mailto:christophe.coniglio@gmail.com">christophe.coniglio@gmail.com</a>
          </div>
          <div id="explicationfooter">
            <strong>PlumeBot</strong> est open source : téléchargez-le et installez-le sur votre site, ou explorez son code pour en découvrir les secrets
          </div>
        </div>
        <a name="plumebotQuestions"></a>
        <div id="bandexplicationfooter">
          <div id="bandexplicationfooterTexte">
            <strong><i class="fas fa-question"></i> Questions / Réponses <i class="fas fa-question"></i></strong>
          </div>
          <div id="explicationfooter">
            <strong>PERFORMANCE</strong><br>PlumeBot se base sur les dernières avancées en matière d'intelligence artificielle pour offrir des suggestions pertinentes. Attention toutefois, il n'est pas infaillible. De plus, privilégiez les textes longs apportant du contexte pour avoir de meilleurs résultats.
          </div>
          <div id="explicationfooter">
            <strong>ACCESSIBILITÉ</strong><br>Toutes les fonctionnalités de <strong>PlumeBot</strong> sont accessibles gratuitement depuis un navigateur de votre ordinateur ou de votre téléphone.
          </div>
          <div id="explicationfooter">
            <strong>ÉVOLUTION</strong><br>PlumeBot est en constante évolution, alors n'hésitez pas à y revenir plus tard pour découvrir les nouvelles fonctionnalités qui y seront ajoutées.
          </div>
        </div>
        <div id="footerCCO">
          <footer id="apropos">
            <strong>Le site est en constante évolution, et je suis toujours à l'écoute de nouvelles idées visant à améliorer ses fonctionnalités.</strong><br>Si vous avez des suggestions ou des retours, n'hésitez pas à me contacter à l'adresse suivante : <a href="mailto:christophe.coniglio@gmail.com">christophe.coniglio@gmail.com</a>. PlumeBot garantit la confidentialité de vos données : aucun texte que vous saisissez sur ce site n'est sauvegardé, ni sur votre appareil, ni sur nos serveurs. L'outil utilise l'API d'OpenAI, et nous nous conformons à leur politique de confidentialité, que vous pouvez consulter <a href="https://openai.com/enterprise-privacy" target="_blank" title="Politique de confidentialité d'OpenAI" rel="noopener">ici</a>.
          </footer>
        </div>
      </div>
    </div>
  </div>
</body>

<script src="./SRC/COTS/SRC-JS/diff_match_patch.js?v=24"></script>
<script src="./SRC/SRC-JS/engine1_2.js"></script>
<script src="./SRC/SRC-JS/event.js?v=23"></script>
<script src="./SRC/SRC-JS/engine2_2.js"></script>
<script src="./SRC/SRC-JS/rp-make-HTML.js"></script>
<script src="./SRC/SRC-JS/rp-storage.js"></script>
<script src="./SRC/SRC-JS/rp-panel-bouton.js"></script>



</html>

