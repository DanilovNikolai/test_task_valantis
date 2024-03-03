import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onLoadNextItems: () => void;
  onLoadPrevItems: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  onLoadNextItems,
  onLoadPrevItems,
}) => {
  const loadNextPage = () => {
    onPageChange(currentPage + 1);
    onLoadNextItems();
  };

  const loadPrevPage = () => {
    onPageChange(currentPage - 1);
    onLoadPrevItems();
  };

  return (
    <div className={styles.root}>
      <button onClick={loadPrevPage} disabled={currentPage === 1}>
        Назад
      </button>
      <div>{currentPage}</div>
      <button onClick={loadNextPage}>Вперед</button>
    </div>
  );
};

export default Pagination;
