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

        document.getElementById("superior").style.display = "none"
        document.getElementById("medio").style.display = "block"

        min_media = 6
    } else {
        buttons[1].classList.remove("unselected")
        buttons[1].classList.add("selected")
        
        buttons[0].classList.remove("selected")
        buttons[0].classList.add("unselected")

        document.getElementById("medio").style.display = "none"
        document.getElementById("superior").style.display = "block"

        min_media = 7
    }

    calcularMedia()
}

function calcularMedia() {
    if (min_media == 0) {
        document.getElementById("result").innerHTML = "Primeiramente, <br> selecione o nível do curso. <br> Em caso de dúvidas, leia o manual."
    } else {
        let medias = [];
        let notaAF = 0;
        let mediaFinal = 0;

        if (min_media == 6) {
            for (let i=0; i<4; i++) {
                let soma = 0;
                let container = document.querySelector(`#medio .N${i+1}-inputs`);
                let inputs = container.querySelectorAll(`#medio .N${i+1}-input`);
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

            mediaFinal = ((medias[0]) + (medias[1]*2) + (medias[2]*3) + (medias[3]*4)) / 10;
        } else if (min_media == 7) {
            for (let i=0; i<2; i++) {
                let soma = 0;
                let container = document.querySelector(`#superior .N${i+1}-inputs`);
                let inputs = container.querySelectorAll(`#superior .N${i+1}-input`);
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

            mediaFinal = ((medias[0]*2) + (medias[1]*3)) / 5;
        }

        let msg

        if (mediaFinal >= min_media) {
            msg = `<span style="color: green">aprovado por média</span>`
        } else if (mediaFinal >= 3) {
            notaAF = 2 * 5 - mediaFinal

            msg = `<span style="color: red">devendo nota</span> <br> Nota mínima na AF para passar: ${notaAF.toFixed(2)}`
        } else {
            msg = `<span style="color: red"><b>reprovado</b></span> <br> Você não pode fazer a AF.`
        }

        let result = document.getElementsByClassName("result")

        result[0].innerHTML = `Média final: ${mediaFinal.toFixed(2)} <br> Status: ${msg}`
        result[1].innerHTML = `Média final: ${mediaFinal.toFixed(2)} <br> Status: ${msg}`
    }

}

calcularMedia()