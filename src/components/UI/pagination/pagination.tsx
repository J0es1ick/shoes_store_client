import React from "react";
import styles from "./pagination.module.css";

interface IProps {
  page: number;
  totalProps: number;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  loading,
  totalProps,
  setPage,
}: IProps) {
  return (
    <div className={styles.pagination}>
      <button
        disabled={page <= 1 || loading}
        onClick={() => setPage((p) => p - 1)}
      >
        {"<"}
      </button>
      <span>{page}</span>
      <button
        disabled={page * 8 >= totalProps || loading}
        onClick={() => setPage((p) => p + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
