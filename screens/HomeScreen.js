import React, {Component} from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native'

export default class CalculatorHome extends Component{

  constructor() {
    super()
    this.state = {
      resultText: "",
      caclculationText: "",
      history: []
    }

    this.operations = ['DEL','+', '-', '*', '/']
  }

  calculateResult(){
    const text = this.state.resultText
    this.setState({
      caclculationText: eval(text)
    })
    this.state.history.unshift([text, eval(text)])
    this.setState({
      history: this.state.history
    })
  }

  validate(){
    const text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text) {

    if(text === '='){
      return this.validate() && this.calculateResult()
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate(operations){
    switch(operations){
      case 'DEL':
        var text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break
        case '+':
        case '-':
        case '*':
        case '/':

          var lastChar = this.state.resultText.split('').pop()

          if(this.operations.indexOf(lastChar) > 0) return

          if(this.state.resultText === "") return
          this.setState({
            resultText: this.state.resultText + operations
          })

    }
  }

  render() {
    const {navigation} = this.props
    let rows = []
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for (let j = 0; j < 3; j++){
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View key = {i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for(let i = 0; i < 5; i++){
      ops.push(
          <TouchableOpacity key={this.operations[i]} onPress={()=> this.operate(this.operations[i])} style={styles.btn}>
            <Text style={styles.btnText && styles.white}>{this.operations[i]}</Text>
          </TouchableOpacity>
        )
    }

    return(
      <View style={styles.container}>
        <View style={styles.result}>
          <View style={styles.resultText}><Text>{this.state.resultText}</Text></View>
        </View>
        <View style={styles.caclculation}>
          <View style={styles.caclculationText}><Text>{this.state.caclculationText}</Text></View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
          <View style={styles.navi}><TouchableOpacity onPress={()=>{navigation.navigate('History', {history: this.state.history,})}} style={styles.navigation}><Text>{"<<"}</Text></TouchableOpacity></View>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  resultText: {
    fontSize: 30,
    color: 'black'
  },

  caclculationText: {
    fontSize: 24,
    color: 'black'
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  btnText:{
    fontSize: 30,
    color: 'white'
  },

  white:{
    color: 'white',
    // fontSize: 30
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  result: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  }, 

  caclculation: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },

  buttons: {
    flex: 7,
    flexDirection: 'row',
  },

  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },

  navi:{
    flex: 0.2
  },

  navigation:{
    flex: 1,
    backgroundColor: '#1de9b6',
    textAlign: 'center',
    justifyContent: 'space-around'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'
  }
})


