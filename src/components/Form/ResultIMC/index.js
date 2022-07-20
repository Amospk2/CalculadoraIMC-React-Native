import React from 'react';
import {Text, View, TouchableOpacity, Share} from 'react-native';
import styles from './style';

export default function ResultIMC(props){

    const OnShare = async () => {
        const result = await Share.share({
            message:"Meu IMC hoje é:"+props.ResultIMC,
        })
    }

    return (
        <View style={styles.ResultIMC}>
            <View style={styles.boxShareButton}>
            <Text style={styles.information}>{props.messageResultIMC}</Text>
            <Text style={styles.number}>{props.ResultIMC}</Text> 
                <TouchableOpacity style={styles.shared} onPress={OnShare}>
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}
