var placar = document.getElementById("placar"),
    recorde = document.getElementById("recorde"),
    crono_ = document.getElementById("cronometro"),
    contador = 0,
    n_rec = 0,
    tempo = 0,
    cronometro = 0,
    cl_s = 0
const btn__reset = document.querySelector('#btn-reset')

let context, // Variáveis para os efeitos sonoros
	oscillator,
    contextGain,
  x = 0;

function start(){ // Declarações de funções para aplicar efeito sonoro de click nos botões
	context = new AudioContext(); // AudioContext é o objeto para poder gerar um som
	oscillator = context.createOscillator() // Oscilador é responsável por emitir o sinal contínuo (o som)
    contextGain = context.createGain()
  
    oscillator.connect(contextGain)
	contextGain.connect(context.destination) //leva o som ao local que vai reproduzí-lo (fone, caixa de som...)
	oscillator.start(0)
}
function stop(){
  start()
  contextGain.gain.exponentialRampToValueAtTime(
  	0.00001, context.currentTime + x
	)
}

btn__reset.addEventListener('click', function() {//som para o botão de RESET
    x=0.1
    stop()
})

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
