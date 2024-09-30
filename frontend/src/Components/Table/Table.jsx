import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";

const Table = ({ rows, deleteRow, editRow }) => {
  return (
    <>
      <div className="app-heading-div">
        <h3 className="heading">Manage Daily Tasks📃</h3>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="expand">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              return (
                <tr key={row.task_id}>
                  <td>{row.title}</td>
                  <td className="expand">{row.description}</td>

                  <td className="fit">
                    <span className="actions">
                      <BsFillTrashFill
                        className="delete-btn"
                        onClick={() => deleteRow(row.task_id)}
                      />
                      <BsFillPencilFill
                        className="edit-btn"
                        onClick={() => editRow(row.task_id)}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
