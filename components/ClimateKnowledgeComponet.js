
import { useEffect, useRef, useState } from "react";
import { Animated, Image, ImageBackground, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Block from './Block';
import Text from './Text';
import Location from "./Location";
import { COLORS, imagesConstants, SIZES } from "../constants";
import { LinearGradient } from "react-native-svg";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Button, Divider, Icon, List, MD3Colors, ProgressBar, SegmentedButtons, TextInput } from "react-native-paper";
import Proof from "./Proof";
import Map from "./Map";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { Toast } from "toastify-react-native";
import { createTribe, fetchTribeByName, fetchTribes } from "@/redux/tribeSlice";

const ClimateKnowledgeComponet = ({ userId, onShowImages, onShowMap }) => {
    const dispatch = useDispatch();

    const scrollX = useRef(new Animated.Value(0)).current;
    const { tribeList, isLoadingByName, errorByName, successByName, tribeByName } = useSelector((state) => state.tribe);

    const [selectedTribe, setSelectedTribe] = useState("");
    const [newTribe, setNewTribe] = useState(null);
    const [newTribeSearch, setNewTribeSearch] = useState(null);
    const [errorTribeNext, setErrorTribeNext] = useState(false);
    const [images, setImages] = useState([]);
    const [loadPic, setLoadPic] = useState(false);
    const [ans, setAns] = useState(null);
    const [foundTribe, setFoundTribe] = useState(null);
    const [isClimateExist, setIsClimateExist] = useState(null);


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

    const countBelongsArrayLength = (data) => {
        // Check if the input data is an object and has the 'belongs' property
        if (data && typeof data === 'object' && Array.isArray(data.belongs)) {
            // Return the length of the 'belongs' array
            return data.belongs.length;
        } else {
            // Handle the case where the input data is not valid or does not have the 'belongs' property
            return 0;
        }
    };


    const topHeader = () => {
        return <>
            <Text bold h3>{foundTribe?.tribe} TRIBE</Text>

            <Block row space="between" margin={[10, 0, 0, 0]}>
                <TouchableOpacity onPress={() => {
                    onShowImages(foundTribe.images)
                }}>
                    <Block row center style={styles.round}>
                        <Ionicons name="image" color={COLORS.peach} size={20} />
                        <Text style={{ marginLeft: 5 }} numberOfLines={1}>See images</Text>
                    </Block>
                </TouchableOpacity>

                <Block row center style={styles.round}>
                    <Ionicons name="people" color={COLORS.peach} size={20} />
                    <Text numberOfLines={1}>
                        {countBelongsArrayLength(foundTribe)} PEOPLES INVOLVED</Text>
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

    const checkIfTribeExists = async (val) => {
        console.log("ok", val);
        setNewTribeSearch(val)

        // dispatch(fetchTribes())
        if (val !== null) {
            dispatch(fetchTribeByName({ tribeName: val.trim() })).then((result) => {
                if (fetchTribeByName.fulfilled.match(result)) {
                    // Handle successful login
                    console.log('Successful____:', result.payload);
                    setFoundTribe(result.payload)

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
                        tribe: val.trim(),
                        belongs: [`${userId}`],
                        // climate_change_in_language,
                        // location,
                        // proof_link,
                        // images,
                        owner: `${userId}`,
                    };
                    // console.log(" 000000000000",obj);

                    dispatch(createTribe(obj)).then((result) => {
                        if (createTribe.fulfilled.match(result)) {
                            // Handle successful login
                            console.log('Successfulxxxxxxxx:', result.payload);
                            Toast.success(`${result.payload?.message}!`, 'top');

                            setFoundTribe(result?.payload?.tribe)

                        } else if (createTribe.rejected.match(result)) {
                            // Handle rejected login
                            Toast.error(`Error: ${result.payload?.message}`, 'top');
                            console.log('');
                            console.log('Error---******:', result.payload?.message);

                            setFoundTribe(null)
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
                {foundTribe?.images?.map((image, index) => {
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

    const isEmpty = (obj) => {
        if (obj === null || obj === undefined) {
            return true; // Or false depending on your use case
        }
        return Object.keys(obj).length === 0;
    };

    const renderImagesHeader = () => {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
               
                scrollEnabled
                scrollEventThrottle={16}
            >
                {isEmpty(foundTribe) ? (
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
                        />
                    </ImageBackground>
                ) : (
                    foundTribe?.images?.map((image, index) => (
                        <ImageBackground
                            key={index}
                            source={{ uri: image.image }}
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
                            />
                        </ImageBackground>
                    ))
                )}
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

            </Block> : foundTribe && !foundTribe.climate_know_exist ?
                <Block margin={[20, 0]}><Text bold>Is climate knowledge exists in your local language?</Text>
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
                    /></Block> : null
    }

    const tribeExists = () => {
        return foundTribe && !foundTribe.climate_know_exist ?
            <Block margin={[10,0]}>

                <TextInput style={styles.textInput}
                    label={`What is climate change in ${selectedTribe} native language?`}
                    mode="outlined" keyboardType="default" />

            </Block> :
            foundTribe && foundTribe.climate_know_exist ? 
            <Block  margin={[0,0,0,20]}>


                <List.Section title="">
                    <List.Accordion
                        title="What is climate change in your native language?"
                        titleStyle={{ fontWeight: "bold" }}
                        descriptionStyle={{ color: COLORS.darkgreen }}
                        titleNumberOfLines={5}
                        description={findMostVotedTranslate(foundTribe).value}
                        left={props => <List.Icon {...props} icon="circle" />}>
                        <Text light>     Vote for a best translation</Text>
                        {
                            foundTribe && foundTribe.climate_change_in_language &&
                            foundTribe.climate_change_in_language &&
                            foundTribe.climate_change_in_language.translate.map((val, key) => {
                                return <List.Item title={val.value} key={key}
                                    onPress={() => {
                                        console.log(key);
                                    }}
                                    onLongPress={() => {
                                        console.log("lon", key);
                                    }}
                                    style={{ marginLeft: 40 }}
                                    titleNumberOfLines={5}
                                    left={props => <Text onPress={() => { }} {...props}>{key + 1}</Text>}
                                    right={props =>
                                        <Block center><Text light small>+{val.vote.length}</Text>
                                            <List.Icon {...props} color={val.vote.includes(userId) ? "red" : "grey"}
                                                icon="heart" /></Block>} />
                            })
                        }


                        <Button onPress={() => { }} mode="outlined" >Add your translation</Button>

                    </List.Accordion>

                </List.Section>

            </Block> : null
    };

    const addImageComponent = () => {
        return <>


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
            </Block></>
    }

    // Function to find the most voted translate object, and if tied, the oldest one
    const findMostVotedTranslate = (data) => {
        const { translate } = data?.climate_change_in_language;

        if (!translate || translate.length === 0) {
            return null; // No translate objects present
        }

        return translate.reduce((best, current) => {
            // Compare votes length
            if (current.vote.length > best.vote.length) {
                return current;
            }
            // If votes are equal, compare timestamp
            if (current.vote.length === best.vote.length) {
                return new Date(current.timestamp) < new Date(best.timestamp) ? current : best;
            }
            return best;
        });
    };

    return <ScrollView showsVerticalScrollIndicator={false} accessibilityElementsHidden={true}>
        <Block flex={1}>
            <Block style={{ height: 180 }}>
                {renderImagesHeader()}
                {renderScrollIndicator()}
            </Block>
            {
                isLoadingByName && <ActivityIndicator />
            }
            <Block
                padding={[20, 0]}
                style={{
                    backgroundColor: 'white',
                    marginHorizontal: '5%',
                    // width: '90%',
                    borderRadius: 10,
                    // elevation: 2,
                    marginTop: -20,
                }}
            >
                {!foundTribe && <Text bold h3>Please select your tribe</Text>}
                <Block row>
                    {!foundTribe && <Block style={styles.selectDropdown}>

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

                                if (selectedItem.title !=='Other') {
                                    await checkIfTribeExists(selectedItem.title);
                                } else {
                                    setFoundTribe(null)
                                }

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

                    </Block>}



                </Block>
                {
                    !foundTribe && selectedTribe === "Other" ?
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
                {
                    foundTribe ? topHeader() : null
                }

                {/* {
                    foundTribe ?
                        ans==="no" ? <Text>NO</Text> :
                            ans==="notsure" ? <Text>MAY BE</Text> : <Text>YES</Text> : null
                } */}



                {/* {
                    isLoadingByName ? <ActivityIndicator /> :


                        selectedTribe !=='Other' ? foundTribeFunction() :
                            (selectedTribe==='Other' && newTribeSearch !==null) ? foundTribeFunction() : null
                } */}

                {
                    foundTribeFunction()
                }

                {
                    tribeExists()
                }
                <Divider />
                {
                    foundTribe && foundTribe.climate_know_exist ?
                        <>
                        {
                            foundTribe && foundTribe.location.map((val, key)=> {
                                return <Block row key={key} space="between"  margin={[15,0]}>
                                
                                <Block row middle center>
                                    <Block center>
                                        <Ionicons name="location" color={COLORS.lightBlue} size={20} />
                                        <Text light>1</Text>
                                    </Block>
                                    <Block margin={[0, 0, 0, 20]}>
                                        <Text bold>Lat: {val.coordinates[0]}</Text>
                                        <Text light>Long: {val.coordinates[1]}</Text>
                                    </Block>
                                </Block>
                                <TouchableOpacity >
                                    <Block center><Text light small>+1</Text>
                                        <Ionicons name="heart" color={COLORS.red} size={20} />
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                            }) 
                        }
                            

                        </> : null}
                        <TouchableOpacity style={styles.btnLocation} onPress={() => {onShowMap() }}>
                    <Ionicons name="location" size={30} color={COLORS.white} style={styles.icon} />
                    <Text style={{ color: COLORS.white }}>Add the location of your tribe</Text>
                </TouchableOpacity>
               
                <Proof />


                {addImageComponent()}

                {foundTribe &&
                    <Block middle margin={[20, 0]}>
                        <Button loading={isLoadingByName} buttonColor={COLORS.red}
                            disabled={isLoadingByName} mode="contained"
                            style={{ alignContent: "" }}
                            onPress={() => {
                                setFoundTribe(null);
                                setSelectedTribe(null);
                            }}>Cancel</Button>
                    </Block>
                }
            </Block>
        </Block>


    </ScrollView>
};

const styles = StyleSheet.create({
    selectDropdown: {
        flex: 1,
        marginRight: 10,
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
    btnLocation: {
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

});

export default ClimateKnowledgeComponet;
