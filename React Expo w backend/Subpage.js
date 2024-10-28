import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SectionList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { SafeAreaView } from "react-navigation";
import { login, signup } from "./database";


export async function GetBaseballResult(date) {
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "Your Own Key",
      "X-RapidAPI-Host": "api-baseball.p.rapidapi.com",
    },
  };
  let result = await fetch(
    `https://api-baseball.p.rapidapi.com/games?date=${date}`,
    options
  );
  let response = await result.json();
  let data = response.response;
  return data.map((game_info) => ({
    league: game_info.league.name,
    Home: game_info.teams.home.name,
    Away: game_info.teams.away.name,
    Home_score_summary: game_info.scores.home,
    Away_score_summary: game_info.scores.away,
    Home_score: game_info.scores.home.innings,
    Away_score: game_info.scores.away.innings,
  }));
}

export function GetallLeague(props) {
  const league = props.map((item) => item.league);
  const LeagueList = [...new Set(league)];
  return LeagueList;
}

export async function GetPhotos() {
  const url =
    "https://api.unsplash.com/search/photos?query=baseball&orientation=landscape&per_page=5&client_id=X4JusJAPMOd7NtG3Sy9ZFsCoSy6leFQYJN3sS2HcwpI";
  const res = await fetch(url);

  const data = await res.json();
  return data.results[0].urls.regular;
}
function FilterData(props, baseball) {
  let SelectedLeagueData = baseball.filter((item) => item.league === props);
  let Eachgamedata = SelectedLeagueData.map((item) => tableInfo(item));
  return Eachgamedata;
}

function tableInfo(props) {
  let league = [props.Away + "(A)   v.s   " + props.Home + "(H)"];

  let Column_name = [
    "",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "R",
    "H",
    "E",
  ];
  key = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let Away_Team = ["A"];
  key.map((key) => Away_Team.push(props.Away_score[key]));
  Away_Team.push(props.Away_score_summary.total);
  Away_Team.push(props.Away_score_summary.hits);
  Away_Team.push(props.Away_score_summary.errors);

  let Home_Team = ["H"];
  key.map((key) => Home_Team.push(props.Home_score[key]));
  Home_Team.push(props.Home_score_summary.total);
  Home_Team.push(props.Home_score_summary.hits);
  Home_Team.push(props.Home_score_summary.errors);

  let rows = [league, Column_name, Away_Team, Home_Team];
  return rows;
}

function Gametable(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      marginBottom: 0,
      backgroundColor: "#ffffff",
    },
    tableBorderStyle: { borderWidth: 1, borderColor: "#c8e1ff" },
    head: { height: 40, backgroundColor: "#00ffff" },
    headText: { textAlign: "center", fontWeight: "bold" },
    rowText: { textAlign: "center" },
  });

  const row = props[0];
  const rows = [props[1], props[2], props[3]];

  return (
    <View key={props[2]} style={styles.container}>
      <Table borderStyle={styles.tableBorderStyle}>
        <Row data={row} style={styles.head} textStyle={styles.headText} />
        <Rows data={rows} />
      </Table>
    </View>
  );
}

export function LoginPage({ image }) {
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
      marginLeft: 0,
    },
    BtnContainer: {
      width: "20%",
      marginBottom: 20,
    },
    Btn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#adff2f",
    },
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const Navigation = useNavigation();

  async function handleLogin() {
    try {
      let res = await login({ email, password });

      if (res.message === "Success") {
        console.log("Success");
        Navigation.navigate("Home");
      } else {
        setErrorMessage(res.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }

  async function handleSignup() {
    let res = await signup({ email, password });
    if (res.message === "User created") {
      Navigation.navigate("Home");
    } else {
      setErrorMessage(res.message);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        style={{ width: "60%", height: "30%", marginBottom: 20 }}
        source={{
          uri: image,
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={[{ marginBottom: 20 }]}>
        <Text>{errormessage}</Text>
      </View>
      <View style={styles.BtnContainer}>
        <Button title="Sign Up" onPress={handleSignup} style={styles.Btn} />
      </View>
      <View style={styles.BtnContainer}>
        <Button title="Login" onPress={handleLogin} style={styles.Btn} />
      </View>
    </View>
  );
}

export function Home({ baseball }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
    },
    item: {
      backgroundColor: "#8fbc8f",
      padding: 20,
      marginVertical: 8,
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
    },
  });
  const AllLeague = [
    {
      title: "All League",
      data: GetallLeague(baseball),
    },
  ];

  const navigateLeague = useNavigation();
  const handleLeagueNavigation = (leg) => {
    navigateLeague.navigate(leg, leg, { screen: leg });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={AllLeague}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLeagueNavigation(item)}
          >
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export function LeagueGameResult({ name, baseball }) {
  const leagueData = FilterData(name, baseball);

  return <ScrollView>{leagueData.map((res) => Gametable(res))}</ScrollView>;
}
