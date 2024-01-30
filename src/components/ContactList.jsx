import React, { useState } from 'react'
import './ContactList.css'
import Tables from './Tables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faX } from '@fortawesome/free-solid-svg-icons'
import Pagination from './Pagination'
import './Modal.css'
import AddContact from './AddContact'


const ContactList = () => {
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div className='Container'>


            
            <div className='add_button'>
                <button className='adding' onClick={toggleModal}> Add   <FontAwesomeIcon icon={faUser} /></button>

                {modal && (<AddContact toggleModal={toggleModal} />
                )}



            </div>
            <Tables />
            <Pagination />



        </div>
    )
}

export default ContactList