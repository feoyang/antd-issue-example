import { SoilDataEnum } from '../enums';

export const getSoilDataUnit = (key: SoilDataEnum) => {
  const map = {
    [SoilDataEnum.SOIL_MOISTURE]: '%',
    [SoilDataEnum.SOIL_TEMPERATURE]: '°C',
    [SoilDataEnum.CONDUCTIVITY]: 'μs/cm',
    [SoilDataEnum.PH]: 'PH值',
    [SoilDataEnum.TIME]: '时间',
  };
  return map[key] || '-';
};
