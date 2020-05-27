import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [textToSpeech, setTextToSpeech] = useState("I'm getting your location");
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      console.log(location);
      setLocation(`${location.coords.latitude}, ${location.coords.longitude}`);
      setTextToSpeech(
        `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`
      );
    })();
  });

  const handleSpeak = () => {
    if (location) setSpeak(true);

    Speech.speak(textToSpeech);
  };

  return (
    <View style={styles.container}>
      <Button title="What's my location" onPress={handleSpeak} />
      {speak && <Text style={styles.welcome}>{textToSpeech}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
