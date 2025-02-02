function addSpace(step) {
    let input = document.createElement("input");
    input.classList.add(`N${step}-input`)
    input.setAttribute('oninput', 'calcularMedia()')
    input.setAttribute('placeholder', '0.0')

    let container = document.querySelector(`.N${step}-inputs`);

    input.style.opacity = "0";
    input.style.transform = "scale(0.8)";
    input.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    container.appendChild(input)

    setTimeout(() => {
        input.style.opacity = "1";
        input.style.transform = "scale(1)";
    }, 10);

    calcularMedia()
}

function removeSpace(step) {
    let container = document.querySelector(`.N${step}-inputs`);
    let inputs = container.querySelectorAll(`.N${step}-input`);

    if (inputs.length > 1) { 
        let lastInput = inputs[inputs.length - 1];

        lastInput.style.opacity = "0";
        lastInput.style.transform = "scale(0.8)";
        
        setTimeout(() => {
            lastInput.remove();
            calcularMedia();
        }, 140);
    }
}

function calcularMedia() {
    let medias = [];

    for (let i=0; i<4; i++) {
        let soma = 0;
        let container = document.querySelector(`.N${i+1}-inputs`);
        let inputs = container.querySelectorAll(`.N${i+1}-input`);
        let numeroDeNotas = inputs.length;
        
        inputs.forEach(input => {
            if (isNaN(Number(input.value.replace(',', '.')))) {
                numeroDeNotas --;
            } else {
                soma += Number(input.value.replace(',', '.'));
            }
        })

        let media = numeroDeNotas > 0 ? soma / numeroDeNotas : 0

        medias[i] = media;
    }

    let mediaFinal = ((medias[0]) + (medias[1]*2) + (medias[2]*3) + (medias[3]*4)) / 10;

    let msg

    if (mediaFinal >= 6) {
        msg = `<span style="color: green">aprovado por média</span>`
    } else {
        msg = `<span style="color: red">devendo nota</span>`
    }

    document.getElementById("result").innerHTML = `Média final: ${mediaFinal} <br> Status: ${msg}`
}

calcularMedia()