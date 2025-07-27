import { FileFormatType } from '..';

export interface BaseFile {

  /**
   * id
   */
  id: string;

  /**
   * 文件名称
   */
  fileName: string;

  /**
   * 文件大小
   */
  fileSize: number;

  /**
   * 文件地址
   */
  fileUrl: string;

  /**
   * 创建时间
   */
  createTime: string;
}

export interface BaseFileTemplate {

  /**
   * 模板 Id
   */
  id: string;

  /**
   * 顺序
   */
  order: number;

  /**
   * 名称
   */
  name: string;

  /**
   * 模板格式
   */
  format: FileFormatType;

  /**
   * 模板下载文件地址
   */
  templateUrl: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

  /**
   * 是否必须提交
   */
  isRequired: boolean;
}
