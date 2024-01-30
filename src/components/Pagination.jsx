import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { setCurrentPage } from '../redux/contactSlice'
import PaginationCss from './Pagination.module.css'
import { getContact } from '../redux/contactSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = () => {

    const contactsCount = useSelector((state) => state.users.contactsCount)
  const currentPageNumber = useSelector((state) => state.users.currentPage)
  const searchValue = useSelector((state) => state.users.searchValue)
  const itemsPerPage = useSelector((state) => state.users.itemsPerPage)

const dispatch = useDispatch();

const page = Math.ceil(contactsCount / itemsPerPage);

const pagenumbers = [];

if (page > 1) {

  for (let i = 1; i <= page; i++) {
    pagenumbers.push(i)
  };

};
const previousPage = () => {

    const currentPage = currentPageNumber-1;
  
    dispatch(getContact({currentPage,itemsPerPage}));
    dispatch(setCurrentPage(currentPage))
  }
  const selectPage = (page) => {
    const currentPage = page;


    dispatch(getContact(currentPage, itemsPerPage));
    dispatch(setCurrentPage(currentPage))
  }


const nextPage = () => {
 
    const currentPage = currentPageNumber + 1;

    dispatch(getContact(currentPage,itemsPerPage));
    dispatch(setCurrentPage(currentPage))
  }


  return (
    <div className={PaginationCss.pagination}>

      { currentPageNumber > 1 && <button className={PaginationCss.numbers} onClick={previousPage}><FontAwesomeIcon icon={faChevronLeft} /></button>}

      {pagenumbers.map((page) => {
        return <button  className={`${PaginationCss.numbers} ${currentPageNumber === page ? PaginationCss.current : ''}`} key={page} onClick={() => selectPage(page)}>{page}</button>
      })}
      { currentPageNumber < page && <button className={PaginationCss.numbers} onClick={() => nextPage()}><FontAwesomeIcon icon={faChevronRight} /></button>}

    </div>
  )
}

export default Pagination