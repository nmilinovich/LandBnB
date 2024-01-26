import React from 'react';
import { useModal } from '../../context/Modal';
import './Navigation.css'

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  customClass, // optional: overrides the default modal button class
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <li className={customClass ?? 'openModalDiv'} onClick={onClick}>{itemText}</li>
  );
}

export default OpenModalMenuItem;
