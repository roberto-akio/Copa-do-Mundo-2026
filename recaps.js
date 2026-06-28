(function(){
  "use strict";

  /* =======================================================================
     LISTA ÚNICA DE RECAPS
     Para publicar um novo recap, adicione UMA linha aqui (o mais recente
     no topo) e suba o arquivo .html no repositório. Todos os recaps já
     publicados passam a mostrar a lista completa automaticamente.
     ======================================================================= */
  var RECAPS = [
    { dia: 17, arquivo: "recap-dia-17.html", titulo: "Argentina tem a rota mais leve; Messi mira Fontaine" },
    { dia: 16, arquivo: "recap-dia-16.html", titulo: "Dembélé mira a Bola de Ouro; Cabo Verde faz história" },
    { dia: 15, arquivo: "recap-dia-15.html", titulo: "Equador derruba a Alemanha; EUA tropeçam" },
    { dia: 14, arquivo: "recap-dia-14.html", titulo: "Brasil fecha o grupo em primeiro" },
    { dia: 13, arquivo: "recap-dia-13.html", titulo: "Ronaldo entra para a história" },
    { dia: 12, arquivo: "recap-dia-12.html", titulo: "Messi assume a artilharia da história" },
    { dia: 11, arquivo: "recap-dia-11.html", titulo: "Lamine Yamal entra em cena; o torneio dos goleiros" },
  ];
  /* ===================================================================== */

  function currentFile(){
    var p = window.location.pathname;
    var i = p.lastIndexOf("/");
    var f = i >= 0 ? p.substring(i + 1) : p;
    return f === "" ? "index.html" : f;
  }

  function esc(s){
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function buildPanelHtml(here){
    var html = '<div class="nav-more-title">Todos os recaps</div>';
    var i;
    for(i = 0; i < RECAPS.length; i++){
      var r = RECAPS[i];
      var atual = (r.arquivo === here);
      var badge = atual
        ? ' <span style="color:#3ddc84;font-size:10px;letter-spacing:.06em;">&bull; atual</span>'
        : '';
      html += '<a class="nav-more-item" role="menuitem" href="' + esc(r.arquivo) + '">'
            + '<span class="d">Dia ' + esc(r.dia) + badge + '</span>'
            + '<span class="t">' + esc(r.titulo) + '</span></a>';
    }
    return html;
  }

  function wire(btn, panel){
    btn.addEventListener("click", function(e){
      e.stopPropagation();
      var open = panel.className.indexOf("open") !== -1;
      panel.className = open ? "nav-more-panel" : "nav-more-panel open";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
    panel.addEventListener("click", function(e){ e.stopPropagation(); });
    document.addEventListener("click", function(){
      panel.className = "nav-more-panel";
      btn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", function(e){
      if(e.keyCode === 27){
        panel.className = "nav-more-panel";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function init(){
    var oldBtn = document.getElementById("prevBtn");
    var panel = document.getElementById("prevPanel");
    if(!oldBtn || !panel){ return; }

    var btn = oldBtn.cloneNode(false);
    btn.innerHTML = 'Recaps <span class="caret">&#9660;</span>';
    btn.setAttribute("aria-expanded", "false");
    oldBtn.parentNode.replaceChild(btn, oldBtn);

    panel.className = "nav-more-panel";
    panel.innerHTML = buildPanelHtml(currentFile());

    wire(btn, panel);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
