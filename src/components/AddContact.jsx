import React, { useRef, useState } from "react";
import "./AddContact.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact, getContact } from "../redux/contactSlice";
import { toast } from "react-toastify";

const AddContact = ({ toggleModal }) => {
    const { currentPage, itemsPerPage, search } = useSelector(
        (state) => state.users
    );
    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const imageRef = useRef(null);
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        image: "",
    });

    const handleAddContact = async (event) => {
        event.preventDefault();

        const newErrors = {
            firstname: !firstname ? "Please enter first name" : "",
            lastname: !lastname ? "Please enter last name" : "",
            email: !email ? "Please enter email" : "",
            phone: !phone ? "Please enter phone number" : "",
            image: !imageRef.current?.files[0] ? "Please select an image" : "",
        };

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return;
        }

        setErrors({ firstname: "", lastname: "", email: "", phone: "", image: "" });

        const newContact = {
            firstname,
            lastname,
            phone,
            email,
            image: imageRef.current.files[0],
        };

        try {
            await dispatch(addContact(newContact));
            toggleModal();
            dispatch(getContact({ currentPage, itemsPerPage, search }));
            toast.success("Contact created successfully!");
        } catch (error) {
            console.error("Failed to add contact:", error);
            toast.error("Failed to add contact. Please try again later.");
        }

        setFirstname("");
        setLastname("");
        setEmail("");
        setPhone("");
        imageRef.current.value = "";
    };

    return (
        <div>
            <div className="modal">
                <div className="overlay"></div>
                <div className="modal-content">
                    <form className="ContactForm" onSubmit={handleAddContact}>
                        <h2>Contact Details</h2>
                        <div className="title">
                            <h5>Add User Image:</h5>
                            <input type="file" ref={imageRef} id="image" />
                            
                            {errors.image && <div className="error">{errors.image}</div>}
                        </div>
                        <div className="title">
                            <h5>First Name:</h5>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                id="firstName"
                            />
                            {errors.firstname && (
                                <div className="error">{errors.firstname}</div>
                            )}
                        </div>
                        <div className="title">
                            <h5>Last Name:</h5>
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                id="lastname"
                            />
                            {errors.lastname && (
                                <div className="error">{errors.lastname}</div>
                            )}
                        </div>
                        <div className="title">
                            <h5>Email:</h5>
                            <input
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                            />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="title">
                            <h5>Phone:</h5>
                            <input
                                type="phone"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                id="phone"
                            />
                            {errors.phone && <div className="error">{errors.phone}</div>}
                        </div>
                        <div>
                            <button type="submit" className="button-9">
                                Add User
                            </button>
                        </div>
                    </form>
                    <button className="close-modal" onClick={toggleModal}>
                        <div className="x">X</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
