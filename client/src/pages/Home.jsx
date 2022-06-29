import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/UI/navbar/Navbar';
import ToolBar from '../components/UI/toolbar/Toolbar';
import MyTable from '../components/UI/table/MyTable';
import { getTable } from '../actions/table';
import { useDispatch } from 'react-redux';
import MyLoader from '../components/UI/loader/MyLoader';
import {
  setLoading,
  setDirectoryModal,
  setClinicDepartmentModal,
  setFirmMedicineModal,
  setClinicModal,
  setFirmModal,
  setMedicineModal,
  setOrderModal,
  setUserModal,
} from '../reducers/appReducer';
import { clearChosen, setPage } from '../reducers/tableReducer';
import DirectoryModal from '../components/UI/modals/DirectoryModal';
import ClinicDepartmentModal from '../components/UI/modals/ClinicDepartmentModal';
import FirmMedicineModal from '../components/UI/modals/FirmMedicineModal';
import ClinicModal from '../components/UI/modals/ClinicModal';
import FirmModal from '../components/UI/modals/FirmModal';
import MedicineModal from '../components/UI/modals/MedicineModal';
import OrderModal from '../components/UI/modals/OrderModal';
import UserModal from '../components/UI/modals/UserModal';
import { setEditId, removeEditId } from '../reducers/modalReducer';

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.isLoading);
  const component = useSelector((state) => state.app.component);
  const directoryModal = useSelector((state) => state.app.directoryModal);
  const clinicDepartmentModal = useSelector(
    (state) => state.app.clinicDepartmentModal
  );
  const firmMedicineModal = useSelector((state) => state.app.firmMedicineModal);
  const clinicModal = useSelector((state) => state.app.clinicModal);
  const firmModal = useSelector((state) => state.app.firmModal);
  const medicineModal = useSelector((state) => state.app.medicineModal);
  const orderModal = useSelector((state) => state.app.orderModal);
  const userModal = useSelector((state) => state.app.userModal);
  const model = useSelector((state) => state.table.model);
  const limit = useSelector((state) => state.table.limit);
  const page = useSelector((state) => state.table.page);

  const data = useSelector((state) => state.table.data);
  const totalCount = useSelector((state) => state.table.totalCount);

  useEffect(() => {
    if (component !== 'request') {
      dispatch(setLoading(true));
      dispatch(getTable(model, limit, page));
    }
  }, [page, totalCount]);

  useEffect(() => {
    if (page === 1) {
      dispatch(setLoading(true));
      dispatch(getTable(model, limit, page));
      dispatch(clearChosen());
    } else {
      dispatch(setPage(1));
    }
  }, [limit, model]);

  const modalHandler = (e) => {
    if (component === 'directory') {
      dispatch(setDirectoryModal(true));
    } else if (model === 'clinicDepartment') {
      dispatch(setClinicDepartmentModal(true));
    } else if (model === 'firmMedicine') {
      dispatch(setFirmMedicineModal(true));
    } else if (model === 'clinic') {
      dispatch(setClinicModal(true));
    } else if (model === 'firm') {
      dispatch(setFirmModal(true));
    } else if (model === 'medicine') {
      dispatch(setMedicineModal(true));
    } else if (model === 'order') {
      dispatch(setOrderModal(true));
    } else if (model === 'user') {
      dispatch(setUserModal(true));
    }

    if (e) {
      const entryId = e.target?.id || e.target.closest('button').id;
      dispatch(setEditId(entryId.split('-')[0]));
    }
  };

  return (
    <>
      <NavBar />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 'calc(100vh - 67px - 67px)' }}
        >
          <MyLoader />
        </div>
      ) : (
        <>
          {totalCount ? (
            <div
              style={{
                maxWidth: '100vw',
                minHeight: 'calc(100vh - 67px - 67px)',
                maxHeight: 'calc(100vh - 67px - 67px)',
                overflow: 'auto',
              }}
            >
              <MyTable data={data} modalHandler={modalHandler} />
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: 'calc(100vh - 67px - 67px)',
                color: '#4f4d4d',
              }}
            >
              <h1>Table is empty</h1>
            </div>
          )}
        </>
      )}
      <ToolBar modalHandler={modalHandler} />
      <DirectoryModal
        show={directoryModal}
        onHide={() => {
          dispatch(setDirectoryModal(false));
          dispatch(removeEditId());
        }}
        model={model}
      />
      <ClinicDepartmentModal
        show={clinicDepartmentModal}
        onHide={() => {
          dispatch(setClinicDepartmentModal(false));
          dispatch(removeEditId());
        }}
      />
      <FirmMedicineModal
        show={firmMedicineModal}
        onHide={() => {
          dispatch(setFirmMedicineModal(false));
          dispatch(removeEditId());
        }}
      />
      <ClinicModal
        show={clinicModal}
        onHide={() => {
          dispatch(setClinicModal(false));
          dispatch(removeEditId());
        }}
      />
      <FirmModal
        show={firmModal}
        onHide={() => {
          dispatch(setFirmModal(false));
          dispatch(removeEditId());
        }}
      />
      <MedicineModal
        show={medicineModal}
        onHide={() => {
          dispatch(setMedicineModal(false));
          dispatch(removeEditId());
        }}
      />
      <OrderModal
        show={orderModal}
        onHide={() => {
          dispatch(setOrderModal(false));
          dispatch(removeEditId());
        }}
      />
      <UserModal
        show={userModal}
        onHide={() => dispatch(setUserModal(false))}
      />
    </>
  );
};

export default Home;
