import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultList from "../components/lists/DefaultList";
import OrdersListHeader from "../components/headers/OrdersListHeader";
import FilterModal from "../components/modals/FilterModal";
import { SaleController } from "../controllers";
import { applyFilter } from "../lib";
import PropTypes from "prop-types";

export default function Sales({ navigation }) {
  const [sales, setSales] = React.useState([]);
  const [displaySales, setDisplaySales] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);
  const [isFiltered, setFiltered] = React.useState(false);
  const [filterParams, setFilterParams] = React.useState(null);

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribeSales = SaleController.addObserver((sales) => {
      setSales(sales);
      setLoading(false);
    });
    return () => unsubscribeSales();
  }, []);

  React.useEffect(() => {
    if (isFiltered) {
      applySalesFilter(filterParams);
    } else {
      setDisplaySales(sales);
    }
  }, [sales]);

  async function refreshSales() {
    setLoading(true);

    const sales = await SaleController.index();
    setSales(sales);

    setLoading(false);
  }

  function applySalesFilter({
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
      orders: sales,
    });

    setDisplaySales(orders);
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
            title="Vendas"
            setModalVisible={setModalVisible}
            isFiltered={isFiltered}
          />
        }
        data={displaySales}
        extraData={isFiltered}
        scrollable
        navigation={navigation}
        render="full"
        refresh={refreshSales}
        isLoading={isLoading}
      />

      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        applyFilter={applySalesFilter}
      />
    </SafeAreaView>
  );
}

Sales.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
