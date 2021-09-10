const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const {
    name,
    origin,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    lifeSpan,
    bredFor,
    temperament,
  } = req.body;

  /* const temp = temperament?.join(); */

  let newBreed = await Dog.create({
    name: name,
    photo:
      "https://media.ambito.com/p/73389ab94577e3c3bc3ad7cac65ef0a7/adjuntos/239/imagenes/038/976/0038976244/1200x900/smart/dogejpg.jpg",
    origin: origin,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWeight: minWeight,
    maxWeight: maxWeight,
    lifeSpan: lifeSpan,
    bredFor: bredFor,
    /* temperament: temp ? temp : "Unknow", */
  });

  let temps = await Temperament.findAll({
    where: {
      name: temperament,
    },
  });

  newBreed.addTemperament(temps);

  res.status(200).send(newBreed);
});

module.exports = router;
