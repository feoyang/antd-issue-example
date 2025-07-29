import { LeftWrapper, RightWrapper } from '../../layout/style';
import { DataPreview } from './DataPreview';
import { IrrigationCalendar } from './IrrigationCalendar';
import { ReportEntry } from './ReportEntry';
import { Sider } from './sider';

export const Overview = () => {

  return (
    <>
      <LeftWrapper>
        <DataPreview />
        <ReportEntry />
        <IrrigationCalendar />
      </LeftWrapper>
      <RightWrapper>
        <Sider />
      </RightWrapper>
    </>
  );
};
