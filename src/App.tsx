import dayjs from 'dayjs';
import { XProvider } from '@ant-design/x';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { Home } from './entries/home';
import { Bootstrap } from './boostrap';
import { Account } from './entries/account/pages';

dayjs.locale('zh-cn');

// 现在适配ipad air，1180/10 = 118
const px2rem = px2remTransformer({
  rootValue: 118,
});

export const App = () => {

  return (
    <XProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#57b086',
        },
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <StyleProvider
        transformers={[px2rem]}
      >
        <BrowserRouter>
          <Bootstrap>
            <Routes>
              <Route path="/account/*" element={<Account />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="*" element={<Navigate to="/account" />} />
            </Routes>
          </Bootstrap>
        </BrowserRouter>
      </StyleProvider>
    </XProvider>
  );
};
