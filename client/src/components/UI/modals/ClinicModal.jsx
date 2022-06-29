import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTypeDropdown,
  getDistrictDropdown,
} from '../../../actions/dropdown';
import { createClinic } from '../../../actions/table';
import DropdownInput from '../dropdownInput/dropdownInput';
import InputMask from 'react-input-mask';

const ClinicModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.table.totalCount);

  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState('');
  const [selectedDoctors, setSelectedDoctors] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const typeDropdown = useSelector((state) => state.modal.typeDropdown);
  const districtDropdown = useSelector((state) => state.modal.districtDropdown);

  const addHandler = () => {
    dispatch(
      createClinic(
        selectedNumber,
        selectedPhone,
        selectedYear,
        selectedPlaces,
        selectedDoctors,
        selectedType,
        selectedDistrict,
        totalCount
      )
    );
    setSelectedNumber('');
    setSelectedPhone('');
    setSelectedYear('');
    setSelectedPlaces('');
    setSelectedDoctors('');
    setSelectedType('');
    setSelectedDistrict('');
  };

  useEffect(() => {
    dispatch(getTypeDropdown());
    dispatch(getDistrictDropdown());
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
        <Modal.Title>Add clinic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-3"
          placeholder="Number"
          type="number"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
        />
        <InputMask
          className="mb-3 form-control"
          placeholder="Phone"
          value={selectedPhone}
          onChange={(e) => setSelectedPhone(e.target.value)}
          min={1}
          max={100}
          mask="+99 999 99 99"
        />
        <Form.Control
          className="mb-3"
          placeholder="Year of create"
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          min={1930}
          max={2022}
        />
        <Form.Control
          className="mb-3"
          placeholder="Number of places"
          type="number"
          value={selectedPlaces}
          onChange={(e) => setSelectedPlaces(e.target.value)}
          min={50}
          max={500}
        />
        <Form.Control
          className="mb-3"
          placeholder="Number of doctors"
          type="number"
          value={selectedDoctors}
          onChange={(e) => setSelectedDoctors(e.target.value)}
          min={10}
          max={100}
        />
        <DropdownInput
          title={selectedType || 'Type'}
          items={typeDropdown}
          setSelected={setSelectedType}
        />
        <DropdownInput
          title={selectedDistrict || 'District'}
          items={districtDropdown}
          setSelected={setSelectedDistrict}
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
            !selectedNumber ||
            !selectedPhone ||
            !selectedYear ||
            !selectedPlaces ||
            !selectedDoctors ||
            !selectedType ||
            !selectedDistrict
          }
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClinicModal;
