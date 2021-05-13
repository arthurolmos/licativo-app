import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import IconButton from "../components/buttons/IconButton";
import { Message } from "../message";
import { ErrorManager, FillAllFields } from "../error";

export default function EditProfile({ navigation }) {
  const { user, updateProfile } = React.useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);

  const [name, setName] = React.useState(
    user.displayName ? user.displayName : ""
  );

  /*= ==== HEADER ===== */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <IconButton action={handleUpdateProfile} icon="check" />
        </View>
      ),
    });
  }, [navigation, handleUpdateProfile]);

  async function handleUpdateProfile() {
    Keyboard.dismiss();

    if (name !== "") {
      try {
        setLoading(true);

        await updateProfile(name);

        setLoading(false);
        navigation.goBack();

        new Message("Perfil atualizado!");
      } catch (err) {
        setLoading(false);

        throw new ErrorManager(err.message);
      }
    } else {
      throw new FillAllFields();
    }
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{ justifyContent: "center", height: "100%" }}>
          <ActivityIndicator size="large" color="lightgreen" />
        </View>
      ) : (
        <View style={styles.container}>
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
        </View>
      )}
    </SafeAreaView>
  );
}

EditProfile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  container: {
    // justifyContent: 'center',
    padding: 15,
    height: "100%",
  },

  label: {
    marginBottom: 5,
  },
});
