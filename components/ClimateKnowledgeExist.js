
import { useRef, useState } from "react";
import { Animated, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Block from './Block';
import Text from './Text';
import Location from "./Location";
import { COLORS, imagesConstants, SIZES } from "../constants";
import { LinearGradient } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button, Divider, Icon, List, MD3Colors, ProgressBar, SegmentedButtons, TextInput } from "react-native-paper";
import Proof from "./Proof";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Toast } from "toastify-react-native";
import { fetchTribeByName } from "@/redux/tribeSlice";

const ClimateKnowledgeExist = ({ tribeListBelongs }) => {
    const dispatch = useDispatch();

    const scrollX = useRef(new Animated.Value(0)).current;
    const { tribeList, isLoadingByName, errorByName, successByName, tribeByName } = useSelector((state) => state.tribe);

    const [selectedTribe, setSelectedTribe] = useState("MASAI");
    const [newTribe, setNewTribe] = useState(null);
    const [newTribeSearch, setNewTribeSearch] = useState(null);
    const [errorTribeNext, setErrorTribeNext] = useState(false);
    const [images, setImages] = useState([]);
    const [loadPic, setLoadPic] = useState(false);
    const [ans, setAns] = useState('');
    const [foundTribe, setFoundTribe] = useState(null)

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    console.log("tribeListBelongs", tribeListBelongs);

    const checkIfTribeExists = (val) => {
        console.log("ok", val);
        setNewTribeSearch(val)
        if (val !== null) {
            dispatch(fetchTribeByName({ tribeName: val.trim() })).then((result) => {
                if (fetchTribeByName.fulfilled.match(result)) {
                    // Handle successful login
                    console.log('Successful:', result.payload);
                    setFoundTribe(
                        {
                            "location": {
                                "type": "Point",
                                "coordinates": [
                                    40.7128,
                                    -74.006
                                ]
                            },
                            "_id": "66a41a99ef8a25a0e67448ff",
                            "climate_know_exist": true,
                            "tribe": "Some Tribe",
                            "language": "Some Language",
                            "climate_change_in_lang": "Climate Change in Native Language",
                            "proof_link": [
                                {
                                    "name": "Proof 1",
                                    "link": "http://example.com/proof1",
                                    "_id": "66a41a99ef8a25a0e6744900"
                                }
                            ],
                            "images": [
                                "http://example.com/image1.jpg"
                            ],
                            "owner": {
                                "_id": "66a4181c117b9cf55e5807ec",
                                "name": "Stella ",
                                "email": "stella@example.com",
                                "mobile": "+25578987654",
                                "role": "user",
                                "cover_url": "http://example.com/cover.jpg",
                                "profile_pic": "http://example.com/profile.jpg",
                                "status": "PENDING"
                            },
                            "status": "PENDING",
                            "timestamp": "2024-07-26T21:52:25.737Z",
                            "__v": 0
                        }
                    )

                } else if (fetchTribeByName.rejected.match(result)) {
                    // Handle rejected login
                    // Toast.error(`Error: ${result.payload}`, 'top');
                    console.log('');
                    console.log('Error******=====:', result.payload);
                    // setFoundTribe(
                    //     {
                    //         "location": {
                    //             "type": "Point",
                    //             "coordinates": [
                    //                 40.7128,
                    //                 -74.006
                    //             ]
                    //         },
                    //         "_id": "66a41a99ef8a25a0e67448ff",
                    //         "climate_know_exist": true,
                    //         "tribe": "Some Tribe",
                    //         "language": "Some Language",
                    //         "climate_change_in_lang": "Climate Change in Native Language",
                    //         "proof_link": [
                    //             {
                    //                 "name": "Proof 1",
                    //                 "link": "http://example.com/proof1",
                    //                 "_id": "66a41a99ef8a25a0e6744900"
                    //             }
                    //         ],
                    //         "images": [
                    //             "http://example.com/image1.jpg"
                    //         ],
                    //         "owner": {
                    //             "_id": "66a4181c117b9cf55e5807ec",
                    //             "name": "Stella ",
                    //             "email": "stella@example.com",
                    //             "mobile": "+25578987654",
                    //             "role": "user",
                    //             "cover_url": "http://example.com/cover.jpg",
                    //             "profile_pic": "http://example.com/profile.jpg",
                    //             "status": "PENDING"
                    //         },
                    //         "status": "PENDING",
                    //         "timestamp": "2024-07-26T21:52:25.737Z",
                    //         "__v": 0
                    //     }
                    // )
                    setFoundTribe(null)
                }
            })
                .catch((error) => {
                    // Handle any additional errors
                    console.error('--------Error during fetching:', error);
                    // Toast.error(`Error :, ${error}`, 'top');
                });
        } else {
            Toast.error(`Please add a tribe`, 'top');
            setErrorTribeNext(true);
        }
    }

    const tribes = tribeList.map(val => {
        return { title: val.tribe, icon: "square-rounded-outline" }
    });
    tribes.push({ title: "Other", icon: "square-rounded-outline" },)

    const renderScrollIndicator = () => {

        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <Block
                row
                center
                middle
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                }}
            >
                {images?.map((image, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={{
                                height: 15,
                                width: 15,
                                borderRadius: 15,
                                backgroundColor: COLORS.white,
                                opacity,
                                marginHorizontal: 4,
                                borderColor: COLORS.black,
                                borderWidth: 2
                            }}
                        />
                    );
                })}
            </Block>
        );
    };

    const renderImagesHeader = () => {

        return (
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                })}
                scrollEventThrottle={16}
            >
                {
                    tribeListBelongs === null ?
                        <ImageBackground

                            source={imagesConstants.noImage}
                            resizeMode="cover"
                            style={{ width: SIZES.width, height: 170, justifyContent: 'flex-end' }}
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    height: 170,
                                }}
                            ></LinearGradient>
                        </ImageBackground> :



                        images?.map((image, index) => (
                            <ImageBackground
                                key={index}
                                source={{ uri: image }}
                                resizeMode="cover"
                                style={{ width: SIZES.width, height: 170, justifyContent: 'flex-end' }}
                            >
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 170,
                                    }}
                                ></LinearGradient>
                            </ImageBackground>
                        ))
                }
            </ScrollView>
        );
    };


    const renderImage = () => {
        return (
            <Block margin={[15, 0, 0, 0]}>
                <Text light>Feel free to share images of landscapes from this location</Text>

                <Block row space="between">
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => (images.length >= 3 ? info() : pickImage())}
                    >
                        <Ionicons name="cloud-upload" size={30} color={COLORS.white} style={styles.icon} />
                        <Text style={{ color: COLORS.white }}>Press here to upload images</Text>
                    </TouchableOpacity>

                </Block>
            </Block>
        );
    };


    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use proper syntax for mediaTypes
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`; // result.assets[0].base64

                console.log("------------", result.assets[0].uri);
                // let imgCb = await onCloudinarySaveCb(base64Img);
                let imgCb = result.assets[0].uri;
                let imgCb2 = [...images];

                imgCb2.push(imgCb);
                setImages(imgCb2); // Use proper syntax for setting the state
                console.log(images);
            }
        } catch (e) {
            setLoadPic(false);
            console.log("Error while picking image", e);
        }
    };


    const onCloudinarySaveCb = async (base64Img) => {
        try {
            setLoadPic(true)
            var pic = "";
            let apiUrl =
                'https://api.cloudinary.com/v1_1/micity/image/upload';
            let data = {
                file: base64Img,
                upload_preset: 'ml_default'
            };

            await fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
                .then(async response => {
                    let data = await response.json();
                    //console.log(data);
                    if (await data.secure_url) {
                        //console.log('Upload successful');
                        setLoadPic(false);
                        pic = await data.secure_url;
                    }
                })
                .catch(err => {
                    console.log('Cannot upload');
                    setLoadPic(false);
                    console.log(err);
                });
            return pic;
        } catch (e) {
            setLoadPic(false);
            console.log("Error while onCloudinarySave", e);
        }
    };

    const removePic = (id) => {
        var removed = images.filter((value) => value !== id);
        setImages(removed);

        var removedV2 = images.filter((value) => value !== id);
        setImages(removedV2);
    };

    const info = () => Toast.error(`You cannot exceed 3 pictures`, 'top');

    const foundTribeFunction = () => {
        return <Block margin={[10, 0]}>
            <Text bold h2 color={COLORS.darkgreen}>
                Good news for your {selectedTribe}'s tribe!</Text>
            <Text h3>Climate knowledge exists in your local language!</Text>

        </Block>

    }

    const tribeExists = () => {


        return <Block padding={[10, 0]}>
            {/* <Text bold>What is climate change in your native language?</Text>
            <Text light>Hali ya mazingira</Text> */}

            <List.Section title="">
                <List.Accordion
                    title="What is climate change in your native language?"
                    titleStyle={{ fontWeight: "bold" }}
                    descriptionStyle={{ color: COLORS.darkgreen }}
                    titleNumberOfLines={5}
                    description="Hali ya mazingira Hali ya mazira Hali ya mzingira li ya ingira"
                    left={props => <List.Icon {...props} icon="circle" />}>
                    <Text>Vote a best translation</Text>
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>1</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="red" />} />
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>2</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>3</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <Button mode="contained" >Add your translation</Button>

                </List.Accordion>

                <List.Accordion
                    title="What is climate change in your native language?"
                    titleStyle={{ fontWeight: "bold" }}
                    descriptionStyle={{ color: COLORS.darkgreen }}
                    titleNumberOfLines={5}
                    description="Hali ya mazingira Hali ya mazira Hali ya mzingira li ya ingira"
                    left={props => <List.Icon {...props} icon="circle" />}>
                    <Text>Vote a best translation</Text>
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>1</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="red" />} />
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>2</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>3</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <Button mode="contained" >Add your translation</Button>

                </List.Accordion>

                <List.Accordion
                    title="What is climate change in your native language?"
                    titleStyle={{ fontWeight: "bold" }}
                    descriptionStyle={{ color: COLORS.darkgreen }}
                    titleNumberOfLines={5}
                    description="Hali ya mazingira Hali ya mazira Hali ya mzingira li ya ingira"
                    left={props => <List.Icon {...props} icon="circle" />}>
                    <Text>Vote a best translation</Text>
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>1</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="red" />} />
                    <List.Item title="Hali ya mazingira Kti ya africa mzima, na amerika pia"
                        titleNumberOfLines={5}
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>2</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <List.Item title="Hali ya mazingira"
                        onPress={() => { }}
                        left={props => <Text onPress={() => { }} {...props}>3</Text>}
                        right={props => <List.Icon onPress={() => { }} {...props} icon="heart" color="grey" />} />
                    <Button mode="contained" >Add your translation</Button>

                </List.Accordion>
            </List.Section>

            <Location />

            <Proof />

            {
                renderImage()
            }
            <Block style={styles.imgContainer}>
                {images.map((img, key) => (
                    <View key={key}>
                        <Ionicons
                            color={COLORS.red}
                            size={SIZES.base * 6}
                            name={'close-circle'}
                            style={styles.cancel}
                            onPress={() => removePic(img)}
                        />
                        <Block style={styles.bg}>
                            <Image source={{ uri: img }} style={styles.img} />
                        </Block>
                    </View>
                ))}
                <ActivityIndicator animating={loadPic} color={COLORS.peach} />
            </Block>
        </Block>
    }

    const topHeader = () => {
        return <>
            <Text bold h3>MASSAI TRIBE</Text>

            <Block row space="between" margin={[10, 0, 0, 0]}>
                <TouchableOpacity onPress={() => {
                    console.log('Images');
                }}>
                    <Block row center style={styles.round}>
                        <Ionicons name="image" color={COLORS.peach} size={20} />
                        <Text style={{ marginLeft: 5 }} numberOfLines={1}>See images</Text>
                    </Block>
                </TouchableOpacity>

                <Block row center style={styles.round}>
                    <Ionicons name="people" color={COLORS.peach} size={20} />
                    <Text numberOfLines={1}>
                        124 PEOPLES INVOLVED</Text>
                </Block>
            </Block>

            <Block center>
                <ProgressBar
                    progress={0}
                    color={MD3Colors.error50}
                    style={{ width: SIZES.width - 40, height: SIZES.base, marginTop: 10 }}
                />
            </Block></>
    }


    return <ScrollView showsVerticalScrollIndicator={false} accessibilityElementsHidden={true}>
        <Block flex={1}>
            <Block style={{ height: 180 }}>
                {renderImagesHeader()}
                {renderScrollIndicator()}
            </Block>
            <Block
                padding={[20, 0]}

                style={{
                    backgroundColor: 'white',
                    marginHorizontal: '5%',
                    // width: '90%',
                    borderRadius: 10,
                    elevation: 2,
                    marginTop: -20,
                }}
            >


                {/* { topHeader()} */}


                {/* {foundTribeFunction()} */}

                <Divider />

                {/* {
                    tribeExists()
                } */}




            </Block>
        </Block>


    </ScrollView>
};

const styles = StyleSheet.create({
    selectDropdown: {
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        borderColor: COLORS.darkgray
    },
    dropdownButtonStyle: {
        // width: 200,
        height: 50,
        backgroundColor: '#12345',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        // borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    textInput: {
        marginTop: 10
    },
    input: {
        //width: "80%",
        // marginTop: 10
        flex: 1,
        marginRight: 5
    },
    cancel: {
        position: 'absolute',
        zIndex: 100,
        margin: 10,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius * 2,
        overflow: "hidden"
    },
    imgContainer: {
        marginVertical: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    img: {
        width: SIZES.width / 3.6,
        height: SIZES.width / 3.6,
        borderRadius: SIZES.radius,
        opacity: 0.8,
        borderColor: COLORS.black,
        borderWidth: 3,
    },
    bg: {
        borderRadius: SIZES.radius,
        marginRight: SIZES.base * 1.7,
    },
    icon: {
        marginHorizontal: 5,
    },
    btn: {
        backgroundColor: COLORS.peach,
        padding: SIZES.base,
        width: "100%",
        borderRadius: SIZES.radius,
        elevation: 2,
        marginTop: SIZES.base * 1.8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    yesButton: {
        backgroundColor: "#A2CA71",
    },
    noButton: {
        backgroundColor: '#FF7777',
    },
    notSureButton: {
        backgroundColor: "#FFDE4D",
    },

});

export default ClimateKnowledgeExist;
