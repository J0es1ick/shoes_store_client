import React from "react";
import BrandItem from "../brands/brandItem";
import styles from "./brandList.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Pagination from "../UI/pagination/pagination";

export interface Brand {
  brand_id: number;
  brand_name: string;
  country: string;
}

const getBrands = async (
  page: number = 1,
  limit: number = 8
): Promise<{ data: Brand[]; total: number }> => {
  try {
    const response = await fetch(`/api/brands?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export default function BrandList() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalBrands, setTotalBrands] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, total } = await getBrands(page);
      setBrands(data);
      setTotalBrands(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    const loadBrands = async () => {
      await fetchBrands();
    };

    if (isMounted) {
      loadBrands();
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  const createBrand = async () => {
    setBrands([...brands, { brand_id: 0, brand_name: "", country: "" }]);
  };

  const updateBrand = async (updatedBrand: Brand) => {
    if (updatedBrand.brand_id === 0) {
      setBrands((prev) =>
        prev.map((b) => (b.brand_id === 0 ? updatedBrand : b))
      );
    } else {
      setBrands((prev) =>
        prev.map((b) =>
          b.brand_id === updatedBrand.brand_id ? updatedBrand : b
        )
      );
    }
    fetchBrands();
  };

  const deleteBrand = async (brandId: number) => {
    try {
      setBrands((prev) => prev.filter((b) => b.brand_id !== brandId));
      if (brands.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchBrands();
      }
    } catch (err) {
      setError("Failed to delete brand");
    }
  };

  const errorBrand = async (errorMsg: string) => {
    setError(errorMsg);
    fetchBrands();
  };

  return (
    <div className={styles.brand_list}>
      <div className={styles.brand_list_header}>
        <h3>Бренды</h3>
        <button
          className={styles.create_brand}
          onClick={createBrand}
          disabled={loading}
        >
          Добавить бренд
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
            {brands.map((brand) => (
              <BrandItem
                key={brand.brand_id}
                brand={brand}
                onUpdate={updateBrand}
                onDelete={deleteBrand}
                onError={errorBrand}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalBrands={totalBrands}
            loading={loading}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
