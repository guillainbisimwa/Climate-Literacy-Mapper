import React, { useState } from "react";
import Block from './Block';
import Text from './Text';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants";
import { Menu } from "react-native-paper";

const Loaction = () => {
    const [visibleMenu, setVisibleMenu] = useState(true);

    const openMenu = () => setVisibleMenu(true);
    const closeMenu = () => setVisibleMenu(false);


    {/* name of the location
    - coordinates, gold
    - a link if you know how to share it: */}
    return  <Block row space="between">
            <Menu visible={visibleMenu}
                onDismiss={closeMenu} 
                anchor={
                    <TouchableOpacity style={styles.btn}  onPress={openMenu}>
                    <Ionicons name="location" size={30} color={COLORS.white} style={styles.icon} />
                    <Text style={{ color: COLORS.white }}>Location of this tribe</Text>
                </TouchableOpacity>
                }
                >
                <Menu.Item leadingIcon="logout" title="Deconnexion" />
                <Menu.Item leadingIcon="logout" title="Deconnexion" />
                <Menu.Item leadingIcon="logout" title="Deconnexion" />


            </Menu>

           

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
    },
});

export default Loaction;
