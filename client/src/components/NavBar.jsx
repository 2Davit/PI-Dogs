import React from "react";
import { Link } from "react-router-dom";
import s from "./NavBar.module.css";

function NavBar({ filter, setFilter }) {
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSort = (e) => {
    setFilter({ ...filter, sortBy: e.target.name });
  };

  return (
    <div className={s.container}>
      <div className={s.filterInputsContainer}>
        {/* <label>Search for breed</label> */}
        <input
          className={s.filterInputs}
          name="breed"
          value={filter.breed}
          onChange={handleChange}
          placeholder="Search for breed"
        />
        {/* <label>Filter by temperament</label> */}
        <input
          className={s.filterInputs}
          name="temperament"
          value={filter.temperament}
          onChange={handleChange}
          placeholder="Filter by temperament"
        />
      </div>
      <div className={s.filterBtnContainer}>
        <label>Sort by</label>
        <button className={s.btn} name="A_Z" onClick={handleSort}>
          A - Z
        </button>
        <button className={s.btn} name="Z_A" onClick={handleSort}>
          Z - A
        </button>
        <button className={s.btn} name="LIGHTER" onClick={handleSort}>
          Lighter
        </button>
        <button className={s.btn} name="HEAVIER" onClick={handleSort}>
          Heavier
        </button>
        <button className={s.btn} name="CUSTOM_BREED" onClick={handleSort}>
          Custom breed
        </button>
      </div>
      <div className={s.createBtnContainer}>
        <Link to="/create-breed">
          <button className={s.btn}>Create own breed!</button>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
