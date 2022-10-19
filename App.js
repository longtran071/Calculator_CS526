import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CalcKeys from "./components/CalcKeys.js";
import OperatorKeys from "./components/OperatorKeys.js";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display:"",
      numerator:"",
      denominator:"",
      operator:"",
      his: [],
      his_view: "",
      switchFractionSection:false
      }
  }

  clear(){
    this.setState((state, props) => ({ display:"", his_view: state.his[0]}));  
  }

  evalutate(x,y,operator){
    if(operator == "+" ){
      this.setState((state, props) => ({ display: parseInt(x) + parseInt(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))
      this.state.his.unshift(x + ' + ' + y);
      this.setState((state, props) => ({ his: state.his }))
    }else if(operator == "-"){
      this.setState((state, props) => ({ display: parseInt(x) - parseInt(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))   
      this.state.his.unshift(x + ' - ' + y)
      this.setState((state, props) => ({ his: state.his }))     
    }else if(operator == "x"){
      this.setState((state, props) => ({ display: parseInt(x) * parseInt(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))  
      this.state.his.unshift(x + ' * ' + y)
      this.setState((state, props) => ({ his: state.his }))       
    }else {
      this.setState((state, props) => ({ display: parseInt(x) / parseInt(y) }))
      this.setState((state, props) => ({ switchFractionSection: false }))    
      this.state.his.unshift(x + ' / ' + y)
      this.setState((state, props) => ({ his: state.his }))     
    }
      
    //Clear state for next operation
    this.setState((prevState) =>({denominator:""}))
    this.setState((prevState) =>({numerator:""}))
  }

  addNumber(x){
    //show the number clicked on the display. IF this is the first number saved it is save as the denominator If this is the second number enter, it is saved as the numerator.  
    this.setState((state, props) => ({ display: state.display + x }))    
    if(this.state.switchFractionSection ==true){
      this.setState((state, props) =>({denominator:state.denominator + x}))
    }else{
      this.setState((state, props) => ({numerator:state.numerator + x}))
    }
    
    this.setState((state, props) => ({his_view: this.history_search(this.state.his, this.state.display)}))
  }

  operatorSymbol(x){
    
    //If display already have a number and the user press a operator button, then the current display number is save as the numerator
    if(this.state.numerator == "" && this.state.switchFractionSection == false){
        this.setState((state, props) => ({numerator:this.state.display}))
    }
      
    this.setState((state, props)=>({display:state.display + x}))
    this.setState((state, props) => ({ operator: x }))
    this.setState((state, props) => ({switchFractionSection:true }))
    this.setState((state, props) => ({his_view: this.history_search(this.state.his, this.state.display)}))
  }

  history_search(his, display){
    for(let i = 0; i < his.length; i++){
      if(his[i].includes(display)){
        return his[i];
      }
    }
    return "";
  }    
  render() {
    return (
      <View style={styles.container}>
        <View >
            <Text style={styles.title}>Calculator</Text>
        </View>
        <View style={styles.display}>
            <Text style={styles.title}>{this.state.display}</Text>
        </View>
        <View style={styles.display}>
            <Text style={styles.title}>{this.state.his_view}</Text>
        </View>
        <View style={styles.calcKeyRow}>
            <CalcKeys displayKey="1" onClick={()=> this.addNumber("1")} />
            <CalcKeys displayKey="2" onClick={()=> this.addNumber("2")} />
            <CalcKeys displayKey="3" onClick={()=> this.addNumber("3")} />
        </View>
        <View style={styles.calcKeyRow}>
            <CalcKeys displayKey="4" onClick={()=> this.addNumber("4")} />
            <CalcKeys displayKey="5" onClick={()=> this.addNumber("5")} />
            <CalcKeys displayKey="6" onClick={()=> this.addNumber("6")} />
        </View>
        <View style={styles.calcKeyRow}>
            <CalcKeys displayKey="7" onClick={()=> this.addNumber("7")} />
            <CalcKeys displayKey="8" onClick={()=> this.addNumber("8")} />
            <CalcKeys displayKey="9" onClick={()=> this.addNumber("9")} />
        </View>
        <View style={styles.calcKeyRow}>
            <CalcKeys displayKey="0" onClick={()=> this.addNumber("0")} />
            <CalcKeys onClick={()=> this.clear()} displayKey="AC" />
            <CalcKeys displayKey="=" onClick={()=> this.evalutate(this.state.numerator, this.state.denominator, this.state.operator)} />
        </View>
        <View style={styles.calcKeyRow}>
            <OperatorKeys displayKey="+" onClick={()=> this.operatorSymbol("+")} />
            <OperatorKeys displayKey="-" onClick={()=> this.operatorSymbol("-")} />
            <OperatorKeys displayKey="*" onClick={()=> this.operatorSymbol("x")} />
            <OperatorKeys displayKey="/" onClick={()=> this.operatorSymbol("/")} />
        </View>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
    justifyContent:"space-around",
  },
    
  display:{
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    backgroundColor:"white",
    width:"70%",
    height:"10%",
    //textAlign:"center",
  },
    
  title: {    
    color:"goldenrod",
    textAlign:"center",
    fontSize:36,
  },
    
  calcKeyRow:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    width:"100%",
  }
});