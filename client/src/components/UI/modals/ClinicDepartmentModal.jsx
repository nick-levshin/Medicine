import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getClinicDropdown,
  getDepartmentDropdown,
} from '../../../actions/dropdown';
import { createClinicDepartment, editClinicDepartment } from '../../../actions/table';
import './ClinicDepartment.sass';
import DropdownInput from '../dropdownInput/dropdownInput';

const ClinicDepartmentModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const model = useSelector((state) => state.table.model);
  const totalCount = useSelector((state) => state.table.totalCount);
  const editId = useSelector((state) => state.modal.editId);
  const data = useSelector((state) => state.table.data);
  const limit = useSelector((state) => state.table.limit);
  const page = useSelector((state) => state.table.page);

  const [selectedClinic, setSelectedClinic] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const clinicDropdown = useSelector((state) => state.modal.clinicDropdown);
  const departmentDropdown = useSelector(
    (state) => state.modal.departmentDropdown
  );

  const addHandler = () => {
    editId ? dispatch(
          editClinicDepartment(
            model,
            selectedClinic,
            selectedDepartment,
            editId,
            limit,
            page
          )
        ) :
    dispatch(
      createClinicDepartment(selectedClinic, selectedDepartment, totalCount)
    );
    setSelectedClinic('');
    setSelectedDepartment('');
  };

  useEffect(() => {
    dispatch(getClinicDropdown());
    dispatch(getDepartmentDropdown());
  }, []);

  useEffect(() => {
    if (editId && model === 'clinicDepartment') {
      setSelectedClinic(data.find((item) => item.id === +editId).clinic);
      setSelectedDepartment(data.find((item) => item.id === +editId).department);
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
        <Modal.Title>Add clinic - department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DropdownInput
          title={selectedClinic || 'Clinic'}
          items={clinicDropdown}
          setSelected={setSelectedClinic}
        />
        <DropdownInput
          title={selectedDepartment || 'Department'}
          items={departmentDropdown}
          setSelected={setSelectedDepartment}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={addHandler}
          disabled={!selectedClinic || !selectedDepartment}
        >
          {editId ? 'Edit' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClinicDepartmentModal;
