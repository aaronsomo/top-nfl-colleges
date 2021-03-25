import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Loader = ({ visible }) => {
    if (visible) {
        return (
            <View style={styles.background}>
                <Image style={styles.imageSize} source={require('../../assets/lightning_strike.gif')} />
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: '#d3d3d3',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageSize: {
        height: '100%',
        width: '100%',
    }
});

export default Loader;