var placar = document.getElementById("placar")
var recorde = document.getElementById("recorde")
var crono_ = document.getElementById("cronometro")
var contador = 0
var n_rec = 0

var tempo = 0
var cronometro;
var cl_s;

function contar() { // inicia contagem dos cliques e o cronômetro

    contador += 1 // motor do contador de cliques
    placar.innerHTML= contador

    if (contador > 1) { //para que o botão não acione o cronômetro mais de uma vez
        pause()
    }

    cronometro = setInterval( function() { // cronometro
    tempo += 1
    crono_.innerHTML = tempo
    }, 1000)
}

function reset() { // reseta o contador e o cronômetro e registra o recorde (se houver)
    if (n_rec < contador) { // para saber se o recorde é menor que a qtd de cliques
        n_rec = contador
        cl_s = Math.round(n_rec/tempo)
        if (n_rec != 0) { // para que no início não ocorra recorde, caso o jogador clique em "reset" antes de contar
            recorde.innerHTML=`RECORDE: ${n_rec}<br>TEMPO: ${tempo}s<br>CLIQUES POR SEGUNDOS: ${cl_s}`
        }
    }
    contador = 0 // limpa todos os dados
    placar.innerHTML= 0
    crono_.innerHTML= 0
    clearInterval(cronometro)
    tempo = 0
}
