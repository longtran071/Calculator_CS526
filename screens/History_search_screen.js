import react, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'

export default class History_search extends Component{
  constructor() {
    super()
    this.state = {
      resultText: "",
      caclculationText: "",
      history: Array(),
      bool: true
    }

    this.operations = ['DEL','+', '-', '*', '/']
  }

   history_search(his, text){
     a = []
    for(let i = 0; i < his.length; i++){
      if(his[i][0].includes(text)){
        a.push(<Text>{his[i][0] + ' = ' + his[i][1]}</Text>);
      }
    }
    return a;
  }    

  calculateResult(result_history){
    const text = this.state.resultText
    this.setState({
      history: this.history_search(result_history, text)
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

  buttonPressed(text, result_history) {

    if(text === '='){
      return this.validate() && this.calculateResult(result_history)
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }
  
  setHistory(result_history){
    this.state.history.push(result_history)
    this.setState({
      history: this.state.history
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
    const {route, navigation} = this.props
    const {history} = route.params
    let result_history = []
    for(let i = 0; i < history.length; i++){
      result_history.push(<View><Text>{history[i][0] + '=' + history[i][1]}</Text></View>)
    }

    if(this.state.bool){
      this.state.history.push(result_history)
      this.setState({
        history: this.state.history,
        bool: false
      })
    }

    let rows = []
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.',0,'=']]
    for(let i = 0; i < 4; i++){
      let row = []
      for (let j = 0; j < 3; j++){
        row.push(
          <TouchableOpacity key={nums[i][j]} onPress={() => this.buttonPressed(nums[i][j], history)} style={styles.btn}>
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
            <View style={styles.btnText && styles.white}><Text>{this.operations[i]}</Text></View>
          </TouchableOpacity>
        )
    }

    return(
      <View style={styles.container}>
        <View style={styles.result}>
          <ScrollView>
            {this.state.history}
          </ScrollView>
        </View>
        <View style={styles.caclculation}>
          <View style={styles.resultText}><Text>{this.state.resultText}</Text></View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
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
  },

  hisText: {
    fontSize: 30,
    border: 'solid'
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
    backgroundColor: 'white',
    border: 'solid'
  },

  buttons: {
    flex: 7,
    flexDirection: 'row',
  },

  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },

  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'
  }
})


