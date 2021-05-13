import * as React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function RoundIconButton({
  action, icon, color, textColor,
}) {
  return (
    <TouchableOpacity
      onPress={action}
      style={[{ backgroundColor: color }, styles.button]}
    >
      <MaterialIcons name={icon} size={30} color={textColor} />
    </TouchableOpacity>
  );
}

RoundIconButton.propTypes = {
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

RoundIconButton.defaultProps = {
  color: 'white',
  textColor: 'black',
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    alignItems: 'center',
    zIndex: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
