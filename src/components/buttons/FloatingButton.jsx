import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default function DefaultButton({ action }) {
  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
    </TouchableOpacity>
  );
}

DefaultButton.propTypes = {
  action: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    backgroundColor: 'purple',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    zIndex: 999,

    elevation: 10,
  },
});
