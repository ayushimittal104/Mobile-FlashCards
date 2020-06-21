import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {correctAns} from '../utils/Data';
class Answer extends Component{
    state={
        answer:this.props.route.params.answer
    }

    correctAns = () =>{
        correctAns()
        this.props.navigation.navigate('Question',{nextQues:true})
    }

    incorrectAns = () =>{
        this.props.navigation.navigate('Question',{nextQues:true})
    }
    
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.answer}>
                {this.state.answer}
            </Text>
            <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Question',{nextQues:false})}}>
                <Text style={{fontSize:20,color:"red"}}>
                    Show Question
                </Text>
            </TouchableOpacity>
            <View style={{position:"absolute",bottom:0}}>
            <Text style={{fontSize:20,textAlign:"center"}}>
                You guessed it ?
            </Text>
            <TouchableOpacity style={[styles.button,{backgroundColor:"green",borderColor: "green"}]} onPress={() =>this.correctAns()}>
                <Text style={styles.buttonTxt}>
                    Correct
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:"red",borderColor: "red"}]} onPress={() =>this.incorrectAns()}>
                <Text style={styles.buttonTxt}>
                   Incorrect
                </Text>
            </TouchableOpacity>
            </View>
        </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        // justifyContent: 'center',
      },
      answer:{
        fontSize: 50,
        textAlign:"center",
        margin:10,
      },
      button:{
        alignSelf:"center",
        width:200,
        padding:10,
        height:60,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 2,
        margin:10,
        backgroundColor: "#000",
    },
    buttonTxt:{
        color:"white",
        fontSize:20,
        textAlign:"center"
    }
    })
export default Answer;