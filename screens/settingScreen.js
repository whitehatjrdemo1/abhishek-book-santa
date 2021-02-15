import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import Component from 'react'
import MyHeader from '../components/myHeader'
import firebase from 'firebase'

export default class SettingScreen extends Component{
    constructor(prop) {
        super(prop);
        this.state = {
            firstName: "",
            lastName: "",
            contact: "",
            address: "",
        }
    }

    getUserDetails() {
        var user = firebase.auth().currentUser
        email = user.email
        db.collection("users").where("email_ID", "==", email).get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.email_id, firstName: data.first_name, lastName: data.last_name, address: data.address, contact: data.contact, docId: doc.id
                    })
                }) 
        })
    }

    componentDidMount() {
        this.getUserDetails()
        updateUserDetails = () => {
            db.collection('users').doc(this.state.docId).update({
                "first_name": this.state.firstName, "last_name": this.state.lastName, "address": this.state.address, "contact": this.state.contact,
            })
            Alert.alert("Profile Updated Successfully")
        }
    }
    render() {
        return (
            <View>
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                </View>
            <View style = {styles.formContainer}>
                <TextInput style = {styles.formTextInput} placeholder = {"First Name"} maxLength = {8} onChangeText = {(text) => {
                    this.setState({firstName:text})
                }} value = {this.state.firstName}> 
                    </TextInput>
                    
                    <TextInput style = {styles.formTextInput} placeholder = {"Last Name"} maxLength = {8} onChangeText = {(text) => {
                    this.setState({lastName:text})
                    }} value={this.state.lastName}> 
                        </TextInput>
                        
                        <TextInput style = {styles.formTextInput} placeholder = {"contact"} keyboardType = "numeric" maxLength = {10} onChangeText = {(text) => {
                    this.setState({contact:text})
                    }} value={this.state.contact}> 
                        </TextInput>
                            
                            <TextInput style = {styles.formTextInput} placeholder = {"address"} multiline = {true} onChangeText = {(text) => {
                    this.setState({address:text})
                }} value = {this.state.address}> 
                    </TextInput>
                    
                    <TouchableOpacity style={styles.button} onPress={() => {
                       this.updateUserDetails() 
                    }}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                        
                </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    formContainer: { flex: 1, width: '100%', alignItems: 'center' },
    formTextInput: { width: "75%", height: 35, alignSelf: 'center', borderColor: '#ffab91', borderRadius: 10, borderWidth: 1, marginTop: 20, padding: 10, },
    button: { width: "75%", height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: "#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop: 20 }, buttonText: { fontSize: 25, fontWeight: "bold", color: "#fff" }
})