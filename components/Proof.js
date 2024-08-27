import React, { useEffect, useState } from "react";
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
    const [proof, setProof] = useState(null)
    const [proofList, setProofList] = useState([1]);

    useEffect(()=>{
        console.log("Bree");
    },[])

    return <Block padding={[20, 0, 0, 0]}>
        <Text light>Share proof of climate competence in your local language.</Text>
        <Block row>
            <TextInput style={styles.input} onChangeText={setProof} label="Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community record"
                mode="outlined" keyboardType="default" theme={{ colors: { text: 'white' } }} />
            <TouchableOpacity style={styles.btn} onPress={() => {
                const proofLocal = proofList;
                proofLocal.push(proofLocal.length + 1)
                setProofList(proofLocal);
                console.log(proofList);
            }}>
                <Ionicons name="add-circle" size={50} color={COLORS.darkgreen} />
            </TouchableOpacity>
            
        </Block>
        {
            proofList.map((val) => {
                return <Block row>
                    <TextInput style={styles.input} onChangeText={setProof} label="Eg., a link to news articles, images or posters, TV segment, radio segments, interview or community record"
                        mode="outlined" keyboardType="default" theme={{ colors: { text: 'white' } }} />
                  
                    <TouchableOpacity style={styles.btn} onPress={() => {
                    }}>
                        <Ionicons name="remove-circle" size={50} color={COLORS.red} 
                        onPress={()=>{
                            const proofLocal = proofList;
                            proofLocal.push(proofLocal.filter(pr=> pr != val))
                            setProofList(proofLocal);
                            console.log(proofList);   
                        }}
                        />
                    </TouchableOpacity>
                </Block>
            })
        }

    </Block>
};

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginTop: 5
    },
    btn: {
        justifyContent: "flex-end"
    }
});

export default Proof;
