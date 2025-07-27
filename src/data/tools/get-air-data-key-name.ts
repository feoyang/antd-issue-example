import { AirDataKeyEnum } from '../enums';

export const getAirDataKeyName = (key: AirDataKeyEnum) => {
  const map = {
    [AirDataKeyEnum.CO2]: 'CO2',
    [AirDataKeyEnum.TEMPERATURE]: '温度',
    [AirDataKeyEnum.LIGHT]: '光照',
    [AirDataKeyEnum.HUMIDITY]: '湿度',
  };
  return map[key] || '-';
};
