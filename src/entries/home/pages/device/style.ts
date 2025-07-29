import { createStyles } from 'antd-style';
import { px2rem } from '../../../../utils/px-to-rem';

export const deviceStyle = createStyles(({ token, css }) => {
  return {
    topContainer: css`
      .text-container {
        background-color: #f1f3f3;
        padding: 0px 30px;
        margin-left: -10px;
        display: flex;
        align-items: center;
        min-width: 200px;
        height: ${px2rem(token.controlHeightLG)};
        border-radius: ${px2rem(token.borderRadiusLG)};
      }
    `,
    deviceContainer: css`
      height: 100%;

      .ant-spin-nested-loading {
        height: 100%;
        .ant-spin-container {
          height: 100%;
        }
      }
    `,
    deviceCard: css`
      .ant-card-body {
        height: 110px;
      }
    `,
    deviceWrapper: css`
      height: 100%;
    `,
    deviceImg: css`
      width: 80px;
    `,
    deviceContentWrapper: css`
      height: 100%;
    `,
    deviceIcon: css`
      width: 15px;
    `,
  };
});

export const deviceSiderStyle = createStyles(({ css }) => {
  return {
    topImg: css`
      width: 100%;
      border-radius: 10px;
      position: relative;

      .rightImg1 {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        max-height: 100%;
        object-fit: cover;
        z-index: 1;
      }

      .cover {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        height: 100%;
        max-height: 100%;

        .rightImg2 {
          height: 100%;
          max-height: 100%;
          width: auto;
          object-fit: contain;
        }
      }
    `,
  };
});

export const cardStyle = createStyles(({ css }, props: { color: string; extraColor: string }) => {
  return {
    card: css`
      .ant-card-head {
        padding: 0px;
        padding-left: 10px;
        background: ${props.color};

        .ant-card-head-wrapper {
          flex: 1;
          align-items: stretch;

          .ant-card-head-title {
            flex: 1;
            height: 100% !important;
          }
        }

      }
    `,

    headExtra: css`
      width: 100px;
      height: 25px;
      border-radius: 0px 10px 0px 10px;
      background: ${props.extraColor};
    `,
  };
});
