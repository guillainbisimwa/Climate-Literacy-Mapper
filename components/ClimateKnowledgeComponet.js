
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Block from './Block';
import Text from './Text';
import Location from "./Location";
import { COLORS, imagesConstants, SIZES } from "../constants";
import { LinearGradient } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button, Icon, SegmentedButtons, TextInput } from "react-native-paper";
import Proof from "./Proof";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Toast } from "toastify-react-native";
import { createTribe, fetchTribeByName, fetchTribes } from "@/redux/tribeSlice";

const ClimateKnowledgeComponet = ({userId}) => {
    const dispatch = useDispatch();

    const scrollX = useRef(new Animated.Value(0)).current;
    const { tribeList, isLoadingByName, errorByName, successByName, tribeByName } = useSelector((state) => state.tribe);

    const [selectedTribe, setSelectedTribe] = useState("");
    const [newTribe, setNewTribe] = useState(null);
    const [newTribeSearch, setNewTribeSearch] = useState(null);
    const [errorTribeNext, setErrorTribeNext] = useState(false);
    const [images, setImages] = useState([]);
    const [loadPic, setLoadPic] = useState(false);
    const [ans, setAns] = useState('');
    const [foundTribe, setFoundTribe] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch(fetchTribes());
          } catch (error) {
            console.error('Error fetching tribes:', error);
          }
        };
      
        fetchData();
      }, [dispatch]);
    const checkIfTribeExists = async (val) => {
        console.log("ok", val);
        setNewTribeSearch(val)
        // dispatch(fetchTribes())
        if (val !== null) {
            dispatch(fetchTribeByName({ tribeName: val.trim() })).then((result) => {
                if (fetchTribeByName.fulfilled.match(result)) {
                    // Handle successful login
                    console.log('Successful:', result.payload);
                    // setFoundTribe(result.payload)

                } else if (fetchTribeByName.rejected.match(result)) {
                    // Handle rejected login
                    // Toast.error(`Error: ${result.payload?.message}`, 'top');
                    console.log('');
                    console.log('Error******:', result.payload);

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

    const addTribe = async (val) => {
        // console.log("ok", val);
        setNewTribeSearch(val)
        // dispatch(fetchTribes())
        if (val !== null) {
            dispatch(fetchTribeByName({ tribeName: val.trim() })).then((result) => {
                if (fetchTribeByName.fulfilled.match(result)) {
                    // Handle successful login
                    // console.log('Successful:', result.payload);
                    Toast.error(`Error: ${val.trim()} exists!`, 'top');

                    // setFoundTribe(result.payload)

                } else if (fetchTribeByName.rejected.match(result)) {
                    // Handle rejected login
                    // Toast.error(`Error: ${result.payload?.message}`, 'top');
                    // console.log('');
                    // console.log('Error******:', result.payload);

                    const obj = {
                        climate_know_exist: false,
                        tribe:val.trim() ,
                        belongs:[`${userId}`],
                        // climate_change_in_language,
                        // location,
                        // proof_link,
                        // images,
                        owner:`${userId}`,
                    };
                    // console.log(" 000000000000",obj);

                    dispatch(createTribe(obj)).then((result) => {
                        if (createTribe.fulfilled.match(result)) {
                            // Handle successful login
                            console.log('Successful:', result.payload);
                            Toast.success(`Error: ${result.payload?.message}!`, 'top');
        
                            // setFoundTribe(result.payload)
        
                        } else if (createTribe.rejected.match(result)) {
                            // Handle rejected login
                            Toast.error(`Error: ${result.payload?.message}`, 'top');
                            console.log('');
                            console.log('Error---******:', result.payload?.message);
        
                            // setFoundTribe(null)
                        }
                    })
                        .catch((error) => {
                            // Handle any additional errors
                            console.error('--------Error during fetching:', error);
                            // Toast.error(`Error :, ${error}`, 'top');
                        });
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
                    images.length === 0 ?
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
        return foundTribe && foundTribe.climate_know_exist ?
            <Block margin={[10, 0]}>
                <Text bold h2 color={COLORS.darkgreen}>
                    Good news for your {selectedTribe}'s tribe!</Text>
                <Text h3>Climate knowledge exists in your local language!</Text>

            </Block> :
            <Block margin={[10, 0]}><Text bold>Is climate knowledge exists in your local language?</Text>
                <SegmentedButtons
                    value={ans}
                    onValueChange={setAns}
                    style={{ marginTop: 20 }}
                    buttons={[
                        {
                            value: 'yes',
                            label: 'YES',
                            icon: 'check',
                            style: ans === 'yes' ? styles.yesButton : {},
                        },
                        {
                            value: 'notsure',
                            label: 'NOT SURE',
                            icon: 'minus',
                            style: ans === 'notsure' ? styles.notSureButton : {},

                        },
                        {
                            value: 'no',
                            label: 'NO',
                            icon: 'cancel',
                            style: ans === 'no' ? styles.noButton : {},

                        },
                    ]}
                /></Block>
    }

    const tribeExists = () => {
        return <>
            <Text bold>What is climate change in your native language?</Text>
            <Text >MBURA</Text>

            <TextInput style={styles.textInput} label={`What is climate change in ${selectedTribe} native language?`} mode="outlined" keyboardType="default" />
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
        </>
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
                <Text bold h3>Please select your tribe</Text>
                <Block style={styles.selectDropdown}>

                    <SelectDropdown
                        search
                        /**
                        * function callback when the search input text 
                        * changes, this will automatically disable the 
                        * dropdown's internal search to be implemented manually outside the component
                        */

                        // onChangeSearchInputText={(val)=>{
                        //     console.log("val", val);
                        //     return val
                        // }}
                        searchPlaceHolder="Type: 'Other' If your tribe doesn't exist "

                        data={tribes}
                        onSelect={async (selectedItem, index) => {
                            console.log(selectedItem, "----", index);
                            setSelectedTribe(selectedItem.title);
                            setNewTribe(null);
                            setNewTribeSearch(null)
                            setErrorTribeNext(false);
                            if (selectedItem.title != 'Other') await checkIfTribeExists(selectedItem.title);

                        }}

                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    {selectedItem && (
                                        <Icon name="square-rounded" nameq={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                    )}
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.title) || 'Select your tribe'}
                                    </Text>
                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                </View>
                            );
                        }}
                        renderItem={(item, index, isSelected) => {
                            return (
                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                    <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                </View>
                            );
                        }}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={styles.dropdownMenuStyle}
                    />

                </Block>
                
                {
                    selectedTribe === "Other" ?
                        <>
                            <Block row center>
                                <TextInput onChangeText={setNewTribe} error={errorTribeNext}
                                    style={styles.input} label="Add manually the name of your tribe"
                                    mode="outlined" keyboardType="default" />

                                <Button loading={isLoadingByName}
                                    disabled={isLoadingByName} mode="contained"
                                    onPress={() => addTribe(newTribe)}>ADD</Button>
                            </Block>
                            {errorByName && errorTribeNext ? <Text color={COLORS.red} >{errorByName}</Text> : null}

                        </> : null
                }

                {/* {
                    isLoadingByName ? <ActivityIndicator /> :


                        selectedTribe != 'Other' ? foundTribeFunction() :
                            (selectedTribe == 'Other' && newTribeSearch != null) ? foundTribeFunction() : null
                }

                {
                    isLoadingByName ? null : tribeExists()
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

export default ClimateKnowledgeComponet;