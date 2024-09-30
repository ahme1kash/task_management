import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Modal.css";
import toast from "react-hot-toast";

const Modal = ({ closeModal, fetchData, defaultValue }) => {
  const initialRow = {
    task_id: null,
    title: "",
    description: "",
  };

  const [RowData, setRowData] = useState(defaultValue || initialRow);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setRowData(defaultValue); // Set to editing row
    } else {
      setRowData(initialRow); // Reset for new task
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (RowData.task_id && RowData.title && RowData.description) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(RowData)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...RowData, [name]: value }); // Update input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!validateForm()) return; // Validate form input

    try {
      if (defaultValue) {
        console.log(RowData);
        // Update existing task
        await axios.put(
          `http://localhost:8000/updateTask/${RowData.task_id}`,
          RowData,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        toast.success("Task Updated Successfully", { position: "top-right" });
      } else {
        // Create new task
        await axios.post("http://localhost:8000/createTask", RowData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        toast.success("New Task Added Successfully", { position: "top-right" });
      }
      fetchData(); // Fetch updated data
      closeModal(); // Close the modal
    } catch (err) {
      console.log("Error encountered in submitting data", err);
      toast.error("Data failed to get submitted successfully", {
        position: "top-right",
      });
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => e.target.className === "modal-container" && closeModal()}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task_id">Task Id</label>
            <input
              name="task_id"
              onChange={handleChange}
              value={RowData.task_id}
              type="number"
              disabled={defaultValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input name="title" onChange={handleChange} value={RowData.title} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={RowData.description}
            />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="modal-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
