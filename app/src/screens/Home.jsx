import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultList from "../components/lists/DefaultList";
import TotalsHeader from "../components/headers/TotalsHeader";
import HeaderContainerLayout from "../components/layouts/HeaderContainerLayout";
import { PurchaseController, SaleController } from "../controllers";
import PropTypes from "prop-types";

export default function Home({ navigation }) {
  const [monthPurchases, setMonthPurchases] = React.useState([]);
  const [isLoadingMonthPurchases, setLoadingMonthPurchases] = React.useState(
    true
  );

  const [monthSales, setMonthSales] = React.useState([]);
  const [isLoadingMonthSales, setLoadingMonthSales] = React.useState(true);

  const [openSales, setOpenSales] = React.useState([]);
  const [isLoadingOpenSales, setLoadingOpenSales] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeOpenSales = SaleController.addOpenSalesObserver(
      (openSales) => {
        setOpenSales(openSales);
        setLoadingOpenSales(false);
      }
    );

    const unsubscribeSales = SaleController.addMonthObserver((monthSales) => {
      setMonthSales(monthSales);
      setLoadingMonthSales(false);
    });

    const unsubscribePurchases = PurchaseController.addMonthObserver(
      (monthPurchases) => {
        setMonthPurchases(monthPurchases);
        setLoadingMonthPurchases(false);
      }
    );

    return () => {
      unsubscribeSales();
      unsubscribePurchases();
      unsubscribeOpenSales();
    };
  }, []);

  function refreshAll() {
    SaleController.getMonthSales((monthSales) => {
      setMonthSales(monthSales);
      setLoadingMonthSales(false);
    });

    PurchaseController.getMonthPurchases((monthPurchases) => {
      setMonthPurchases(monthPurchases);
      setLoadingMonthPurchases(false);
    });

    SaleController.getOpenSales((openSales) => {
      setOpenSales(openSales);
      setLoadingOpenSales(false);
    });
  }

  return (
    <SafeAreaView>
      <View style={{ height: "100%" }}>
        <DefaultList
          header={
            <View>
              <TotalsHeader
                title="Total Mensal"
                sales={monthSales}
                isLoadingSales={isLoadingMonthSales}
                purchases={monthPurchases}
                isLoadingPurchases={isLoadingMonthPurchases}
              />
              <HeaderContainerLayout>
                <View style={styles.listTitle}>
                  <Text style={{ textTransform: "uppercase" }}>
                    PEDIDOS EM ABERTO
                  </Text>
                </View>
              </HeaderContainerLayout>
            </View>
          }
          title="Pedidos em aberto"
          data={openSales}
          navigation={navigation}
          render="orders"
          refresh={refreshAll}
          isLoading={isLoadingOpenSales}
        />
      </View>
    </SafeAreaView>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  listTitle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
