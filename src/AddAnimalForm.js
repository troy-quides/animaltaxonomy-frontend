import React, { useState } from "react";
import axios from "axios";

export default function AddAnimalForm(props) {
  const animalsURL = "https://animaltaxonomy.herokuapp.com/animals/";
  const authToken = {
    headers: {
      Authorization: localStorage.getItem("userToken"),
    },
  };

  const [kingdom, setKingdom] = useState(null);
  const [phylum, setPhylum] = useState(null);
  const [cls, setCls] = useState(null);
  const [order, setOrder] = useState(null);
  const [suborder, setSuborder] = useState(null);
  const [clade, setClade] = useState(null);
  const [family, setFamily] = useState(null);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const req = {
      kingdom: capitalize(kingdom),
      phylum: capitalize(phylum),
      class: capitalize(cls),
      order: capitalize(order),
      suborder: capitalize(suborder),
      clade: capitalize(clade),
      family: capitalize(family),
    };
    axios
      .post(animalsURL, req, authToken)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>Kingdom</label>
      <input
        type="text"
        name="kingdom"
        required
        onChange={(e) => setKingdom(e.target.value)}
      />
      <label>Phylum</label>
      <input
        type="text"
        name="phylum"
        required
        onChange={(e) => setPhylum(e.target.value)}
      />
      <label>Class</label>
      <input
        type="text"
        name="class"
        required
        onChange={(e) => setCls(e.target.value)}
      />
      <label>Order</label>
      <input
        type="text"
        name="order"
        required
        onChange={(e) => setOrder(e.target.value)}
      />
      <label>Suborder</label>
      <input
        type="text"
        name="suborder"
        required
        onChange={(e) => setSuborder(e.target.value)}
      />
      <label>Clade</label>
      <input
        type="text"
        name="clade"
        required
        onChange={(e) => setClade(e.target.value)}
      />
      <label>Family</label>
      <input
        type="text"
        name="family"
        required
        onChange={(e) => setFamily(e.target.value)}
      />
      <button>Add record</button>
    </form>
  );
}
