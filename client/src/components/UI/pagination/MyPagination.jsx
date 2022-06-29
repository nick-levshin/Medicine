import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../../reducers/tableReducer';

const MyPagination = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.table.page);
  const limit = useSelector((state) => state.table.limit);
  const totalCount = useSelector((state) => state.table.totalCount);

  return (
    <Pagination style={{ marginTop: 19 }}>
      <Pagination.First
        disabled={page === 1}
        onClick={() => dispatch(setPage(1))}
      />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
      />
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next
        disabled={page === Math.ceil(totalCount / limit)}
        onClick={() => dispatch(setPage(page + 1))}
      />
      <Pagination.Last
        disabled={page === Math.ceil(totalCount / limit)}
        onClick={() => dispatch(setPage(Math.ceil(totalCount / limit)))}
      />
    </Pagination>
  );
};

export default MyPagination;
