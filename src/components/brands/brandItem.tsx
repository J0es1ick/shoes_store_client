import React, { useState } from "react";
import { Brand } from "./brandList";
import styles from "./brandItem.module.css";

interface IProps {
  brand: Brand;
  onUpdate?: (updatedBrand: Brand) => void;
  onError?: (error: string) => void;
  onDelete?: (brandId: number) => void;
}

const updateBrand = async (brand: Brand): Promise<Brand> => {
  const method = brand.brand_id !== 0 ? "PATCH" : "POST";
  const url =
    brand.brand_id !== 0 ? `/api/brands/${brand.brand_id}` : "/api/brands";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brand_name: brand.brand_name,
      country: brand.country,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function BrandItem({
  brand,
  onUpdate,
  onError,
  onDelete,
}: IProps) {
  const [name, setName] = useState(brand.brand_name);
  const [country, setCountry] = useState(brand.country || "");

  const handleSubmit = async () => {
    try {
      const updatedBrand = await updateBrand({
        ...brand,
        brand_name: name,
        country: country,
      });
      onUpdate?.(updatedBrand);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      onError?.(error instanceof Error ? error.message : "Неизвестная ошибка");
    }
  };

  const handleDelete = async () => {
    if (!brand.brand_id || !onDelete) return;

    if (!window.confirm("Вы уверены, что хотите удалить этот бренд?")) return;

    try {
      const response = await fetch(`/api/brands/${brand.brand_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      onDelete(brand.brand_id);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Ошибка при удалении");
    }
  };

  return (
    <div className={styles.brand_item}>
      <div>
        <label htmlFor="brand_name">Бренд: </label>
        <input
          type="text"
          id="brand_name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.brand_textarea}
        />
      </div>
      <div>
        <label htmlFor="brand_country">Страна: </label>
        <input
          type="text"
          id="brand_country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={styles.brand_textarea}
        />
      </div>
      <div className={styles.brand_buttons}>
        <button className={styles.brand_button} onClick={handleSubmit}>
          Сохранить
        </button>
        <button className={styles.brand_button} onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}
