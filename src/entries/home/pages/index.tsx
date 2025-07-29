import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { Authorization } from '../../../authorization/Authorization';
import { HomeLayout } from '../layout';
import { ExternalApiProvider } from '../../../authorization/ExternalApiProvider';
import { Overview } from './overview';
import { Device } from './device';
import { Chat } from './chat';
import { Mine } from './mine/index';

export const Home = () => {

  return (
    <ErrorBoundary>
      <Authorization>
        <ExternalApiProvider>
          <HomeLayout>
            <Routes>
              <Route path="overview/*" element={<Overview />} />
              <Route path="device/*" element={<Device />} />
              <Route path="chat/*" element={<Chat />} />
              <Route path="mine/*" element={<Mine />} />
              <Route path="*" element={<Navigate to="overview" />} />
            </Routes>
          </HomeLayout>
        </ExternalApiProvider>
      </Authorization>
    </ErrorBoundary>
  );
};
