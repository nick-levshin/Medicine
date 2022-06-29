import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFirmDropdown,
  getMedicineDropdown,
} from '../../../actions/dropdown';
import { createFirmMedicine, editFirmMedicine } from '../../../actions/table';
import DropdownInput from '../dropdownInput/dropdownInput';

const FirmMedicineModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const model = useSelector((state) => state.table.model);
  const totalCount = useSelector((state) => state.table.totalCount);
  const editId = useSelector((state) => state.modal.editId);
  const data = useSelector((state) => state.table.data);
  const limit = useSelector((state) => state.table.limit);
  const page = useSelector((state) => state.table.page);

  const [selectedFirm, setSelectedFirm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');

  const firmDropdown = useSelector((state) => state.modal.firmDropdown);
  const medicineDropdown = useSelector((state) => state.modal.medicineDropdown);

  const addHandler = () => {
    editId
      ? dispatch(
          editFirmMedicine(
            model,
            selectedFirm,
            selectedMedicine,
            editId,
            limit,
            page
          )
        )
      : dispatch(
          createFirmMedicine(selectedFirm, selectedMedicine, totalCount)
        );

    setSelectedFirm('');
    setSelectedMedicine('');
  };

  useEffect(() => {
    dispatch(getFirmDropdown());
    dispatch(getMedicineDropdown());
  }, []);

  useEffect(() => {
    if (editId && model === 'firmMedicine') {
      setSelectedFirm(data.find((item) => item.id === +editId).firm);
      setSelectedMedicine(data.find((item) => item.id === +editId).medicine);
    }
  }, [editId]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add firm - medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownInput
          title={selectedFirm || 'Firm'}
          items={firmDropdown}
          setSelected={setSelectedFirm}
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
          disabled={!selectedFirm || !selectedMedicine}
        >
          {editId ? 'Edit' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FirmMedicineModal;
