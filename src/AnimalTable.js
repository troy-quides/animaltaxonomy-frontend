import React from "react";

export default function AnimalTable(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Kingdom</th>
          <th>Phylum</th>
          <th>Class</th>
          <th>Order</th>
          <th>Suborder</th>
          <th>Clade</th>
          <th>Family</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.animals.length > 0 ? (
          props.animals.map((animal) => {
            return (
              <tr key={animal._id}>
                <td>{animal.kingdom}</td>
                <td>{animal.phylum}</td>
                <td>{animal.class}</td>
                <td>{animal.order}</td>
                <td>{animal.suborder}</td>
                <td>{animal.clade}</td>
                <td>{animal.family}</td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => {
                      props.editRecord(animal);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => props.deleteAnimal(animal._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8}>No records</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
