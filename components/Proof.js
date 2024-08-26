import React, { useState } from "react";
import Block from './Block';
import Text from './Text';
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";

const Proof = () => {
//     *
// Share proof of climate competence in your local language.
// Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community recordings, documentaries, speeches or presentations
// OR any other locally available material.
// *
const [proof, setProof] = useState(null)
   
    return <Block padding={[20,0,0,0]}>
        <Text light>Share proof of climate competence in your local language.</Text>
        <Block>
            <TextInput onChangeText={setProof} label="Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community record"
            mode="outlined" keyboardType="default" theme={{colors: {text: 'white'}}} />

        </Block>
      
    </Block>
};

const styles = StyleSheet.create({
    
});

export default Proof;
