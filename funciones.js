document.addEventListener("contextmenu", (e) => {e.preventDefault()})
const obtenerFechaActual = () => {
    const today = new Date() // Regresa un string con el dia, mes y año
    return (today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear())
}
const cuadriculaHTML = () => {
    return document.querySelector("#cuadricula")
}
const guardarCopiaDeSeguridad = (Lista) => {
    // Crea un enlace o 'link' para uso interno
    const a = document.createElement('a');
    // Convierte los datos a string y luego crea un archivo con esos datos
    const archivo = new Blob([JSON.stringify(Lista)], {type: 'text/plain'});
    // Pone el enlace del archivo creado como objeto 'URL'
    a.href= URL.createObjectURL(archivo);
    // Genera el nombre de descarga
    a.download = `backup_${obtenerFechaActual().replace("/","_")}.json`;
    // Hace click para descargar desde el enlace oculto
    a.click();
    // Libera la memoria usada
    URL.revokeObjectURL(a.href);
}
const cargarCopiaDeSeguridad = (nombre) => {
    // Busca en internet la URL o en la PC el archivo JSON deseado
    fetch(nombre)
    // Convierte la respuesta a JSON
    .then(response => response.json())
    // Actualiza la cuadricula con los datos obtenidos
    .then(Lista => actualizarVistaCuadricula(Cuadricula, Lista))
}
const registrar = (list, nom, resp, pres, fech=obtenerFechaActual()) => {
    // Envia un object a la lista como registro completo de un estudiante
    list.push({
        // Crea un number ID al azar del 1 al 10000, poco probable que se repita
        id: parseInt(Math.random()*10000),
        // Crea un string para el nombre del estudiante
        nombre: nom,
        // Crea un array de responsables al estudiante
        responsables: resp,
        // Crea un array con datos de presencialidad
        asistencia: [{fecha: fech, presente: pres}]
    })
}
const cambioVistaPresencial = (id,tipo) => {
    // Cambia el estado interno y visual de los elementos
    if (tipo=="td"){
        // Obtiene el elemento HTML td
        const td = document.getElementById("td-"+id)
        // Filtra el estudiante por id
        const _estudiante = Lista.filter((estudiante)=> estudiante.id == id ? estudiante : false)
        // Consigue el indice del array del estudiante
        const indice = Lista.indexOf(_estudiante[0])
        // Activa o desactiva la clase CSS y su variable en JS basado en el indice
        if (td.classList == "presente"){
            td.classList = ""
            Lista[indice].asistencia[0].presente = false
        } else {
            td.classList = "presente"
            Lista[indice].asistencia[0].presente = true
        }
    }
}
const generarCuadricula = (Lista, FechaEscogida) =>{
    // Crea una cuadricula HTML
    Cuadricula = "<table><tr> <th>Estudiantes 👦👧</th> <th>Responsables 🧔👩‍🦰</th></tr>"
    // Muestra los nombres en orden alphabetico
    Lista.sort(function (a, b) {return a.nombre.localeCompare(b.nombre)})
    // Itera la lista
    Lista.forEach((estudiante)=>{
        // Por cada dia entre las fechas, escoger el dia que queremos de la fecha escogida
        estudiante.asistencia.forEach(dia =>{
            if (dia.fecha == FechaEscogida){
                const claseSiEstaPresente = dia.presente == true ? `class="presente"` : "" // Si estaba presente ese dia, agregamos la clase 'presente'
                Cuadricula += `
                <tr id="${estudiante.id}">
                    <td id="td-${estudiante.id}" ${claseSiEstaPresente} onclick="cambioVistaPresencial('${estudiante.id}','td')">
                        ${estudiante.nombre}
                    </td>
                    <td class="responsable">
                        ${(estudiante.responsables).join(' | ')}
                    </td>
                </tr>`
            }
        })
    })
    // Cierra y regresa la cuadricula
    return Cuadricula += "</table>"
}
const actualizarVistaCuadricula = (Contenedor, Lista, FechaEscogida) => {
    // Genera una cuadricula y la actualiza en la vista
    Contenedor.innerHTML = generarCuadricula(Lista, FechaEscogida)
}
const actualizarVistaFecha = (fecha="") => {
    // Actualiza la fecha dependiendo de si el argumento fecha cambia o no
    document.querySelector('#fecha').textContent = (fecha === "" ? obtenerFechaActual() : fecha)
}
const imprimir = () => {
    // Agrupacion de todos los botones y titulos en un arrays unicos
    const buttons = [...document.querySelectorAll(".main-btn-font"), ...document.querySelectorAll(".main-btn")]
    const titulos = [document.querySelector("#titulo"), document.querySelector("#subtitulo")] 
    // Iteracion sobre todos los botones y titulos
    titulos.forEach(titulo =>{ titulo.classList.toggle("invisible")})
    buttons.forEach(button =>{ button.classList.toggle("invisible")})
    print()
    titulos.forEach(titulo =>{ titulo.classList.toggle("invisible")})
    buttons.forEach(button =>{ button.classList.toggle("invisible")})
}
const buscar = () => {
    // Crea una lista temporal de nombres en la cual hacer los mostrar los cambios
    _ListaTemporal = []
    const buscador = document.querySelector('#buscador')
    const filtro = buscador.value.toUpperCase()
    Lista.forEach(estudiante => { 
        // Filtra los nombres basados en un indice
        if (estudiante.nombre.toUpperCase().indexOf(filtro) > -1) {
            _ListaTemporal.push(estudiante)
        }
    })
    actualizarVistaCuadricula(cuadriculaHTML(), _ListaTemporal, FechaDeCuadricula)
}
const cargarVistaRegistroEstudiante = () => {
    if (document.querySelector('.floating-popup') === null){ // Asegura que solo se abra una ventana
        const div = document.createElement("div")
        div.classList.add("floating-popup")

        // Crea el contenido de la ventana emergente
        div.innerHTML = `<h3>Registro de Estudiantes</h3>
        <h4>Nombre Completo del Estudiante</h4><input id="inputRegistroEstudiante"/>
        <h4>Nombre Completo del Responsable</h4>
        <div id="etiquetasDeResponsables"></div>
        <button
            style="background-color: black; color: white;padding:.4rem;"
            onclick="agregarResponsableDesdeVista()" id="agregarResponsable">
            Agregar
        </button>
        <input id="inputRegistroResponsable"/><br>
        <h4>Esta presente hoy?</h4>
        <input style="margin-top:-3rem;margin-bottom:1rem;cursor:pointer;" type="checkbox" checked="true" id="inputRegistroPresente"/><br><br>
        <button 
            id="inputRegistrarEstudiante"
            class="presente"
            style="color:black;padding:1rem;border:none !important;"
            onclick="registrarDesdeVista();document.querySelector('.floating-popup').remove();">
            Registrar
        </button>
        <button style="border:none !important;box-shadow: 0px 6px 8px rgba(0,0,0,0);" onclick="document.querySelector('.floating-popup').remove()">Cancelar</button>
        `
        // Crea la ventana en el DOM
        document.body.append(div)
    } else {
        document.querySelector('.floating-popup').remove()
    }
}
const registrarDesdeVista = () => {
    let estudiante = document.querySelector("#inputRegistroEstudiante").value
    let responsable = document.querySelector("#inputRegistroResponsable").value

    if (estudiante == null || estudiante == "") {
      // alert("Proceso de registro cancelado! No hay estudiante asignado!")
    } else {
        if (responsable == null || responsable == "") {
            //alert("Proceso de registro cancelado! No hay responsable asignado!")
        } else {
            const isPresent = document.querySelector("#inputRegistroPresente").checked
            registrar(Lista, estudiante, [responsable], isPresent)
            actualizarVistaCuadricula(cuadriculaHTML(), Lista, FechaDeCuadricula)
        }
    }
}
const registrarDesdePrompt = ()=> {
    let estudiante = prompt("Esciba el nombre del estudiante", "");
    if (estudiante == null || estudiante == "") {
      alert("Proceso de registro cancelado!")
    } else {
        let responsables = []
        let nuevoResponsable = prompt("Esciba el nombre del responsable a cargo", "");
        if (nuevoResponsable == null || nuevoResponsable == "") {
            alert("Proceso de registro cancelado!")
        } else {
            responsables.push(nuevoResponsable)
            registrar(Lista, estudiante, responsables, true)
            actualizarVistaCuadricula(cuadriculaHTML(), Lista, FechaDeCuadricula)
        }
    }
}
const cargarRegistrosDePrueba = () => {
    registrar(Lista, "Elian Ventura Valdez", ["Marleny Valdez","Ezequiel Ventura Brito"], false)
    registrar(Lista, "Toby Soly Martinez", ["Allen Fernandez","Dory Garcia", "Martha Hernandez"], false)
    registrar(Lista, "Danny Gomez", ["Peter Pon", "Danny Perez"], true)
    registrar(Lista, "Libni Simei Ventura Valdez", ["Marleny Valdez","Ezequiel Ventura Brito"], false)
    registrar(Lista, "Abigail Perez", ["Fernandez Matias Peralta","Golly Perez"], true)
    registrar(Lista, "Jhonny Pedro Henriquez Soriel", ["Fulgencio Salazar","Samanta Suriel"], true)
}