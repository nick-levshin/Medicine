import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getClinicDropdown,
  getMedicineDropdown,
} from '../../../actions/dropdown';
import { createOrder } from '../../../actions/table';
import DropdownInput from '../dropdownInput/dropdownInput';

const OrderModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.table.totalCount);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');

  const clinicDropdown = useSelector((state) => state.modal.clinicDropdown);
  const medicineDropdown = useSelector((state) => state.modal.medicineDropdown);

  const addHandler = () => {
    dispatch(
      createOrder(
        selectedDate,
        selectedNumber,
        selectedPrice,
        selectedClinic,
        selectedMedicine,
        totalCount
      )
    );
    setSelectedDate('');
    setSelectedNumber('');
    setSelectedPrice('');
    setSelectedClinic('');
    setSelectedMedicine('');
  };

  useEffect(() => {
    dispatch(getClinicDropdown());
    dispatch(getMedicineDropdown());
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
        <Modal.Title>Add order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-3 form-control"
          placeholder="Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min="2013-01-01"
          max="2023-01-01"
        />
        <Form.Control
          className="mb-3"
          placeholder="Number"
          type="number"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          min={1}
          max={1000}
        />
        <Form.Control
          className="mb-3"
          placeholder="Price"
          type="number"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          min={5}
          max={2000}
        />
        <DropdownInput
          title={selectedClinic || 'Clinic'}
          items={clinicDropdown}
          setSelected={setSelectedClinic}
        />
        <DropdownInput
          title={selectedMedicine || 'Medicine'}
          items={medicineDropdown}
          setSelected={setSelectedMedicine}
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
            !selectedDate ||
            !selectedNumber ||
            !selectedPrice ||
            !selectedClinic ||
            !selectedMedicine
          }
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
