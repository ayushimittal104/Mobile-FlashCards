import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons'; 
import HomeView from './components/HomeView';
import AddDeckView from './components/AddDeckView';
import {setNotification} from './utils/notificationHelper';
import SingleDeckView from './components/SingleDeckView';
import AddQnA from './components/AddQnA';
import Question from './components/Question';
import Answer from './components/Answer';
import Result from './components/Result';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const home = () =>{
  return(
    <Tab.Navigator 
        screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = <MaterialIcons  name="collections-bookmark" size={20} color="grey" />
          } else if (route.name === 'Add Deck') {
            iconName = <FontAwesome  name="plus-square" size={20} color="grey" />
          }
          return iconName
        },
        })}
        tabBarOptions={{
        style:{height:60},
        labelStyle:{fontSize:20},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Decks" component={HomeView} />
          <Tab.Screen name="Add Deck" component={AddDeckView} />
    </Tab.Navigator>
  )
}


export default class App extends Component {

  // componentDidMount() {
  //   setNotification()
  // }

  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home} options={{title:"Mobile FlashCards"}} />
        <Stack.Screen name="SingleDeck" component={SingleDeckView} options={{title:""}}/>
        <Stack.Screen name="AddCard" component={AddQnA} options={{title:"Add Card"}} />
        {/* <Stack.Screen name="Quiz" component={quiz} options={{title:"Quiz"}} /> */}
        <Stack.Screen name="Question" component={Question} />
    <Stack.Screen name="Answer" component={Answer} />
        <Stack.Screen name="Result" component={Result} options={{title:"Result"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

