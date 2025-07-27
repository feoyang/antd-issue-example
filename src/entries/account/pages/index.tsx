import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { Layout } from '../layout';
import { Login } from './login';
import { Register } from './register';
import { Profile } from './profile';

export const Account = () => {

  return (
    <ErrorBoundary>
      <Layout>
        <Routes>
          <Route path="login/*" element={<Login />} />
          <Route path="register/*" element={<Register />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};
