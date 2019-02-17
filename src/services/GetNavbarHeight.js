import { Platform } from 'react-native';

export default function GetNavbarHeight() {
  if (Platform.OS === 'ios') {
    return 44;
  }

  return 64;
}
