# 智慧农业乡村振兴-前端-web-ipad

agrox-country-front-web-ipad

## 启动

- 下载依赖
`pnpm i`

- 本地运行
`pnpm run dev`

## 说明

- 本项目使用amfe-flexible和postcss-plugin-px2rem来进行不同尺寸的屏幕的适配，标准尺寸为ipad air 1180*820（关注比例即可）,设计稿也是按照平板比例来设计的

- 本项目使用antd-style来编写css（antdv5官方推荐，可以消费antd主题的token）

- 本项目使用react19以及eslint9（对于react19，需要安装@ant-design/v5-patch-for-react-19来让antdv5兼容；对于eslint9，需要编写flat格式的config文件。本项目都已经配置好）
