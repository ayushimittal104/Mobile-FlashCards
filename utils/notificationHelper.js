import React from 'react';
import {Notifications} from 'expo';
import {Permissions} from 'expo-permissions';
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
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
            //   tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(23)
              tomorrow.setMintutes(26)

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem('notification', JSON.stringify(true))
            }
          })
      }
    })
}