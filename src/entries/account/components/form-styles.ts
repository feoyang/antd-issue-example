import { styled } from '@linaria/react';

export const EntranceFormWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EntranceFormHeader = styled.div`
  margin-bottom: 36px;
  font-weight: 600;
  font-size: 24px;
  color: #333333;
  position: relative;

  &::after {
    content: '';
    width: 40px;
    height: 5px;
    border-radius: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -13px;
    background: #E8E8E8;
  }
`;
