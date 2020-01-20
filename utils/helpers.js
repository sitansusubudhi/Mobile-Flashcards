import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { FLASHCARDS_NOTIFICATION_KEY } from './_DATA';

function createNotification () {
  return {
    title: 'Learn new terms!',
    body: "👋 Don't forget to practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  };
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              // tomorrow.setTime(tomorrow.getTime() + 1 * 10000);
              // console.log('Local notification ', tomorrow);

              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(6);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              );

              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}