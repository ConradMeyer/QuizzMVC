const LOGOUT = document.querySelector(".logout");
const CREAR = document.querySelector(".private");
const CAJA = document.querySelector(".main");


LOGOUT.addEventListener("click", () => {
    fetch("/teacher/logout", {
        method: 'PUT',
        headers: {
            'authorization': sessionStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        alert(data.data)
        window.location.href = "http://localhost:8080/login/login.html"
    })
    .catch(err => console.log(err))
})

CREAR.addEventListener("click", () => {
    borrar();
    crear();
})

function read() {
    let token = sessionStorage.getItem("token");

    const options = { 
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authentication': token
        }
      }

      fetch("/teacher/read", options)
        .then(response => response.json())
        .then (
            data => {
                if (data.status === 200) {
                    data.data.map(el => pintar(el))
                }
                else {
                    alert(data.data)
                    window.location.href = "http://localhost:8080/login/login.html"
                }
            }
        )
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
    edit.addEventListener("click", ()=> {
        borrar();
        editar(data)
    } )
    div.appendChild(edit)

    let delet = document.createElement("button")
    let deleteC = document.createTextNode("DELETE")
    delet.addEventListener("click", ()=> {
        if (confirm("¿Estas seguro que quieres borrar esta pregunta?")) {
            deleteQuest(data)}
        })
    delet.appendChild(deleteC)
    div.appendChild(delet)

}

function borrar() {
    document.querySelectorAll("h3").forEach(el => el.remove())
    document.querySelectorAll("button").forEach(el => el.remove())
}

function crear() {
    let h2 = document.createElement("h2")
    let text = document.createTextNode("Crear una nueva pregunta")
    h2.appendChild(text)
    CAJA.appendChild(h2)

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

function editar(el) {
    let h2 = document.createElement("h2")
    let text = document.createTextNode("Editar la siguiente pregunta")
    h2.appendChild(text)
    CAJA.appendChild(h2)

    let quest = document.createElement("h2")
    let cont = document.createTextNode(el.preguntas)
    quest.appendChild(cont)
    CAJA.appendChild(quest)

    let resp1 = document.createElement("input")
    resp1.setAttribute("value", el.respuestas[0])
    CAJA.appendChild(resp1)

    let resp2 = document.createElement("input")
    resp2.setAttribute("value", el.respuestas[1])
    CAJA.appendChild(resp2)

    let resp3 = document.createElement("input")
    resp3.setAttribute("value", el.respuestas[2])
    CAJA.appendChild(resp3)

    let resp4 = document.createElement("input")
    resp4.setAttribute("value", el.respuestas[3])
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
    let btnT = document.createTextNode("EDITAR")
    btn.addEventListener("click", ()=> {
        if(resp1.value == "" || resp2.value == "" || resp3.value == "" ||resp4.value == "" ) {
            alert("Debes añadir todos los campos")
        }
        else {
            editarQuest(el.preguntas, resp1.value, resp2.value, resp3.value, resp4.value, Number(select.value))
        }
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
    document.querySelectorAll("h2").forEach(el => el.remove())
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
            respuestaCorrecta: respC.value
        }),
        headers:{'Content-Type': 'application/json'}
      }
      fetch("/teacher/create", options)
          .then(response => response.json())
          .then(data => {
                alert(data.data)
                setTimeout(() => 
                window.location.href = "http://localhost:8080/welcome/welcome.html",
                1000)
            })
}

function editarQuest(quest, res1, res2, res3, res4, corr) {
    const options = { 
      method: 'PUT',
      body: JSON.stringify({preguntas: quest, respuestas: [res1, res2, res3, res4], respuestaCorrecta: corr}),
      headers:{'Content-Type': 'application/json'}
    }
    fetch("/teacher/edit", options)
    .then(response => response.json())
    .then(data => {
        alert(data.data)
        setTimeout(() => 
            window.location.href = "http://localhost:8080/welcome/welcome.html",
            1000)
        })
}

function deleteWord(el) {
    console.log(el);
const options = { 
    method: 'DELETE',
    body: JSON.stringify({pregunta: el.preguntas}),
    headers:{'Content-Type': 'application/json'}
}
fetch("/teacher/delete", options)
.then(response => response.json())
.then(data => {
    alert(data.data)
    setTimeout(()=> 
    window.location.href = "http://localhost:8080/welcome/welcome.html",
    1000)
})
}

read();
