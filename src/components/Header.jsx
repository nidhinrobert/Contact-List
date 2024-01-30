import React, { useEffect } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getContact } from '../redux/contactSlice'

 
const Header = () => {

const dispatch = useDispatch();
const { currentPage,itemsPerPage } = useSelector((state) => state.users);
const search = '';



useEffect(() => {
  dispatch(getContact({ search, currentPage, itemsPerPage }));
}, [search, currentPage, itemsPerPage]);


const contactsCount = useSelector((state) => state.users.contactsCount)

const handleSearchChange = (e) => {
  const newSearch = e.target.value;
  dispatch(getContact({ search: newSearch, currentPage: 1, itemsPerPage }));
};

  return (
    <div className='header'>
       <div className='contactCount'>
             <h3>CONTACTS count ({contactsCount})</h3> 
        </div>
        <div className='boxing'>
        <h2> <FontAwesomeIcon icon={faAddressBook}/> CONTACT LIST</h2>
        </div>
       
        <div className="searchBox">
            <div className='searching'>
                <div className="searchIcon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input type="search" id="search" placeholder="Search"  onChange={handleSearchChange} />
                </div>
                
            </div>
        </div>

  )
}

export default Header