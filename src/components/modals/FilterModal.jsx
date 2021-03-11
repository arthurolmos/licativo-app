import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import FilterItemLayout from "../filters/FilterItemLayout";
import IconButton from "../buttons/IconButton";
import { DateTime } from "luxon";
import PropTypes from "prop-types";

export default function FilterModal({
  modalVisible,
  setModalVisible,
  applyFilter,
}) {
  const [name, setName] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [isPaid, setPaid] = React.useState(null);
  const [isDelivered, setDelivered] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const [date, setDate] = React.useState(new Date());
  const [dateMode, setDateMode] = React.useState("");
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  /*= ==== PICKER FUNCTIONS ===== */
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    if (dateMode === "from") {
      setFromDate(currentDate);
    } else {
      setToDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    let date;

    if (dateMode === "from") {
      date = fromDate || new Date();
    } else {
      date = toDate || new Date();
    }

    setDate(date);
    showMode("date");
  };

  function clearFilters() {
    setName("");
    setPlatform("");
    setPaid(null);
    setDelivered(null);
    setFromDate(null);
    setToDate(null);
    setDate(new Date());
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert("Modal has been closed.");
      // }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <MaterialIcons name="close" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{ textTransform: "uppercase", fontSize: 20 }}>
            Filtros
          </Text>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="Nome"
              required
              textContentType="name"
              keyboardType="email-address"
              autoCapitalize="sentences"
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPlatform(text)}
              value={platform}
              placeholder="Plataforma"
              required
              textContentType="name"
              keyboardType="default"
              autoCapitalize="sentences"
            />
          </View>

          <FilterItemLayout title="Pago?">
            <Picker
              style={styles.picker}
              selectedValue={isPaid}
              onValueChange={(option) => setPaid(option)}
            >
              <Picker.Item label="-" value={null} />
              <Picker.Item label="Não" value={false} />
              <Picker.Item label="Sim" value />
            </Picker>
          </FilterItemLayout>

          <FilterItemLayout title="Entregue?">
            <Picker
              style={styles.picker}
              selectedValue={isDelivered}
              onValueChange={(option) => setDelivered(option)}
            >
              <Picker.Item label="-" value={null} />
              <Picker.Item label="Não" value={false} />
              <Picker.Item label="Sim" value />
            </Picker>
          </FilterItemLayout>

          <FilterItemLayout title="Data de:">
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>
                {fromDate
                  ? DateTime.fromJSDate(fromDate).toFormat("dd/MM/yyyy")
                  : "-"}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                icon="date-range"
                action={() => {
                  setDateMode("from");
                  showDatepicker();
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setFromDate(null)}
              style={{ marginLeft: 15 }}
            >
              <Text>Limpar</Text>
            </TouchableOpacity>
          </FilterItemLayout>

          <FilterItemLayout title="Data até:">
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>
                {toDate
                  ? DateTime.fromJSDate(toDate).toFormat("dd/MM/yyyy")
                  : "-"}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                icon="date-range"
                action={() => {
                  setDateMode("to");
                  showDatepicker();
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setToDate(null)}
              style={{ marginLeft: 15 }}
            >
              <Text>Limpar</Text>
            </TouchableOpacity>
          </FilterItemLayout>

          <View
            style={{
              flex: 1,
              flexGrow: 1,
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "green" }}
              onPress={() => {
                applyFilter({
                  name,
                  platform,
                  isPaid,
                  isDelivered,
                  fromDate,
                  toDate,
                });
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Filtrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "red" }}
              onPress={() => {
                clearFilters();
              }}
            >
              <Text style={styles.textStyle}>Limpar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </Modal>
  );
}

FilterModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },

  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
    width: "100%",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  filterTitle: {
    justifyContent: "flex-start",
    flex: 1,
    alignContent: "center",
  },

  picker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  filterItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20,
  },
});
