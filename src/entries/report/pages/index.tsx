import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { Authorization } from '../../../authorization/Authorization';
import { ReportLayout } from '../layout';
import { FieldReport } from './field-report';
import { IrrigationReport } from './irrigation-report';

export const Report = () => {

  return (
    <ErrorBoundary>
      <Authorization>
        <ReportLayout>
          <Routes>
            <Route path="field/*" element={<FieldReport />} />
            <Route path="irrigation/*" element={<IrrigationReport />} />
            <Route path="*" element={<Navigate to="field" />} />
          </Routes>
        </ReportLayout>
      </Authorization>
    </ErrorBoundary>
  );
};
