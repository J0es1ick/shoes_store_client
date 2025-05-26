import React from "react";
import styles from "./productList.module.css";
import { Alert, CircularProgress } from "@mui/material";
import ProductItem from "./productItem";
import Pagination from "../UI/pagination/pagination";
import { Brand } from "../brands/brandList";
import { Category } from "../categories/categoryList";
import { Supplier } from "../suppliers/supplierList";

export interface Product {
  product_id: number;
  name: string;
  description: string;
  current_price: number;
  brand?: Brand;
  category?: Category;
  supplier?: Supplier;
  sizes?: Size[];
}

interface Size {
  size_id: number;
  size_value: string;
}

const getProducts = async (
  page: number = 1,
  limit: number = 8
): Promise<{ data: Product[]; total: number }> => {
  try {
    const response = await fetch(`api/products?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export default function ProductList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, total } = await getProducts(page);
      setProducts(data);
      setTotalProducts(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      await fetchProducts();
    };

    if (isMounted) {
      loadProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  const createProduct = async () => {
    setProducts([
      ...products,
      {
        product_id: 0,
        name: "",
        description: "",
        current_price: 0,
        brand: undefined,
        category: undefined,
        supplier: undefined,
      },
    ]);
  };

  const updateProduct = async (updatedProduct: Product) => {
    if (updatedProduct.product_id === 0) {
      setProducts((prev) =>
        prev.map((p) => (p.product_id === 0 ? updatedProduct : p))
      );
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === updatedProduct.product_id ? updatedProduct : p
        )
      );
    }
    fetchProducts();
  };

  const deleteProduct = async (productId: number) => {
    try {
      setProducts((prev) => prev.filter((p) => p.product_id !== productId));
      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchProducts();
      }
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const errorProduct = async (errorMsg: string) => {
    setError(errorMsg);
    fetchProducts();
  };

  return (
    <div className={styles.product_list}>
      <div className={styles.product_list_header}>
        <h3>Продукты</h3>
        <button
          className={styles.create_product}
          onClick={createProduct}
          disabled={loading}
        >
          Добавить продукт
        </button>
      </div>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div>
            {products.map((product) => (
              <ProductItem
                key={product.product_id}
                product={product}
                onUpdate={updateProduct}
                onDelete={deleteProduct}
                onError={errorProduct}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalProps={totalProducts}
            loading={loading}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
