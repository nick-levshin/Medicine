import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { check } from '../actions/user';
import MyLoader from './UI/loader/MyLoader';
import AppRouter from './AppRouter';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(check());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <MyLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
