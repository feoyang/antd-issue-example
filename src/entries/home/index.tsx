import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Authorization } from '../../authorization/Authorization';
import { Overview } from './pages/overview';
import { HomeLayout } from './layout';
import { Device } from './pages/device';
import { Chat } from './pages/chat';
import { Mine } from './pages/mine/index';

export const Home = () => {

  return (
    <ErrorBoundary>
      <Authorization>
        <HomeLayout>
          <Routes>
            <Route path="overview/*" element={<Overview />} />
            <Route path="device/*" element={<Device />} />
            <Route path="chat/*" element={<Chat />} />
            <Route path="mine/*" element={<Mine />} />
            <Route path="*" element={<Navigate to="overview" />} />
          </Routes>
        </HomeLayout>
      </Authorization>
    </ErrorBoundary>
  );
};
