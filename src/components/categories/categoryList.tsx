import React from "react";
import CategoryItem from "./categoryItem";
import styles from "./categoryList.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Pagination from "../UI/pagination/pagination";

export interface Category {
  category_id: number;
  category_name: string;
}

const getCategories = async (
  page: number = 1,
  limit: number = 8
): Promise<{ data: Category[]; total: number }> => {
  try {
    const response = await fetch(`/api/categories?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default function CategoryList() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalCategories, setTotalCategories] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, total } = await getCategories(page);
      setCategories(data);
      setTotalCategories(total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      await fetchCategories();
    };

    if (isMounted) {
      loadCategories();
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  const createCategory = async () => {
    setCategories([...categories, { category_id: 0, category_name: "" }]);
  };

  const updateCategory = async (updatedCategory: Category) => {
    if (updatedCategory.category_id === 0) {
      setCategories((prev) =>
        prev.map((b) => (b.category_id === 0 ? updatedCategory : b))
      );
    } else {
      setCategories((prev) =>
        prev.map((b) =>
          b.category_id === updatedCategory.category_id ? updatedCategory : b
        )
      );
    }
    fetchCategories();
  };

  const deleteCategory = async (categoryId: number) => {
    try {
      setCategories((prev) => prev.filter((b) => b.category_id !== categoryId));
      if (categories.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchCategories();
      }
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  const errorCategory = async (errorMsg: string) => {
    setError(errorMsg);
    fetchCategories();
  };

  return (
    <div className={styles.category_list}>
      <div className={styles.category_list_header}>
        <h3>Категории</h3>
        <button
          className={styles.create_category}
          onClick={createCategory}
          disabled={loading}
        >
          Добавить категорию
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
            {categories.map((category) => (
              <CategoryItem
                key={category.category_id}
                category={category}
                onUpdate={updateCategory}
                onDelete={deleteCategory}
                onError={errorCategory}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalProps={totalCategories}
            loading={loading}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
