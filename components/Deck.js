import React,{Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Deck extends Component{
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity  onPress={() =>this.props.navigation.navigate("SingleDeck",{title:this.props.deck.title})} >
                <Text style={styles.deckTitle} >
                    {this.props.deck.title}
                </Text>
                <Text style={styles.cardsQuantity}>
                    {this.props.deck.noOfCards >1 ? `${this.props.deck.noOfCards} Cards` : `${this.props.deck.noOfCards} Card`}
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container :{
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        margin: 5,
        minHeight:100
    },
    deckTitle :{
        textAlign: "center",
        fontSize: 30
    },
    cardsQuantity :{
        textAlign: "center"
    }
})

export default Deck;