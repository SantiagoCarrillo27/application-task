import Router from "express";
import { modelo } from "../models/user.js";
import jwt from "jsonwebtoken";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

// RUTA PARA REGISTRAR USUARIO
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new modelo({ email, password });
  try {
    await newUser.save();
    console.log(newUser);
    const token = jwt.sign({ _id: newUser._id }, "secretKey");
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al registrar el usuario");
  }
});


// ...

// RUTA PARA VERIFICAR LA EXISTENCIA DE UN USUARIO
router.post("/checkUserExists", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await modelo.findOne({ email });
    if (user) {
      // El usuario existe
      res.status(200).json({ exists: true });
    } else {
      // El usuario no existe
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al verificar la existencia del usuario");
  }
});



// RUTA PARA INICIAR SESION
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  const user = await modelo.findOne({ email });
  if (!user) {
    return res.status(401).send("El correo ingresado no existe");
  }
  if (user.password !== password) {
    return res.status(401).send("La contraseña ingresada es invalida");
  }
  const token = jwt.sign({ _id: user._id }, "secretKey");
  res.status(200).json({ token });
})

// RUTA PARA LISTAR LAS TAREAS
router.get("/tasks", (req, res) => {
    res.json([
        
        {
            _id: 1,
            name: "Task 1",
            description: "Description 1",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 2,
            name: "Task 2",
            description: "Description 2",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 3,
            name: "Task 3",
            description: "Description 3",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 4,
            name: "Task 4",
            description: "Description 4",
            status: "To Do",
            date: "2023-05-01"
        },
    ])
})


router.get('/private-tasks',verifyToken, (req, res) => {
    res.json([
        
        {
            _id: 1,
            name: "Task 1",
            description: "Description 1",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 2,
            name: "Task 2",
            description: "Description 2",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 3,
            name: "Task 3",
            description: "Description 3",
            status: "To Do",
            date: "2023-05-01"
        },
        {
            _id: 4,
            name: "Task 4",
            description: "Description 4",
            status: "To Do",
            date: "2023-05-01"
        },
    ])
})

router.get('/profile',verifyToken, (req, res) => {
    res.send(req.userId)
})



function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload._id;
    next();
  }

