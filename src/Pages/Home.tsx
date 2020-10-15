import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PillButton, CloseButton } from '../common/C9Button';
import C9Colors from "../common/C9Colors";

export default function Home() {
    return (
        <View style={styles.root}>
            <span>{'hello, react-native-web'}</span>
            <PillButton
                style={{
                    backgroundColor: C9Colors.glowPurple,
                    paddingVertical: 12,
                    borderRadius: 8,
                }}
                textStyle={{
                    color: 'white',
                    fontSize: 16,
                }}
                text={'Submit'}
                onPress={() => window.location.href = 'https://glowing.com'}
            />
            <CloseButton imageStyle={{
                width: 24,
                height: 24,
            }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        height: '100vh',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

