import React from "react";
import { Supplier } from "./supplierList";
import styles from "./supplierItem.module.css";

interface IProps {
  supplier: Supplier;
  onUpdate?: (updatedSupplier: Supplier) => void;
  onDelete?: (supplierId: number) => void;
  onError?: (error: string) => void;
}

const updateSupplier = async (supplier: Supplier): Promise<Supplier> => {
  const method = supplier.supplier_id !== 0 ? "PATCH" : "POST";
  const url =
    supplier.supplier_id !== 0
      ? `api/suppliers/${supplier.supplier_id}`
      : "api/suppliers";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      supplier_name: supplier.supplier_name,
      email: supplier.email,
      phone: supplier.phone,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default function SupplierItem({
  supplier,
  onUpdate,
  onDelete,
  onError,
}: IProps) {
  const [name, setName] = React.useState<string>(supplier.supplier_name);
  const [email, setEmail] = React.useState<string>(supplier.email);
  const [phone, setPhone] = React.useState<string>(supplier.phone);

  const handleSubmit = async () => {
    try {
      const updatedSupplier = await updateSupplier({
        ...supplier,
        supplier_name: name,
        email: email,
        phone: phone,
        products: supplier.products || [],
      });
      onUpdate?.(updatedSupplier);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      onError?.(error instanceof Error ? error.message : "Неизвестная ошибка");
    }
  };

  const handleDelete = async () => {
    if (!supplier.supplier_id || !onDelete) return;

    if (!window.confirm("Вы уверены, что хотите удалить этого поставщика?"))
      return;

    try {
      const response = await fetch(`/api/suppliers/${supplier.supplier_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении");
      }

      onDelete(supplier.supplier_id);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Ошибка при удалении");
    }
  };

  return (
    <div className={styles.supplier_item}>
      <div>
        <label htmlFor="supplier_name">Поставщик: </label>
        <input
          type="text"
          id="supplier_name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.supplier_textarea}
        />
      </div>
      <div>
        <label htmlFor="supplier_email">Email: </label>
        <input
          type="text"
          id="supplier_email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.supplier_textarea}
        />
      </div>
      <div>
        <label htmlFor="supplier_phone">Телефон: </label>
        <input
          type="text"
          id="supplier_phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.supplier_textarea}
        />
      </div>
      {supplier.products && supplier.products.length > 0 ? (
        <div className={styles.products}>
          <h4>Продукты:</h4>
          <ul>
            {supplier.products.map((product) => (
              <li key={product.product_id}>ID: {product.product_id}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noProducts}>Нет привязанных продуктов</p>
      )}
      <div className={styles.supplier_buttons}>
        <button className={styles.supplier_button} onClick={handleSubmit}>
          Сохранить
        </button>
        <button className={styles.supplier_button} onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}
