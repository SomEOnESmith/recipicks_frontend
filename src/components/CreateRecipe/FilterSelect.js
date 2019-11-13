import React from "react";

const FilterSelect = ({ name, filter, handleChange }) => {
  const options = filter.map(filter => {
    return (
      <option value={filter.id} key={filter.id}>
        {filter.name}
      </option>
    );
  });
  if (name === "cuisine") {
    return (
      <>
        <p>
          <b className="addRecipeTitles">
            {name[0].toUpperCase() + name.slice(1)}:
          </b>
        </p>
        <select className="form-control" name={name} onChange={handleChange}>
          <option>Select a cuisine</option>
          {options}
        </select>
        <br />
      </>
    );
  } else {
    return (
      <>
        <p>
          <b className="addRecipeTitles">
            {name[0].toUpperCase() + name.slice(1)}:
          </b>
        </p>
        <select
          className="form-control"
          name={name}
          onChange={handleChange}
          multiple
        >
          {options}
        </select>
        <br />
      </>
    );
  }
};

export default FilterSelect;
