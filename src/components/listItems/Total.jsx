import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { priceFloatToString } from "../../lib";

export default function Total({ title, total, isLoading, useColor = false }) {
  const fPrice = priceFloatToString(total);

  function getColor() {
    return total < 0 ? "red" : "green";
  }

  return (
    <View style={{ flex: 1, flexDirection: "row", marginBottom: 5 }}>
      <View style={[styles.container, { alignItems: "flex-start" }]}>
        <Text>{title}</Text>
      </View>
      <View style={[styles.container, { alignItems: "flex-end" }]}>
        {isLoading ? (
          <ActivityIndicator color="lightgreen" />
        ) : (
          <Text
            style={{
              color: useColor ? getColor() : "black",
            }}
          >
            {fPrice}
          </Text>
        )}
      </View>
    </View>
  );
}

Total.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  useColor: PropTypes.bool,
};

Total.defaultProps = {
  useColor: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "flex-start",
    padding: 5,
  },
});
