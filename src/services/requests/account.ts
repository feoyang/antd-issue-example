import { transformIResponse } from '../tools/transform-response';

export const requestMyInfo = async () => {
  // const res = await request.get('/api/account/my-info');
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          id: 1,
          name: '张三',
        },
      });
    }, 1000);
  });
  return transformIResponse(res as any);
};
