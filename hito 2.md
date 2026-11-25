# Hito 2 — Formularios, validación y persistencia

## Mapa de validación

Los dos formularios usan `novalidate`. Los errores se muestran junto a cada campo y se actualizan al salir del campo (`blur`) y, una vez tocado, al escribir (`input`). Al enviar, se validan todos los campos, se muestran todos los errores y el foco pasa al primero que falla.

| Formulario | Campo | Regla | Mensaje de error |
|---|---|---|---|
| Registro | Nombre de usuario | Obligatorio; no puede estar vacío o contener solo espacios. | «El nombre de usuario es obligatorio.» |
| Registro | Correo electrónico | Obligatorio; tipo `email` y validación con expresión regular. | «El correo electrónico es obligatorio.» / «Introduce un correo electrónico válido.» |
| Registro | Contraseña | Obligatoria; mínimo definido por `minlength="8"`, una mayúscula y un número. | «La contraseña es obligatoria.» / «Introduce al menos 8 caracteres.» / «La contraseña debe incluir al menos una mayúscula.» / «La contraseña debe incluir al menos un número.» |
| Registro | Repetir contraseña | Obligatorio; debe coincidir con la contraseña. | «Repite la contraseña.» / «Las contraseñas no coinciden.» |
| Registro | Fecha de nacimiento | Obligatoria; el límite máximo se establece en la fecha actual y debe cumplir la edad mínima de 13 años. | «La fecha de nacimiento es obligatoria.» / «La fecha de nacimiento no puede ser futura.» / «Debes tener al menos 13 años para registrarte.» |
| Registro | Aceptar condiciones | Casilla obligatoria. | «Debes aceptar las condiciones.» |
| Contacto | Nombre | Obligatorio; no puede estar vacío o contener solo espacios. | «El nombre es obligatorio.» |
| Contacto | Correo electrónico | Obligatorio; tipo `email` y validación con expresión regular. | «El correo electrónico es obligatorio.» / «Introduce un correo electrónico válido.» |
| Contacto | Teléfono | Opcional; si se rellena, debe cumplir el formato de teléfono español. Si se marca «Prefiero que me llaméis», pasa a ser obligatorio. | «El teléfono es obligatorio si prefieres que te llamemos.» / «Introduce un teléfono español válido (por ejemplo, 612 345 678).» |
| Contacto | «Prefiero que me llaméis» | Casilla opcional que cambia la obligatoriedad del teléfono; no tiene error propio. | — |
| Contacto | Motivo | Obligatorio; hay que seleccionar una opción. | «Selecciona un motivo para el mensaje.» |
| Contacto | Mensaje | Obligatorio; mínimo y máximo leídos de `minlength="20"` y `maxlength="500"`. Incluye contador de caracteres. | «El mensaje es obligatorio.» / «El mensaje debe tener al menos 20 caracteres.» / «El mensaje no puede superar los 500 caracteres.» |

Los mensajes se enlazan mediante `aria-describedby` y el estado de cada control se indica con `aria-invalid`. No se usan ventanas `alert` para mostrar errores.

## Qué está hecho

- `js/almacen.js` centraliza las operaciones `obtenerTodos`, `obtenerPorId`, `crear`, `actualizar` y `borrar`, usando `localStorage` para las colecciones.
- `js/validacion.js` reúne la validación de restricciones HTML y las reglas específicas de correo, teléfono, contraseña y edad.
- El formulario de registro permite crear, editar y borrar usuarios. La contraseña y su repetición no se guardan. La casilla se almacena como booleano y la fecha como `AAAA-MM-DD`; para calcular la edad se convierte a `Date`.
- El formulario de contacto guarda y muestra mensajes, actualiza el contador y permite borrar mensajes.
- El listado de usuarios ofrece edición y borrado con confirmación. Las acciones de usuarios y mensajes se atienden mediante delegación de eventos, sin `onclick` en el HTML.
- Los datos de usuarios y mensajes sobreviven a la recarga. Tras guardar, los formularios se limpian y las vistas se actualizan sin recargar la página.

## Qué falta o no coincide del todo con el enunciado

- El borrado de usuarios tiene confirmación; el borrado de mensajes de contacto todavía no.
- `validarCampo` recibe el elemento del formulario para poder leer sus atributos y estado de validez; las reglas específicas reciben valores. Por tanto, no todas las funciones del módulo tienen exactamente la interfaz «recibe un valor y devuelve mensaje o `null`».
- El nombre de usuario y el correo no se comprueban contra los usuarios existentes, así que se pueden registrar duplicados.
- La casilla de condiciones no enlaza a un texto o página con las condiciones que se están aceptando.
- El `max` de la fecha de nacimiento se calcula al iniciar la página y se aplica desde JavaScript para que siempre sea la fecha actual; no es un valor fijo declarado en el HTML.
- La comprobación realizada ha sido manual en navegador; no hay una suite automatizada de pruebas para estos formularios.

## Qué ha costado más

- Mantener el estado de «campo tocado»: mostrar el error al salir (`blur`), actualizarlo al escribir (`input`) y, al enviar, validar todos los campos y enfocar el primero inválido.
- Coordinar reglas entre campos. El teléfono depende de «Prefiero que me llaméis» y la repetición de contraseña depende de la contraseña; al cambiar uno hay que volver a comprobar el otro cuando ya se ha tocado.
- Reutilizar `required`, `type`, `minlength`, `maxlength` y la validez del control en vez de repetir límites en JavaScript. La fecha futura requiere además actualizar el `max` dinámicamente.
- Guardar la fecha como `AAAA-MM-DD` sin que la zona horaria cambie el día y convertirla a `Date` solo al calcular la edad.
- Usar el mismo formulario para alta y edición mientras las contraseñas quedan vacías y nunca se guardan. Fue necesario separar explícitamente los datos de perfil de los campos de contraseña antes de persistir.
- Mantener las acciones de editar y borrar delegadas en la lista aunque esta se vuelva a renderizar. Al reemplazar las tarjetas durante un clic, el control pulsado se desprende del DOM; hubo que evitar que el manejador global lo confundiera con un clic fuera del panel.
- Probar persistencia y confirmación de borrado sin dejar registros temporales en el almacenamiento. La validación se comprobó manualmente en navegador, pero todavía faltan pruebas automatizadas.
