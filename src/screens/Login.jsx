import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  Keyboard,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import PasswordInput from "../components/inputs/PasswordInput";
import EmailInput from "../components/inputs/EmailInput";
import logo from "../../assets/logo.png";
import { FillAllFields, ErrorManager } from "../error";

export default function Login({ navigation }) {
  const { login } = React.useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogin() {
    Keyboard.dismiss();

    if (email !== "" || password !== "") {
      try {
        setLoading(true);

        await login(email, password);
        setLoading(false);
      } catch (err) {
        setLoading(false);

        throw new ErrorManager(err.message);
      }
    } else {
      throw new FillAllFields();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={logo} style={{ width: "100%", height: "30%" }} />
        </View>

        <Text style={styles.label}>Email:</Text>
        <EmailInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />

        <Text style={styles.label}>Senha:</Text>
        <PasswordInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Senha"
        />

        {isLoading ? (
          <ActivityIndicator size="large" color="lightgreen" />
        ) : (
          <Button
            title="LOGIN"
            color="lightgreen"
            onPress={() => handleLogin()}
          />
        )}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text onPress={() => navigation.navigate("Register")}>
            Criar uma conta
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 25,
    flex: 1,
  },

  label: {
    marginBottom: 5,
  },
});
