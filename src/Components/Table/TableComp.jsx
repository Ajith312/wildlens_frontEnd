import ButtonComponent from "Components/Button/Button";
import { useDispatch } from "Components/CustomHooks";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { update_selected_booking } from "Redux/Slice/Admin.Slice";
import { updateModalShow } from "Redux/Slice/Common.Slice";

const TableComp = ({
  tableHeadings,
  tableKeys,
  tableData,
  pageSize = 5,
  showIndex = true,
  showAction = true,
  actionLabel = "View",
  onActionClick
}) => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const offset = currentPage * pageSize
  const currentData = tableData?.slice(offset, offset + pageSize)
  const pageCount = Math.ceil(tableData?.length / pageSize)


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            {showIndex && <th className="table-head">S.No</th>}
            {tableHeadings?.map((heading, index) => (
              <th key={index} className="table-head">{heading}</th>
            ))}
            {showAction && <th className="table-head">View Details</th>}
          </tr>
        </thead>
        <tbody>
          {currentData && currentData?.length > 0 ? (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                {showIndex && <td>{offset + rowIndex + 1}</td>}
                {tableKeys?.map((key, colIndex) => (
                  <td key={colIndex}>
                    {key === "user_name"
                      ? `${row.first_name || ""} ${row.last_name || ""}`
                      : row[key] ?? "-"}
                  </td>
                ))}

                {showAction && (
                  <td>
                    <ButtonComponent className="btn-warning w-100" buttonName={actionLabel}
                      clickFunction={() => {
                        if (onActionClick) {
                          onActionClick(row);
                        } else {
                          dispatch( updateModalShow({show: true,close_btn: true,size: "lg",modal_from:"Bookings",modal_type: "view_booking"}))
                          dispatch(update_selected_booking(row))
                        }
                      }}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHeadings?.length +(showIndex ? 1 : 0) +(showAction ? 1 : 0)}className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {pageCount > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <ReactPaginateComp
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </div>
      )}
    </div>
  );
};

export default TableComp;
