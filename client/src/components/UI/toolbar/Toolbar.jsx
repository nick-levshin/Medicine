import React, { useState } from 'react';
import { Navbar, InputGroup, Button, Form, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setLimit } from '../../../reducers/tableReducer';
import { setLoading } from '../../../reducers/appReducer';
import MyPagination from '../pagination/MyPagination';
import {
  AiOutlinePlusCircle,
  AiOutlineClear,
  AiOutlineDelete,
} from 'react-icons/ai';
import { FaReact } from 'react-icons/fa';
import { SiMicrosoftexcel } from 'react-icons/si';
import { clearAll, generate, getTable } from '../../../actions/table';
import { deleteEntries } from '../../../actions/delete';
import { utils, writeFile } from 'xlsx';

const ToolBar = ({ modalHandler }) => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.table.totalCount);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [limitInput, setLimitInput] = useState('10');
  const model = useSelector((state) => state.table.model);
  const limit = useSelector((state) => state.table.limit);
  const page = useSelector((state) => state.table.page);
  const chosen = useSelector((state) => state.table.chosen);
  const component = useSelector((state) => state.app.component);
  const data = useSelector((state) => state.table.data);
  const canCreate = useSelector((state) => state.user.currentUser.canCreate);
  const canDelete = useSelector((state) => state.user.currentUser.canDelete);

  const limitHandler = (e) => {
    setLimitInput(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (e.target.value) {
      setSearchTimeout(
        setTimeout(
          (value) => {
            let limitValue;
            if (value < 1) {
              limitValue = 1;
              setLimitInput('1');
            } else if (value > 100) {
              limitValue = 100;
              setLimitInput('100');
            } else {
              limitValue = value;
            }

            if (+limitValue > +totalCount) {
              limitValue = totalCount;
              setLimitInput(`${limitValue}`);
            }

            dispatch(setLimit(limitValue));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(setLimit('10'));
    }
  };

  const clearHandler = () => {
    const result = window.confirm(
      'Are you sure?\nAll the tables will be deleted.'
    );

    if (result) {
      dispatch(clearAll());
    }
  };

  const generateHandler = async () => {
    dispatch(setLoading(true));
    await dispatch(generate());
    await dispatch(getTable(model, limit, page));
    alert('Database was generated');
  };

  const deleteHandler = async () => {
    const result = window.confirm(
      'Are you sure?\nThese entries will be deleted.'
    );

    if (result) {
      dispatch(deleteEntries(model, chosen, totalCount));
    }
  };

  const exportHandler = async () => {
    const exportData = data.filter((item) => chosen.includes(`${item.id}`));
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(exportData);

    utils.book_append_sheet(wb, ws, model + 'Sheet');
    writeFile(wb, model + 'Excel.xlsx');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" style={{ minHeight: 67 }}>
        <div
          className="w-100 d-flex justify-content-between align-items-center"
          style={{ padding: '0 3rem' }}
        >
          {component !== 'request' ? (
            <>
              <Col
                md={4}
                className="d-flex align-items-center justify-content-center"
              >
                <div style={{ color: '#fff', marginRight: 20 }}>
                  Total count: {totalCount}
                </div>
                <InputGroup style={{ width: 170 }}>
                  <InputGroup.Text>Limit</InputGroup.Text>
                  <Form.Control
                    value={limitInput}
                    onChange={limitHandler}
                    min={1}
                    max={100}
                    type="number"
                  />
                </InputGroup>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                md={4}
                style={{ height: 47 }}
              >
                <MyPagination />
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                md={4}
              >
                <>
                  {chosen.length ? (
                    <>
                      {canDelete && (
                        <Button
                          variant="danger"
                          className="d-flex align-items-center justify-content-center"
                          style={{ marginRight: 20 }}
                          onClick={deleteHandler}
                        >
                          <AiOutlineDelete />
                        </Button>
                      )}
                      <Button
                        variant="light"
                        className="d-flex align-items-center justify-content-center"
                        onClick={exportHandler}
                      >
                        <SiMicrosoftexcel />
                      </Button>
                    </>
                  ) : (
                    <>
                      {model !== 'json' && (
                        <>
                          {canCreate && (
                            <>
                              <Button
                                variant="success"
                                className="d-flex align-items-center justify-content-center"
                                style={{ marginRight: 20 }}
                                onClick={modalHandler}
                              >
                                <AiOutlinePlusCircle />
                              </Button>
                              <Button
                                variant="info"
                                className="d-flex align-items-center justify-content-center"
                                style={{ marginRight: 20 }}
                                onClick={generateHandler}
                              >
                                <FaReact />
                              </Button>
                            </>
                          )}
                          {canDelete && (
                            <Button
                              variant="secondary"
                              className="d-flex align-items-center justify-content-center"
                              onClick={clearHandler}
                            >
                              <AiOutlineClear />
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}{' '}
                </>
              </Col>
            </>
          ) : (
            <div className="m-auto" style={{ color: '#fff' }}>
              Total count: {totalCount}
            </div>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default ToolBar;
