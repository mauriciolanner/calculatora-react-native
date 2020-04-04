import React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    Button,
    View
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#2d2d2d',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#0c0c0c',
        color: '#fff',
    },
    escuros: {
        backgroundColor: '#191919',
    },
    laranja: {
        backgroundColor: '#c73d00',
    },
    ButtonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
        color: '#fff',
    },
    ButtonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
        color: '#fff',
    }
})

export default props => {
    const stylesButton = [styles.button]
    if (props.double) stylesButton.push(styles.ButtonDouble)
    if (props.triple) stylesButton.push(styles.ButtonTriple)
    if (props.escuro) stylesButton.push(styles.escuros)
    if (props.laranja) stylesButton.push(styles.laranja)
    return (
        <TouchableHighlight onPress={props.onClick}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}