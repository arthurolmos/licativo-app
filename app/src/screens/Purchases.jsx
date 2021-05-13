import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultList from "../components/lists/DefaultList";
import OrdersListHeader from "../components/headers/OrdersListHeader";
import FilterModal from "../components/modals/FilterModal";
import { PurchaseController } from "../controllers";
import { applyFilter } from "../lib";
import PropTypes from "prop-types";

export default function Purchases({ navigation }) {
  const [purchases, setPurchases] = React.useState([]);
  const [displayPurchases, setDisplayPurchases] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);
  const [isFiltered, setFiltered] = React.useState(false);
  const [filterParams, setFilterParams] = React.useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribePurchases = PurchaseController.addObserver((purchases) => {
      setPurchases(purchases);
      setLoading(false);
    });

    return () => unsubscribePurchases();
  }, []);

  React.useEffect(() => {
    if (isFiltered) {
      applyPurchasesFilter(filterParams);
    } else {
      setDisplayPurchases(purchases);
    }
  }, [purchases]);

  async function refreshPurchases() {
    setLoading(true);

    const purchases = await PurchaseController.index();
    setPurchases(purchases);

    setLoading(false);
  }

  function applyPurchasesFilter({
    name,
    platform,
    isPaid,
    isDelivered,
    fromDate,
    toDate,
  }) {
    const { orders, isFiltered } = applyFilter({
      name,
      platform,
      isPaid,
      isDelivered,
      fromDate,
      toDate,
      orders: purchases,
    });

    setDisplayPurchases(orders);
    setFiltered(isFiltered);

    if (isFiltered) {
      setFilterParams({
        name,
        platform,
        isPaid,
        isDelivered,
        fromDate,
        toDate,
      });
    } else setFilterParams(null);
  }

  return (
    <SafeAreaView>
      <DefaultList
        header={
          <OrdersListHeader
            title="Compras"
            setModalVisible={setModalVisible}
            isFiltered={isFiltered}
          />
        }
        data={displayPurchases}
        extraData={isFiltered}
        scrollable
        navigation={navigation}
        render="full"
        refresh={refreshPurchases}
        isLoading={isLoading}
      />

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        applyFilter={applyPurchasesFilter}
      />
    </SafeAreaView>
  );
}

Purchases.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
