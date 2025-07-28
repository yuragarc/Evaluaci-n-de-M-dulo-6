# Informe – Evaluación Módulo 6

## Proyecto de práctica con Node.js, Express y MongoDB

Aplicación web básica para gestionar un formulario de usuario con validaciones, almacenamiento y mensajes interactivos.

---

## Descripción

Este proyecto permite:

- Mostrar un formulario para ingresar datos de usuario (nombre, correo, edad).
- Validar los datos en el frontend antes de enviarlos.
- Guardar los datos en una base de datos MongoDB usando Mongoose.
- Mostrar mensajes de bienvenida al cargar el formulario y mensajes de confirmación al guardar los datos.
- Implementar un estilo sencillo y limpio para una mejor experiencia de usuario.

---

## Tecnologías usadas

- Node.js (v22.x)
- Express
- Mongoose (ODM para MongoDB)
- MongoDB Atlas (base de datos en la nube)
- Dotenv (manejo de variables de entorno)
- HTML, CSS y JavaScript (validación y mejora de la interfaz)

---

## Reflexiones y aprendizajes

**¿Qué aprendiste sobre MongoDB y Mongoose?**  
MongoDB es una base de datos NoSQL que almacena datos en formato JSON, lo que la hace flexible. Mongoose facilita el trabajo con MongoDB en Node.js al definir esquemas y validar datos.

**¿Por qué crees que MongoDB es una buena opción en ciertos proyectos?**  
MongoDB es ideal para proyectos que evolucionan rápido, ya que permite cambios en el esquema fácilmente. Es fácil de escalar y suele ser más rápido para operaciones simples.

**¿Qué retos enfrentaste y cómo los resolviste?**  
Enfrenté problemas con consultas lentas, que optimicé usando índices. También tuve dificultades con validaciones en Mongoose, que resolví consultando la documentación y realizando pruebas.
