import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimalTable from "./AnimalTable";
import AddAnimalForm from "./AddAnimalForm";
import EditAnimalForm from "./EditAnimalForm";

function App(props) {
  const animalsURL = "https://animaltaxonomy.herokuapp.com/animals/";
  const authToken = {
    headers: {
      Authorization: localStorage.getItem("userToken"),
    },
  };
  const [animals, setAnimals] = useState([]);
  const [edit, setEdit] = useState(false);
  const initialForm = {
    id: null,
    kingdom: "",
    phylum: "",
    class: "",
    order: "",
    suborder: "",
    clade: "",
    family: "",
  };
  const [currentAnimal, setCurrentAnimal] = useState(initialForm);

  const editRecord = (animal) => {
    setEdit(true);
    setCurrentAnimal({
      id: animal._id,
      kingdom: animal.kingdom,
      phylum: animal.phylum,
      class: animal.class,
      order: animal.order,
      suborder: animal.suborder,
      clade: animal.clade,
      family: animal.family,
    });
  };

  // Fetch all records
  const fetchData = async () => {
    await axios
      .get(animalsURL, authToken)
      .then((res) => {
        setAnimals(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Read all on first mount
  useEffect(() => {
    fetchData();
  }, []);

  // Update a record
  const updateAnimal = (id, updatedAnimal) => {
    setEdit(false);
    axios
      .patch(`${animalsURL + id}`, updatedAnimal, authToken)
      .then(() => fetchData())
      .catch((error) => console.log(error));
  };

  // Delete a record
  const deleteAnimal = (id) => {
    axios
      .delete(`${animalsURL + id}`, authToken)
      .then(() => fetchData())
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <h1>
        Taxonomy
        <button
          className="logout"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </h1>
      <div className="flex-row">
        <div className="flex-large">
          {edit ? (
            <div>
              <h2>Edit Record</h2>
              <EditAnimalForm
                setEdit={setEdit}
                currentAnimal={currentAnimal}
                updateAnimal={updateAnimal}
              />
            </div>
          ) : (
            <div>
              <h2>Add animal</h2>
              <AddAnimalForm />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>Records</h2>
          <AnimalTable
            animals={animals}
            editRecord={editRecord}
            deleteAnimal={deleteAnimal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
