import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import PropTypes from "prop-types";
import Total from "../listItems/Total";
import { calcTotalPrice } from "../../lib";
import HeaderContainerLayout from "../layouts/HeaderContainerLayout";

export default function TotalsHeader({
  title,

  sales,
  isLoadingSales,

  purchases,
  isLoadingPurchases,
}) {
  const salesTotal = calcTotalPrice(sales);
  const paidSalesTotal = calcTotalPrice(
    sales.filter((sale) => sale.isPaid === true)
  );

  const purchasesTotal = calcTotalPrice(purchases);
  const paidPurchasesTotal = calcTotalPrice(
    purchases.filter((purchase) => purchase.isPaid === true)
  );

  const [showOnlyPaid, setShowOnlyPaid] = React.useState(true);

  return (
    <HeaderContainerLayout>
      <View style={styles.title}>
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>

      <Total
        title="Vendas"
        total={showOnlyPaid ? paidSalesTotal : salesTotal}
        isLoading={isLoadingSales}
      />

      <Total
        title="Compras"
        total={showOnlyPaid ? paidPurchasesTotal : purchasesTotal}
        isLoading={isLoadingPurchases}
      />

      <Total
        title="TOTAL"
        total={
          showOnlyPaid
            ? paidSalesTotal - paidPurchasesTotal
            : salesTotal - purchasesTotal
        }
        useColor
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={showOnlyPaid}
          onValueChange={setShowOnlyPaid}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Mostrar apenas pedidos pagos.</Text>
      </View>
    </HeaderContainerLayout>
  );
}

TotalsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showOnlyPaid: PropTypes.bool.isRequired,
  setShowOnlyPaid: PropTypes.func.isRequired,

  paidSalesTotal: PropTypes.number.isRequired,
  salesTotal: PropTypes.number.isRequired,
  isLoadingSales: PropTypes.bool.isRequired,

  paidPurchasesTotal: PropTypes.number.isRequired,
  purchasesTotal: PropTypes.number.isRequired,
  isLoadingPurchases: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  title: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  checkbox: {
    alignSelf: "center",
  },

  label: {
    margin: 8,
  },

  listTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
