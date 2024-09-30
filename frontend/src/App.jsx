import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./App.css";
import Modal from "./Components/Modal/Modal";
import Table from "./Components/Table/Table";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let response = await axios.get("http://localhost:8000/tasks");
    setRows(response.data);
  };

  const handleDeleteRow = async (task_id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${task_id}`);
      setRows(rows.filter((row) => row.task_id !== task_id));
      toast.success("Row Deleted Successfully", { position: "top-right" });
    } catch (err) {
      console.error("Error deleting task", err);
      toast.error("Failed to delete task", { position: "top-right" });
    }
  };

  const handleEditRow = (task_id) => {
    const rowToEdit = rows.find((row) => row.task_id === task_id);
    setRowToEdit(rowToEdit);
    setModalOpen(true);
  };

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <button className="add-btn" onClick={() => setModalOpen(true)}>
        Add New Task
      </button>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          defaultValue={rowToEdit}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default App;
