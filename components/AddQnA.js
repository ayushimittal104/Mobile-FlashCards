import React,{Component} from 'react';
import { View,Text,TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addCard } from '../utils/Data';

class AddQnA extends Component{
    state = {
        title:this.props.route.params.title,
        ques:"",
        ans:""
    }

    addQues = (value) =>{
        this.setState({ques:value})
    }

    addAns = (value) =>{
        this.setState({ans:value})
    }

    submit = () =>{
        addCard(this.state.title,this.state.ques,this.state.ans)
        this.props.navigation.navigate('SingleDeck',{title:this.state.title})
    }
    
    render(){
        return(
            <View style={styles.container}>
                 <TextInput style={styles.input} placeholder="Enter the Question" value={this.state.ques} onChangeText={this.addQues}></TextInput>
                 <TextInput style={styles.input} placeholder="Enter the Answer" value={this.state.ans} onChangeText={this.addAns}></TextInput>
                 <TouchableOpacity style={styles.button} onPress={this.submit}><Text style={styles.text}>SUBMIT</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:"white"
        // justifyContent: 'center',
      },
    text:{
        fontSize: 30,
        textAlign:"center",
        color:"white"
    },
    input:{
        alignSelf:"stretch",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        textAlign: "center",
        padding :10,
        margin:20,
    },
    button:{
        alignSelf:"center",
        width:200,
        padding:10,
        height:60,
        borderRadius: 5,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        margin:10,
        backgroundColor: "#000",
    }
})

export default AddQnA;