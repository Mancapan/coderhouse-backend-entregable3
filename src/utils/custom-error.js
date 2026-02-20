/**
 * -------------------------------------------------------------------------
 * CustomError
 * -------------------------------------------------------------------------
 * Clase personalizada de error para estandarizar el manejo de errores
 * en el backend (Node.js + Express).
 *
 * Objetivo:
 * - Mantener el message del error
 * - Agregar un status HTTP personalizado
 * - Permitir un manejo centralizado en un middleware global
 *
 * -------------------------------------------------------------------------
 * Diferencia con Error nativo:
 * -------------------------------------------------------------------------
 *
 * throw new Error("Algo salió mal");
 *
 * El Error nativo solo contiene:
 * - message
 * - stack
 *
 * ❌ No incluye código HTTP (400, 404, 500, etc.)
 *
 * -------------------------------------------------------------------------
 * Con CustomError:
 * -------------------------------------------------------------------------
 *
 * throw new CustomError("Paciente no encontrado", 404);
 *
 * Propiedades generadas:
 *
 * | Propiedad | Valor                    |
 * |-----------|--------------------------|
 * | message   | "Paciente no encontrado" |
 * | status    | 404                      |
 * | stack     | generado automáticamente  |
 *
 * Esto permite que el middleware global pueda hacer:
 *
 * res.status(err.status || 500).json({
 *   error: err.message
 * });
 *
 * -------------------------------------------------------------------------
 */


export class CustomError extends Error {

constructor(message,status){
super(message);
this.status = status;


}

}