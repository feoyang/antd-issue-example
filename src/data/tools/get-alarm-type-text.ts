export const getAlarmTypeText = (type: '1' | '2') => {
  const map = {
    ['1']: '系统预警',
    ['2']: '设备异常',
  };
  return map[type] || '-';
};
