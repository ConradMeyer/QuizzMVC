const LOGOUT = document.querySelector(".logout");
const READ = document.querySelector(".private");
const CAJA = document.querySelector(".main");


// LOGOUT.addEventListener("click", () => {

// })

READ.addEventListener("click", () => {
    borrar();
    crear();
})

function read() {
    let token = sessionStorage.getItem("token");

    const options = { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
      }

      fetch("/teacher/read", options)
          .then(response => response.json())
          .then(data => data.map(el => pintar(el)))
          .catch(err => console.log(err))
}

function pintar(data) {
    let div = document.createElement("div")
    div.setAttribute("class", "pregunta")
    CAJA.appendChild(div)

    let quest = document.createElement("h3")
    let content = document.createTextNode(data.preguntas)
    quest.appendChild(content)
    div.appendChild(quest)

    let edit = document.createElement("button")
    let editC = document.createTextNode("EDIT")
    edit.appendChild(editC)
    edit.addEventListener("click", ()=>{} )
    div.appendChild(edit)

    let delet = document.createElement("button")
    let deleteC = document.createTextNode("DELETE")
    delet.addEventListener("click", ()=>{} )
    delet.appendChild(deleteC)
    div.appendChild(delet)

}

function borrar() {
    document.querySelectorAll("h3").forEach(el => el.remove())
    document.querySelectorAll("button").forEach(el => el.remove())
}

function crear() {
    let quest = document.createElement("input")
    quest.setAttribute("placeholder", "Escribe aquí la nueva pregunta")
    quest.setAttribute("id", "quest")
    CAJA.appendChild(quest)

    let resp1 = document.createElement("input")
    resp1.setAttribute("id", "resp1")
    resp1.setAttribute("placeholder", "Primera respuesta")
    CAJA.appendChild(resp1)

    let resp2 = document.createElement("input")
    resp2.setAttribute("id", "resp2")
    resp2.setAttribute("placeholder", "Segunda respuesta")
    CAJA.appendChild(resp2)

    let resp3 = document.createElement("input")
    resp3.setAttribute("id", "resp3")
    resp3.setAttribute("placeholder", "Tercera respuesta")
    CAJA.appendChild(resp3)

    let resp4 = document.createElement("input")
    resp4.setAttribute("id", "resp4")
    resp4.setAttribute("placeholder", "Cuarta respuesta")
    CAJA.appendChild(resp4)

    let select = document.createElement("select")
    select.setAttribute("id", "select")
    CAJA.appendChild(select)

    let option1 = document.createElement("option")
    option1.setAttribute("value", 0)
    let node1 = document.createTextNode("Respuesta 1")
    option1.appendChild(node1)
    
    select.appendChild(option1)
    let option2 = document.createElement("option")
    option2.setAttribute("value", 1)
    let node2 = document.createTextNode("Respuesta 2")
    option2.appendChild(node2)

    select.appendChild(option2)
    let option3 = document.createElement("option")
    option3.setAttribute("value", 2)
    select.appendChild(option3)
    let node3 = document.createTextNode("Respuesta 3")
    option3.appendChild(node3)

    let option4 = document.createElement("option")
    option4.setAttribute("value", 3)
    let node4 = document.createTextNode("Respuesta 4")
    option4.appendChild(node4)
    select.appendChild(option4)

    let div = document.createElement("div")

    let btn = document.createElement("div")
    btn.setAttribute("class", "crear")
    let btnT = document.createTextNode("CREAR")
    btn.addEventListener("click", ()=> {
        crearQuest()
        borrarDetalle()
    })
    btn.appendChild(btnT)
    div.appendChild(btn)

    let btn2 = document.createElement("div")
    btn2.setAttribute("class", "atras")
    let btn2T = document.createTextNode("ATRAS")
    btn2.addEventListener("click", () => borrarDetalle())
    btn2.appendChild(btn2T)
    div.appendChild(btn2)

    CAJA.appendChild(div)
   
}

function borrarDetalle() {
    document.querySelectorAll("input").forEach(el => el.remove());
    document.querySelector("select").remove();
    document.querySelector(".crear").remove();
    document.querySelector(".atras").remove();
    read()
}

function crearQuest() {
    const quest = document.querySelector("#quest")
    const resp1 = document.querySelector("#resp1")
    const resp2 = document.querySelector("#resp2")
    const resp3 = document.querySelector("#resp3")
    const resp4 = document.querySelector("#resp4")
    const respC = document.querySelector("#select")

    const options = { 
        method: 'POST',
        body: JSON.stringify({
            pregunta: quest.value,
            respuestas: [resp1.value, resp2.value, resp3.value, resp4.value],
            respuestaCorrecta: respC
        }),
        headers:{'Content-Type': 'application/json'}
      }
      fetch("/teacher/create", options)
          .then(response => response.json())
          .then(data => console.log(data))
}

function edit(el) {
    const options = { 
      method: 'PUT',
      body: JSON.stringify({pregunta: el.pregunta}),
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/cambiaUnaPalabra", options)
    .then(response => response.json())
    .then(data => {

        data.map((el) => {
            printData(el)})
        })
}

function deleteWord(el) {
const options = { 
    method: 'DELETE',
    body: JSON.stringify({pregunta: el.pregunta}),
    headers:{'Content-Type': 'application/json'}
}
fetch("/borraUnaPalabra", options)
.then(response => response.json())
.then(data => console.log(data))
}

read();
