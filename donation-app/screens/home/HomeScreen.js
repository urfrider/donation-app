import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";


import { callApi } from "../../api";
import Loader from "../../components/Loader";
import HList from "../../components/HList";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase/firebaseConfig";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HomeScreen = () => {
  const { isLoading: hawkerLoading, data: hawkerData } = useQuery(
    "hawker",
    callApi.hawker
  );
  const { isLoading: communityLoading, data: communityData } = useQuery(
    "community",
    callApi.community
  );
  const navigation = useNavigation();

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    // navigation.navigate("LoginScreen");
  };

  const isLoading = hawkerLoading || communityLoading;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="logo-twitch" size={24} color="black" />
        <View style={styles.welcomeView}>
          <Text style={{ lineHeight: 24 }}>Welcome, </Text>
          <Text style={styles.username}>Insaneboy9</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardHolder}>
        <LinearGradient
          colors={[colors.card, colors.accentColor]}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.balance}>SGD 0.00</Text>
          </View>
          <View style={styles.actionHolder}>
            <TouchableOpacity style={styles.action}>
              <Ionicons name="scan" size={36} color="white" />
              <Text style={styles.actionText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <Ionicons name="wallet-outline" size={36} color="white" />
              <Text style={styles.actionText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <MaterialIcons name="account-balance" size={36} color="white" />
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      {isLoading ? <Loader /> : null}
      {hawkerData && <HList title="Hawker" data={hawkerData.results} />}
      {communityData && (
        <HList title="Community" data={communityData.results} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  welcomeView: {
    flexDirection: "row",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
  },
  cardHolder: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    marginBottom: 40,
    height: SCREEN_HEIGHT / 4,
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  actionHolder: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
  },
  action: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginTop: 10,
    color: "white",
  },
});
