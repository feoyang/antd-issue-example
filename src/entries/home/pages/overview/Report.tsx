import { Button, ConfigProvider, Flex } from 'antd';
import { BoxContainer } from '../../components/BoxContainer';
import irrigationReport from '../../assets/overview-irrigationReport.png';
import plantReport from '../../assets/overview-plantReport.png';
import soilReport from '../../assets/overview-soilReport.png';
import { ReportContainer } from './style';


export const Report = () => {
  const reportItem = [
    {
      id: 'irrigationReport',
      title: '灌溉建议',
      img: irrigationReport,
      link: '...',
      buttonColor: '#73CAF2',
      background1: 'rgba(101, 200, 207, 0.2)',
      background2: 'rgba(82, 196, 192, 0.02)',
    },
    {
      id: 'plantReport',
      title: '植保报告',
      img: plantReport,
      link: '...',
      className: 'plantReport',
      buttonColor: '#5DC587',
      buttonBackground: '',
      background1: 'rgba(93, 197, 135, 0.2)',
      background2: 'rgba(82, 196, 115, 0.02)',
    },
    {
      id: 'soilReport',
      title: '寻田报告',
      img: soilReport,
      link: '...',
      className: 'soilReport',
      buttonColor: '#87C55D',
      background1: 'rgba(153, 207, 81, 0.2)',
      background2: 'rgba(143, 196, 82, 0.02)',
    },
  ];

  return (
    <BoxContainer title="报告类型" className={ReportContainer}>
      <Flex className="reportItemsWrapper" gap="large">
        {
          reportItem.map(item => {
            return (
              <Flex
                className="reportItem"
                key={item.id}
                justify="space-between"
                align="center"
                style={{ background: `linear-gradient(98deg, ${item.background1} -4%, ${item.background2} 97%)` }}
              >
                <Flex vertical gap="small">
                  <div className="title">{item.title}</div>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: item.buttonColor,
                      },
                    }}
                  >
                    <Button type="primary" shape="round">查看详情</Button>
                  </ConfigProvider>
                </Flex>
                <img src={item.img} alt={item.title} className="img" />
              </Flex>
            );
          })
        }
      </Flex>
    </BoxContainer>
  );
};
