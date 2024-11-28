import React, { useState } from "react";
import Block from './Block';
import Text from './Text';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants";
import { Menu, TextInput } from "react-native-paper";

const Loaction = ({ foundTribe }) => {
    const [visibleMenu, setVisibleMenu] = useState(true);
    const [typeLocation, setTypeLocation] = useState(0);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [nameTribe, setNameTribe] = useState(null);
    const [linkTribe, setLinkTribe] = useState(null);

    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);


    {/* name of the location
    - coordinates, gold
    - a link if you know how to share it: */}
    return <Block >
        <Menu visible={visibleMenu}
            onDismiss={closeMenu}
            anchor={
                <TouchableOpacity style={styles.btn} onPress={openMenu}>
                    <Ionicons name="location" size={30} color={COLORS.white} style={styles.icon} />
                    <Text style={{ color: COLORS.white }}>Add the location of your tribe</Text>
                </TouchableOpacity>
            }
        >
            <Menu.Item leadingIcon="pin" title="Coordinates" onPress={() => {
                console.log("Cood");
                setTypeLocation(1)
                closeMenu();
            }} />
            <Menu.Item leadingIcon="pen" title="Name of the location" onPress={() => {
                console.log("pen");
                setTypeLocation(2)
                closeMenu()

            }} />
            <Menu.Item leadingIcon="web" title="Link" onPress={() => {
                console.log("link");
                setTypeLocation(3)
                closeMenu()

            }} />
        </Menu>

        {

            typeLocation === 1 ?
                <Block row space="between" >
                    <TextInput style={styles.input} onChangeText={setLat} label="Latitude" mode="outlined" keyboardType="default" />
                    <TextInput style={styles.input} onChangeText={setLong} label="Longitude" mode="outlined" keyboardType="default" />
                </Block> :
                typeLocation === 2 ?
                    <TextInput onChangeText={setNameTribe} label="Name of the location" mode="outlined" keyboardType="default" />
                    :
                    typeLocation === 3 ?
                        <TextInput onChangeText={setLinkTribe} label="A link if you know how to share it"
                            mode="outlined" keyboardType="url" />
                        : null
        }

    </Block>
};

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 5,
    },
    btn: {
        backgroundColor: COLORS.gray,
        padding: SIZES.base,
        width: "100%",
        borderRadius: SIZES.radius,
        elevation: 2,
        marginTop: SIZES.base * 1.8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    input: {
        width: "48%",
    }
});

export default Loaction;
