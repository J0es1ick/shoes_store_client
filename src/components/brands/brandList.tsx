import React from "react";
import BrandItem from "../brands/brandItem";
import styles from "./brandList.module.css";

export interface Brand {
  brand_id: number;
  brand_name: string;
  country: string;
}

const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await fetch("/api/brands");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export default function BrandList() {
  const [brands, setBrands] = React.useState<Brand[]>([]);

  const createBrand = async () => {
    setBrands([...brands, { brand_id: 0, brand_name: "", country: "" }]);
  };

  React.useEffect(() => {
    let isMounted = true;
    const fetchBrands = async () => {
      console.log("fetching");
      const brands = await getBrands();
      if (!isMounted) return;
      setBrands(brands);
    };
    fetchBrands();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.brand_list}>
      <h3>Бренды</h3>
      {brands.map((brand, index) => (
        <BrandItem brand={brand} key={brand.brand_id} />
      ))}
    </div>
  );
}
