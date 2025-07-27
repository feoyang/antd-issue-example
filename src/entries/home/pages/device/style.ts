import { css } from '@linaria/core';

export const topContainer = css`
  .text-container {
    background-color: #f1f3f3;
    padding: 0px 30px;
    margin-left: -10px;
    display: flex;
    align-items: center;
    min-width: 200px;
  }
`;

export const topImg = css`
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
`;
