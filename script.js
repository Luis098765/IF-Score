function addSpace(step) {
    let input = document.createElement("input");
    input.classList.add(`N${step}-input`)
    input.setAttribute('oninput', 'calcularMedia()')

    let container = document.querySelector(`.N${step}-inputs`);

    container.appendChild(input)
}

function removeSpace(step) {
    let container = document.querySelector(`.N${step}-inputs`);

    let inputs = container.querySelectorAll(`.N${step}-input`);
    if (inputs.length > 1) { 
        let lastInput = inputs[inputs.length - 1];
        container.removeChild(lastInput);
    }

    calcularMedia()
}

function calcularMedia() {
    let medias = [];

    for (let i=0; i<4; i++) {
        let soma = 0;
        let container = document.querySelector(`.N${i+1}-inputs`);
        let inputs = container.querySelectorAll(`.N${i+1}-input`);
        let numeroDeNotas = inputs.length;
        
        inputs.forEach(input => {
            if (Number(input.value) === 0 || isNaN(Number(input.value))) {
                numeroDeNotas --;
            } else {
                soma += Number(input.value);
            }
        })

        let media = numeroDeNotas > 0 ? soma / numeroDeNotas : 0

        medias[i] = media;
    }

    let mediaFinal = ((medias[0]) + (medias[1]*2) + (medias[2]*3) + (medias[3]*4)) / 10;

    let msg

    if (mediaFinal >= 6) {
        msg = "aprovado por média"
    } else {
        msg = "devendo nota"
    }

    document.getElementById("result").innerHTML = `Média final: ${mediaFinal} <br> Status: ${msg}`
}