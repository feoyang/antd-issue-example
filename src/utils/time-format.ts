import dayjs from 'dayjs';

export const REQUEST_TIME_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss';
export const SECOND_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const getTimeText = (time: string | number | Date | dayjs.Dayjs | null | undefined): string => {
  const date = dayjs(time);
  return date.format(SECOND_TIME_FORMAT);
};
