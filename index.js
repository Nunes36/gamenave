let diryJ, dirxJ, jog, velJ, pjx, pjy;
let velT;
let velB;
let tamTelaW, tamTelaH; 
let jogo;
let frames;
let contBombas, painelContBombas;
let tmpCriaBomba;
let totalBombas;
let vidaPlaneta;

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
                totalBombas[i].remove();
                tiro.remove();
            }
        }
    }
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

function gameLoop() {
    if(jogo) {//func de controles
        controlaJogador();
        controleTiros();
        controlaBomba();
    }
    frames = requestAnimationFrame(gameLoop); 
};

function inicia() {
    jogo = true;
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
    clearInterval(tmpCriaBomba);
    contBombas = 150;
    velB = 3;
    tmpCriaBomba = setInterval(criaBomba, 1700);

    //Controles do planeta
    vidaPlaneta = 100;

    gameLoop();
}

window.addEventListener("load", inicia);
