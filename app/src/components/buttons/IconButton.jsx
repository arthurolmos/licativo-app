import * as React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function IconButton({ action, icon }) {
  return (
    <TouchableOpacity onPress={action}>
      <View>
        <MaterialIcons name={icon} size={30} />
      </View>
    </TouchableOpacity>
  );
}

IconButton.propTypes = {
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};
