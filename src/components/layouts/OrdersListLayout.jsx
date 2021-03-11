import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FilterModal from "../modals/FilterModal";
import OrdersListHeader from "../headers/OrdersListHeader";

export default function OrdersListLayout({ title, applyFilter, isFiltered }) {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <OrdersListHeader
          title={title}
          setModalVisible={setModalVisible}
          isFiltered={isFiltered}
        />

        <View style={styles.listContainer}>{props.children}</View>

        <FilterModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          applyFilter={applyFilter}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 60,
    height: "100%",
  },

  listContainer: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 15,
    marginBottom: 20,
    padding: 5,
    backgroundColor: "#fff",
    elevation: 5,
  },
});
