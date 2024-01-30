import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import {
  deleteContact,
  getContact,
  getContactbyId,
  setIsAddContact,
  setIsGetContact,
} from "../redux/contactSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare, faX } from "@fortawesome/free-solid-svg-icons";
import EditContact from "./EditContact";
import { toast } from "react-toastify";
import "./Table.css";
import "./Modal.css";
import "./ContactList.css";
import DeleteModal from "./DeleteModal"

function Tables() {
  const contact = useSelector((state) => state.users.contact);
  const status = useSelector((state) => state.users.status);
  const [modal, setModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.users.currentPage);
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage);
  const search = useSelector((state) => state.users.search);
  const { Users } = useSelector((state) => state.users);
  console.log(Users);

  let slNo = (currentPage - 1) * itemsPerPage + 1;

  useEffect(() => {
    const params = {
      currentPage,
      itemsPerPage,
      search,
    };
    dispatch(getContact(params));
  }, [dispatch, currentPage, search, itemsPerPage]);

  const removeContact = (id) => {
    dispatch(deleteContact(id))
      .then(() => {
        const params = {
          currentPage,
          itemsPerPage,
          search,
        };
        dispatch(getContact(params));
        toast.error("Contact deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete contact:", error);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleDeleteConfirmation = () => {
    removeContact(contactToDelete);
    setDeleteConfirmation(false);
  };
  
  const viewDetails = async (id) => {
    dispatch(setIsGetContact(false));
    await dispatch(getContactbyId(id));
  };
  const handleEditClick = (id) => {
    viewDetails(id);
    toggleModal();
  };

  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setDeleteConfirmation(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleAddContactSuccess = () => {
    toggleModal();
    toast.success("New user added successfully!");
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(Users) &&
            Users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>
                  <div className="name_pic">
                    <img
                      className="userpic"
                      src={`http://localhost:4001/images/${user.image}`}
                      alt=""
                      onError={(e) => console.error("Error loading image:", e)}
                    />
                    <span>
                      {user.firstname} {user.lastname}
                    </span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <div className="ED_btns">
                    <button
                      className="Edit-btn"
                      onClick={() => handleEditClick(user._id)}
                    >
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                    {modal && status === "succeeded" && (
                      <div className="moda">
                        <div className="overla"></div>
                        <div className="modal-content">
                          <EditContact
                            contact={contact}
                            closeModal={handleCloseModal}
                            onSuccess={handleAddContactSuccess}
                          />
                          <button className="close-modal" onClick={toggleModal}>
                            <div className="x">
                              <FontAwesomeIcon icon={faX} />
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      className="Delete-btn"
                      onClick={() => handleDeleteClick(user._id)}>
                    
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DeleteModal
        isOpen={deleteConfirmation}
        onCancel={() => setDeleteConfirmation(false)}
        onConfirm={handleDeleteConfirmation}
      />
    </div>
  );
}

export default Tables;
