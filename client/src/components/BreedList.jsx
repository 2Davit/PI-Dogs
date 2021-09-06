import React from "react";
import s from "./BreedList.module.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BreedList = ({ filter }) => {
  const [page, setPage] = useState(1);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  const { breeds } = useSelector((state) => state);

  const filterFunction = () => {
    let filtBreeds = breeds.map((breed) => {
      if (breed.temperaments) {
        breed.temperament = breed.temperaments
          .map((temp) => temp.name)
          .join(", ");
      }
    });

    filtBreeds = breeds.filter(
      (breed) =>
        breed.name.toUpperCase().includes(filter.breed.toUpperCase()) &&
        breed.temperament
          ?.toUpperCase()
          .includes(filter.temperament.toUpperCase())
    );

    if (filter.sortBy === "A_Z") {
      filtBreeds = filtBreeds.sort((a, b) =>
        a.name[0].toUpperCase() > b.name[0].toUpperCase()
          ? 1
          : a.name[0].toUpperCase() < b.name[0].toUpperCase()
          ? -1
          : 0
      );
    }

    if (filter.sortBy === "Z_A") {
      filtBreeds = filtBreeds
        .sort((a, b) =>
          a.name[0].toUpperCase() > b.name[0].toUpperCase()
            ? 1
            : a.name[0].toUpperCase() < b.name[0].toUpperCase()
            ? -1
            : 0
        )
        .reverse();
    }

    if (filter.sortBy === "LIGHTER") {
      filtBreeds = filtBreeds.sort((a, b) =>
        a.maxWeight > b.maxWeight ? 1 : a.maxWeight < b.maxWeight ? -1 : 0
      );
    }

    if (filter.sortBy === "HEAVIER") {
      filtBreeds = filtBreeds
        .sort((a, b) =>
          a.maxWeight > b.maxWeight ? 1 : a.maxWeight < b.maxWeight ? -1 : 0
        )
        .reverse();
    }

    if (filter.sortBy === "CUSTOM_BREED") {
      filtBreeds = filtBreeds.filter((breed) =>
        breed.hasOwnProperty("original")
      );
    }

    setFilteredBreeds(filtBreeds.slice(page * 8 - 8, page * 8));
  };

  useEffect(() => {
    filterFunction();
  }, [breeds, page, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className={s.container}>
      <div className={s.cardsContainer}>
        {filteredBreeds.map((breed) => {
          return <Card key={breed.id} breed={breed} />;
        })}
      </div>
      <div className={s.paginate}>
        <button
          className={page < 2 ? s.pagDisabledBtn : s.pagBtn}
          disabled={page < 2}
          onClick={() => setPage(page - 1)}
        >
          {page - 1}
        </button>
        <button className={s.pagDisabledBtn} disabled>
          {page}
        </button>
        <button
          className={filteredBreeds.length < 8 ? s.pagDisabledBtn : s.pagBtn}
          disabled={filteredBreeds.length < 8}
          onClick={() => setPage(page + 1)}
        >
          {page + 1}
        </button>
      </div>
    </div>
  );
};

export default BreedList;
