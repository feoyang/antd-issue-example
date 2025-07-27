/**
 * 实况天气
 */
export interface Live {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

/**
 * 预报天气
 */
export interface Forecast {
  province: string;
  city: string;
  adcode: string;
  reporttime: string;
  casts: Cast[];
}

export interface Cast {
  date: string;
  week: string;
  dayweather: string;
  nightweather: string;
  daytemp: string;
  nighttemp: string;
  daywind: string;
  nightwind: string;
  daypower: string;
  nightpower: string;
}
