import React from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {AsyncStorage} from 'react-native';

export const clearNotification = () =>{
    return AsyncStorage.removeItem('notification')
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
 
const createNotification = () =>{
    return({
        title: 'Come and Play',
        body: "Don't forget to play a quiz today"
    })

}

export const setNotification = () =>{
    AsyncStorage.getItem('notification')
    .then((data) =>JSON.parse(data))
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let t = new Date();
              t.setDate(t.getDate() + 1)
              t.setHours(20)
              t.setMinutes(0)
              const schedulingOptions = {
                  time: t,
                  repeat: "day"
                };
              Notifications.scheduleLocalNotificationAsync(createNotification(), schedulingOptions);
              AsyncStorage.setItem('notification', JSON.stringify(true))
            }
          })
      }
    })
}


