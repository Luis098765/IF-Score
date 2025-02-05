const buttons = document.querySelectorAll(".button")
var min_media = 0

function addSpace(step) {
    let input = document.createElement("input");
    input.classList.add(`N${step}-input`)
    input.setAttribute('oninput', 'calcularMedia()')
    input.setAttribute('placeholder', '0.0')
    input.setAttribute('type', 'number')

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

function select(position) {
    if (position == 0) {
        buttons[0].classList.remove("unselected")
        buttons[0].classList.add("selected")

        buttons[1].classList.remove("selected")
        buttons[1].classList.add("unselected")

        min_media = 6
    } else {
        buttons[1].classList.remove("unselected")
        buttons[1].classList.add("selected")
        
        buttons[0].classList.remove("selected")
        buttons[0].classList.add("unselected")

        min_media = 7
    }

    calcularMedia()
}

function calcularMedia() {
    if (min_media == 0) {
        document.getElementById("result").innerHTML = "Primeiro, selecione o nível do curso"
    } else {
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

        if (mediaFinal >= min_media) {
            msg = `<span style="color: green">aprovado por média</span>`
        } else {
            msg = `<span style="color: red">devendo nota</span>`
        }

        document.getElementById("result").innerHTML = `Média final: ${mediaFinal} <br> Status: ${msg}`
    }

    }

calcularMedia()