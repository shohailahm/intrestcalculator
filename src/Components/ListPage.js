import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,ScrollView} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
 import Installments from './InstallmentCard';
import moment from 'moment';
import Expo from 'expo';

export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
 
            DateText: 'Select Date',
            amount:'',
            DateHolder: null,
            today:moment(),
            show:false,
            duration:0,


            
        
        }
    }

   
  DatePickerMainFunctionCall = () => {
 
    let DateHolder = this.state.DateHolder;
 
    if(!DateHolder || DateHolder == null){
 
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
    this.refs.DatePickerDialog.open({
 
      date: DateHolder,
 
    });
 
  }

onDatePickedFunction = (date) => {
    this.setState({
      loanDate: date,
      DateText: moment(date).format('DD-MMM-YYYY')
    });
  }
  calculate=()=>{
      
     if(this.state.loanDate&&this.state.loanDate<=this.state.today&&this.state.amount){
      let duration=Math.abs(this.state.today.diff(this.state.loanDate, 'days'))+1
       this.setState({duration},()=>{
          let Intrest= this.getIntrest();
          if(Intrest>0){
          this.setState({Intrest:parseInt(Intrest),show:true},()=>{
            Expo.Notifications.scheduleLocalNotificationAsync({title:'Your Intrest for today is',body:`${this.state.Intrest}`},{time:((new Date()).getTime() + 10000),repeat:'day'});
          });
           }else{
            this.setState({Intrest:'no intrest till 7 days',show:true});
          }
          if(this.state.duration>=23){
            this.createInstallment(Intrest);
          }
       });
     }else{
         Alert.alert('Please Select date and amount','Date should be previous date');
     }
  }
  getIntrest=()=>{
  let val=this.state.duration;
      switch (true) {
          
          case (val<=7):
              return 0;
            case (val>=8 && val<=17):
               return (((0.1/100)*val)*this.state.amount);
               case (val>17 && val<=23):
               return (((0.1/100)*17)*this.state.amount)+(((0.15/100)*(val-17)*this.state.amount));
               case (val>23):
               return (((0.1/100)*17)*this.state.amount)+(((0.15/100)*5*this.state.amount));
          default:
          return 0;
      }
  }
  createInstallment=(int)=>{
      debugger
     let prinicapmonthly=parseInt(this.state.amount)/3;
     let penalty=50000;
     let firstmonthint=Math.round(parseInt(this.state.amount)*(0.12/100)*30);
     let secmonthint=Math.round(parseInt(prinicapmonthly+((this.state.amount-prinicapmonthly)*(0.12/100)*30)));
     let thirdmonthint=Math.round(parseInt(prinicapmonthly+((this.state.amount-prinicapmonthly*2)*((0.12/100)*30))));
     let Ftotal=firstmonthint+penalty+prinicapmonthly+int;
     let installments={
        firstmonthint:parseInt(Ftotal),
        secmonthint,
        thirdmonthint
     }
     this.setState({installments,install:true});
  }
    render(){
        return(
            <View style={styles.mainContainer}>
          
               <View style={styles.header}>
                   <Text style={styles.text}>Intrest Calculator</Text>
               </View>
               <ScrollView>
               <View style={{flex:1}}>
               <Text style={{color:'#000',fontSize:24,marginTop:8}}>Enter Details Here</Text>
               <View style={{flexDirection:'row',marginTop:8,justifyContent:'flex-start',alignItems:'center'}}>
                   <TextInput placeholder="Enter amount in IDR" placeholderTextColor="black" underlineColorAndroid={'transparent'} style={styles.textInput} onChangeText={(text)=>this.setState({amount:text})}>
                   </TextInput>
                    
                                <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
                        
                        <View style={styles.datePickerBox}>

                        <Text style={styles.datePickerText}>{this.state.DateText}</Text>

                        </View>

                                  </TouchableOpacity>

                             <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />

               </View>
               <View>
                   <TouchableOpacity style={styles.button} onPress={()=>this.calculate()}>
                       <Text style={{color:'#fff'}}>Submit</Text>
                   </TouchableOpacity>
               </View>
               <View>
               {this.state.Intrest && 
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}> 
                <View style={{alignItems:'flex-start',marginRight:24}}>
               <Text style={{color:'#000',fontWeight:'bold'}}>Intrest until today</Text>
               <Text style={{color:'#000'}}>{this.state.Intrest}</Text>
               </View>  
               <View style={{alignItems:'flex-end'}}>
               <Text style={{color:'#000',fontWeight:'bold'}}>Number of days</Text>
               <Text style={{color:'#000'}}>{this.state.duration}</Text>
               </View>
               </View>}
               </View>
               <View>
              {this.state.installments &&
                 <Installments>
                <Text style={{color:'#000',fontWeight:'bold',alignSelf:'center'}}>Installment Proposal</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                <Text style={{color:'#000',fontWeight:'bold'}}>
                First-Installment :
                </Text>
               <Text style={{color:'#000',}}>
               {this.state.installments.firstmonthint}
               </Text>
               </View>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                <Text style={{color:'#000',fontWeight:'bold'}}>
                Second-Installment :
                </Text>
               <Text style={{color:'#000'}}>
               {this.state.installments.secmonthint}
               </Text>
               </View>
               <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
                <Text style={{color:'#000',fontWeight:'bold'}}>
                Third-Installment :
                </Text>
                <Text style={{color:'#000'}}>
                {this.state.installments.thirdmonthint}
                </Text>
                </View>
               </Installments> }
               </View>
               </View>
               </ScrollView>
               
            </View>
        )
    }
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:'5%'
    },
    header:{
        backgroundColor:'#212f4a',
        height:60,
        alignItems:"flex-start",
        justifyContent:'center',
        width:'100%',
        
    },
    text:{
        color:'#fff',
        marginLeft:16,
        fontSize:16
    },
    textInput:{
   width:'50%',
   padding:8,
   marginHorizontal:4,
   borderColor:'#212f4a',
   borderWidth:0.5,
   borderRadius:8
    },
  datePickerBox:{
    borderColor: '#212f4a',
    borderWidth: 0.5,
    padding:4,
    borderRadius:8,
    height: 46,
    width:160
  },
 
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
    width:'99%',
    padding:8
  },
  button:{
   backgroundColor:'#00a2e2',
   paddingHorizontal:24,
   paddingVertical:8,
   marginTop:16,
   width:'30%',
   marginLeft:8,
   marginBottom: 16,
  }
})
