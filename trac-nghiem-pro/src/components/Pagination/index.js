import './Pagination.scss';

const Pagination = (props) => {
  const { currentPage, totalPages, handlePage } = props;
  const handlePageChange = (page) => {
    handlePage(page);
  }
  const handlePagePrev = () => {
    if (currentPage > 1) {
      handlePage(currentPage - 1);
    }
  }
  const handlePageNext = () => {
    if (currentPage < totalPages) {
      handlePage(currentPage + 1);
    }
  }

  return (
    <div className="pagination pagination-style-three">
      <span className={currentPage===1 ? "pagination__lock" : ""} onClick={handlePagePrev}>Prev</span>
      {Array.from({ length: totalPages }, (_, i) => (
        <span key={i} className={currentPage === i+1 ? "selected" : ""} onClick={()=>handlePageChange(i+1)}>{i+1}</span>
      ))}
      <span className={currentPage===totalPages ? "pagination__lock" : ""} onClick={handlePageNext}>Next</span>
    </div>
  );
}

export default Pagination;