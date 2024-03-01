import styles from "./Pagination.module.scss"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const loadNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const loadPrevPage = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={styles.root}>
      <button onClick={loadPrevPage} disabled={currentPage === 1}>
        Назад
      </button>
      <div>{currentPage}</div>
      <button onClick={loadNextPage} disabled={currentPage === totalPages}>
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
