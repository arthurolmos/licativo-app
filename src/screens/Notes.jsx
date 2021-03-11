import React from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";
import HeaderContainerLayout from "../components/layouts/HeaderContainerLayout";
import { ErrorManager } from "../error";

export default function Notes({ navigation }) {
  const db = firebase.firestore();

  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    async function getData() {
      try {
        const value = await AsyncStorage.getItem("notes");
        if (value !== null) {
          setNotes(value);
        }
      } catch (e) {
        throw new ErrorManager(err.message);
      }
    }

    getData();
  }, []);

  React.useEffect(() => {
    async function autoSave() {
      try {
        await AsyncStorage.setItem("notes", notes);
      } catch (err) {
        console.log("ERROR SAVING NOTES", err);
      }
    }

    autoSave();
  }, [notes]);

  return (
    <SafeAreaView>
      <View style={{ paddingBottom: 60, height: "100%" }}>
        <HeaderContainerLayout>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Anotações
            </Text>
          </View>
        </HeaderContainerLayout>

        <View style={{ margin: 15 }}>
          <TextInput
            multiline
            style={{
              borderColor: "gray",
              borderWidth: 1,
              padding: 5,
              paddingLeft: 10,
              marginBottom: 20,
              textAlignVertical: "top",
              borderRadius: 10,
              height: "100%",
              overflow: "visible",
              backgroundColor: "white",
            }}
            numberOfLines={4}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            placeholder="Anotações"
            textContentType="none"
            keyboardType="default"
            autoCapitalize="sentences"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

Notes.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
    goBack: PropTypes.func,
  }).isRequired,
};
