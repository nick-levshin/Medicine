import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountryDropdown,
  getTypeOfPropertyDropdown,
} from '../../../actions/dropdown';
import { createFirm } from '../../../actions/table';
import DropdownInput from '../dropdownInput/dropdownInput';

const FirmModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.table.totalCount);

  const [selectedName, setSelectedName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const typeOfPropertyDropdown = useSelector(
    (state) => state.modal.typeOfPropertyDropdown
  );
  const countryDropdown = useSelector((state) => state.modal.countryDropdown);

  const addHandler = () => {
    dispatch(
      createFirm(
        selectedName,
        selectedYear,
        selectedCountry,
        selectedType,
        totalCount
      )
    );
    setSelectedName('');
    setSelectedYear('');
    setSelectedYear('');
    setSelectedCountry('');
    setSelectedType('');
  };

  useEffect(() => {
    dispatch(getTypeOfPropertyDropdown());
    dispatch(getCountryDropdown());
  }, []);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add firm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-3"
          placeholder="Name"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        />
        <Form.Control
          className="mb-3"
          placeholder="Year of create"
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          min={1900}
          max={2022}
        />
        <DropdownInput
          title={selectedType || 'Type of property'}
          items={typeOfPropertyDropdown}
          setSelected={setSelectedType}
        />
        <DropdownInput
          title={selectedCountry || 'Country'}
          items={countryDropdown}
          setSelected={setSelectedCountry}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={addHandler}
          disabled={
            !selectedName || !selectedYear || !selectedType || !selectedCountry
          }
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FirmModal;
