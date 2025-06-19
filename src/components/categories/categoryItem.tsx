import React from "react";
import { Category } from "./categoryList";
import styles from "./categoryItem.module.css";

interface IProps {
  category: Category;
  onUpdate?: (updatedCategory: Category) => void;
  onError?: (error: string) => void;
  onDelete?: (categoryId: number) => void;
}

const updateCategory = async (category: Category): Promise<Category> => {
  let method = category.category_id !== 0 ? "PATCH" : "POST";
  const url =
    category.category_id !== 0
      ? `/api/categories/${category.category_id}`
      : "/api/categories";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      category_name: category.category_name,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function CategoryItem({
  category,
  onUpdate,
  onDelete,
  onError,
}: IProps) {
  const [name, setName] = React.useState<string>(category.category_name);

  const handleSubmit = async () => {
    try {
      const updatedCategory = await updateCategory({
        ...category,
        category_name: name,
      });
      onUpdate?.(updatedCategory);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      onError?.(error instanceof Error ? error.message : "Неизвестная ошибка");
    }
  };

  const handleDelete = async () => {
    if (!category.category_id || !onDelete) return;

    if (!window.confirm("Вы уверены, что хотите удалить эту категорию?"))
      return;

    try {
      const response = await fetch(`/api/categories/${category.category_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      onDelete(category.category_id);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Ошибка при удалении");
    }
  };

  return (
    <div className={styles.category_item}>
      <div>
        <label htmlFor="category_name">Категория: </label>
        <input
          type="text"
          id="category_name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.category_textarea}
        />
      </div>
      {category.products && category.products.length > 0 ? (
        <div className={styles.products}>
          <h4>Продукты:</h4>
          <ul>
            {category.products.map((product) => (
              <li key={product.product_id}>
                {product.name} (ID: {product.product_id})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noProducts}>Нет привязанных продуктов</p>
      )}
      <div className={styles.category_buttons}>
        <button className={styles.category_button} onClick={handleSubmit}>
          Сохранить
        </button>
        <button className={styles.category_button} onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}
