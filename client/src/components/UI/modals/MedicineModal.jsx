import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getFormDropdown, getGroupDropdown } from '../../../actions/dropdown';
import { createMedicine } from '../../../actions/table';
import DropdownInput from '../dropdownInput/dropdownInput';

const MedicineModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.table.totalCount);

  const [selectedName, setSelectedName] = useState('');
  const [selectedForm, setSelectedForm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  const formDropdown = useSelector((state) => state.modal.formDropdown);
  const groupDropdown = useSelector((state) => state.modal.groupDropdown);

  const addHandler = () => {
    dispatch(
      createMedicine(selectedName, selectedForm, selectedGroup, totalCount)
    );
    setSelectedForm('');
    setSelectedGroup('');
  };

  useEffect(() => {
    dispatch(getFormDropdown());
    dispatch(getGroupDropdown());
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
        <Modal.Title>Add medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-3"
          placeholder="Name"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        />
        <DropdownInput
          title={selectedForm || 'Form'}
          items={formDropdown}
          setSelected={setSelectedForm}
        />
        <DropdownInput
          title={selectedGroup || 'Group'}
          items={groupDropdown}
          setSelected={setSelectedGroup}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={addHandler}
          disabled={!selectedName || !selectedForm || !selectedGroup}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MedicineModal;
