import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { AiOutlineEdit } from 'react-icons/ai';
import { addChosen, removeChosen } from '../../../reducers/tableReducer';

const MyTable = ({ data, modalHandler }) => {
  const dispatch = useDispatch();
  const permission = useSelector(
    (state) => state.user.currentUser.role === 'ADMIN'
  );
  const chosen = useSelector((state) => state.table.chosen);
  const component = useSelector((state) => state.app.component);
  const model = useSelector((state) => state.table.model);
  const canEdit = useSelector((state) => state.user.currentUser.canEdit);

  const checkboxHandler = (e) => {
    if (chosen.includes(e.target.id)) {
      dispatch(removeChosen(e.target.id));
    } else {
      dispatch(addChosen(e.target.id));
    }
  };

  return (
    <Table style={{ width: '100%' }} striped bordered hover>
      <thead>
        <tr>
          {Object.keys(data[0]).map((column) => (
            <td key={column}>{column}</td>
          ))}
          {permission && component !== 'request' && (
            <>
              {model !== 'user' && canEdit && <td>Edit</td>}
              <td>Choose</td>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.id}>
            {Object.values(entry).map((field) => (
              <td key={entry.id + '-' + field}>{`${field}`}</td>
            ))}
            {permission && component !== 'request' && (
              <>
                {model !== 'user' && canEdit && (
                  <td>
                    <Button
                      variant="primary"
                      className="d-flex align-items-center justify-content-center m-auto"
                      id={entry.id + '-edit'}
                      onClick={(e) => modalHandler(e)}
                    >
                      <AiOutlineEdit />
                    </Button>
                  </td>
                )}
                <td>
                  <Form.Check
                    className="d-flex align-items-center justify-content-center m-auto"
                    id={entry.id}
                    checked={chosen.includes(`${entry.id}`)}
                    onChange={checkboxHandler}
                  />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MyTable;
