import { SoilDataEnum } from '../enums';

export const getSoilDataText = (data: SoilDataEnum) => {
  const map = {
    [SoilDataEnum.SOIL_TEMPERATURE]: '土壤温度',
    [SoilDataEnum.SOIL_MOISTURE]: '土壤湿度',
    [SoilDataEnum.CONDUCTIVITY]: '电导率',
    [SoilDataEnum.PH]: 'PH值',
    [SoilDataEnum.TIME]: '时间',
  };
  return map[data] || '-';
};
