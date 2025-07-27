import { css } from '@linaria/core';
import { styled } from '@linaria/react';

// 定义布局常量
const HEADER_TOP = '20px';
const HEADER_LEFT = '30px';
const HEADER_HEIGHT = '55px';
const RIGHT_WRAPPER_WIDTH = '360px';

export const layoutWrapper = css`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
`;

export const header = css`
  position: absolute;
  top: ${HEADER_TOP};
  left: ${HEADER_LEFT};
  right: calc(${RIGHT_WRAPPER_WIDTH} + ${HEADER_LEFT});
  z-index: 10;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  padding: 0;

  .segmented {
    flex: 1;

    .segmentedIcon {
      width: 16px;
      height: 16px;
    }
  }
`;

export const content = css`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const LeftWrapper = styled.div`
  flex: 1;
  padding: ${HEADER_TOP} ${HEADER_LEFT};
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::before {
    content: '';
    height: ${HEADER_HEIGHT};
    width: 100%;
    flex-shrink: 0;
  }
`;

export const RightWrapper = styled.div`
  width: ${RIGHT_WRAPPER_WIDTH};
  height: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f1f3f3;
`;
