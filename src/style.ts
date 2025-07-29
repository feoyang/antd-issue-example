import { createStyles } from 'antd-style';
import { px2rem } from './utils/px-to-rem';

/**
 * 定义全局组件样式
 */
export const globalStyles = createStyles(({ css, prefixCls }) => {
  return {
    // primary button渐变
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        background: linear-gradient(90deg, #34C896 0%, #6FC06D 100%) !important;
        border: none !important;
        color: white !important;
        transition: all 0.3s ease !important;
        position: relative;
        overflow: hidden;

        > span {
          color: white !important;
          position: relative;
          z-index: 2;
        }

        /* 所有子元素文字都为白色 */
        * {
          color: white !important;
        }

        /* 创建hover动画层 */
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, #2BA882 0%, #5BA85A 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        &:hover::after {
          opacity: 1;
        }

        &:hover {
          color: white !important;
          > span {
            color: white !important;
          } 
          * {
            color: white !important;
          }
        }
        &:focus {
          background: linear-gradient(90deg, #34C896 0%, #6FC06D 100%) !important;
          color: white !important;

          > span {
            color: white !important;
          }

          * {
            color: white !important;
          }
        }
      }
    `,

    linearGradientSegmented: css`
      img {
        width: ${px2rem(16)} !important;
        height: ${px2rem(16)} !important;
      }

      /* 修改默认滑动背景为渐变色（移动时显示） */
      &.ant-segmented .ant-segmented-thumb {
        background: linear-gradient(90deg, #34C896 0%, #6FC06D 100%) !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* 选中项也设置渐变背景（静止时显示） */
      &.ant-segmented .ant-segmented-item-selected {
        background: linear-gradient(90deg, #34C896 0%, #6FC06D 100%) !important;
        color: white !important;

        .ant-segmented-item-label {
          color: white !important;
        }

        /* 选中时图标变白色 */
        .segmentedIcon {
          filter: brightness(0) invert(1) !important;
        }
      }

      &.ant-segmented .ant-segmented-item-selected:hover {
        background: linear-gradient(90deg, #34C896 0%, #6FC06D 100%) !important;
        color: white !important;

        .segmentedIcon {
          filter: brightness(0) invert(1) !important;
        }
      }

      /* 未选中的项目样式 */
      &.ant-segmented .ant-segmented-item:not(.ant-segmented-item-selected) {
        background: transparent !important;
        color: #666 !important;

        .ant-segmented-item-label {
          color: #666 !important;
        }

        /* 未选中时图标保持原色或设置为灰色 */
        .segmentedIcon {
          filter: brightness(0.6) !important;
        }
      }
    `,
  };
});
