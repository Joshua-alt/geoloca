
import React, { useLayoutEffect,useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { auth, db } from '../firebase';
import * as Location from 'expo-location';


const AddChatScreen = ({navigation}) => {
    const [input, setInput]= useState("");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

         
      })();
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
   console.log('.joshua',location.coords.latitude)
    }

  
    const createChat = async() =>{
        await db.collection('chats').add({
            chatName: input,
            username: auth?.currentUser?.displayName,
            location:location
        }).then(() => {
            navigation.goBack();
        })
        .catch((error)=> alert(error));
    }
    useLayoutEffect(()=>{
          navigation.setOptions({
              title: "Add a new demande",
              headerBackTitle:"demande",
          });
    }, [navigation]);
    return (
        <View style={styles.container}>
           
          <Input
           placeholder="Enter a chat name"
           value={input}
           onChangeText={(text)=> setInput(text)}
           onSubmitEditing={createChat}
           leftIcon={
               <Icon name="wechat" type="antdesign" size={24} color="black"/>
           }
           />
           <Button disabled={!input} onPress={createChat} title="create new chat"/>

        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{

    },
})
