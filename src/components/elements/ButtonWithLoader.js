import React from 'react';
import { ViewPropTypes } from 'react-native';
import Btn from 'react-native-micro-animated-button';
import PropTypes from 'prop-types';
import {
  COLOR,
} from '../../constants';

/*
  type props = {
    activeOpacity?: number,
    backgroundColor?: string,         // default = white
    bounce?: boolean,                 // default = false
    disabled?: boolean,               // default = false
    disabledBackgroundColor?: string, // default = gray
    disabledForegroundColor?: string, // default = white
    errorBackgroundColor?: string,    // default = red
    errorForegroundColor?: string,    // default = white
    errorIcon?: string,
    errorLabel?: string,
    expandOnFinish?: boolean,         // default = false
    foregroundColor?: string,         // default = blue
    icon?: string,                    // default = icons names from iconSet
    iconSet? any,                     // default = FontAwesome
    iconSize?: number,                // default = 17
    iconStyle?: Object,
    initialState?: 'success' | 'error' | 'loading',
    label?: string,
    labelStyle?: Object,              // default = defaultLabelStyle
    material?: boolean,               // use MaterialIcons instead of FontAwesome
    maxWidth?: number,                // default = 240
    minWidth?: number,                // default = 40
    noBorder?: boolean,               // default = false
    noFill?: boolean,                 // default = false
    noRadius?: boolean,               // default = false
    onError?: Function,
    onLoad?: Function,
    onPress?: Function,
    onReset?: Function,
    onSecondaryPress?: Function,
    onSuccess?: Function,
    renderErrorIcon?: any,            // default = <FontAwesome />
    renderIndicator?: any,            // default = <ActivityIndicator />
    renderLabel?: any,                // default = <Text />
    renderSuccessIcon?: any,          // default = <FontAwesome />
    scaleFactor?: number,             // default = 1.1
    scaleOnSuccess?: boolean,         // default = false
    shakeOnError?: boolean,           // default = false
    static?: boolean,                 // default = false
    style?: Object,                   // default = defaultStyle
    successBackgroundColor?: string,  // default = green
    successForegroundColor?: string,  // default = white
    successIcon?: string,
    successLabel?: string,
    width?: number,                   // overwrites maxWidth and minWidth, use for fixed length
  };
*/

const ButtonWithLoader = React.forwardRef(({
  label,
  onPress,
  labelStyle,
  iconStyle,
  ...otherProps
},
ref) => (
  <Btn
    backgroundColor={COLOR.PRIMARY}
    label={label}
    onPress={onPress}
    ref={ref}
    foregroundColor="white"
    errorBackgroundColor={COLOR.ERROR}
    labelStyle={{
      backgroundColor: 'transparent',
      color: 'white',
      fontFamily: 'Karla-Bold',
      ...labelStyle,
    }}
    iconStyle={{
      color: 'white',
      ...iconStyle,
    }}
    {...otherProps}
  />
));

ButtonWithLoader.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  labelStyle: ViewPropTypes.style,
  iconStyle: ViewPropTypes.style,
};

ButtonWithLoader.defaultProps = {
  labelStyle: {},
  iconStyle: {},
};

export default ButtonWithLoader;
