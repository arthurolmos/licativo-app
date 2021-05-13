import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function HeaderContainerLayout({ children }) {
  return <View style={styles.totalsContainer}>{children}</View>;
}

HeaderContainerLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
  totalsContainer: {
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 0,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
  },
});
