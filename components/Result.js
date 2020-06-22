import React,{Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCorrectAns,resetResult} from '../utils/Data';
import {clearNotification} from '../utils/notificationHelper';
class Result extends Component{
    state={
        correctAns:"",
        totalQues:this.props.route.params.noOfCards, 
        showResult: false
    }
    componentDidMount(){
        getCorrectAns().then((correct) =>{
            if(correct)this.setState({showResult:true,correctAns:correct})
            else this.setState({showResult:true,correctAns:0})
        })
        clearNotification()
        resetResult()
    }
    restart =() =>{
        this.props.navigation.navigate('Question',{restart:true,nextQues:false})
    }
    backToDeck = () =>{
        this.props.navigation.navigate('SingleDeck')
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    RESULT
                </Text>
                {this.state.showResult ? 
                <View style={{flex:1,justifyContent:"space-evenly"}}>
                    <Text style={styles.resultTxt}>
                        {this.state.correctAns} correct answers out of {this.state.totalQues} answers
                    </Text>
                    <View>
                    <TouchableOpacity style={[styles.button,{backgroundColor:"white"}]} onPress={()=>this.restart()}>
                        <Text style={[styles.buttonTxt,{color:"black"}]}>
                            Restart Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button,{backgroundColor:"black"}]} onPress={()=>this.backToDeck()}>
                        <Text  style={[styles.buttonTxt,{color:"white"}]}>
                            Back to Deck
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                : <Text></Text>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'space-around',
        padding:50
      },
      heading:{
          fontSize:30,
          fontWeight:"bold"
      },
      resultTxt:{
          fontSize:20
      },
      button:{
        alignSelf: "center",
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
export default Result;
