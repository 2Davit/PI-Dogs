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
      minHeight: Number(breed.height.metric.split("-")[0] || 0),
      maxHeight: Number(breed.height.metric.split("-")[1] || 0),
      minWeight: Number(breed.weight.metric.split("-")[0] || 0),
      maxWeight: Number(breed.weight.metric.split("-")[1] || 0),
      lifeSpan: breed.life_span,
      bredFor: breed.bred_for,
      temperament: breed.temperament?.includes(",")
        ? breed.temperament?.split(",").map((temp) => temp.trim())
        : breed.temperament?.split(),
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
  const mappedDbBreeds = dbBreeds.map((breed) => {
    return {
      id: breed.id,
      name: breed.name,
      origin: breed.origin,
      photo: breed.photo,
      minHeight: breed.minHeight,
      maxHeight: breed.maxHeight,
      minWeight: breed.minWeight,
      maxWeight: breed.maxWeight,
      lifeSpan: breed.lifeSpan,
      bredFor: breed.bredFor,
      temperament: breed.temperaments.map((temp) => temp.name),
    };
  });
  const breeds = apiBreeds.concat(mappedDbBreeds);
  return breeds;
};

const getTemperaments = async () => {
  const breeds = await getBreeds();
  breeds.forEach((breed) => {
    if (breed.temperament) {
      for (let i = 0; i < breed.temperament.length; i++) {
        Temperament.findOrCreate({
          where: { name: breed.temperament[i].trim() },
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
