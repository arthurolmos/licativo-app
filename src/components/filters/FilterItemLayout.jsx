import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export default function FilterItemLayout({ children, title }) {
  return (
    <View style={styles.filterItem}>
      <View style={styles.filterTitle}>
        <Text style={styles.modalText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

FilterItemLayout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  filterTitle: {
    justifyContent: 'flex-start',
    flex: 1,
    alignContent: 'center',
  },

  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  modalText: {
    flexWrap: 'nowrap',
  },
});
