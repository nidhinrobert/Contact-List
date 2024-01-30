// DeleteConfirmationModal.js
import React from 'react';
import './DeleteModal.css'



function DeleteModal({ isOpen, onCancel, onConfirm }) {
  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <h2>Are you sure you want to delete?</h2>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  );
}

export default DeleteModal;

