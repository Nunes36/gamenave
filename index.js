let diryJ, dirxJ, jog, velJ, pjx, pjy;
let velT;
let velB;
let tamTelaW, tamTelaH; 
let jogo;
let frames;
let contBombas, painelContBombas;
let tmpCriaBomba;
let totalBombas;
let vidaPlaneta, barraPlaneta;
let indiceExplosao, indiceSom;
let telaMsg;

document.addEventListener("keydown", (event) => {
    let tecla = event.keyCode;
        if(tecla == 38){ //cima
            diryJ = -1;
        }else if(tecla == 40) { //baixo
            diryJ = 1;
        }
        if(tecla == 37){ //esquerda
            dirxJ = -1;
        }else if(tecla == 39){ //direira
            dirxJ = 1;
        }
        if(tecla == 32) { //tiro
            atira(pjx+17,pjy);
        }
    
});

document.addEventListener("keyup", (event) => {
    let tecla = event.keyCode;
    if((tecla == 38) || (tecla == 40)){ //cima
        diryJ = 0;
    }else if((tecla == 37)||(tecla == 39)) { //baixo
        dirxJ = 0;
    }
});


const controleTiros =() => {
    let tiros = document.getElementsByClassName("tiroJog");
    let tam = tiros.length;
    for(let i = 0; i < tam; i++) {
        if(tiros[i]) {
            let pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt+"px";
            colisaoTiroBomba(tiros[i]);
            if(pt < 0) {
                tiros[i].remove();
            }
        }
    }
};

const criaBomba = () => {
    if(jogo) {
        let y = 0;
        let x = Math.random()*tamTelaW;
        let bomba = document.createElement("div");
        let att1 = document.createAttribute("class");
        let att2 = document.createAttribute("style");
        att1.value = "bomba";
        att2.value = "top:"+y+"px;left:"+x+"px";
        bomba.setAttributeNode(att1);
        bomba.setAttributeNode(att2);
        document.body.appendChild(bomba);
        contBombas--;
    }
};

const controlaBomba = () => {
    totalBombas = document.getElementsByClassName("bomba");
    let tam = totalBombas.length;    
    for(let i = 0; i < tam; i++) {
        if(totalBombas[i]) {
            let pi = totalBombas[i].offsetTop;
            pi += velB;
            totalBombas[i].style.top=pi+"px";
            if(pi>tamTelaH) {
                vidaPlaneta -= 10;
                criaExplosao(1, totalBombas[i].offsetLeft, null);
                totalBombas[i].remove();
            } 
        }
    }
};

const colisaoTiroBomba = (tiro) => {
    let tam = totalBombas.length;
    for(let i = 0; i < tam; i++) {
        if(totalBombas[i]) {
            if(
                (
                    (tiro.offsetTop <= (totalBombas[i].offsetTop + 40))&&//cima tiro com baixo bomba
                    ((tiro.offsetTop + 6) >= (totalBombas[i].offsetTop))//baixo tiro com cima bomba
                )
                &&
                (
                    (tiro.offsetLeft <= (totalBombas[i].offsetLeft + 50))&&//colisão esquerda do tiro com a direita da bomba
                    ((tiro.offsetLeft + 6) >= (totalBombas[i].offsetLeft))//colisao direita do tiro com a esquerda da bomba
                )
            ){  
                criaExplosao(1, totalBombas[i].offsetLeft - 31, totalBombas[i].offsetTop);
                totalBombas[i].remove();
                tiro.remove();
            }
        }
    }
};

const criaExplosao = (tipo, x, y) => { //tipo 1 explosao ar
    if(document.getElementById("explosao"+(indiceExplosao - 1))) {
        document.getElementById("explosao" + (indiceExplosao - 1)).remove();
    }

    let explosao = document.createElement("div");
    let img = document.createElement("img");
    let som = document.createElement("audio");
    //atributos para div
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    let att3 = document.createAttribute("id");
    //atributo para imagem
    let att4 = document.createAttribute("src");
    //atributos para audio
    let att5 = document.createAttribute("src");
    let att6 = document.createAttribute("id");

    att3.value = "explosao" + indiceExplosao;

    if(tipo==1) {
        att1.value = "explosaoAr";
        att2.value = "top:"+y+"px; left:"+x+"px";
        att4.value = "explosao_chao.gif?" + new Date();
    }else{
        att1.value = "explosaoChao";
        att2.value = "top:" + (tamTelaH-57)+"px;left:"+(x-17)+"px";
        att4.value = "explosao_chao.gif?" + new Date();
    }
    att5.value = "audioExplosao.mp3?" + new Date();
    att6.value = "som" + indiceSom;
    explosao.setAttributeNode(att1);
    explosao.setAttributeNode(att2);
    explosao.setAttributeNode(att3);
    img.setAttributeNode(att4);
    som.setAttributeNode(att5);
    som.setAttributeNode(att6);
    explosao.appendChild(img);
    explosao.appendChild(som);
    document.body.appendChild(explosao);
    document.getElementById("som" + indiceSom).play();
    indiceExplosao++;
    indiceSom++;
}

const atira = ((x, y) => {
    let t = document.createElement("div");
    let att1 = document.createAttribute("class");
    let att2 = document.createAttribute("style");
    att1.value = "tiroJog";
    att2.value= "top:"+y+"px; left:"+x+"px";
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    document.body.appendChild(t);
});

const controlaJogador = () => {
    pjy += diryJ*velJ;
    pjx += dirxJ*velJ;
    jog.style.top = pjy+"px";
    jog.style.left = pjx+"px";
};

const gerenciaGame = () => {
    barraPlaneta.style.width = vidaPlaneta + "px";
    if(contBombas <= 0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage = "url('vitoria.gif')";
        telaMsg.style.backgroundRepeat = "no-repeat";
        telaMsg.style.display = "block";
    }
    if(vidaPlaneta<=0) {
        jogo = false;
        clearInterval(tmpCriaBomba);
        telaMsg.style.backgroundImage = "url('game_over.gif')";
        telaMsg.style.backgroundRepeat = "no-repeat";
        telaMsg.style.display = "block";
    }
}

function gameLoop() {
    if(jogo) {//func de controles
        controlaJogador();
        controleTiros();
        controlaBomba();
        gerenciaGame();
    }
    frames = requestAnimationFrame(gameLoop); 
};

const reinicia = () => {
    totalBombas=document.getElementsByClassName("bomba");
    let tam = totalBombas.length;
    for(let i = 0; i < tam; i++) {
        if(totalBombas[i]){
            totalBombas[i].remove();
        }
    }
    telaMsg.style.display = "none";
    cancelAnimationFrame(frames);
    vidaPlaneta = 200;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
    contBombas  = 150;
    jogo = true
    clearInterval(tmpCriaBomba);
    tmpCriaBomba = setInterval(criaBomba, 1700);
    gameLoop();
}

function inicia() {
    jogo = false;
    //ini Tela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //ini jogador
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ = velT = 5;
    jog = document.getElementById("navJog");
    jog.style.top = pjy+"px";
    jog.style.left = pjx+"px";

    //Controle bombas
    contBombas = 150;
    velB = 3;
    

    //Controles do planeta
    vidaPlaneta = 200;
    barraPlaneta=document.getElementById("barraPlaneta");
    barraPlaneta.style.width = vidaPlaneta + "px";

    //controle Explosao
    indiceExplosao = 0;
    indiceSom = 0;

    //telas
    telaMsg = document.getElementById("telaMsg");
    telaMsg.style.backgroundImage = "url('intro.jpg')";
    telaMsg.style.backgroundRepeat = "no-repeat";
    telaMsg.style.display = "block";
    document.getElementById("btnJogar").addEventListener("click", reinicia);

    gameLoop();
}

window.addEventListener("load", inicia);
