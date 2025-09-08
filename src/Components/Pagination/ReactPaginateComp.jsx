import React from 'react'
import ReactPaginate from 'react-paginate'

const ReactPaginateComp = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={"Prev"}
      nextLabel={"Next"}
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName="pagination justify-content-center"
      pageClassName={"page-item mx-1"}
      pageLinkClassName={"page-link rounded text-dark"}
      activeClassName={"active"}
      disabledClassName="disabled-page"
      previousClassName={"page-item mx-1"}
      previousLinkClassName={"page-link text-dark rounded"}
      nextClassName={"page-item mx-1"}
      nextLinkClassName={"page-link text-dark rounded"}
      breakClassName="page-item text-dark"
      breakLinkClassName="page-link rounded text-dark"
    />

  )
}

export default ReactPaginateComp