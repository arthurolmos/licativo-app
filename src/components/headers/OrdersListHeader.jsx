import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import HeaderContainerLayout from '../layouts/HeaderContainerLayout';

export default function OrdersListHeader({
  title,
  setModalVisible,
  isFiltered,
}) {
  return (
    <HeaderContainerLayout>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons
            name="filter-list"
            size={25}
            color={isFiltered ? 'blue' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </HeaderContainerLayout>
  );
}

OrdersListHeader.propTypes = {
  title: PropTypes.string.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    margin: 10,
  },

  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
