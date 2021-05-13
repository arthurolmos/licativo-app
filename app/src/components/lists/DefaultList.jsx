import * as React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import ListItem from "../listItems/ListItem";

const ListEmptyComponent = () => (
  <View style={styles.emptyList}>
    <Text style={{ color: "lightgray" }}>Sem pedidos para exibir!</Text>
    <Text style={{ color: "lightgray" }}>Cadastre seu primeiro pedido!</Text>
  </View>
);

const ListLoadingComponent = () => (
  <View style={styles.emptyList}>
    <Text style={{ color: "lightgray" }}>Carregando...</Text>
  </View>
);

export default function DefaultList({
  data,
  header,
  title,
  navigation,
  scrollable,
  refreshable,
  refresh,
  isLoading,
  extraData,
  type,
}) {
  return (
    <FlatList
      ListHeaderComponent={() => header || null}
      ListEmptyComponent={() =>
        isLoading ? <ListLoadingComponent /> : <ListEmptyComponent />
      }
      keyExtractor={(item, index) => item.id}
      renderItem={({ item }) => (
        <ListItem navigation={navigation} item={item} type={type} />
      )}
      data={data}
      extraData={extraData}
      scrollEnabled={scrollable}
      onRefresh={refreshable && refresh}
      refreshing={refreshable && isLoading}
      style={styles.listDefault}
    />
  );
}

DefaultList.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  header: PropTypes.string.isRequired,
  title: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
  scrollable: PropTypes.bool,
  refreshable: PropTypes.bool,
  refresh: PropTypes.func,
  isLoading: PropTypes.bool,
  extraData: PropTypes.instanceOf(Object),
  type: PropTypes.string.isRequired,
};

DefaultList.defaultProps = {
  scrollable: true,
  refreshable: true,
  refresh: null,
  isLoading: false,
  extraData: null,
};

const styles = StyleSheet.create({
  listDefault: {},

  listTitle: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyList: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
  },

  listSeparator: {
    padding: 0.5,
    marginVertical: 8,
    backgroundColor: "darkred",
  },
});
