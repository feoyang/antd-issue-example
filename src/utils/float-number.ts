/**
 * 格式化浮点数，仅对超过两位小数的数值保留两位小数
 * @param value 输入值
 * @returns 格式化后的字符串
 */
export const formatFloatNumber = (value: any): string => {
  const valueString = value?.toString() || '';

  if (valueString.includes('.')) {
    const [, decimalPart] = valueString.split('.');
    if (decimalPart && decimalPart.length > 2) {
      return parseFloat(valueString).toFixed(2);
    }
  }

  return valueString;
};
