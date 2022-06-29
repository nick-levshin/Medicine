import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../actions/user';

const DirectoryModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [canCreate, setCanCreate] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const totalCount = useSelector((state) => state.table.totalCount);

  const addHandler = () => {
    dispatch(
      createUser(
        email,
        password,
        role,
        canCreate,
        canEdit,
        canDelete,
        totalCount
      )
    );
    setEmail('');
    setPassword('');
    setRole('');
    setCanCreate(false);
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3"
        />
        <Form.Control
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <Form.Control
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-3"
        />
        <Form.Check
          type="switch"
          label="Can Create"
          checked={canCreate}
          onChange={(e) =>
            e.target.checked ? setCanCreate(true) : setCanCreate(false)
          }
        />
        <Form.Check
          type="switch"
          label="Can Edit"
          checked={canEdit}
          onChange={(e) =>
            e.target.checked ? setCanEdit(true) : setCanEdit(false)
          }
        />
        <Form.Check
          type="switch"
          label="Can Delete"
          checked={canDelete}
          onChange={(e) =>
            e.target.checked ? setCanDelete(true) : setCanDelete(false)
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button
          disabled={!email && !password && !role}
          variant="success"
          onClick={addHandler}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DirectoryModal;
