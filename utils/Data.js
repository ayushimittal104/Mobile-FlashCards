import {AsyncStorage} from 'react-native';

const DeckStorageKey = "Decks";

export const addDeck = (deck) =>{
    getData().then((value) => {
        let data = "";
        if (value !== null) {
            data = JSON.parse(value);
            data[deck.title] = deck
        }
        else{
            data = new Object();
            data[deck.title] = deck
        }
            return AsyncStorage.setItem(DeckStorageKey,JSON.stringify(data))
    })
}

export const getData = () =>{
    return  AsyncStorage.getItem(DeckStorageKey);
}

export const removeItem = (title) =>{
    let data = "";
    getData().then((value) =>{
        data= JSON.parse(value)
        delete(data[title])
    return AsyncStorage.setItem(DeckStorageKey,JSON.stringify(data))
    })
}

export const addCard = (title,ques,ans) =>{
    let data = "";
    getData().then((value) =>{
        data= JSON.parse(value)
        data[title].questions.push({question:ques,answer:ans})
        data[title].noOfCards = data[title].noOfCards + 1
        return AsyncStorage.setItem(DeckStorageKey,JSON.stringify(data))
    })
}

export const correctAns =() =>{
    let c = 0;
    AsyncStorage.getItem('correctAnswers').then((data) =>{
        if(JSON.parse(data) == null){
            c = 1;
        }
        c = JSON.parse(data) + 1
        AsyncStorage.setItem('correctAnswers',JSON.stringify(c))
    })
}

export const getCorrectAns = () =>{
    return  AsyncStorage.getItem('correctAnswers');
}

export const resetResult = () =>{
    return AsyncStorage.removeItem('correctAnswers')
}