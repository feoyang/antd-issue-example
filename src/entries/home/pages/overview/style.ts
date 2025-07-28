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
        }
      }
    `,

    reportContainer: css`
      width: 100%;

      .reportItemsWrapper {
        flex: 1;

        .reportItem {
          flex: 1;
          padding: 0px 22px ;
          border-radius: 15px;

          .title {
            font-size: 22px;
            font-weight: 700;
          }

          .img {
            width: 76px;
          }
        }
      }
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

        .data {
          height: 62px;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.7);
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
        font-size: 12px;
        font-weight: 700;
      }

      .text {
        color: #FF7551;
        font-size: 8px;
        font-weight: 400;
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
  };
});

