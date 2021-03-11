import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function EmailInput({ onChangeText, value, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      textContentType="emailAddress"
      keyboardType="email-address"
      autoCapitalize="none"
      required
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

EmailInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

EmailInput.defaultProps = {
  placeholder: "",
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
});
