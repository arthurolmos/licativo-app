import React from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { AuthContext } from "../contexts/AuthContext";
import { validPassword } from "../validations";
import PasswordInput from "../components/inputs/PasswordInput";
import EmailInput from "../components/inputs/EmailInput";
import logo from "../../assets/logo.png";
import { FillAllFields, ErrorManager } from "../error";

export default function Register({ navigation }) {
  const { register } = React.useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  async function handleRegister() {
    Keyboard.dismiss();

    if (
      name !== "" ||
      email !== "" ||
      password !== "" ||
      confirmPassword !== ""
    ) {
      if (password !== confirmPassword)
        throw new ErrorManager("Senhas não estão iguais!");
      if (!validPassword(password))
        throw new ErrorManager(
          "A senha deve possuir pelo menos 8 caracteres com letras e números!"
        );

      try {
        setLoading(true);

        await register(name, email, password);

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
      <View
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={logo} style={{ width: "100%", height: "25%" }} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Nome"
          required
          textContentType="name"
          keyboardType="default"
          autoCapitalize="words"
        />

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

        <Text style={styles.label}>Confirme a Senha:</Text>
        <PasswordInput
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="Confirme a Senha"
        />

        {isLoading ? (
          <ActivityIndicator color="lightgreen" />
        ) : (
          <Button title="REGISTRAR" onPress={() => handleRegister()} />
        )}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text onPress={() => navigation.navigate("Login")}>Fazer login</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Register.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 50,
    marginBottom: 20,
    borderRadius: 10,
  },

  container: {
    paddingHorizontal: 25,
    marginVertical: 25,
  },

  label: {
    marginBottom: 5,
  },
});
