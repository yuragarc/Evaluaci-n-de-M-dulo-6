import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('Error al conectar MongoDB:', err);
    process.exit(1);
  });

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Formulario de Usuario</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 30px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #333;
        }
        form {
          background: white;
          padding: 20px;
          max-width: 400px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        label {
          display: block;
          margin-top: 10px;
          font-weight: bold;
          color: #555;
        }
        input[type="text"],
        input[type="email"],
        input[type="number"] {
          width: 100%;
          padding: 8px;
          margin-top: 4px;
          box-sizing: border-box;
          border-radius: 4px;
          border: 1px solid #ccc;
        }
        button {
          margin-top: 15px;
          background-color: #007BFF;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #0056b3;
        }
        .message {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 4px;
          max-width: 400px;
        }
        .error {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
          padding: 8px;
          margin-top: 5px;
          border-radius: 4px;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <h1>Formulario de Usuario</h1>
      <div class="message">¡Bienvenido! Por favor, ingresa tus datos.</div>
      <form id="usuarioForm" method="POST" action="/guardar" novalidate>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required minlength="3" />
        <div class="error" id="errorNombre" style="display:none;">El nombre debe tener al menos 3 caracteres.</div>

        <label for="correo">Correo:</label>
        <input type="email" id="correo" name="correo" required />
        <div class="error" id="errorCorreo" style="display:none;">Introduce un correo válido.</div>

        <label for="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required min="1" max="120" />
        <div class="error" id="errorEdad" style="display:none;">Introduce una edad válida entre 1 y 120.</div>

        <button type="submit">Guardar</button>
      </form>

      <script>
        const form = document.getElementById('usuarioForm');

        form.addEventListener('submit', function(event) {
          // Limpiar errores
          document.getElementById('errorNombre').style.display = 'none';
          document.getElementById('errorCorreo').style.display = 'none';
          document.getElementById('errorEdad').style.display = 'none';

          let valid = true;

          // Validar Nombre
          const nombre = form.nombre.value.trim();
          if(nombre.length < 3) {
            document.getElementById('errorNombre').style.display = 'block';
            valid = false;
          }

          // Validar Correo (simplemente si cumple con email)
          const correo = form.correo.value.trim();
          const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
          if(!emailPattern.test(correo)) {
            document.getElementById('errorCorreo').style.display = 'block';
            valid = false;
          }

          // Validar Edad
          const edad = parseInt(form.edad.value, 10);
          if(isNaN(edad) || edad < 1 || edad > 120) {
            document.getElementById('errorEdad').style.display = 'block';
            valid = false;
          }

          if(!valid) {
            event.preventDefault(); // Evita enviar el formulario si no es válido
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.post('/guardar', async (req, res) => {
  try {
    const { nombre, correo, edad } = req.body;
    const nuevoUsuario = new User({ nombre, correo, edad });
    await nuevoUsuario.save();
    res.send(`
      <html>
      <head>
        <title>Gracias</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 30px;
            background-color: #f9f9f9;
            color: #333;
          }
          .message {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            padding: 15px;
            max-width: 400px;
          }
          a {
            display: inline-block;
            margin-top: 15px;
            color: #007BFF;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="message">
          <h2>¡Gracias, ${nombre}!</h2>
          <p>Tu registro se guardó correctamente.</p>
        </div>
        <a href="/">Volver al formulario</a>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send(`Error al guardar el usuario: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});