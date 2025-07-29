/* eslint-disable spellcheck/spell-checker */
import qs from 'qs';
import { request } from '../core/http';
import { transformXLYKResponse } from '../tools/transform-response';
import { XLYKSensorData } from '../../data';
import { transformXLYKList } from '../tools/transform-list';
import { XLYKListData } from '../core/types';

interface XLYKGatewayDeviceSensorDataRes {
  GatDeviceSensorList: XLYKSensorData[];
}

/**
 * 获取网管下的所有传感器数据
 */
export const requestXLYKGatewayDeviceSensorData = async (
  gatewayId: number,
) => {
  const query = qs.stringify({
    gatewayId: gatewayId,
  });

  const res = await request.get(`/xlyk/gateway/api/v2/Gateway/GetGatewayDetai2Info?${query}`);
  return transformXLYKResponse<XLYKGatewayDeviceSensorDataRes[]>(res);
};

/**
 * 获取气象数据
 */
export const requestXLYKGatewayMeteorologySensorData = async () => {
  const query = qs.stringify({
    gatewayId: 10555,
  });

  const res = await request.get(`/xlyk/gateway/api/v2/Gateway/GetGatewayDetai2Info?${query}`);
  return transformXLYKResponse<XLYKGatewayDeviceSensorDataRes>(res);
};

export interface RequestGatewayListByPageData {
  Enable: number;
  Powertype: number;
  Batterylevel: number;
  Powervoltage: number;
  Signallevel: number;
  SignalLevelPer: number;
  Isonline: number;
  Autoormanual: number;
  Status: number;
  Waterstatus: number;
  Mtbf: number;
  Batterystatus: number;
  Calendardayoff: string | null;
  Nowaterwindows: string | null;
  gatewayflagNoWater: number;
  gatewayflagNoWindow: number;
  gatewayadmingroupid: number;
  Totalonlinetimelen: number;
  Firmwaretype: string | null;
  Firmwareversion: string | null;
  Swtype: string | null;
  Creatorid: number;
  CreatorName: string | null;
  UserRight: number;
  LastOfflineTime: string;
  SilencePeriodDate: string;
  TrafficDate: string;
  Createtime: string;
  Servicestatus: number;
  Productiondate: string;
  Activationdate: string;
  Servicedeadline: string;
  TrafficGrace: string;
  TrafficcCancellation: string;
  Iot_Config: string | null;
  JsonConfig: string | null;
  ReturnLiquid: number;
  EnterLiquid: number;
  PowerMode: number;
  SyncFlag: number;
  Datareportingtime: number;
  Elevation: number;
  EnableVirtualDevice: number;
  MstscConfig: string | null;
  RecoveryModeConfig: string | null;
  ValveMaxRuntimes: string | null;
  IsStationDC: number;
  Gatewayid: number;
  Gatewaysn: string;
  Gatewayname: string;
  Description: string;
  Gatewaytype: number;
  Gatewaymodel: number;
  Longitude: number;
  Latitude: number;
  Hwdeviceid: string;
}

export const requestGatewayListByPage = async () => {
  const body = {
    // 默认项目的项目id为2957
    projectId: '2957',
    // 这是官网调用这个接口的时候传的类型，应该是所有类型
    // [12, 13, 14, 15, 51, 101, 102, 103, 108, 301, 302, 303, 304, 305]
    // 目前的两个水肥机的类型
    gatewayType: [101, 108],
    gatewayNameKey: '',
    pageIndex: 1,
    pageSize: 20,
  };

  const res = await request.post('/xlyk/project/api/v2/Project/GetProjectGatewayListByPage', body);

  return transformXLYKList<RequestGatewayListByPageData>(
    transformXLYKResponse<XLYKListData<RequestGatewayListByPageData[]>>(res),
    (item) => item,
  );
};

export interface RequestProgramListByGatewayIdData {
  programName: string;
  programId: number;
  // 运行状态：0 未运行，1 正在运行，2 暂停
  runStatus: number;
  // 运行总时长，单位秒；流量模式下会计算一个预估时间
  runTotalTimes: number;
  // 运行开始的UTC时间
  runStartTime: string;
  // 同步标识：0 待同步，1 正在同步，9 同步成功
  syncFlag: number;
  // 传感器编号
  sensorId: number;
}

/**
 * 获取网管下程序列表
 */
export const requestProgramListByGatewayId = async (gatewayId: number) => {
  const query = qs.stringify({
    gatewayId: gatewayId,
  });

  const res = await request.get(`/xlyk/gateway/api/v2/Program/GetProgramList?${query}`);
  return transformXLYKList<RequestProgramListByGatewayIdData>(
    transformXLYKResponse<XLYKListData<RequestGatewayListByPageData[]>>(res),
    (item) => item,
  );
};
export interface RequestIrrigationAreasByGatwayIdData {
  Enable: number;
  Gatewayid: number;
  Zoneindex: number;
  Zonename: string;
  Description: string;
  Planindex: number;
  Totalvalvenum: number;
  Valvelist: string;
  Switchstatus: number;
  Status: number;
  Flowrate: number;
  Flowmanagerenable: number;
  Flowwatchenable: number;
  Overflowalarm: number;
  Underflowalarm: number;
  Flowsensorassignment: number;
  Pmvassignment: string;
  Alarmdelay: number;
  Alarmcleardelay: number;
  Wateringbudget: number;
  Landarea: number;
  Waterdepth: number;
  TimingEnable: number;
  TimingStartTime: string;
  runTime: number;
  Id: number;
}

export const requestIrrigationAreasByGatewayId = async (gatewayId: number) => {
  const query = qs.stringify({
    gatewayId: gatewayId,
  });

  const res = await request.get(`/xlyk/gateway/api/v2/Zone/GetZoneListByGatewayId?${query}`);
  return transformXLYKResponse<RequestIrrigationAreasByGatwayIdData[]>(res);
};

export interface RequestProgramDeviceParmas {
  deviceId: number;
  programId: number;
  formulaId: number;
  timeRun: number;
  timeBeforeFertilization: number;
  timeAfterFertilization: number;
  createTime: string;
}

export interface RequestProgramZoneParmas {
  zoneId: number;
  programId: number;
  formulaId: number;
  timeRun: number;
  timeBeforeFertilization: number;
  timeAfterFertilization: number;
  createTime: string;
}

export interface RequestAddProgramParams {
  gatewayId: number;
  programName: string;
  description: string;
  status: number;
  totalMode: number;
  totalNumber: number;
  timeRunModel: number;
  timeRun: number;
  timeRunAll: number;
  waterMode: number;
  waterTotal: number;
  rotationFlowTime: number;
  rotationFlowNumber: number;
  sersonalAdjustEnable: number;
  sersonalAdjust: number;
  sersonalClikMode: number;
  sersonalActionType: number;
  noWaterTimeStatus: number;
  stackOrOverlap: number;
  runStatus: number;
  createTime: string;
  updateTime: string;
  configData: string;
  configDataType: string;
  syncFlag: number;
  syncUpdateTime: string;
  programIndex: number;
  runTotalTimes: number;
  programDevices: RequestProgramDeviceParmas[];
  programZones: RequestProgramZoneParmas[];
  runStartTime: string;
  sensorId: number;
  uuid: string;
  programCode: string;
}

export const requestAddProgram = async (params: RequestAddProgramParams) => {
  const body = params;

  const res = await request.post('/xlyk/gateway/api/v2/Program/ProgramAdd', body);
  return transformXLYKResponse<void>(res);
};
