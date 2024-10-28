import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  LoginPage,
  Home,
  GetBaseballResult,
  GetallLeague,
  LeagueGameResult,
  GetPhotos,
} from "./Subpage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#00ffff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 10,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#adff2f",
  },
});

export default function App() {
  const [baseball, setBaseball] = useState(null);
  const [AllLeague, setAllLeague] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const Stack = createStackNavigator();
  const [imageurl, setimageurl] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const result = await GetBaseballResult(
          moment().utcOffset("+10:00").format("YYYY-MM-DD")
        );

        setBaseball(result);
        setAllLeague(GetallLeague(result));
        setLoading(false);
        const img = await GetPhotos();
        setimageurl(img);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const screenOptions = {
    baseballData: baseball,
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
          <Stack.Screen name="Login">
      
            {(props) => <LoginPage {...props} image={imageurl} />}
          </Stack.Screen>
          <Stack.Screen name="Home">
            {(props) => <Home {...props} baseball={baseball} />}
          </Stack.Screen>

          {AllLeague.map((name) => (
            <Stack.Screen
              key={name}
              name={name}
              component={() => (
                <LeagueGameResult name={name} baseball={baseball} />
              )}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
