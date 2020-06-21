import React,{Component} from 'react';
import { FlatList,Text, View,StyleSheet, ActivityIndicator } from 'react-native';
import {getData} from '../utils/Data';
import Deck from '../components/Deck';
class HomeView extends Component{
    state = {decks: "",showLoader:true}
    
    componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        getData().then((decksInfo) => {
            this.setState({decks:JSON.parse(decksInfo),showLoader:false})
        })
      });
    }
  
    componentWillUnmount() {
      this._unsubscribe();
    }
    render(){
        return(
            <View style={styles.container}>
                {this.state.showLoader ? <ActivityIndicator style={styles.loader} size="large" color="#0000ff"/> :
                <View  style={styles.deckContainer}>
                    <Text style={styles.mainTitle}>DECKS</Text>
                    {this.state.decks ?
                        <FlatList style={styles.deckContainer}
                        data={Object.keys(this.state.decks)}
                        keyExtractor = {(index) => index+1}
                        renderItem={({item,index}) => ( 
                        <Deck key={index+1} deck={this.state.decks[item]} navigation={this.props.navigation} />
                        )}
                        />
                        : <Text style={{textAlign:"center"}}> NO DECKS..Add a one</Text>}
                </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    loader:{
       margin:20 
    },
    deckContainer:{
       width: "100%",
    },
    mainTitle:{
        fontSize: 50,
        textAlign:"center"
    },
  });

export default HomeView;