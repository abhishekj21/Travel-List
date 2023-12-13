import { useState } from "react";
import Item from "./Item.js";

function PackingList({ items, setItems, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("packed");

  function clearItems(e) {
    let isTrue = window.confirm("are you sure you want to delete");
    if (isTrue) {
      setItems([]);
    }
  }

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={(e) => clearItems(e.target.value)}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
