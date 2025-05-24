import React from "react";
import { Brand } from "./brandList";
import styles from "./brandItem.module.css";

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
    <div className={styles.brand_item}>
      <input type="text" name="" id={styles.brand_name} placeholder={name} />
      <h4>
        Страна:{" "}
        <input
          type="text"
          name=""
          id={styles.brand_name}
          placeholder={props.brand.country}
        />
      </h4>
    </div>
  );
}
