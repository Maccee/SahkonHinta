import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const [hinnat, setHinnat] = useState(null);

  useEffect(() => {
    fetch('https://api.spot-hinta.fi/TodayAndDayForward')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        data.sort((a, b) => {
          return new Date(a.DateTime) - new Date(b.DateTime);
        });
        setHinnat(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {hinnat ? (
        hinnat.map(hinta => {
          const date = new Date(hinta.DateTime);
          const dateTime =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date.getDate().toString().padStart(2, '0') +
            ' ' +
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0');

          return (
            <Text key={hinta.DateTime} style={styles.text}>
              {dateTime}  {hinta.PriceWithTax}
            </Text>
          );
        })
      ) : (
        <Text>Loading...</Text>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 25,
    padding: 0,
  },
});