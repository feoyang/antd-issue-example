import { AirDataKeyEnum } from '../enums';

export const getAirDataUnit = (key: AirDataKeyEnum) => {
  const map = {
    [AirDataKeyEnum.HUMIDITY]: '%',
    [AirDataKeyEnum.TEMPERATURE]: '°C',
    [AirDataKeyEnum.LIGHT]: 'klux',
    [AirDataKeyEnum.CO2]: 'ppm',
  };
  return map[key] || '-';
};
