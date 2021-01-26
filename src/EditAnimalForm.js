import React, { useState } from "react";

export default function EditAnimalForm(props) {
  const [animal, setAnimal] = useState(props.currentAnimal);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setAnimal({
      ...animal,
      [name]: value,
    });
  };

  return (
    <form onSubmit={() => props.updateAnimal(animal.id, animal)}>
      <label>Kingdom</label>
      <input
        type="text"
        name="kingdom"
        value={animal.kingdom}
        required
        onChange={handleInputChange}
      />
      <label>Phylum</label>
      <input
        type="text"
        name="phylum"
        value={animal.phylum}
        required
        onChange={handleInputChange}
      />
      <label>Class</label>
      <input
        type="text"
        name="class"
        value={animal.class}
        required
        onChange={handleInputChange}
      />
      <label>Order</label>
      <input
        type="text"
        name="order"
        value={animal.order}
        required
        onChange={handleInputChange}
      />
      <label>Suborder</label>
      <input
        type="text"
        name="suborder"
        value={animal.suborder}
        required
        onChange={handleInputChange}
      />
      <label>Clade</label>
      <input
        type="text"
        name="clade"
        value={animal.clade}
        required
        onChange={handleInputChange}
      />
      <label>Family</label>
      <input
        type="text"
        name="family"
        value={animal.family}
        required
        onChange={handleInputChange}
      />
      <button>Update record</button>
      <button
        className="button muted-button"
        onClick={() => props.setEdit(false)}
      >
        Cancel
      </button>
    </form>
  );
}
