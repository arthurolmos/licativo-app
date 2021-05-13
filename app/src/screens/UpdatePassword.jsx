import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import PasswordInput from "../components/inputs/PasswordInput";
import IconButton from "../components/buttons/IconButton";
import { validPassword } from "../validations";
import { ErrorManager, FillAllFields } from "../error";
import { Message } from "../message";

export default function UpdatePassword({ navigation }) {
  const { updatePassword } = React.useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);

  const [oldPassword, setOldPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  /*= ==== HEADER ===== */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <IconButton action={handleUpdatePassword} icon="check" />
        </View>
      ),
    });
  }, [navigation, handleUpdatePassword]);

  async function handleUpdatePassword() {
    Keyboard.dismiss();

    if (oldPassword !== "" || password !== "" || confirmPassword !== "") {
      if (password !== confirmPassword)
        throw new ErrorManager("Senhas não estão iguais!");
      if (!validPassword(password))
        throw new ErrorManager(
          "A senha deve possuir pelo menos 8 caracteres com letras e números!"
        );

      try {
        setLoading(true);

        await updatePassword(oldPassword, password);

        setLoading(false);
        navigation.goBack();
        new Message("Senha atualizada com sucesso!");
      } catch (err) {
        setLoading(false);
        throw new ErrorManager(err.message);
      }
    } else {
      new FillAllFields();
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
          <Text style={styles.label}>Senha Atual:</Text>
          <PasswordInput
            onChangeText={(text) => setOldPassword(text)}
            value={oldPassword}
            placeholder="Senha Atual"
          />

          <Text style={styles.label}>Nova Senha:</Text>
          <PasswordInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Senha"
          />

          <Text style={styles.label}>Confirme a Nova Senha:</Text>
          <PasswordInput
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirme a Senha"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

UpdatePassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    padding: 15,
    height: "100%",
  },

  label: {
    marginBottom: 5,
  },
});
