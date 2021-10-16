import { Button, Input } from 'react-native-elements'
import React, {  useLayoutEffect, useState }from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { auth } from "../firebase"
import { StatusBar } from "expo-status-bar";
const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"back to login"
        });
        
    }, [navigation]);
    const Register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:
                   imageUrl ||
                    "https://i0.pngocean.com/files/831/88/865/user-profile-computer-icons-user-interface-mystique.jpg",
            });
        })
        .catch((error) => alert(error.message));
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text>Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input
                 placeholder="Full Name"
                 autoFocus
               
                 Type="text"
                 value={name}
                 onChangeText={(text)=> setName(text)}
                />
                 <Input
                 placeholder="Email"
                 autoFocus
      
                 Type="text"
                 value={email}
                 onChangeText={(text)=> setEmail(text)}
                />
                 <Input
                placeholder="Password"
                autoFocus
                secureTextEntry
                Type="text"
                value={password}
                onChangeText={(text)=> setPassword(text)}
               />
               <Input
                placeholder="Profile Picture url (optional)"
                Type="text"
                 value={imageUrl}
                 onChangeText={(text)=> setImageUrl(text)}
                 onSubmitEditing={Register}/>
            </View>
             <Button 
            style={styles.button} 
             raised
             onPress={Register}title="Register"/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: { flex:1,
        alignItems:"center",
        justifyContent: "center",
        padding: 10,
        backgroundColor:"white"

    },
    button: {
        width:200,
        marginTop:10,
    },
    inputContainer:{
        width:300,
    }
})
