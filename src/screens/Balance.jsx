import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import DefaultList from "../components/lists/DefaultList";
import TotalsHeader from "../components/headers/TotalsHeader";
import HeaderContainerLayout from "../components/layouts/HeaderContainerLayout";
import { PurchaseController, SaleController } from "../controllers";

export default function Balance({ navigation }) {
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingSales, setLoadingSales] = React.useState(true);
  const [isLoadingPurchases, setLoadingPurchases] = React.useState(true);

  const [showOnlyPaid, setShowOnlyPaid] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [isFiltered, setFiltered] = React.useState(false);

  const [sales, setSales] = React.useState([]);
  const [purchases, setPurchases] = React.useState([]);

  const [orders, setOrders] = React.useState([]);
  const [displayOrders, setDisplayOrders] = React.useState([]);

  React.useEffect(() => {
    if (isFiltered) {
      applyPurchasesFilter(filterParams);
    } else {
      setDisplayOrders(orders);
    }
  }, [orders]);

  React.useEffect(() => {
    const unsubscribeSales = SaleController.addObserver((sales) => {
      setSales(sales);
      setLoadingSales(false);
    });
    const unsubscribePurchases = PurchaseController.addObserver((purchases) => {
      setPurchases(purchases);
      setLoadingPurchases(false);
    });

    return () => {
      unsubscribeSales();
      unsubscribePurchases();
    };
  }, []);

  React.useEffect(() => {
    if (isLoadingSales === false && isLoadingPurchases === false) {
      setLoading(true);

      let orders = [];

      orders = orders.concat(sales);
      orders = orders.concat(purchases);

      orders.sort((a, b) => a.orderDate < b.orderDate);

      setOrders([...orders]);
      setDisplayOrders([...orders]);
      setLoading(false);
    }
  }, [isLoadingPurchases, isLoadingSales]);

  function refreshAll() {
    SaleController.index((monthSales) => {
      setMonthSales(monthSales);
      setLoadingMonthSales(false);
    });

    PurchaseController.index((monthPurchases) => {
      setMonthPurchases(monthPurchases);
      setLoadingMonthPurchases(false);
    });
  }

  return (
    <SafeAreaView>
      <View style={{ height: "100%" }}>
        <DefaultList
          header={
            <View>
              <TotalsHeader
                title="Balanço Total"
                sales={sales}
                isLoadingSales={isLoadingSales}
                purchases={purchases}
                isLoadingPurchases={isLoadingPurchases}
              />
              <HeaderContainerLayout>
                <View style={styles.listTitle}>
                  <Text style={{ textTransform: "uppercase" }}>
                    TODOS OS PEDIDOS
                  </Text>
                </View>
              </HeaderContainerLayout>
            </View>
          }
          data={orders}
          extraData={isFiltered}
          navigation={navigation}
          render="balance"
          refresh={refreshAll}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

Balance.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  listTitle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
