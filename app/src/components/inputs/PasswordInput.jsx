import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function PasswordInput({ onChangeText, value, placeholder }) {
  const [isVisible, setVisibility] = React.useState(false);

  return (
    <View style={{ position: "relative", width: "100%" }}>
      <MaterialIcons
        onPress={() => setVisibility(!isVisible)}
        name={isVisible ? "visibility-off" : "visibility"}
        size={30}
        style={{
          position: "absolute",
          zIndex: 999,
          top: 5,
          right: 10,
          margin: "auto",
        }}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={!isVisible}
        required
        textContentType="password"
        keyboardType="default"
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

PasswordInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

PasswordInput.defaultProps = {
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
