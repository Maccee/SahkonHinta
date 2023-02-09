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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {hinnat ? (
        hinnat.map(hinta => {
          const date = new Date(hinta.DateTime);
          const dateTime =
            date.getDate().toString().padStart(2, '0') +
            '.' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            ' ' +
            date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0');

          // Check if the date and time of the current item matches the current date and time of the device
          const isCurrentTime =
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear() &&
            date.getHours() === new Date().getHours();

          return (
            <View key={hinta.DateTime} style={styles.itemContainer}>
              <Text
                style={[
                  styles.dateText,
                  { fontWeight: isCurrentTime ? 'bold' : 'normal' },
                ]}
              >
                {dateTime}
              </Text>
              <Text
                style={[
                  styles.priceText,
                  { fontWeight: isCurrentTime ? 'bold' : 'normal' },
                ]}
              >
                {hinta.PriceWithTax}
              </Text>
            </View>
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
  contentContainer: {
    paddingTop: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  dateText: {
    fontSize: 35,
    flex: 1,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 35,
    flex: 1,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 35,
    flex: 1,
    textAlign: 'center',
  },
  boldText: {
    fontSize: 35,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

