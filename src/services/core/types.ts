export interface IParams {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IHeaders {
  [key: string]: any;
}

export interface IListData<T> {

  /**
   * 上一页索引，如果已经是第一页，则为 -1
   */
  prev: number;

  /**
   * 下一页索引，如果已经是最后一页，则为 -1
   */
  next: number;

  /**
   * 列表项总数
   */
  total: number;

  /**
   * 数据列表
   */
  list: T[];
}

export interface XLYKListData<T> {

  /**
   * 当前页面
   */
  PageIndex: number;

  /**
   * 总页数
   */
  PageCount: number;

  /**
   * 总数
   */
  RowCount: number;

  /**
   * 单页数据量
   */
  PageSize: number;

  /**
   * 数据列表
   */
  Data: T[];
}

export interface IListRequestQuery {
  pageSize: number;
  current: number;
}

export interface IResponse<T> {

  /**
   * 是否成功
   */
  success: boolean;

  /**
   * 对应业务状态码
   */
  code: number;

  /**
   * message 直接提示给用户
   */
  message: string;

  /**
   * 响应体
   */
  data: T;
}

export interface XLYKResponse<T> {

  /**
   * 是否成功
   */
  Success: boolean;

  /**
   * 对应业务状态码
   */
  MessageId: number;

  /**
   * message 直接提示给用户
   */
  Message: string;
  MessageDetail: string;

  /**
   * 响应体
   */
  Data: T;
}
