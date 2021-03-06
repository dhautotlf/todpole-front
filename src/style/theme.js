import { css } from 'styled-components';

const colors = {
  black: '#000000',
  black90: 'rgba(0, 0, 0, 0.9)',
  black80: 'rgba(0, 0, 0, 0.8)',
  black65: 'rgba(0, 0, 0, 0.65)',
  black60: 'rgba(0, 0, 0, 0.6)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black40: 'rgba(0, 0, 0, 0.4)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black10: 'rgba(0, 0, 0, 0.1)',

  white: '#ffffff',
  white80: 'rgba(255, 255, 255, 0.8)',
  white60: 'rgba(255, 255, 255, 0.6)',
  white40: 'rgba(255, 255, 255, 0.4)',
  white20: 'rgba(255, 255, 255, 0.2)',

  green: '#84A59D',
  green70: 'rgba(132, 165, 157, 0.7)',
  yellow: '#F6BD60',
  yellow70: 'rgba(246, 189, 96, 0.7)',
  red: '#ff0033',
  redError: '#DA1414',
  redErrorBg: '#FEEFEF',

  whiteSmoke: '#F5F5F5',
  veryLightGray: '#FAFAFA',
  lightGray: '#E5E5E5',
  silver: '#C4C4C4',
  mediumGray: '#979797',
  darkGray: '#5C5C5C',
  anotherGray: '#DADADA',
  grayOverlay: 'rgba(196, 196, 196, 0.5)',
};

export default {
  colors,
  radius: {
    tiny: 4,
    small: 8,
    moderate: 12,
    medium: 24,
    large: 32,
    xlarge: 40,
  },
  spacing: {
    tiny: 8,
    small: 16,
    moderate: 24,
    medium: 32,
    large: 40,
    xlarge: 80,
  },
  context: {},
  button: {
    defaultStyle: css`
      border-radius: 8px;
      letter-spacing: 1px;
    `,
  },
  checkbox: {
    defaultStyle: css`
      background-color: transparent;
    `,
  },
  radio: {
    defaultStyle: css`
      opacity: ${(props) => (props.disabled ? 0.2 : 1)};
    `,
  },
};
