export interface DataWithDate {
  avg: number;
  min: number;
  max: number;
  time: string;
}

export interface Data {
  avg: number;
  min: number;
  max: number;
}

export interface SoilData {
  item_ph_value: DataWithDate[];
  item_salt_content: DataWithDate[];
  item_soil_temperature: DataWithDate[];
  item_soil_moisture: DataWithDate[];
  item_nitrogen_content: DataWithDate[];
  item_potassium_content: DataWithDate[];
  item_phosphorus_content: DataWithDate[];
  item_ph_value_static: Data;
  item_salt_content_static: Data;
  item_soil_temperature_static: Data;
  item_soil_moisture_static: Data;
  item_nitrogen_content_static: Data;
  item_potassium_content_static: Data;
  item_phosphorus_content_static: Data;
}

export interface WeatherData {
  item_wind_speed: DataWithDate[];
  item_rainfull: DataWithDate[];
  item_humidity: DataWithDate[];
  item_illumination: DataWithDate[];
  item_temperature: DataWithDate[];
  item_atmospheric_pressure: DataWithDate[];
  item_wind_speed_static: Data;
  item_rainfull_static: Data;
  item_humidity_static: Data;
  item_illumination_static: Data;
  item_temperature_static: Data;
  item_atmospheric_pressure_static: Data;
}

export interface Images {
  images: string[];
}
