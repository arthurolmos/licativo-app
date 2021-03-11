import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { priceFloatToString } from "../../lib";
import RoundIconButton from "../buttons/RoundIconButton";
import { DateTime } from "luxon";
import PropTypes from "prop-types";

export default function ListItem({ item, navigation }) {
  const {
    customer,
    supplier,
    product,
    orderDate,
    id,
    price,
    type,
    platform,
    isPaid,
    isDelivered,
    quantity,
    notes,
  } = item;

  const name = type === "sales" ? customer : supplier;

  const formattedDate = orderDate
    ? DateTime.fromJSDate(orderDate).toFormat("dd/MM/yyyy")
    : "";

  const fPrice = price ? priceFloatToString(price) : "";

  const [isOpen, setOpen] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("EditOrder", { id, type })}
    >
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        <Text style={{ fontSize: 20, padding: 5, flex: 2 }}>{product}</Text>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              padding: 5,
            }}
          >
            {platform}
          </Text>
        </View>
      </View>

      {/** * FIRST ROW  *** */}
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        {/** * NAME FIELD ** */}
        <View style={{ flex: 1 }}>
          <Text>{name}</Text>
        </View>

        {/** * DATE FIELD *** */}
        <View style={{ flex: 1 }}>
          <Text>{formattedDate}</Text>
        </View>
      </View>

      {/** * SECOND ROW  *** */}
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        {/** * PRICE FIELD ** */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Preço: </Text>
          <Text style={{ color: type === "sales" ? "green" : "red" }}>
            {fPrice}
          </Text>
        </View>

        {/** * PAID FIELD ** */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Pago: </Text>
          <Text>
            {isPaid ? (
              <MaterialIcons name="check" color="green" size={20} />
            ) : (
              <MaterialIcons name="close" color="red" size={20} />
            )}
          </Text>
        </View>
      </View>

      {isOpen && (
        <>
          {/** * THIRD ROW  *** */}
          <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
            {/** * QTY FIELD ** */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Qtd: </Text>
              <Text>{quantity}</Text>
            </View>

            {/** * DELIVERED FIELD ** */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold" }}>Entregue: </Text>
              <Text>
                {isDelivered ? (
                  <MaterialIcons name="check" color="green" size={20} />
                ) : (
                  <MaterialIcons name="close" color="red" size={20} />
                )}
              </Text>
            </View>
          </View>

          {/** * FOURTH ROW *** */}
          <View style={{ flex: 1, padding: 5 }}>
            {/** * NOTES FIELD ** */}
            <Text style={{ fontWeight: "bold" }}>Observações:</Text>
            <Text>{notes}</Text>
          </View>
        </>
      )}

      <View
        style={{
          position: "absolute",
          bottom: -15,
          right: "50%",
        }}
      >
        <RoundIconButton
          action={() => setOpen(!isOpen)}
          icon={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          color={isOpen ? "red" : "lightgreen"}
        />
      </View>
    </TouchableOpacity>
  );
}

ListItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  item: PropTypes.shape({
    customer: PropTypes.string,
    supplier: PropTypes.string,
    product: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isPaid: PropTypes.bool.isRequired,
    isDelivered: PropTypes.bool.isRequired,
    quantity: PropTypes.number.isRequired,
    notes: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexGrow: 1,
    padding: 15,
    paddingBottom: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
  },
});
