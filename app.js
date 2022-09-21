/** 
 * TODO: *En orden de importancia ascendente*
 * 1. [x] Invisibilidad y visibilidad de ciertos elementos durante la impresion
 * 2. [x] Cargar regitros en orden alfabetico
 * 3. [x] Buscador de nombres
 * 4. [x] Interfaz para registrar estudiantes y todos sus datos en la ListaDeFechas global
 * 5. [x] Guardado automatico de fechas que no esten incluidas en Array directo al localStorage
 *        Para este caso, probablemente necesite incluir estudiantes con fechas diferentes para probar
 *        Lo cual significa que una vez hayan fechas diferentes, debe haber algun supervisor mientras
 *        Se crea el estudiante para revisar si efectivamente se encuentra esa fecha en la ListaDeFechas de fechas
 * 6. [x] Paginacion basada en dias de fechas, actualizacion automatica del estado de "FechaDeCuadricula"
 *        Para paginar, primero se hace click en un boton (izq o der), luego, cambia el estado de 'FechaDeCuadricula'
 *        Luego, se actualiza la vista con la fecha de cuadricula
 * 7. [ ] Interfaz para nueva ListaDeFechas con opciones para clonar ListaDeFechas actual o crear un nueva
 * 8. [x] Guardado automatico de la ListaDeFechas en localStorage
 * 9. [ ] Cargar copia de seguridad usando input type file
 * 10. [ ] Migrar codigo a NWJS
 * 11. [ ] Subir codigo a Github
 */
cargarLista()
cargarFechas()
actualizarVistaCuadricula(cuadriculaHTML(), Lista, FechaDeCuadricula)
actualizarVistaFecha(FechaDeCuadricula)