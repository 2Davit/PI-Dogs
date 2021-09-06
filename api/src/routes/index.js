const { Router } = require("express");
// Importar todos los routers;
const dogs = require("./dogs");
const temperament = require("./temperament");
const dog = require("./dog");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogs);
router.use("/temperament", temperament);
router.use("/dog", dog);

module.exports = router;
