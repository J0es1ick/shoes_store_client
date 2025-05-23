import React from "react";
import { Category } from "./categoryList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps {
  category: Category;
  onUpdate?: (updatedcategory: Category) => void;
}

const updateCategory = async (category: Category) => {
  let method = "POST";
  let url = "/api/categories";
  if (category.category_id !== 0) {
    method = "PUT";
    url += `/${category.category_id}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function CategoryItem(props: IProps) {
  const [name, setName] = React.useState<string>(props.category.category_name);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h4>Категория: {name}</h4>
    </div>
  );
}
