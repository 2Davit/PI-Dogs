import React from "react";
import { Link } from "react-router-dom";
import s from "./CreateBreedForm.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateBreedForm = ({ history }) => {
  const [newBreed, setNewBreed] = useState({
    name: "",
    origin: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    bredFor: "",
    temperament: [],
  });
  const [page, setPage] = useState(1);
  const [addTemp, setAddTemp] = useState([]);
  const [errors, setErrors] = useState({ hasErrors: true });

  const { temperaments: temperamentList } = useSelector((state) => state);

  const validateForm = (form) => {
    let errors = {
      hasErrors: false,
    };

    if (!/^[a-zA-Z ]+$/.test(form.name)) {
      errors.name = "Name must be only characters";
      errors.hasErrors = true;
    } else if (!/^[a-zA-Z ]+$/.test(form.origin)) {
      errors.origin = "Origin must be onlye characters";
      errors.hasErrors = true;
    } else if (!/^[0-9]+$/.test(form.minHeight)) {
      errors.minHeight = "Height must be a positive number";
      errors.hasErrors = true;
    } else if (!/^[0-9]+$/.test(form.maxHeight)) {
      errors.maxHeight = "Height must be a positive number";
      errors.hasErrors = true;
    } else if (!/^[0-9]+$/.test(form.minWeight)) {
      errors.minWeight = "Weight must be a positive number";
      errors.hasErrors = true;
    } else if (!/^[0-9]+$/.test(form.maxWeight)) {
      errors.maxWeight = "Weight must be a positive number";
      errors.hasErrors = true;
    } else if (!/^[0-9]+$/.test(form.lifeSpan)) {
      errors.lifeSpan = "Life span must be a positive number";
      errors.hasErrors = true;
    } else if (!/^[a-zA-Z ]+$/.test(form.bredFor)) {
      errors.bredFor = "Must have only characters";
      errors.hasErrors = true;
    } else if (form.temperament.length < 1) {
      errors.temperament = "Choose at least one temperament";
      errors.hasErrors = true;
    }

    return errors;
  };

  const handleChanges = (e) => {
    setNewBreed({ ...newBreed, [e.target.name]: e.target.value });
    setErrors(validateForm({ ...newBreed, [e.target.name]: e.target.value }));
  };

  const handleAddTemp = (e) => {
    const temp = e.target.value;
    if (newBreed.temperament.includes(temp)) {
      const i = newBreed.temperament.indexOf(temp);
      setNewBreed({
        ...newBreed,
        [newBreed.temperament]: newBreed.temperament.splice(i, 1),
      });
    } else {
      setNewBreed({
        ...newBreed,
        [newBreed.temperament]: newBreed.temperament.push(temp),
      });
    }
    setErrors(validateForm({ ...newBreed, [e.target.name]: e.target.value }));
  };

  const submitBreed = async (e) => {
    e.preventDefault();
    setErrors({ ...errors, hasErrors: true });
    await axios.post("http://localhost:3001/dog", newBreed);
    /* history.push("/home"); */
    history.goBack();
  };

  useEffect(() => {
    setAddTemp(temperamentList.slice(page * 10 - 10, page * 10));
  }, [page]);

  return (
    <div className={s.background}>
      <form className={s.container} onSubmit={submitBreed}>
        <div className={s.formContainer}>
          <input
            className={errors.name ? s.inputHasErrors : s.formInputs}
            type="text"
            name="name"
            value={newBreed.name}
            onChange={handleChanges}
            placeholder="Breed name"
          />
          {errors.name && <p className={s.textHasErrors}>{errors.name}</p>}
          <input
            className={errors.origin ? s.inputHasErrors : s.formInputs}
            type="text"
            name="origin"
            value={newBreed.origin}
            onChange={handleChanges}
            placeholder="Breed origin"
          />
          {errors.origin && <p className={s.textHasErrors}>{errors.origin}</p>}
          <input
            className={errors.minHeight ? s.inputHasErrors : s.formInputs}
            type="text"
            name="minHeight"
            value={newBreed.minHeight}
            onChange={handleChanges}
            placeholder="Min height (cm)"
          />
          {errors.minHeight && (
            <p className={s.textHasErrors}>{errors.minHeight}</p>
          )}
          <input
            className={errors.maxHeight ? s.inputHasErrors : s.formInputs}
            type="text"
            name="maxHeight"
            value={newBreed.maxHeight}
            onChange={handleChanges}
            placeholder="Max height (cm)"
          />
          {errors.maxHeight && (
            <p className={s.textHasErrors}>{errors.maxHeight}</p>
          )}
          <input
            className={errors.minWeight ? s.inputHasErrors : s.formInputs}
            type="text"
            name="minWeight"
            value={newBreed.minWeight}
            onChange={handleChanges}
            placeholder="Min weight (kg)"
          />
          {errors.minWeight && (
            <p className={s.textHasErrors}>{errors.minWeight}</p>
          )}
          <input
            className={errors.maxWeight ? s.inputHasErrors : s.formInputs}
            type="text"
            name="maxWeight"
            value={newBreed.maxWeight}
            onChange={handleChanges}
            placeholder="Max weight (kg)"
          />
          {errors.maxWeight && (
            <p className={s.textHasErrors}>{errors.maxWeight}</p>
          )}
          <input
            className={errors.lifeSpan ? s.inputHasErrors : s.formInputs}
            type="text"
            name="lifeSpan"
            value={newBreed.lifeSpan}
            onChange={handleChanges}
            placeholder="Life span (years)"
          />
          {errors.lifeSpan && (
            <p className={s.textHasErrors}>{errors.lifeSpan}</p>
          )}
          <input
            className={errors.bredFor ? s.inputHasErrors : s.formInputs}
            type="text"
            name="bredFor"
            value={newBreed.bredFor}
            onChange={handleChanges}
            placeholder="Bred for"
          />
          {errors.bredFor && (
            <p className={s.textHasErrors}>{errors.bredFor}</p>
          )}
        </div>
        <div className={s.tempContainer}>
          <textarea
            className={
              errors.temperament ? s.tempsInputHasErrors : s.tempsInput
            }
            name="temperamentList"
            readOnly
            value={newBreed.temperament.toString()}
            placeholder="Temperaments"
          />
          {errors.temperament && (
            <p className={s.textHasErrors}>{errors.temperament}</p>
          )}
          <div className={s.tempBtnContainer}>
            {addTemp.map((temp) => {
              return (
                <button
                  key={temp.id}
                  type="button"
                  className={s.tempBtn}
                  name={temp.name}
                  value={temp.name}
                  onClick={handleAddTemp}
                >
                  {temp.name}
                </button>
              );
            })}
          </div>
          <div className={s.pageBtnContainer}>
            <button
              type="button"
              className={page < 2 ? s.tempDisabledPageBtn : s.tempPageBtn}
              disabled={page < 2}
              onClick={() => setPage(page - 1)}
            >
              {page - 1}
            </button>
            <button type="button" className={s.tempDisabledPageBtn} disabled>
              {page}
            </button>
            <button
              type="button"
              className={
                addTemp.length < 10 ? s.tempDisabledPageBtn : s.tempPageBtn
              }
              disabled={addTemp.length < 10}
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          </div>
        </div>
        <div className={s.btnContainer}>
          <button
            className={errors.hasErrors ? s.btnDisabled : s.btn}
            disabled={errors.hasErrors}
          >
            CREATE BREED!
          </button>
          <Link to="/home">
            <button type="button" className={s.btn}>
              BACK
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateBreedForm;
