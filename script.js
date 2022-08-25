let seuVotoPara = document.querySelector('.div--01--01 span');
let cargo = document.querySelector('.div--01--02 span');
let descricao = document.querySelector('.div--01--04');
let aviso = document.querySelector('.div--02');
let lateral = document.querySelector('.div--01--right');
let numeros = document.querySelector('.div--01--03');

//variaveis de tapas

let etapaAtual = 0;
let numero = '';
let votoBranco = false;


function comecarEtapa(){
    let etapa =etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    let votoBranco = false;

    for( let i=0; i < etapa.numeros; i ++){
        if(i === 0){
            numeroHTML +=  '<div class="number pisca"></div>';
        }
        numeroHTML +=  '<div class="number "></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface () {
let etapa = etapas[etapaAtual];
let candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero){
        return true;
    } else {
        return false;
    }
});
    if (candidato.length > 0 ){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for( let i in candidato.fotos) {
            fotosHtml += `<div class="div--01--img"><img src="/images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';


    }
   
}

function clicou(n){
    let elNumero = document.querySelector('.number.pisca');
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
        
    }
}

function branco() {
    numero === '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    if(votoBranco !== false){
        console.log('confirmando como BRANCO');
    } else if (numero.length === etapa.numeros) {
        console.log('confirmando como '+ numero);
    }
    
}

comecarEtapa();