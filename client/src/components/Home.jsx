import React from "react";
import s from "./Home.module.css";
import NavBar from "./NavBar";
import BreedList from "./BreedList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBreeds, getTemperaments } from "../actions/index";

const Home = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    breed: "",
    temperament: "",
    sortBy: "",
  });

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <NavBar filter={filter} setFilter={setFilter}></NavBar>
      <BreedList filter={filter}></BreedList>
    </div>
  );
};

export default Home;
