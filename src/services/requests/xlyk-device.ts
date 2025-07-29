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

/**
 * {
                "Enable": 0,
                "Powertype": 0,
                "Batterylevel": 0,
                "Powervoltage": 0.0,
                "Signallevel": 0,
                "SignalLevelPer": 0,
                "Isonline": 0,
                "Autoormanual": 1,
                "Status": 0,
                "Waterstatus": 0,
                "Mtbf": 0,
                "Batterystatus": 0,
                "Calendardayoff": null,
                "Nowaterwindows": null,
                "gatewayflagNoWater": 0,
                "gatewayflagNoWindow": 0,
                "gatewayadmingroupid": 0,
                "Totalonlinetimelen": 0,
                "Firmwaretype": null,
                "Firmwareversion": null,
                "Swtype": null,
                "Creatorid": 1001242,
                "CreatorName": null,
                "UserRight": 1,
                "LastOfflineTime": "0001-01-01T00:00:00Z",
                "SilencePeriodDate": "2025-12-06T02:01:57Z",
                "TrafficDate": "2026-07-29T13:27:52Z",
                "Createtime": "2024-11-29T07:29:10Z",
                "Servicestatus": 2,
                "Productiondate": "2025-06-06T02:01:57Z",
                "Activationdate": "2025-07-29T13:27:52Z",
                "Servicedeadline": "2026-07-29T13:27:52Z",
                "TrafficGrace": "2026-08-28T13:27:52Z",
                "TrafficcCancellation": "2026-11-29T13:27:52Z",
                "Iot_Config": null,
                "JsonConfig": null,
                "ReturnLiquid": 0.0,
                "EnterLiquid": 0.0,
                "PowerMode": 0,
                "SyncFlag": 0,
                "Datareportingtime": 0,
                "Elevation": 0.0,
                "EnableVirtualDevice": 0,
                "MstscConfig": null,
                "RecoveryModeConfig": null,
                "ValveMaxRuntimes": null,
                "IsStationDC": 0,
                "Gatewayid": 9626,
                "Gatewaysn": "R24112907290978",
                "Gatewayname": "EC-90978",
                "Description": "",
                "Gatewaytype": 101,
                "Gatewaymodel": 10104,
                "Longitude": 0.0,
                "Latitude": 0.0,
                "Hwdeviceid": "RCMS@1d0a2f446a7d2464162983a129471f26"
            },
 */
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
