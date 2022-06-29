import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createDirectory, editDirectory } from '../../../actions/table';

const DirectoryModal = ({ show, onHide, model }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const component = useSelector((state) => state.app.component);
  const totalCount = useSelector((state) => state.table.totalCount);
  const editId = useSelector((state) => state.modal.editId);
  const data = useSelector((state) => state.table.data);
  const limit = useSelector((state) => state.table.limit);
  const page = useSelector((state) => state.table.page);

  const addHandler = () => {
    editId
      ? dispatch(editDirectory(model, name, editId, limit, page))
      : dispatch(createDirectory(model, name, totalCount));
    setName('');
  };

  useEffect(() => {
    if (editId && component === 'directory') {
      setName(data.find((item) => item.id === +editId).name);
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
        <Modal.Title>Add {model}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button disabled={!name} variant="success" onClick={addHandler}>
          {editId ? 'Edit' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DirectoryModal;
