let Lista = [] // Array global donde se almacena la informacion de los estudiantes
let ListaDeFechas = [] // Array global de fechas unicas
let FechaDeCuadricula = obtenerFechaActual() // Array global de paginacion por fecha
/** 
 * TODO: *En orden de importancia ascendente*
 * 1. [x] Invisibilidad y visibilidad de ciertos elementos durante la impresion
 * 2. [x] Cargar regitros en orden alfabetico
 * 3. [x] Buscador de nombres
 * 4. [x] Interfaz para registrar estudiantes y todos sus datos en la lista global
 * 5. [ ] Guardado automatico de fechas que no esten incluidas en Array directo al localStorage
 *        Para este caso, probablemente necesite incluir estudiantes con fechas diferentes para probar
 *        Lo cual significa que una vez hayan fechas diferentes, debe haber algun supervisor mientras
 *        Se crea el estudiante para revisar si efectivamente se encuentra esa fecha en la lista de fechas
 * 6. [ ] Paginacion basada en dias de fechas, actualizacion automatica del estado de "FechaDeCuadricula"
 * 7. [ ] Interfaz para nueva lista con opciones para clonar lista actual o crear un nueva
 * 8. [ ] Guardado automatico de la lista en localStorage
 * 9. [ ] Cargar copia de seguridad usando input type file
 * 10. [ ] Migrar codigo a NWJS
 * 11. [ ] Subir codigo a Github
 */


const agregarResponsableDesdeVista = () => {
    const inputRegistro = document.querySelector("#inputRegistroResponsable")
    if (inputRegistro.value !== "" && inputRegistro.value !== null){
        inputRegistro.value = ""
        inputRegistro.focus()
    }
}








cargarRegistrosDePrueba()
actualizarVistaCuadricula(cuadriculaHTML(), Lista, FechaDeCuadricula)
actualizarVistaFecha(FechaDeCuadricula)