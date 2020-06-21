import React,{Component} from 'react';
import { Text, View, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import {addDeck,getData} from '../utils/Data';
class AddDeckView extends Component{
    state = {
        deck:"",
        err:""
    }

    deckName = (value) =>{
        this.setState((state) => ({
            ...state,
                deck:value,
                err:""     
        }))
    }

    addDeck = () => {
        if(this.state.deck !=""){
            let deck={
                title: this.state.deck,
                noOfCards: 0,
                questions:[]
              };
              getData().then((decksInfo) => {
               if(decksInfo){
                    let d=  JSON.parse(decksInfo)
                    if(d.hasOwnProperty(this.state.deck)){
                        this.setState({err:"Deck with this name exists" })
                    }
                    else{
                        addDeck(deck)
                        this.setState({deck:""})
                        this.props.navigation.push('SingleDeck',{title:deck.title})
                    }
                }
                else{
                    addDeck(deck)
                    this.setState({deck:""})
                    this.props.navigation.push('SingleDeck',{title:deck.title})
                }
            })

        }
        else{
            this.setState({err:"Add a title for a new deck"})
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>What is the title of your new deck ?</Text>
                <TextInput style={styles.input} placeholder="Deck Title" value={this.state.deck} onChangeText={this.deckName}></TextInput>
                <Text style={{color:"red"}}>{this.state.err ? this.state.err : ""}</Text>
                <TouchableOpacity style={styles.button} onPress={this.addDeck}><Text style={{color:"white",textAlign:"center"}}>SUBMIT</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#fff"
      },
    text:{
        fontSize: 50,
        textAlign:"center"
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
        backgroundColor: "#000",
        padding:10,
        height:40,
        borderRadius: 5
    }
})
export default AddDeckView;