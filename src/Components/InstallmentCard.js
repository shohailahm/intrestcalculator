import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';


export default class Installments extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <View style={{flex:1}}>
            <View style={styles.card}>
            {this.props.children}
            </View>
            <View>
            <Text>
            50,000 Penalty
            </Text>
            <Text>
            0.12 % daily irr,
            </Text>
            <Text>
            0.1% per day after 7 days
            </Text>
            <Text>
            0.1% for 17 days and 0.15% until 23rd day
            </Text>
            </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    card:{
        backgroundColor:'#D3D3D3',
         width:320,
         borderRadius:8,
         borderColor:'gray',
         borderWidth: 0.5,
         marginHorizontal: 8,
         marginVertical:8,
         padding:16
    }
})