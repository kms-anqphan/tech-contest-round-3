import React, { useEffect, useState } from "react";

import ItemService from "../../services/ItemService";

const CreateItems = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    ItemService.getAllItems()
      .then((res) => {
        setItems(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleOptionsChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setOptions(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      imageUrl: image,
      options,
    };

    ItemService.addItem(newItem).then(() =>
      ItemService.getAllItems()
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err))
    );

    setDescription("");
    setImage(null);
    setOptions([]);
  };

  return (
    <div>
      <h2>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="text" value={image} onChange={handleImageChange} />
        </label>
        <br />
        <label>
          Options:
          <select multiple value={options} onChange={handleOptionsChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      <h2>Added Items</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Image</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <img src={item.imageUrl} alt={`img-${index}`} />
              <td>{item.options.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateItems;
