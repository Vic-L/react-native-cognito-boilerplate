import { Platform } from 'react-native';

function GetNavigationHeaderMode() {
  return Platform.OS === 'ios' ? 'float' : 'screen';
}

export default GetNavigationHeaderMode;
