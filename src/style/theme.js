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

  green: '#84A59D';

};

export default {
  colors,
  spacing: {
    tiny: 8,
    small: 16,
    moderate: 24,
    medium: 32,
    large: 40,
    xlarge: 80
  },
  // A place to store flags for helping with contextual styling. For example,
  // you could set a `cartDrawer` flag so that components can render differently
  // if they know they are inside the CartDrawer component, without needing to
  // use CSS selectors.
  context: {},
  button: {
    defaultStyle: css`
      border-radius: 8px;
      letter-spacing: 1px;
    `
  },
  checkbox: {
    defaultStyle: css`
      background-color: transparent;
    `
  },
  radio: {
    defaultStyle: css`
      opacity: ${props => (props.disabled ? 0.2 : 1)};
    `
  },
};
