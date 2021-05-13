import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default function DefaultButton({
  action, title, backgroundColor, color,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={action}
    >
      <View>
        <Text style={{ color }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

DefaultButton.propTypes = {
  action: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

DefaultButton.defaultProps = {
  backgroundColor: 'white',
  color: 'black',
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: backgroundColor,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    flex: 1,
    flexGrow: 1,
  },
});
