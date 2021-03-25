import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Loader = ({ visible }) => {
    if (visible) {
        return (
            <View style={styles.background}>
                <View style={styles.imageSize}>
                    <Image source={require('../../assets/lightning200.gif')} />
                </View>
            </View>
        )
    } else {
        return null;
    }
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: '#fff',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loader;