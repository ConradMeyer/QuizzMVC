const QUIZZ = document.querySelector(".quizz")
const BTN = document.querySelector("#jugar")
const RESET = document.querySelector("#reset")
const INPUT = document.querySelector(".num")

let counter = 0;

function getQuestions() {
    const options = { 
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/user/read", options)
        .then(data => data.json())
        .then(res => res.sort(()=> Math.random() - 0.5).map(el => pintar(el)))
		.then(()=> pintarBtn())
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

	let totalAnsw = [answA, answB, answC, answD]

	totalAnsw.map((el, i) => {
			el.addEventListener("click", ()=> {
				if (answA.className !== "clicked" && answB.className !== "clicked" && answC.className !== "clicked" && answD.className !== "clicked") {
					evaluarRespuesta(datos, i, el)
				}
			})
	})

}

function evaluarRespuesta(datos, i, obj) {
    const h3 = obj;

    if (datos.respuestaCorrecta == i) {
        h3.setAttribute("id", "right")
		h3.classList.add("clicked")
		counter++
    } else {
        h3.setAttribute("id", "wrong")
		h3.classList.add("clicked")
    }
}

function pintarBtn() {
	let btn = document.createElement("div");
	let cont = document.createTextNode("Ver mi puntuación")
	btn.setAttribute("id", "evaluar")
	btn.appendChild(cont)
	btn.addEventListener("click", () => contar())
	QUIZZ.appendChild(btn)
}

function contar(){
	let numP = document.querySelectorAll(".resultado").length
	document.querySelectorAll(".resultado").forEach(el => el.remove())
	document.querySelector("#evaluar").remove()
	let caja = document.createElement("div")
	caja.setAttribute("class", "resultado")
	let cont = document.createTextNode(`Tu puntuación es de ${counter} sobre ${numP}`)
	let h3 = document.createElement("h3")
	h3.appendChild(cont)
	caja.appendChild(h3)
	QUIZZ.appendChild(caja)

}

BTN.addEventListener("click",  ()=> {
	if (BTN.className !== "btn clicked") {
		getQuestions()
		BTN.className += " clicked"
	}
})

RESET.addEventListener("click", ()=> window.location.reload())