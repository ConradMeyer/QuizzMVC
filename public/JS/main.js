const QUIZZ = document.querySelector(".quizz")
const BTN = document.querySelector("#jugar")
const RESET = document.querySelector("#reset")
const INPUT = document.querySelector(".num")

function getQuestions() {
    const options = { 
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/user/read", options)
        .then(data => data.json())
        .then(res => res.map(el =>pintar(el)))
		.catch(err => console.log(err))
}


function pintar(datos) {
	const caja = document.createElement("div")
	caja.setAttribute("class", "resultado")
	QUIZZ.appendChild(caja)

	const pregunta = document.createElement("div")
	pregunta.setAttribute("class", "pregunta")

	const respuestas = document.createElement("div")
	respuestas.setAttribute("class", "respuestas")

	caja.appendChild(pregunta)
	caja.appendChild(respuestas)

	let quest = document.createElement("h2")
	let questText = document.createTextNode(datos.preguntas)
	quest.appendChild(questText)
	pregunta.appendChild(quest)

	let answA = document.createElement("h3")
	let answTextA = document.createTextNode(datos.respuestas[0])
	answA.appendChild(answTextA)
	respuestas.appendChild(answA)

	let answB = document.createElement("h3")
	let answTextB = document.createTextNode(datos.respuestas[1])
	answB.appendChild(answTextB)
	respuestas.appendChild(answB)

	let answC = document.createElement("h3")
	let answTextC = document.createTextNode(datos.respuestas[2])
	answC.appendChild(answTextC)
	respuestas.appendChild(answC)

	let answD = document.createElement("h3")
	let answTextD = document.createTextNode(datos.respuestas[3])
	answD.appendChild(answTextD)
	respuestas.appendChild(answD)

	// let totalAnsw = [answA, answB, answC, answD]
	// totalAnsw.forEach(el => el.addEventListener("click", ()=> evaluarRespuesta(el, datos)))

}

function evaluarRespuesta(respuesta, respuestaCorrecta, obj) {
    const h3 = obj;

    if (respuesta == respuestaCorrecta) {
        h3.classList.add("right")
        
        setTimeout( function(){
            let caja1 = document.querySelector(".cajaPreguntas")
            let caja2 = document.querySelector(".cajaRespuestas")
            caja1.remove()
            caja2.remove()
            caja2.classList.remove("cajaRespuestas")
            pintarPregunta(++i)}, 700)
    } else {
        h3.classList.add("wrong")
        
        setTimeout( function(){
            let wrong = document.querySelector(".wrong")
            wrong.classList.remove("wrong")
        }, 700)
    }

}

BTN.addEventListener("click", ()=> getQuestions())

RESET.addEventListener("click", ()=> window.location.reload())