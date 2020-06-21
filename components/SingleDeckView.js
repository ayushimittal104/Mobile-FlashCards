import React,{Component} from 'react';
import {Text,Animated, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getData,removeItem} from '../utils/Data';

class SingleDeckView extends Component{
    state ={
        title:this.props.route.params.title,
        deck:"",
        opacity : new Animated.Value(0),
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.navigation.setOptions({
                title: this.state.title})
            const {opacity} = this.state;
            Animated.timing(opacity,{toValue:1,duration:1000}).start();
            getData().then((data) =>{
                    let deckInfo= JSON.parse(data)
                this.setState({deck:deckInfo[this.state.title]})
            })
          });
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    render(){
        const {deck,opacity} = this.state;
        return(
            <Animated.View style={[styles.container,{opacity}]}>
                <Text style={{fontSize:40}}>
                   {deck.title}
                </Text>
                <Text>
                    {deck.noOfCards>1 ? `${deck.noOfCards} Cards` : `${deck.noOfCards} Card`} 
                </Text>
                <TouchableOpacity style={[styles.button,{backgroundColor:"white"}]} onPress={() =>this.props.navigation.navigate('AddCard',{title:deck.title})}>
                    <Text style={[styles.buttonTxt,{color:"black"}]}>
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor:"black"}]} onPress={() =>{this.props.navigation.navigate("Question",{questions:deck.questions,noOfCards:deck.noOfCards})}}>
                    <Text style={[styles.buttonTxt,{color:"white"}]}>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{removeItem(this.state.title),this.props.navigation.navigate('Decks')}}>
                    <Text style={{color:"red",fontSize:20}}>Delete Card</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
      },
      button:{
          width:200,
          padding:10,
          height:60,
          borderRadius: 5,
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: 2,
          margin:10
      },
      buttonTxt:{
        fontSize:30,
        textAlign:"center"
      }
})
export default SingleDeckView