import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  StatusBar
} from 'react-native';

import Button from './src/components/Button'
import Display from './src/components/Display'
import { render } from 'react-dom';

const inicialState = {
  DisplayValue: '0',
  cleaerDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {
  state = { ...inicialState }

  clearMemory = () => {
    this.setState({ ...inicialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, cleaerDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
        console.log(this.state.operation)
      } catch (e) {
        values[0] = 'error'
        console.log(e)
      }

      values[1] = 0
      this.setState({
        DisplayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        cleaerDisplay: !equals,
        values,
      })
    }
  }

  addDigit = n => {
    //logica para não deixar setar duas vezes o ponto
    if (n === '.' && this.state.DisplayValue.includes('.')) {
      return
    }
    //verificação para não ter repetição de zeros no inicio
    const cleaerDisplay = this.state.DisplayValue === '0' || this.state.cleaerDisplay
    //valor corrente é o valor do display
    const currentValue = cleaerDisplay ? '' : this.state.DisplayValue
    //concatena os valores digitados
    const DisplayValue = currentValue + n
    this.setState({ DisplayValue, cleaerDisplay: false })

    //se voce estiver digitando algo diferente de "." isso significa caracteres que devem ser exibido
    if (n !== '.') {
      const newValue = parseFloat(DisplayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Display value={this.state.DisplayValue} />
        <View style={styles.botoes}>
          <Button label='AC' escuro triple onClick={this.clearMemory} />
          <Button label='/' escuro onClick={() => this.setOperation('/')} />
          <Button label='7' onClick={() => this.addDigit(7)} />
          <Button label='8' onClick={() => this.addDigit(8)} />
          <Button label='9' onClick={() => this.addDigit(9)} />
          <Button label='*' escuro onClick={() => this.setOperation('*')} />
          <Button label='4' onClick={() => this.addDigit(4)} />
          <Button label='5' onClick={() => this.addDigit(5)} />
          <Button label='6' onClick={() => this.addDigit(6)} />
          <Button label='+' escuro onClick={() => this.setOperation('+')} />
          <Button label='1' onClick={() => this.addDigit(1)} />
          <Button label='2' onClick={() => this.addDigit(2)} />
          <Button label='3' onClick={() => this.addDigit(3)} />
          <Button label='-' escuro onClick={() => this.setOperation('-')} />
          <Button label='0' onClick={() => this.addDigit(0)} />
          <Button label='.' onClick={() => this.addDigit('.')} />
          <Button label='=' laranja double onClick={() => this.setOperation('=')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: 25,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
  },
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
