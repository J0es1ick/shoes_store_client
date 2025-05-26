import React from "react";
import { Product } from "./productList";
import styles from "./productItem.module.css";

interface IProps {
  product: Product;
  onUpdate?: (updatedProduct: Product) => void;
  onDelete?: (productId: number) => void;
  onError?: (error: string) => void;
}

const updateProduct = async (product: Product): Promise<Product> => {
  const method = product.product_id !== 0 ? "PATCH" : "POST";
  const url =
    product.product_id !== 0
      ? `api/products/${product.product_id}`
      : "api/products";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: product.name,
      description: product.description,
      current_price: product.current_price,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function ProductItem({
  product,
  onUpdate,
  onDelete,
  onError,
}: IProps) {
  const [name, setName] = React.useState<string>(product.name);
  const [description, setDescription] = React.useState<string>(
    product.description
  );
  const [price, setPrice] = React.useState<string>(
    product.current_price.toString()
  );

  const handleSubmit = async () => {
    try {
      const updatedProduct = await updateProduct({
        ...product,
        name,
        description,
        current_price: parseFloat(price),
      });
      onUpdate?.(updatedProduct);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      onError?.(error instanceof Error ? error.message : "Неизвестная ошибка");
    }
  };

  const handleDelete = async () => {
    if (!product.product_id || !onDelete) return;

    if (!window.confirm("Вы уверены, что хотите удалить этот продукт?")) return;

    try {
      const response = await fetch(`/api/products/${product.product_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      onDelete(product.product_id);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Ошибка при удалении");
    }
  };

  return (
    <div className={styles.product_item}>
      <div>
        <label htmlFor="product_name">Название: </label>
        <input
          type="text"
          id="product_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.product_textarea}
        />
      </div>
      <div>
        <label htmlFor="product_description">Описание: </label>
        <input
          type="text"
          id="product_description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.product_textarea_description}
        />
      </div>
      <div>
        <label htmlFor="product_price">Цена: </label>
        <input
          type="number"
          id="product_price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.product_textarea}
          min="0"
          step="0.01"
        />
      </div>
      <div className={styles.product_id_label}>
        <label htmlFor="product_brand">
          Бренд ID: {product.brand?.brand_id}
        </label>
      </div>
      <div className={styles.product_id_label}>
        <label htmlFor="product_category">
          Категория ID: {product.category?.category_id}
        </label>
      </div>
      <div className={styles.product_id_label}>
        <label htmlFor="product_supplier">
          Поставщик ID: {product.supplier?.supplier_id}
        </label>
      </div>
      {product.sizes && product.sizes.length > 0 ? (
        <div className={styles.sizes}>
          <h4>Размеры:</h4>
          <ul>
            {product.sizes.map((size) => (
              <li key={size.size_id}>{size.size_value}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noSizes}>Нет доступных размеров</p>
      )}
      <div className={styles.product_buttons}>
        <button className={styles.product_button} onClick={handleSubmit}>
          Сохранить
        </button>
        <button className={styles.product_button} onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}
