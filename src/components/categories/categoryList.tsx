import { CardTypeMap } from "@mui/material";
import React from "react";
import CategoryItem from "./categoryItem";

export interface Category {
  category_id: number;
  category_name: string;
}

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch("api/categories");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default function CategoryList() {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const createCategory = async () => {
    setCategories([...categories, { category_id: 0, category_name: "" }]);
  };

  React.useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      console.log("fetching");
      const categories = await getCategories();
      if (!isMounted) return;
      setCategories(categories);
    };
    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h3>Категории</h3>
      {categories.map((category, index) => (
        <CategoryItem category={category} key={category.category_id} />
      ))}
    </div>
  );
}
