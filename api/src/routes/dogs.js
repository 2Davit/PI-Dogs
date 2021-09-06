const { Router } = require("express");
const { getBreeds } = require("../controllers/controllers");

const router = Router();

router.get("/", async (req, res) => {
  const breeds = await getBreeds();
  if (req.query.name) {
    let breed = await breeds.filter((breed) =>
      breed.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
    if (breed.length > 0) return res.status(200).send(breed);
    res.status(404).send("Breed not found");
  }
  res.status(200).send(breeds);
});

router.get("/:breedId", async (req, res) => {
  const breeds = await getBreeds();
  const breedId = req.params.breedId;
  let breed = breeds.filter((breed) => breed.id.toString() === breedId);
  if (breed.length > 0) return res.status(200).send(breed);
  res.status(404).send("No breed matches that ID");
});

module.exports = router;
