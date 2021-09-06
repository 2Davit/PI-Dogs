import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

const Card = ({ breed }) => {
  return (
    <div className={s.container}>
      <Link className={s.link} to={`/breed-details/${breed.id}`}>
        <img className={s.img} src={breed.photo} />
      </Link>
      <div className={s.infoContainer}>
        <div className={s.info}>
          <div className={s.infoHeaders}>
            <span>Name</span>
          </div>
          <div className={s.infoText}>
            <span>{breed.name}</span>
          </div>
          <div className={s.infoHeaders}>Weight</div>
          <div className={s.infoText}>
            <span>
              {breed.minWeight
                ? "Min: " + breed.minWeight + "kg"
                : "Min: Unknow"}
              <br />
              {breed.maxWeight
                ? "Max: " + breed.maxWeight + "kg"
                : "Max: Unknow"}
            </span>
          </div>
        </div>
        <div className={s.tempsContainer}>
          <div className={s.infoHeaders}>
            <span>Temperaments</span>
          </div>
          <div className={s.temps}>
            <span>{breed.temperament}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
