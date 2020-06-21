import React,{Component} from 'react';
import { View,Text,StyleSheet} from 'react-native';
import Question from './Question';

class Quiz extends Component {
    state={
        questions:this.props.route.params.questions,
        noOfCards:this.props.route.params.noOfCards
    }

    render(){
        return(
           <View style={styles.container}>
                   {this.state.noOfCards > 0 ? 
                   <View>
                       <Question question = {this.state.questions[0]}/>
                    </View> 
                    : <Text>Sorry, there are no cards added to this deck</Text>}
           </View> 
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
}
)
export default Quiz;