import { Button, ConfigProvider, Flex, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { BoxContainer } from '../../../../components/BoxContainer';
import irrigationReport from '../../assets/overview-irrigationReport.png';
import plantReport from '../../assets/overview-plantReport.png';
import soilReport from '../../assets/overview-soilReport.png';
import { overviewStyle } from './style';

export const reportItem = [
  {
    id: 'irrigation',
    title: '灌溉建议',
    img: irrigationReport,
    link: '...',
    buttonColor: '#73CAF2',
    background1: 'rgba(101, 200, 207, 0.2)',
    background2: 'rgba(82, 196, 192, 0.02)',
  },
  {
    id: 'plant',
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
    id: 'field',
    title: '巡田报告',
    img: soilReport,
    link: '...',
    className: 'soilReport',
    buttonColor: '#87C55D',
    background1: 'rgba(153, 207, 81, 0.2)',
    background2: 'rgba(143, 196, 82, 0.02)',
  },
];

export const ReportEntry = () => {
  const { styles } = overviewStyle();
  const navigate = useNavigate();

  const handleButtonClick = (target: string) => {
    navigate(`/report/${target}`);
  };

  return (
    <BoxContainer title="报告类型" className={styles.reportContainer}>
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
                <Flex vertical justify="space-between" style={{ height: '100%' }}>
                  <Typography.Title level={4} style={{ margin: 0 }}>{item.title}</Typography.Title>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: item.buttonColor,
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<SearchOutlined />}
                      onClick={() => handleButtonClick(item.id)}
                    >
                      查看
                    </Button>
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
