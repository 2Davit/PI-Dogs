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
      const breed = await axios.get(`http://localhost:3001/dogs/${params.id}`);
      setBreed(breed.data);
    };
    getBreedByApi();
  }, []);

  return (
    <div className={s.background}>
      <div className={s.container}>
        <img className={s.img} src={breed[0]?.photo} />
        <div className={s.infoContainer}>
          <div className={s.infoHeaders}>
            <span>Name:</span>
          </div>
          <span>{breed[0]?.name ? breed[0].name : "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Origin:</span>
          </div>
          <span>{breed[0]?.origin ? breed[0].origin : "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Height:</span>
          </div>
          <span>
            Minimum height:{" "}
            {breed[0]?.minHeight ? breed[0].minHeight : "Unknow"}cm.
          </span>
          <span>
            Maximum height:{" "}
            {breed[0]?.maxHeight ? breed[0].maxHeight : "Unknow"}cm.
          </span>
          <div className={s.infoHeaders}>
            <span>Weight:</span>
          </div>
          <span>
            Minimum weight:{" "}
            {breed[0]?.minWeight ? breed[0].minWeight : "Unknow"}kg.
          </span>
          <span>
            Maximum weight:{" "}
            {breed[0]?.maxWeight ? breed[0].maxWeight : "Unknow"}kg.
          </span>
          <div className={s.infoHeaders}>
            <span>Life Span:</span>
          </div>
          <span>
            {breed[0]?.lifeSpan ? breed[0].lifeSpan : "Unknow"} years.
          </span>
          <div className={s.infoHeaders}>
            <span>Bred for:</span>
          </div>
          <span>{breed[0]?.bredFor ? breed[0].bredFor : "Unknow"}.</span>
          <div className={s.infoHeaders}>
            <span>Temperaments:</span>
          </div>
          <span>
            {breed[0]?.temperament ? breed[0].temperament : "Unknow"}.
          </span>
          <Link to="/home">
            <button className={s.backBtn}>BACK</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;