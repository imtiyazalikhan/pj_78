import React, { Component } from 'react';
import { View , StyleSheet , Text , Image , TouchableOpacity , TextInput , Alert , Modal, ScrollView,KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible:"false",
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',

    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.peops.navigation.navigate('Donate')
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,comfirempassword) =>{
    if(password!==confirmPassword){
      return(
        Alert.alert("password does not match ")
      )
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      db.collection('users').add({ 
        first_name:this.state.firstName,
         last_name:this.state.lastName,
          contact:this.state.contact, 
          email_id:this.state.emailId, 
          address:this.state.address 
        }) 
      return Alert.alert( 'User Added Successfully', '', [
         {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})}, ]
          ); 
        })


    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });}
  }

showModal=()=>{
  return(
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
      <View>
    <ScrollView>
    <KeyboardAvoidingView>
      <Text>registration</Text>
      <TextInput 
       style={styles.formTextInput}
       placeholder={"first name"}
       maxLength={10}
       onChangeText={(text)=>{
         this.setState({
           firstName:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"last name"}
       maxLength={10}
       onChangeText={(text)=>{
         this.setState({
           lastName:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"contact"}
       maxLength={10}
       keyboardType={'numeric'}
       onChangeText={(text)=>{
         this.setState({
           contact:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"address"}
       multiline={true}
       onChangeText={(text)=>{
         this.setState({
           address:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"email"}
       keyboardType={'email-address'}
       onChangeText={(text)=>{
         this.setState({
           emailId:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"password"}
       secureTextEntry={true}
       onChangeText={(text)=>{
         this.setState({
           password:text
         })
       }}
       />
        <TextInput 
       style={styles.formTextInput}
       placeholder={"comfirempassword"}
       secureTextEntry={true}
       onChangeText={(text)=>{
         this.setState({
           confirmPassword:text
         })
       }}
       />

       <View>
       <TouchableOpacity 
         style={styles.registerButton}
         onPress={()=>{
           this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
         }}
         >
           <Text>register</Text>
         </TouchableOpacity>
       </View>
       <View>
       <TouchableOpacity 
         style={styles.registerButton}
         onPress={()=>{
           this.setState({"isModalVisible":false})
         }}
         >
           <Text>censil</Text>
         </TouchableOpacity>
       </View>
    </KeyboardAvoidingView>
    </ScrollView>
      </View>
    </Modal>
  )
}

  render(){
    return(
      <View style={styles.container}>
        <View>
          {this.showModal}
        </View>
        <View style={styles.profileContainer}>
         
          <Text style={styles.title}>Barter system</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@bartersystem.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles=StyleSheet.create({
    container:{
         flex:1,backgroundColor:'#1aa3ff'
         },
    title :{
         fontSize:70, 
         fontWeight:'300', 
         paddingBottom:30, 
         color : '#ccffcc' 
        },
profileContainer:{
     flex:1, 
     justifyContent:'center', 
     alignItems:'center', 
    },
    loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 20,
        margin:10,
        paddingLeft:10
      },
button:{
     width:400, 
     height:40, 
     justifyContent:'center', 
     alignItems:'center', 
     borderRadius:25, 
     backgroundColor:"#1aff1a", 
     shadowColor: "#000000",
      shadowOffset: { 
          width: 0, 
          height: 30, 
        }, 
        shadowOpacity: 0.30, 
        shadowRadius: 10.32, 
        elevation: 16, 
    },
buttonText:{ 
    color:'#000000', 
    fontWeight:'400', 
    fontSize:20 },
})