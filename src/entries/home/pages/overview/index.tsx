import { LeftWrapper, RightWrapper } from '../../layout/style';
import { DataPreview } from './DataPreview';
import { Report } from './Report';
import { Sider } from './sider';

export const Overview = () => {

  return (
    <>
      <LeftWrapper>
        <DataPreview />
        <Report />
      </LeftWrapper>
      <RightWrapper>
        <Sider />
      </RightWrapper>
    </>
  );
};
