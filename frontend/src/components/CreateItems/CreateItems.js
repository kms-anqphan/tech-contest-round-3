import React, { useEffect, useState } from "react";
import ItemService from "../../services/ItemService";
import "./CreateItems.css";

const CreateItems = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    ItemService.getAllItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleOptionsChange = (e) => {
    setOptions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      imageUrl: image,
      options: options.split(",").map((option) => option.trim()),
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
    <div className="create-items-container">
      <h2>Create Item</h2>
      <form className="create-item-form" onSubmit={handleSubmit}>
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
          <textarea type="text" onChange={handleOptionsChange} />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      <h2>Added Items</h2>
      <table className="item-list-table">
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
              <img className="item-image" src={item.imageUrl} alt={`img-${index}`} />
              <td>{item.options.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateItems;
