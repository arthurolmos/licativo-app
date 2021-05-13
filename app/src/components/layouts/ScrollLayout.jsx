import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

export default function ScrollLayout({ children }) {
  return <ScrollView style={styles.scrollView}>{children}</ScrollView>;
}

ScrollLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 15,
    paddingRight: 15,
    // backgroundColor: "green",
    position: 'relative',
  },
});
