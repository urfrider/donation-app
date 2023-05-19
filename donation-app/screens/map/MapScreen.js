import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, FlatList, Text } from "react-native";
import * as Location from "expo-location";
import { useQuery } from "react-query";

import { callApi } from "../../api";
import HawkerItem from "../../components/HawkerItem";

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState({//set initial region as sg
    latitude: 1.29027,
    longitude: 103.851959,
    latitudeDelta: 0.06,
    longitudeDelta: 0.03,
  });

  const { isLoading: hawkerLoading, data: hawkerData } = useQuery(
    "hawker",
    callApi.hawker
  );

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.03,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        showsBuildings={false}
        showsPointsOfInterest={false}
      >
        {hawkerData &&
          hawkerData.map((hawker) => (
            <Marker
              image={require("../../assets/hawkerMarker.png")}
              key={hawker.id}
              coordinate={{
                latitude: parseFloat(hawker.latitude),
                longitude: parseFloat(hawker.longitude),
              }}
              title={hawker.name}
              style={{
                width: 3,
                height: 3,
              }}
            />
          ))}
      </MapView>
      <View style={styles.hawkerHeader}>
        <Text style={styles.headerText}>Nearby</Text>
      </View>
      <FlatList
        data={hawkerData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <HawkerItem hawker={item} userLocation={mapRegion} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "65%",
  },
  hawkerHeader: {
    backgroundColor: "white",
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MapScreen;
