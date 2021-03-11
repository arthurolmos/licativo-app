import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Keyboard,
  Alert,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInputMask } from "react-native-masked-text";
import IconButton from "../components/buttons/IconButton";
import DefaultButton from "../components/buttons/DefaultButton";
import { DateTime } from "luxon";
import DatePicker from "../components/pickers/DatePicker";
import { PurchaseController, SaleController } from "../controllers";
import { platforms } from "../data/platforms";
import { priceStringToFloat, priceFloatToString } from "../lib";
import PropTypes from "prop-types";
import { ErrorManager, FillAllFields } from "../error";
import { Message } from "../message";

export default function EditOrder({ navigation, route }) {
  const { id, type } = route.params;

  const [isLoading, setLoading] = React.useState(false);

  const [platform, setPlatform] = React.useState("");
  const [orderDate, setOrderDate] = React.useState(new Date());
  const [showOrderPicker, setShowOrderPicker] = React.useState(false);
  const [isPaid, setPaid] = React.useState(false);
  const [paymentDate, setPaymentDate] = React.useState(new Date());
  const [showPaymentPicker, setShowPaymentPicker] = React.useState(false);
  const [isDelivered, setDelivered] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = React.useState(new Date());
  const [showDeliveryPicker, setShowDeliveryPicker] = React.useState(false);

  const [product, setProduct] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");

  /*= ==== HEADER ===== */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <IconButton action={handleSubmit} icon="check" />
        </View>
      ),
    });
  }, [navigation, handleSubmit]);

  React.useEffect(() => {
    let isSubscribed = true;

    async function getOrder() {
      setLoading(true);

      try {
        let order = {};

        if (type === "sales") {
          order = await SaleController.findById(id);
        } else if (type === "purchases") {
          order = await PurchaseController.findById(id);
        }

        if (order && isSubscribed) {
          setPlatform(order.platform);
          setName(type === "sales" ? order.customer : order.supplier);
          setProduct(order.product);
          setQuantity(order.quantity.toString());
          setPrice(priceFloatToString(order.price));
          setNotes(order.notes);
          setOrderDate(order.orderDate);
          setPaid(order.isPaid);
          setPaymentDate(order.paymentDate);
          setDelivered(order.isDelivered);
          setDeliveryDate(order.deliveryDate);
        }
      } catch (err) {
        throw new ErrorManager(err.message);
      }

      setLoading(false);
    }

    getOrder();

    return () => (isSubscribed = false);
  }, [route]);

  /*= ==== FUNCTIONS ===== */
  async function handleSubmit() {
    Keyboard.dismiss();

    if (product !== "" && quantity !== "" && price !== "" && name !== "") {
      setLoading(true);

      try {
        const values = {
          name,
          product,
          quantity: parseInt(quantity),
          price: priceStringToFloat(price),
          orderDate,
          notes,
          isPaid,
          paymentDate: isPaid ? paymentDate : null,
          isDelivered,
          deliveryDate: isDelivered ? deliveryDate : null,
          type,
          platform,
        };

        if (type === "sales") {
          await SaleController.update(id, values);
        } else if (type === "purchases") {
          await PurchaseController.update(id, values);
        }

        new Message("Registro atualizado com sucesso!");

        setLoading(false);

        navigation.goBack();
      } catch (err) {
        setLoading(false);

        throw new ErrorManager(err.message);
      }
    } else {
      throw new FillAllFields();
    }
  }

  async function handleDelete() {
    setLoading(true);

    try {
      type === "sales"
        ? await SaleController.delete(id)
        : await PurchaseController.delete(id);

      new Message("Registro excluído com sucesso!");

      setLoading(false);

      navigation.goBack();
    } catch (err) {
      setLoading(false);

      throw new ErrorManager(err.message);
    }
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="lightgreen" />
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text>Venda / Compra:</Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Picker
                    enabled={false}
                    selectedValue={type}
                    onValueChange={(option) => setType(option)}
                  >
                    <Picker.Item label="Venda" value="sales" />
                    <Picker.Item label="Compra" value="purchases" />
                  </Picker>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text>Plataforma:</Text>
                </View>
                <View style={{ flex: 2 }}>
                  {type === "sales" ? (
                    <Picker
                      selectedValue={platform}
                      onValueChange={(option) => setPlatform(option)}
                    >
                      {platforms.sales.map((item) => {
                        return <Picker.Item label={item} value={item} />;
                      })}
                    </Picker>
                  ) : (
                    <Picker
                      selectedValue={platform}
                      onValueChange={(option) => setPlatform(option)}
                    >
                      {platforms.purchases.map((item) => {
                        return <Picker.Item label={item} value={item} />;
                      })}
                    </Picker>
                  )}
                </View>
              </View>

              <Text style={styles.label}>Nome:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="Nome"
                required
                textContentType="name"
                autoCapitalize="words"
              />

              <Text style={styles.label}>Produto:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setProduct(text)}
                value={product}
                placeholder="Produto"
                required
                textContentType="name"
                keyboardType="default"
                autoCapitalize="words"
              />

              <Text style={styles.label}>Quantidade:</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setQuantity(text)}
                value={quantity}
                placeholder="0"
                textContentType="none"
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Preço:</Text>
              <TextInputMask
                style={styles.input}
                type="money"
                options={{
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "R$",
                  suffixUnit: "",
                }}
                onChangeText={(text) => setPrice(text)}
                value={price}
                placeholder="0"
              />

              <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Data do Pedido:</Text>
                  <Text>
                    {DateTime.fromJSDate(orderDate).toFormat("dd/MM/yyyy")}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    icon="date-range"
                    action={() => setShowOrderPicker(true)}
                  />
                </View>
              </View>
              {showOrderPicker && (
                <DatePicker
                  date={orderDate}
                  setDate={setOrderDate}
                  setShow={setShowOrderPicker}
                />
              )}

              <Text style={styles.label}>Observações:</Text>
              <TextInput
                multiline
                style={{
                  borderColor: "gray",
                  borderWidth: 1,
                  padding: 5,
                  paddingLeft: 10,
                  marginBottom: 20,
                  textAlignVertical: "top",
                  borderRadius: 10,
                }}
                numberOfLines={4}
                onChangeText={(text) => setNotes(text)}
                value={notes}
                placeholder="Observações"
                textContentType="none"
                keyboardType="default"
                autoCapitalize="sentences"
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "40%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <Text>Pago?</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setPaid}
                    value={isPaid}
                  />
                </View>

                {isPaid && (
                  <View style={{ flex: 2, flexDirection: "row" }}>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.label}>Data do Pagamento:</Text>
                      <Text>
                        {DateTime.fromJSDate(paymentDate).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        icon="date-range"
                        action={() => setShowPaymentPicker(true)}
                      />
                    </View>
                  </View>
                )}
              </View>
              {showPaymentPicker && (
                <DatePicker
                  date={paymentDate}
                  setDate={setPaymentDate}
                  setShow={setShowPaymentPicker}
                />
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "40%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <Text>Entregue?</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setDelivered}
                    value={isDelivered}
                  />
                </View>

                {isDelivered && (
                  <View
                    style={{ flex: 2, flexDirection: "row", marginBottom: 20 }}
                  >
                    <View style={{ flex: 2 }}>
                      <Text style={styles.label}>Data da Entrega:</Text>
                      <Text>
                        {DateTime.fromJSDate(deliveryDate).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        icon="date-range"
                        action={() => setShowDeliveryPicker(true)}
                      />
                    </View>
                  </View>
                )}
              </View>
              {showDeliveryPicker && (
                <DatePicker
                  date={deliveryDate}
                  setDate={setDeliveryDate}
                  setShow={setShowDeliveryPicker}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                flexGrow: 1,
                marginTop: 20,
              }}
            >
              <DefaultButton
                title="Excluir Pedido"
                action={() => {
                  Alert.alert(
                    "Atenção",
                    "Deseja excluir o pedido?",
                    [
                      {
                        text: "Cancelar",
                        onPress: () => {
                          return;
                        },
                        style: "cancel",
                      },
                      { text: "OK", onPress: () => handleDelete() },
                    ],
                    { cancelable: false }
                  );
                }}
                backgroundColor="red"
                color="white"
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

EditOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  route: PropTypes.func,
};

EditOrder.defaultProps = {
  route: null,
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 15,
  },

  container: {
    padding: 15,
  },

  scroll: {
    height: "100%",
  },

  label: {
    marginBottom: 5,
  },
});
