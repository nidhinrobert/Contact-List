import React, { useRef, useState } from 'react'
import { editContact, getContactbyId } from '../redux/contactSlice'
import './AddContact.css'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const EditContact = ({ contact, closeModal  }) => {

    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState(contact.firstname);
    const [lastname, setLastname] = useState(contact.lastname);
    const [email, setEmail] = useState(contact.email );
    const [phone, setPhone] = useState(contact.phone );
    const imageRef = useRef(null);

    console.log('con',contact)
    console.log(contact.firstname)



    const updateSubmit = async(id) => {
       
        if (!firstname || !lastname || !phone || !email) {
            setError('Please fill in all fields');
            return;
        }

        const newData = {
            id,
            firstname,
            lastname,
            email,
            phone,
            image: imageRef.current.files[0],

        }
        console.log("data", newData)
        dispatch(editContact(newData));
        
        closeModal();
       await dispatch(getContactbyId(id));
       toast.success('Contact Updated successfully!');
        
        
        imageRef.current.value = '';

    }

    return (
        <div>
            <form className='ContactForm' onSubmit={(e) => {
          e.preventDefault();
          updateSubmit(contact._id);
        }} >
                <h2>Contact Detalis</h2>
                <div className='title'>
                    <h5>Add User Image:</h5>
                    <input
                        type='file'
                        placeholder='Add User Pic'

                        id="image"

                        ref={imageRef}
                    />
                </div>

                <div className='title'>
                    <h5>First Name:</h5>

                    <input
                        type="text"
                        placeholder='Enter First Name'
                        value={firstname}
                        onChange={(e) =>
                            setFirstname(e.target.value)}
                        id='firstname'


                    />
                </div>
                <div className='title'>
                    <h5>Last Name:</h5>
                    <input
                        type="text"
                        placeholder='Enter Lastname'
                        value={lastname}
                        onChange={(e) =>
                            setLastname(e.target.value)}
                        id='lastname'
                    />
                </div>

                <div className='title'>
                    <h5>Email:</h5>

                    <input
                        type="text"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        id='email'
                    />
                </div>
                <div className='title'>
                    <h5>Phone:</h5>

                    <input
                        type="phone"
                        placeholder='Enter Phone no.'
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)}
                        id='phone'
                    />
                </div>

                <div>
                    <button type='submit' className="button-9"  >Edit User</button>
                </div>
            </form>

        </div>
    )
}

export default EditContact