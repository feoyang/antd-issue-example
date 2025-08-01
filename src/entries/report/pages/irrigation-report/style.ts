import { createStyles } from 'antd-style';
import suggestionBackgroundPng from '../../assets/irrigation-report/detail-suggestion-background.png';

export const irrigationCardStyle = createStyles(({ css }) => {
  return {
    previewImg: css`
      height: 100px;
    `,

    card: css`
      .ant-card-body {
        padding: 15px 20px;
      }
    `,

    text: css`
      font-size: 11px;
      margin: 0px !important;
    `,
  };
});

export const detailContentStyle = createStyles(({ css }) => {
  return {
    suggestionContainer: css`
      width: 100%;
      height: 120px;
      background: url(${suggestionBackgroundPng}) no-repeat center center;
      background-size: 100% 100%;
      padding: 8px 16px;
      box-sizing: border-box;

      .content {
        flex: 1;

        .textArea {
          flex: 1;
          background: linear-gradient(91deg, #FFFFFF -5%, rgba(255, 255, 255, 0.8) 99%);
        }
      }
    `,
  };
});

export const aiResultColStyle = createStyles(({ css }, props: { color: string; index: number }) => {
  return {
    aiResultCol: css`
      height: calc(50% - 6px);
      margin-bottom: ${props.index === 0 || props.index === 1 ? '12px' : '0px'};
    `,
    aiResultColCard: css`
      height: 100%;
      background: ${props.index === 3 ? 'linear-gradient(90deg, #34C896 0%, #6FC06D 100%)' : undefined};

      .ant-card-head {
        padding: 0px 0px 0px 10px;
        height: 32px;
        background: transparent !important;
      }
      .ant-card-body {
        padding: 10px;
        background: transparent !important;
      }
    `,
    iconWrapper: css`
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: ${props.color};
    `,
    icon: css`
      width: 15px;
    `,

    degreeWrapper: css`
      width: 50px;
      height: 20px;
      border-radius: 10px 0px 0px 10px;
      background-color: ${props.color};

      span {
        color: ${props.index === 3 ? '#87C55D !important' : '#fff !important'};
      }
    `,
  };
});

export const rightStyle = createStyles((
  { css },
  props: { background: string; analysisIconWrapperBackgroundImg?: string },
) => {
  const cardBodyHeight = 120;

  return {
    analysisCol: css`
    `,

    suggestionsCol: css`
    `,

    analysisColCard: css`
      height: 100%;
      background: ${props.background};

      .ant-card-head {
        padding: 0px 10px 0px 10px;
        height: 32px;
      }
      .ant-card-body {
        padding: 10px;
        height: ${cardBodyHeight}px;
      }
    `,

    suggestionsColCard: css`
      height: 100%;
      background: ${props.background};

      .ant-card-head {
        padding: 0px 10px 0px 10px;
        height: 32px;
      }
      .ant-card-body {
        padding: 10px;
        height: ${cardBodyHeight}px;
      }
    `,

    analysisIconWrapper: css`
      width: 30px;
      height: 30px;
      background: url(${props.analysisIconWrapperBackgroundImg}) no-repeat center center;
      background-size: contain; /* 或者使用具体数值如: 30px 30px */
    `,
    analysisIcon: css`
      margin-left: 5px;
      width: 18px;
    `,

    suggestionIconWrapper: css`
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #fff;
    `,
    suggestionIcon: css`
      height: 18px;
    `,
  };
});
