import { createStyles } from 'antd-style';

export const overviewStyle = createStyles(({ css }) => {
  return {
    advertisement: css`
      width: 500px;
      border-radius: 10px;
      object-fit: cover;
    `,

    dataPreviewContainer: css`
      flex: 1;

      .dataPreview {
        flex: 1;

        .dataBox {
          width: 100%;
          height: 50%;
          padding: 10px;
          background-color: #F0F3F3;
          border-radius: 15px;

          .imgWrapper {
            width: 47px;
            height: 47px;
            background-color: #fff;
            border-radius: 12px;

            .img {
              width: 38px;
              height: 38px;
            }
          }

          .value {
            font-family: DingTalk-JinBuTi;
            margin: 0 !important;
          }
        }
      }
    `,

    reportContainer: css`
      width: 100%;

      .reportItemsWrapper {
        height: 100px;

        .reportItem {
          flex: 1;
          padding: 15px 25px ;
          border-radius: 15px;

          .img {
            width: 76px;
          }
        }
      }
    `,

    irrigationCalendarContainer: css`
      flex: 1;
    `,
  };
});

export const overviewSiderStyle = createStyles(({ css }) => {
  return {
    topImg: css`
      width: 100%;
      position: relative;

      .img {
        width: 100%;
        object-fit: cover;
        display: block;
        z-index: 1;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.836) 22%, rgba(255, 255, 255, 0) 119%);
        z-index: 2;
      }

      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 18px 22px 10px;
        z-index: 3;

        .dataWrapper {
          height: 62px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.7);

          .value {
            font-family: DingTalk-JinBuTi;
            margin: 0 !important;
            color: #40784B;
          }

          .valueLabel {
            font-size: 10px;
          }
        }
      }
    `,

    warningBox: css`
      width: 100%;
      background-color: #FFF7ED;
      border-radius: 15px;
      box-sizing: border-box;
      border: 1px solid #FAE3C7;

      .img {
        width: 50px;
        height: 50px;
        position: relative;
      }

      .title {
        color: #FF7D53;
        margin: 0 !important;
      }

      .text {
        color: #FF7551;
        font-size: 11px;
      }
    `,

    weatherBox: css`
      flex: 1;
      min-height: 0;

      .weatherBoxContent {
        height: 100%;
        min-height: 0;
      }
    `,

    deviceIcon: css`
      height: 30px;
    `,

    deviceValue: css`
      margin: 0 !important;
      font-family: DingTalk-JinBuTi;
    `,
  };
});

