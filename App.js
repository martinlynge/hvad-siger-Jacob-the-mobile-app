import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import * as Speech from 'expo-speech';

function randomAnswer() {
  const min = 1;
  const max = 4;

  return Math.floor(Math.random() * (+max - +min)) + +min;
}

const answers = [
  {
    answer: 'Ja',
    image: <Image source={require('./images/jakob_yes.jpg')} />,
  },
  {
    answer: 'Nej',
    image: <Image source={require('./images/jakob_no.jpg')} />,
  },
  {
    answer: 'Ved ikke',
    image: <Image source={require('./images/jakob_does_not_know.jpg')} />,
  },
];

export default function App() {
  const initialResult = answers[randomAnswer() - 1];
  const [textToSpeech, setTextToSpeech] = useState(
    `Jakob siger ${initialResult.answer}`
  );
  const [toggle, setToggle] = useState(false);
  const [image, setImage] = useState(initialResult.image);
  const [answer, setAnswer] = useState(initialResult.answer);

  useEffect(() => {
    Speech.speak(textToSpeech);
  }, [toggle]);

  const handleSpeak = () => {
    setToggle(!toggle);

    const result = answers[randomAnswer() - 1];

    setAnswer(result.answer);

    setImage(result.image);

    setTextToSpeech(`Jakob siger ${result.answer}`);
  };

  return (
    <View style={styles.container}>
      <Button title="Hvad siger Jakob?" onPress={handleSpeak} />
      {image ? image : null}
      {textToSpeech ? (
        <Text style={styles.answer}>
          Jacob siger: <Text style={{ fontWeight: 'bold' }}>{answer}</Text>
        </Text>
      ) : null}
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
  answer: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
