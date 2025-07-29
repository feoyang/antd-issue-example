import { defineConfig, loadEnv, ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wyw from '@wyw-in-js/vite';
import { IncomingMessage, ServerResponse } from 'http';
import px2rem from 'postcss-plugin-px2rem'

const byPass = (mode: string, req: IncomingMessage, res: ServerResponse, options: ProxyOptions) => {
  if (mode === 'development') {
    const proxyURL = new URL(req.url, options.target as string);
    res.setHeader('X-Proxy-URL', proxyURL.toString());
    res.setHeader('env', mode);
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    plugins: [react(), wyw()],
    build: {
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api': {
          target: `${env.VITE_BASE_HOST}`,
          changeOrigin: true,
          secure: false,
          bypass: byPass.bind(null, mode),
        },
        '/xlyk': {
          target: 'https://api.satlic.net:8020',
          changeOrigin: true,
          secure: false,
          bypass: byPass.bind(null, mode),
          rewrite: (path) => path.replace(/^\/xlyk/, ''),
        },
        '/img': {
          target: `${env.VITE_BASE_BUCKET}/`,
          changeOrigin: true,
          secure: false,
          bypass: byPass.bind(null, mode),
        },
        '/file': {
          target: `${env.VITE_BASE_FILE}/`,
          changeOrigin: true,
          secure: false,
          bypass: byPass.bind(null, mode),
        },
      }
    },
    css: {
      postcss: {
        plugins: [
          px2rem({
            rootValue: 118, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            propList: ['*'], //属性的选择器，*表示通用
            exclude: /node_modules/,
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
    },
  };
});
