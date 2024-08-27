import React, { useState } from "react";
import Block from './Block';
import Text from './Text';
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

const Proof = () => {
     //     *
    // Share proof of climate competence in your local language.
    // Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community recordings, documentaries, speeches or presentations
    // OR any other locally available material.
    // *
    const [proofList, setProofList] = useState([{ id: 1, value: '' }]);

    const handleInputChange = (id, text) => {
        setProofList(proofList.map(item => item.id === id ? { ...item, value: text } : item));
    };

    const handleAddProof = () => {
        setProofList([...proofList, { id: proofList.length + 1, value: '' }]);
    };

    const handleRemoveProof = (id) => {
        setProofList(proofList.filter(item => item.id !== id));
    };

    return (
        <Block padding={[20, 0, 0, 0]}>
            <Text light>Share proof of climate competence in your local language.</Text>
            <Text>Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community recordings, documentaries, speeches or presentations.</Text>
            
            {
                proofList.map((item, index) => (
                    <Block key={item.id} row>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => handleInputChange(item.id, text)}
                            value={item.value}
                            label={`Proof ${index + 1} `}
                            mode="outlined"
                            keyboardType="default"
                            theme={{ colors: { text: 'white' } }}
                        />
                        <TouchableOpacity style={styles.btn} onPress={() => handleRemoveProof(item.id)}>
                            <Ionicons name="remove-circle" size={50} color={COLORS.red} />
                        </TouchableOpacity>
                    </Block>
                ))
            }
            <TouchableOpacity style={styles.btn} onPress={handleAddProof}>
                <Ionicons name="add-circle" size={50} color={COLORS.darkgreen} />
            </TouchableOpacity>
        </Block>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginTop: 5
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    }
});

export default Proof;
