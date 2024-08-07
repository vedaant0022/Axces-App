import { StyleSheet, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'

interface Props {
    loading: boolean,
    color?: string
}

const Loader: React.FC<Props> = ({ loading, color }) => {
    return (
        <>
            {
                loading &&
                <View style={styles.container}>
                    <FastImage style={{ width: 100, height: 100 }} resizeMode='contain' source={require('../../../assets/loader.gif')} />
                </View>
            }
        </>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0 ,0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
})