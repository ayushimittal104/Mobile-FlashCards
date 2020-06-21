import React,{Component} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Question extends Component{
    state={
        questions:this.props.route.params.questions,
        noOfCards:this.props.route.params.noOfCards,
        question:"",
        c:0
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            if(this.props.route.params.nextQues){
                if((this.state.c+1) < this.state.noOfCards)
                    this.setState({question:this.state.questions[this.state.c+1],c:this.state.c +1})
                else{
                    this.setState({c:0})
                    this.props.navigation.navigate('Result',{noOfCards:this.state.noOfCards})
                }
            }
            else if(this.props.route.params.restart){
                this.setState({c:0,question:this.state.questions[0]})
            }else{
                this.setState({question:this.state.questions[this.state.c]})
            }
        })
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    render(){
        return(
            <View style={styles.container}>
                {this.state.noOfCards > 0 ? 
                <View>
                <Text style={{alignSelf:'flex-start'}}>
                {this.state.c+1} / {this.state.noOfCards}
                </Text>
                <Text style={styles.question}>
                    {this.state.question.question}
                </Text>
                <TouchableOpacity onPress={() =>{this.props.navigation.push('Answer',{answer:this.state.question.answer})}}>
                    <Text style={{fontSize:20,color:"red",textAlign:"center"}}>
                        Show Answer
                    </Text>
                </TouchableOpacity>
                </View>
                 : <Text style={{fontSize:30,margin:10,textAlign:"center"}}>Sorry, there are no cards added to this deck</Text>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        padding:20
      },
      question:{
        fontSize: 50,
        textAlign:"center",
        margin:10,
      }
    })
export default Question;