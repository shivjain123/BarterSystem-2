import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Modal,
    KeyboardAvoidingView,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId : '',
      password: '',
      confirmPassword:'',
      firstName:'',
      lastName:'',
      address:'',
      phoneNumber:'',
      isVisible:false,
    }
  }
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }
  userSignUp = (emailId, password, confirmPassword) =>{
   if(password!= confirmPassword){
     return Alert.alert("Password does not match/nCheck Your Password")
   }else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      db.collection('users').add({
        first_name=this.state.firstName,
        last_name=this.state.lastName,
        phone_number=this.state.phoneNumber,
        address=this.state.address,
        email_id=this.state.emailId,
      })
 
return  Alert.alert(
  'User Added Successfully',
  '',
  [
    {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
  ]
);
})
.catch(function(error) {
// Handle Errors here.
var errorCode = error.code;
var errorMessage = error.message;
return Alert.alert(errorMessage)
});
}

}
showModal=()=>{
  <Modal
  animationType="fade"
  transparent={true}
  visible={this.state.isVisible}
  >
    <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}
            >Registration</Text>
              <TextInput
              style={styles.formTextinput}
              placeholder={"First Name"}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  firstName:text
                })
              }}
              />

            <TextInput
              style={styles.formTextinput}
              placeholder={"Last Name"}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  lastName:text
                })
              }}
              />

            <TextInput
              style={styles.formTextinput}
              placeholder={"Email Id"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId:text
                })
              }}
              />

            <TextInput
              style={styles.formTextinput}
              placeholder={"Password"}
              secureTextEntry ={true}
              onChangeText={(text)=>{
                this.setState({
                  password:text
                })
              }}
              />

           <TextInput
              style={styles.formTextinput}
              placeholder={"Confirm Password"}
              secureTextEntry ={true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword:text
                })
              }}
              />

            <TextInput
              style={styles.formTextinput}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                  address:text
                })
              }}
              />

            <TextInput
              style={styles.formTextinput}
              placeholder={"Phone Number"}
              keyboardType={'numeric'}
              maxLength={12}
              onChangeText={(text)=>{
                this.setState({
                  phoneNumber:text
                })
              }}
              />
              
              <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={()=>
                  this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                }
              >
              <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={()=>this.setState({"isVisible":false})}
              >
              <Text style={{color:'#ff5722'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
      </View>
</Modal>
}

  render(){
    return(
      <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <View style={styles.container}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            {
              this.showModal()
            }
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.title}>Barter</Text>
            <Text style={{color:'#ff8a65'}}> A Trading Method </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:55}}>USERNAME</Text>
            <View style={{alignItems:'center'}}>
              <TextInput
              style={styles.loginBox}
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  username: text
                })
              }}
              />
            </View>
            <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:55}}>PASSWORD</Text>
            <View style={{alignItems:'center'}}>
              <TextInput
                style={styles.loginBox}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
            </View>
            <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold',marginLeft:55}}>CONFIRM PASSWORD</Text>
            <View style={{alignItems:'center'}}>
              <TextInput
                style={styles.loginBox}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity
                style={[styles.button,{marginBottom:10}]}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                >
                <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.setState({"isVisible":true})}}
                >
                <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   marginTop: 50,
   color : '#ff3d00'
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
   width:"75%",
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#ff9800",
   elevation:10
  },
   buttonContainer:{
    flex:1,
 },
 modelContainer:{
  flex:1,
  borderRadius:20,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"#ffff",
  marginRight:30,
  marginLeft : 30,
  marginTop:80,
  marginBottom:80,
 },
 formTextinput:{
  width:"75%",
  height:35,
  alignSelf:'center',
  borderColor:'#ffab91',
  borderRadius:10,
  borderWidth:1,
  marginTop:20,
  padding:10
 },
 modelBackButton:{
  width:400,
  height:80,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:2,
  borderRadius:40,
 },
 registerButton:{
  width:200,
  height:40,
  alignItems:'center',
  justifyContent:'center',
  borderWidth:1,
  borderRadius:10,
  marginTop:30
 },
 registerButtonText:{
  color:'white',
  fontSize:15,
  fontWeight:'bold'
 },
 cancelButton:{
  width:"75%",
  height:50,
  justifyContent:'center',
  alignItems:'center',
  borderRadius:25,
  backgroundColor:"#ff9800",
  elevation:10
 }
})