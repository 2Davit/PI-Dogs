const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const getApiBreeds = async () => {
  const fullApiData = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const filteredData = await fullApiData.data.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      photo: breed.image.url,
      minHeight: Number(breed.height.metric.split("-")[0]),
      maxHeight: Number(breed.height.metric.split("-")[1]),
      minWeight: Number(breed.weight.metric.split("-")[0]),
      maxWeight: Number(breed.weight.metric.split("-")[1]),
      lifeSpan: breed.life_span,
      bredFor: breed.bred_for,
      temperament: breed.temperament,
    };
  });
  return filteredData;
};

const getDbBreeds = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getBreeds = async () => {
  const apiBreeds = await getApiBreeds();
  const dbBreeds = await getDbBreeds();
  const breeds = apiBreeds.concat(dbBreeds);
  return breeds;
};

const getTemperaments = async () => {
  const breeds = await getBreeds();
  breeds.forEach((breed) => {
    if (breed.temperament) {
      let temps = breed.temperament.split(",");
      for (let i = 0; i < temps.length; i++) {
        Temperament.findOrCreate({
          where: { name: temps[i].trim() },
        });
      }
    }
  });
  return await Temperament.findAll();
};

module.exports = {
  getBreeds,
  getTemperaments,
};
