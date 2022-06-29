import React from 'react';
import { Navbar, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../../reducers/userReducer';
import { useSelector } from 'react-redux';
import { setModel } from '../../../reducers/tableReducer';
import { setComponent, setLoading } from '../../../reducers/appReducer';
import {
  difficultRequest1,
  difficultRequest2,
  difficultRequest3,
  difficultRequest4,
  request1,
  request2,
  request3,
  request4,
  request5,
  request6,
  request7,
} from '../../../actions/request';

const NavBar = () => {
  const dispatch = useDispatch();
  const model = useSelector((state) => state.table.model);
  const component = useSelector((state) => state.app.component);
  const isAdmin = useSelector(
    (state) => state.user.currentUser.role === 'ADMIN'
  );

  const changeModel = (modelName, componentName) => {
    dispatch(setModel(modelName));
    dispatch(setComponent(componentName));
  };

  const requestHandler = (number) => {
    dispatch(setComponent('request'));
    dispatch(setLoading(true));
    switch (number) {
      case '1':
        const firm = prompt('Enter firm name:', '');
        if (firm) {
          dispatch(request1(firm));
        }
        break;

      case '2':
        const type = prompt('Enter type:', '');
        const district = prompt('Enter district:', '');
        const number = prompt('Enter clinic number:', '');
        if (type && district && number) {
          dispatch(request2(type, district, number));
        }
        break;

      case '3':
        const year = prompt('Enter type:', '');
        if (year) {
          dispatch(request3(year));
        }
        break;

      case '4':
        const date = prompt('Enter date:', '');
        if (date) {
          dispatch(request4(date));
        }
        break;

      case '5':
        dispatch(request5());
        break;

      case '6':
        dispatch(request6());
        break;

      case '7':
        const districtName = prompt('Enter district:', '');
        if (districtName) {
          dispatch(request7(districtName));
        }
        break;

      default:
        break;
    }
  };

  const difficultRequestHandler = (number) => {
    dispatch(setComponent('request'));
    dispatch(setLoading(true));
    switch (number) {
      case '1':
        const type = prompt('Enter type:', '');
        const district = prompt('Enter district:', '');
        const number = prompt('Enter clinic number:', '');
        if (type && district && number) {
          dispatch(difficultRequest1(type, district, number));
        }
        break;

      case '2':
        const country = prompt('Enter country:', '');
        if (country) {
          dispatch(difficultRequest2(country));
        }
        break;

      case '3':
        dispatch(difficultRequest3());
        break;
        break;

      case '4':
        dispatch(difficultRequest4());
        break;

      default:
        break;
    }
  };

  return (
    <Navbar bg="primary" variant="dark">
      <div
        className="w-100 d-flex justify-content-between align-items-center"
        style={{ padding: '0 3rem' }}
      >
        <div className="d-flex">
          <NavDropdown
            title={
              component === 'table'
                ? model.charAt(0).toUpperCase() + model.slice(1)
                : 'Table'
            }
            style={{ color: '#fff', marginRight: '2rem' }}
          >
            <NavDropdown.Item onClick={() => changeModel('clinic', 'table')}>
              Clinic
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('firm', 'table')}>
              Firm
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('medicine', 'table')}>
              Medicine
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('order', 'table')}>
              Order
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('json', 'table')}>
              JSON
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              component === 'directory'
                ? model.charAt(0).toUpperCase() + model.slice(1)
                : 'Directory'
            }
            style={{ color: '#fff', marginRight: '2rem' }}
          >
            <NavDropdown.Item onClick={() => changeModel('type', 'directory')}>
              Type
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => changeModel('district', 'directory')}
            >
              District
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => changeModel('department', 'directory')}
            >
              Department
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => changeModel('country', 'directory')}
            >
              Country
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => changeModel('typeOfProperty', 'directory')}
            >
              Type Of Property
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('group', 'directory')}>
              Group
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => changeModel('form', 'directory')}>
              Form
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              component === 'intersection'
                ? model.charAt(0).toUpperCase() + model.slice(1)
                : 'Intersection'
            }
            style={{ color: '#fff', marginRight: '2rem' }}
          >
            <NavDropdown.Item
              onClick={() => changeModel('clinicDepartment', 'intersection')}
            >
              Clinic - Department
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => changeModel('firmMedicine', 'intersection')}
            >
              Firm - Medicine
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Simple requests"
            style={{ color: '#fff', marginRight: '2rem' }}
          >
            <NavDropdown.Item onClick={() => requestHandler('1')}>
              Medicines of the certain firm
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('2')}>
              Orders of the certain clinic
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('3')}>
              Firms founded after a certain year
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('4')}>
              Orders placed on a cetrain date
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('5')}>
              All forms in the medicines
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('6')}>
              All frims in the countries
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => requestHandler('7')}>
              All departments of clinics in a certain district
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Difficult requests"
            style={{ color: '#fff', marginRight: '2rem' }}
          >
            <NavDropdown.Item onClick={() => difficultRequestHandler('1')}>
              The sum of orders of a certain clinic
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => difficultRequestHandler('2')}>
              The oldest firm in a certain country
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => difficultRequestHandler('3')}>
              Number of orders in clinics
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => difficultRequestHandler('4')}>
              Orders with a price above average
            </NavDropdown.Item>
          </NavDropdown>
        </div>
        <div>
          {isAdmin && (
            <Button
              variant="success"
              style={{ marginRight: '1rem' }}
              onClick={() => changeModel('user', 'table')}
            >
              Admin
            </Button>
          )}
          <Button variant="danger" onClick={() => dispatch(logout())}>
            Log Out
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
