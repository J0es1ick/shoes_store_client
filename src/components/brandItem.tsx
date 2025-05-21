import React from "react";
import { Brand } from "./brandList";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IProps {
  brand: Brand;
  onUpdate?: (updatedBrand: Brand) => void;
}

const updateBrand = async (brand: Brand) => {
  let method = "POST";
  let url = "/api/brands";
  if (brand.brand_id !== 0) {
    method = "PUT";
    url += `/${brand.brand_id}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(brand),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function BrandItem(props: IProps) {
  const [name, setName] = React.useState<string>(props.brand.brand_name);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h1>Brand:</h1>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={name}
        onChange={onChange}
      />
      <h4>country: {props.brand.country}</h4>
      <Button
        color="secondary"
        onClick={async () => {
          try {
            const updatedBrand = await updateBrand({
              ...props.brand,
              brand_name: name,
            });
            props.onUpdate?.(updatedBrand);
          } catch (error) {
            console.error("Update failed:", error);
          }
        }}
      >
        Сохранить
      </Button>
    </div>
  );
}
