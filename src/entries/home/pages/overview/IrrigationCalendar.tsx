import React, { useState } from 'react';
import { Table, message } from 'antd';
import { CheckOutlined, QuestionOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { BoxContainer } from '../../components/BoxContainer';
import { overviewStyle } from './style';

// 数据类型定义
interface WaterData {
  date: string;
  evaporation: number;
  irrigation: number;
  rainfall: number;
  soilWater: number;
  irrigationStatus: 'completed' | 'pending' | 'none';
}

// 表格数据类型定义
interface TableDataRow {
  key: string;
  date: string;
  [key: string]: any;
}

// 颜色条组件
const WaterBar: React.FC<{
  value: number;
  maxValue: number;
  color: string;
  height?: number;
  onClick?: () => void;
}> = ({ value, maxValue, color, height = 40, onClick }) => {
  const percentage = Math.min(value / maxValue * 100, 100);

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: '#f0f0f0',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${percentage}%`,
          backgroundColor: color,
          transition: 'all 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          fontWeight: 'bold',
          color: percentage > 50 ? '#fff' : '#000',
          zIndex: 1,
        }}
      >
        {value}mm
      </div>
    </div>
  );
};

// 灌溉状态组件
const IrrigationStatus: React.FC<{
  status: 'completed' | 'pending' | 'none';
  value: number;
  maxValue: number;
  onClick?: () => void;
}> = ({ status, value, maxValue, onClick }) => {
  const percentage = Math.min(value / maxValue * 100, 100);

  const getStatusIcon = () => {
    switch (status) {
    case 'completed':
      return <CheckOutlined style={{ color: '#fff', fontSize: '16px' }} />;
    case 'pending':
      return <QuestionOutlined style={{ color: '#fff', fontSize: '16px' }} />;
    default:
      return null;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
    case 'completed':
      return '#52c41a';
    case 'pending':
      return '#faad14';
    default:
      return '#91d5ff';
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: `${percentage}%`,
          backgroundColor: getBackgroundColor(),
          transition: 'all 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {getStatusIcon()}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: status === 'none' ? '#000' : '#fff',
          }}
        >
          {value}mm
        </span>
      </div>
    </div>
  );
};

export const IrrigationCalendar: React.FC = () => {
  const { styles } = overviewStyle();

  // 获取星期几的辅助函数
  const getWeekDay = (dayIndex: number): string => {
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    return weekDays[dayIndex];
  };

  // 模拟数据
  const generateMockData = (): WaterData[] => {
    const data: WaterData[] = [];
    const startDate = dayjs('2024-06-31');

    for (let i = 0; i < 8; i++) {
      const date = startDate.add(i, 'day');
      data.push({
        date: date.format('MM/DD'),
        evaporation: Math.random() * 4 + 1,
        irrigation: Math.random() * 6 + 2,
        rainfall: Math.random() > 0.6 ? Math.random() * 8 + 2 : 0,
        soilWater: Math.random() * 20 + 60,
        irrigationStatus: ['completed', 'pending', 'none'][Math.floor(Math.random() * 3)] as any,
      });
    }

    return data;
  };

  const [data] = useState<WaterData[]>(generateMockData());

  // 处理单元格点击
  const handleCellClick = (date: string, type: string, value: number) => {
    message.info(`点击了 ${date} 的 ${type}：${value}mm`);
  };

  // 表格列配置
  const columns: ColumnsType<TableDataRow> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      align: 'center',
      render: (date: string) => (
        <div style={{ fontWeight: 'bold' }}>
          {date}
        </div>
      ),
    },
    ...data.map((item) => ({
      title: (
        <div style={{ textAlign: 'center' }}>
          <div>{getWeekDay(dayjs().day())}</div>
          <div>{item.date}</div>
        </div>
      ),
      dataIndex: item.date,
      key: item.date,
      width: 120,
      align: 'center' as const,
    })),
  ];

  // 表格数据
  const tableData: TableDataRow[] = [
    {
      key: 'evaporation',
      date: '蒸发蒸腾量',
      ...Object.fromEntries(
        data.map((item) => [
          item.date,
          <WaterBar
            key={`evaporation-${item.date}`}
            value={Number(item.evaporation.toFixed(1))}
            maxValue={5}
            color="#87CEEB"
            onClick={() => handleCellClick(item.date, '蒸发蒸腾量', item.evaporation)}
          />,
        ]),
      ),
    },
    {
      key: 'irrigation',
      date: '当日灌溉量',
      ...Object.fromEntries(
        data.map((item) => [
          item.date,
          <IrrigationStatus
            key={`irrigation-${item.date}`}
            status={item.irrigationStatus}
            value={Number(item.irrigation.toFixed(1))}
            maxValue={8}
            onClick={() => handleCellClick(item.date, '当日灌溉量', item.irrigation)}
          />,
        ]),
      ),
    },
    {
      key: 'rainfall',
      date: '雨量',
      ...Object.fromEntries(
        data.map((item) => [
          item.date,
          item.rainfall > 0 ? (
            <WaterBar
              key={`rainfall-${item.date}`}
              value={Number(item.rainfall.toFixed(1))}
              maxValue={10}
              color="#87CEEB"
              onClick={() => handleCellClick(item.date, '雨量', item.rainfall)}
            />
          ) : (
            <div
              key={`rainfall-${item.date}`}
              style={{
                height: '40px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => handleCellClick(item.date, '雨量', 0)}
            />
          ),
        ]),
      ),
    },
    {
      key: 'soilWater',
      date: '田间持水量',
      ...Object.fromEntries(
        data.map((item) => [
          item.date,
          <WaterBar
            key={`soilWater-${item.date}`}
            value={Number(item.soilWater.toFixed(1))}
            maxValue={100}
            color="#4A90E2"
            height={50}
            onClick={() => handleCellClick(item.date, '田间持水量', item.soilWater)}
          />,
        ]),
      ),
    },
  ];

  return (
    <BoxContainer title="灌溉日历" className={styles.irrigationCalendarContainer}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        size="middle"
        style={{
          height: '100%',
        }}
        components={{
          body: {
            cell: (props: any) => (
              <td
                {...props}
                style={{
                  ...props.style,
                  padding: '0px',
                  verticalAlign: 'middle',
                }}
              />
            ),
          },
        }}
      />
    </BoxContainer>
  );
};
