import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import s from "./BreedDetails.module.css";

const BreedDetails = () => {
  const params = useParams();

  const [breed, setBreed] = useState([]);

  useEffect(() => {
    const getBreedByApi = async () => {
      let { data: breed } = await axios.get(
        `http://localhost:3001/dogs/${params.id}`
      );
      if (breed[0].temperaments) {
        breed[0].temperament = breed[0].temperaments
          .map((temp) => temp.name)
          .join(", ");
      }
      setBreed(breed);
    };
    getBreedByApi();
  }, [params]);

  return (
    <div className={s.background}>
      <div className={s.container}>
        <img className={s.img} src={breed[0]?.photo} alt={breed[0]?.name} />
        <div className={s.infoContainer}>
          <div className={s.infoHeaders}>
            <span>Name:</span>
          </div>
          <span>{breed[0]?.name || "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Origin:</span>
          </div>
          <span>{breed[0]?.origin || "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Height:</span>
          </div>
          <span>Minimum height: {breed[0]?.minHeight}cm.</span>
          <span>Maximum height: {breed[0]?.maxHeight}cm.</span>
          <div className={s.infoHeaders}>
            <span>Weight:</span>
          </div>
          <span>Minimum weight: {breed[0]?.minWeight}kg.</span>
          <span>Maximum weight: {breed[0]?.maxWeight}kg.</span>
          <div className={s.infoHeaders}>
            <span>Life Span:</span>
          </div>
          <span>{breed[0]?.lifeSpan || "Unknow"} years.</span>
          <div className={s.infoHeaders}>
            <span>Bred for:</span>
          </div>
          <span>{breed[0]?.bredFor || "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Temperaments:</span>
          </div>
          <span>{breed[0]?.temperament.join(", ") || "Unknow"}.</span>
          <Link to="/home">
            <button className={s.backBtn}>BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;
