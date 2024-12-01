import { useDispatch, useSelector } from "react-redux";
import Text from "../components/Text";
import Block from "../components/Block";
import Location from "../components/Location";
import Proof from "../components/Proof";

import { ActivityIndicator, Avatar, Button, Dialog, IconButton, List, SegmentedButtons, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Animated, ImageBackground, TouchableOpacity, Image, ScrollView, StyleSheet, useWindowDimensions, View, FlatList } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { fetchTribeByName, fetchTribes, findTribeByBelongsId } from "@/redux/tribeSlice";
import Container, { Toast } from "toastify-react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ClimateKnowledge from "./ClimateKnowledge";
import ClimateKnowledgeComponet from '../components/ClimateKnowledgeComponet';
import Map from "../components/Map";


const MainScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { user, error, success } = useSelector((state) => state.user);
    const { tribeList, isLoadingByName, errorByName, successByName, tribeByName, tribeListBelongs } = useSelector((state) => state.tribe);
    // const [images, setImages] = useState([]);
    const [loadPic, setLoadPic] = useState(false);

    const [selectedTribe, setSelectedTribe] = useState("");
    const [newTribe, setNewTribe] = useState("");
    const [newTribeNext, setNewTribeNext] = useState(false);

    const snapPoints90 = useMemo(() => ['90%'], []);
    const snapPoints = useMemo(() => ['90%'], []);
    const snapPoint = useMemo(() => ["51%", '70%', '80%', '90%'], []);
    const [openCK, setOpenCK] = useState(false);
    const [open, setOpen] = useState(false);
    const pages = ['Page 1', 'Page 2', 'Page 3'];
    const [ans, setAns] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserName, setCurrentUserName] = useState("");

    console.log("*********currentTribe tribeListBelongs---------", currentUser);

    const [dialogVisibleMap, setDialogVisibleMap] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const [images, setImages] = useState([]);

    const showDialog = (imagesData) => {
        setImages(imagesData);
        setDialogVisible(true);
    };

    const hideDialog = () => setDialogVisible(false);

    const showDialogMap = () => {
        // setImages(imagesData);
        setDialogVisibleMap(true);
    };

    const hideDialogMap = () => setDialogVisibleMap(false);


    const tribes = tribeList.map(val => {
        return { title: val.tribe, icon: "square-rounded-outline" }
    });
    tribes.push({ title: "Other", icon: "square-rounded-outline" },)

    const tribes2 = [

        { title: "Other", icon: "square-rounded-outline" },
        { title: "Abe", icon: "square-rounded-outline" },
        { title: "Abidji", icon: "square-rounded-outline" },
        { title: "Abron", icon: "square-rounded-outline" },
        { title: "Abure", icon: "square-rounded-outline" },
        { title: "Adanse", icon: "square-rounded-outline" },
        { title: "Adjukru", icon: "square-rounded-outline" },
        { title: "Afar", icon: "square-rounded-outline" },
        { title: "Afo", icon: "square-rounded-outline" },
        { title: "Zombo", icon: "square-rounded-outline" },
        { title: "Zulu", icon: "square-rounded-outline" },
    ];

    useEffect(() => {
        const getUserId = async () => {
            try {
                dispatch(fetchTribes());

                const value = await AsyncStorage.getItem('user');

                if (value) {
                    const userLocal = JSON.parse(value);
                    console.log("userId:", userLocal.user.user.userId);
                    setCurrentUser(userLocal.user.user.userId)
                    setCurrentUserName(userLocal?.user?.user?.name)

                    dispatch(findTribeByBelongsId({ id: userLocal.user.user.userId })).then((result) => {
                        if (findTribeByBelongsId.fulfilled.match(result)) {
                            // Handle successful login
                            console.log('Successful:', result.payload);

                        } else if (findTribeByBelongsId.rejected.match(result)) {
                            // Handle rejected login
                            ///Toast.error(`Error: ${result.payload.message}`, 'top');
                            console.log('');
                            console.log('This user doesnt choose s tribe******:', result.payload);
                        }
                    })
                        .catch((error) => {
                            // Handle any additional errors
                            console.error('--------Error during fetching:', error);
                            // Toast.error(`Error :, ${error}`, 'top');
                        });
                } else {
                    console.log("User ID not found");
                }
            } catch (error) {
                console.error("Error retrieving user data", error);
            }
        };

        getUserId();
    }, [dispatch]);



    const bottomSheet = useRef(null);
    const bottomSheetCK = useRef(null);

    const BackdropElement = useCallback(
        (backdropProps) => (
            <BottomSheetBackdrop
                {...backdropProps}
                opacity={0.7}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    const BackdropElementCK = useCallback(
        (backdropProps) => (
            <BottomSheetBackdrop
                {...backdropProps}
                opacity={0.7}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );

    const hideModal = () => handleClosePress();
    const handleClosePress = useCallback(() => {
        bottomSheet.current?.close();
    }, []);


    const openModal = useCallback(() => {
        bottomSheet.current?.present();
        setTimeout(() => {
            setOpen(true);
        }, 5);
    }, []);

    const hideModalCK = () => handleClosePressCK();
    const handleClosePressCK = useCallback(() => {
        bottomSheetCK.current?.close();
    }, []);


    const openModalCK = useCallback(() => {
        bottomSheetCK.current?.present();
        setTimeout(() => {
            setOpenCK(true);
        }, 5);
    }, []);

    const pieData = [
        { value: 70, color: '#177AD5' },
        { value: 30, color: 'lightgray' }
    ];

    const translations = [
        {
            "_id": "66a90b3f2ca5a67f23e2044e",
            "preLesson": [
                {
                    "fr": "Changement climatique",
                    "eng": "Climate change",
                    "local": "Mabadiliko ya hali ya hewa",
                    "_id": "66a90b3f2ca5a67f23e2044f",
                    "icon": "folder"
                }
            ],
            "localChallenges": [
                {
                    "fr": "Défis locaux",
                    "eng": "Local challenges",
                    "local": "Changamoto za ndani",
                    "_id": "66a90b3f2ca5a67f23e20450",
                    "icon": "folder"
                }
            ],
            "mindfullExercises": [
                {
                    "fr": "Exercices de pleine conscience",
                    "eng": "Mindfulness exercises",
                    "local": "Mazoezi ya akili",
                    "_id": "66a90b3f2ca5a67f23e20451",
                    "icon": "folder"
                }
            ],

            "rle": [
                {
                    "fr": "Exercices de pleine conscience",
                    "eng": "Mindfulness exercises",
                    "local": "Mazoezi ya akili",
                    "_id": "66a90b3f2ca5a67f23e20451",
                    "icon": "folder"
                }
            ],
            "tribe": {
                "location": {
                    "type": "Point",
                    "coordinates": [
                        40.7128,
                        -74.006
                    ]
                },
                "_id": "66a8fc8d89069f9b72a79d2e",
                "tribe": "SHI",
                "language": "SHI Language",
                "climate_change_in_lang": "Haki la hewa",
                "proof_link": [
                    {
                        "name": "news articles",
                        "link": "http://example.com/proof1",
                        "_id": "66a8fc8d89069f9b72a79d2f"
                    },
                    {
                        "name": "presentations",
                        "link": "http://example.com/proof1",
                        "_id": "66a8fc8d89069f9b72a79d30"
                    }
                ],
                "images": [
                    "http://example.com/image1.jpg"
                ],
                "owner": "66a783f25a342618fece070b",
                "status": "PENDING",
                "timestamp": "2024-07-30T14:45:33.859Z"
            },
            "timestamp": "2024-07-30T15:48:05.048Z",
            "status": "PENDING",
            "__v": 0
        }
    ];

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

    const RenderBottom = () => {
        const { width, height } = useWindowDimensions();
        const scrollX = useRef(new Animated.Value(0)).current;
        const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
        const scrollViewRef = useRef(null);

        const goToNextPage = () => {
            const currentPageIndex = Math.floor(scrollX._value / width);
            const nextPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
            if (currentPageIndex === 0 && selectedTribe === "Other" && newTribe.trim() === "") {
                setNewTribeNext(true)
            }
            else if (currentPageIndex === 0 && selectedTribe === "Other" && newTribe.trim() !== "") {
                dispatch(fetchTribeByName({ tribeName: newTribe.trim() })).then((result) => {
                    if (fetchTribeByName.fulfilled.match(result)) {
                        console.log('Successful:', result.payload);
                        scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
                    } else if (fetchTribeByName.rejected.match(result)) {
                        Toast.error(`Error: ${result.payload}`, 'top');
                    }
                })
                    .catch((error) => {
                        console.error('Error during login:', error);
                        Toast.error(`Error :, ${error}`, 'top');
                    });
                scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
            } else if (currentPageIndex === 0 && selectedTribe.length !== 0) {
                scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
            }
            else if (currentPageIndex === 1 && (selectedTribe.length !== 0 || newTribe.trim() !== "")) {
                scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
            }
            else {
                Toast.error(`You need to choose a tribe`, 'top');
            }
        };

        const goToPreviousPage = () => {
            const currentPageIndex = Math.floor(scrollX._value / width);
            const prevPageIndex = Math.max(currentPageIndex - 1, 0);
            scrollViewRef.current.scrollTo({ x: prevPageIndex * width, animated: true });
        };

        return <BottomSheetModal
            ref={bottomSheet}
            index={0}
            backdropComponent={BackdropElement}
            snapPoints={Math.floor(scrollX._value / width) === 0 ? snapPoints90 : snapPoints}
            onDismiss={() => setOpen(false)}
        >

            <Block row space='between' padding={[0, 20]}>
                <Block m_b={10} flex={1}>
                    <Text bold h3>CLIMATE KNOWLEDGE</Text>
                    <Text color={COLORS.blue}>{`In your local language`}</Text>
                </Block>
                <TouchableOpacity
                    onPress={() => hideModal()}
                >
                    <IconButton
                        icon="close"
                        iconColor={COLORS.red}
                        size={30}
                    />
                </TouchableOpacity>

            </Block>
            <BottomSheetScrollView>
                <Block>

                    <Block >
                        <View style={styles.pageIndicator}>
                            {/* <PageIndicator variant="train" count={pages.length} current={Animated.divide(scrollX, width)} /> */}
                        </View>

                        <Animated.ScrollView
                            ref={scrollViewRef}
                            scrollEnabled={false}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                                useNativeDriver: false, // Changed to false to use _value
                            })}
                            scrollEventThrottle={16} // Handle scroll event every 16ms
                        >
                            {pages.map((page, index) => (
                                <Block key={index} style={[styles.page, { width, height }]}>
                                    {
                                        index === 0 ?
                                            <>
                                                {/* <Text bold h3>Please select your tribe</Text> */}
                                                <Block style={styles.selectDropdown}>
                                                    {/* <SelectDropdown
                                                        search
                                                        

                                                        // onChangeSearchInputText={(val)=>{
                                                        //     console.log("val", val);
                                                        //     return val
                                                        // }}
                                                        searchPlaceHolder="Type: 'Other' If your tribe doesn't exist "

                                                        data={tribes}
                                                        onSelect={(selectedItem, index) => {
                                                            console.log(selectedItem, index);
                                                            setSelectedTribe(selectedItem.title);
                                                            setNewTribe("");
                                                            setNewTribeNext(false)
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
                                                    /> */}
                                                </Block>

                                                {
                                                    selectedTribe === "Other" ?
                                                        <>
                                                            {isLoadingByName ? <ActivityIndicator /> : null}
                                                            {/* {errorByName? <Text>{errorByName}</Text>:null} */}
                                                            <TextInput error={newTribeNext} onChangeText={setNewTribe} style={styles.textInput} label="Add manually the name of your tribe"
                                                                mode="outlined" keyboardType="default" />
                                                        </> : null
                                                }

                                                {/* <TextInput style={styles.textInput} label="Name of tribe or native language"
                                                mode="outlined" keyboardType="default" />

                                            <TextInput style={styles.textInput} label="What is climate change in your native language" mode="outlined"  keyboardType="default" /> */}

                                            </> :
                                            index === 1 ?
                                                !foundTribe() ?
                                                    <><Text bold h3>Is Climate knowledge exists in your local language?</Text>
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
                                                        /></> :
                                                    <>
                                                        <Text bold h2 color={COLORS.darkgreen}>
                                                            Good news for your {selectedTribe}'s tribe!</Text>
                                                        <Text h3>Climate knowledge exists in your local language!</Text>

                                                    </>
                                                :
                                                index === 2 ? <>

                                                    {/* climate_change_in_lang
                                           translate: 
                                            value: { type: String },
                                            owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                                            timestamp: { type: Date, default: Date.now() },
                                            vote: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },

                                        location

                                        proof_link

                                        images */}

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
                                                </> : null
                                    }
                                    <Block padding={[30, 0, 0, 0]} row space="between" >
                                        <Button disabled={index === 0 ? true : false} mode="contained-tonal" onPress={goToPreviousPage} style={styles.button}>
                                            <Text>Previous</Text>
                                        </Button>
                                        <Button disabled={index === pages.length - 1 ? true : false} mode="contained-tonal" onPress={goToNextPage} style={styles.button}>
                                            <Text>Next</Text>
                                        </Button>
                                    </Block>
                                </Block>
                            ))}
                        </Animated.ScrollView>

                    </Block>

                </Block>
            </BottomSheetScrollView>

        </BottomSheetModal>
    };



    const RenderBottomCK = () => {

        return <BottomSheetModal
            ref={bottomSheetCK}
            index={0}
            backdropComponent={BackdropElementCK}
            snapPoints={snapPoints}
            onDismiss={() => setOpenCK(false)}
        >

            <Block row space='between' padding={[0, 20]}>
                <Block m_b={10} flex={1}>
                    <Text bold h3>CLIMATE KNOWLEDGE</Text>
                    <Text color={COLORS.blue}>{`In your local language`}</Text>
                </Block>
                <TouchableOpacity
                    onPress={() => hideModalCK()}
                >
                    <IconButton
                        icon="close"
                        iconColor={COLORS.red}
                        size={30}
                    />
                </TouchableOpacity>

            </Block>
            <BottomSheetScrollView>
                <Block>

                    <ClimateKnowledgeComponet onShowImages={showDialog} onShowMap={showDialogMap} userId={currentUser} tribeListBelongs={tribeListBelongs} />


                    {/* {
                        tribeListBelongs===null?
                        <ClimateKnowledgeComponet userId={currentUser} tribeListBelongs={tribeListBelongs} />:

                        <ClimateKnowledgeExist tribeListBelongs={tribeListBelongs} />
                    } */}

                </Block>
            </BottomSheetScrollView>

        </BottomSheetModal>
    };


    // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
        checkLoginStatus();
        if (error && !success) {
            console.log("====>", error);
            // Toast.warn("Verifier votre internet!", 'top');

            Toast.error("An error has occurred", 'top');
            // setValid(false);
            // setPasswordError(true)
        }
    }, []);

    const checkLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            // console.log("value main", value)
            if (value === null) {
                console.log(navigation);

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        } catch (error) {
            console.log('Error retrieving installation status:', error);
            Toast.error("An error has occurred!!", 'top');
        }
    };

    const foundTribe = () => {
        return true
    };

    return <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <Container position="bottom" style={{ width: '100%' }} duration={6000} />

            <Block style={{ position: "relative", }}>

                <Block paddingBottom={60} padding={30} middle row space="between" color={COLORS.primary}>
                    <Block>
                        <Text white >Climate Literacy Mapper</Text>
                        <Text numberOfLines={1} bold h2 white >Hi, {currentUserName}</Text>
                    </Block>
                    <Avatar.Icon size={54} icon="account-circle" />
                </Block>
                <Block margin={[0, 20]}>
                    <Block center padding={[30, 10, 30, 20]} row middle
                        space="between" color={COLORS.white} card shadow style={{
                            width: '100%',
                            // position: "relative", 
                            // left: '2.5%', 
                            paddingHorizontal: 20,
                            top: -30
                        }}
                    >
                        <Block>
                            <Text gray>
                                Your current level
                            </Text>
                            <Text bold h3>Climate Literacy Mapper</Text>
                        </Block>
                        {/* <PieChart
                            donut
                            radius={30}
                            innerRadius={25}
                            data={pieData}
                            centerLabelComponent={() => {
                                return <Text style={{ fontSize: 15 }}>70%</Text>;
                            }}
                        /> */}


                    </Block>
                </Block>

            </Block>
            <ScrollView style={{ marginTop: -25, }}>
                <Block margin={20} padding={40} card shadow color={COLORS.yellow} >
                    <Text center bold>
                        Do you know people from other tribes that would like to participate in this exercise?
                    </Text>
                    <Button buttonColor="#cb8151" style={{ marginTop: 15 }} mode="outlined" ><Text style={{  color: COLORS.white,}}>Invite a friend</Text></Button>
                    <Image
                        source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                        style={[styles.profileImage, styles.profileImageLeft]}
                    />
                    <Image
                        source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                        style={[styles.profileImage, styles.profileImageBottomRight]}
                    />
                </Block>
                {
                    tribeListBelongs && <Block padding={[0, 20]} >
                        <Text bold>What is climate change in your native language?</Text>
                        <Text accent>MBURA</Text>
                    </Block>
                }


                <Block>
                    <ClimateKnowledge openModal={openModalCK} />
                    {/* <List.Item
                        onPress={() => {
                            console.log("ok");

                            openModal();
                        }}
                        title="Climate knowledge"
                        titleStyle={{
                            fontWeight: "bold"
                        }}
                        description="2/3 questions"
                        left={props => <List.Icon {...props}
                            icon="plus"
                            color="red"
                        />}
                        right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
                    /> */}
                    {/* {

                        translations.map(item => {
                            return Object.keys(item)
                                .filter(key => key !== "tribe" && key !== "_id" && key !== "status"
                                    && key !== "__v" && key !== "ststus" && key !== "timestamp")
                                .map((key, val) => {
                                    // console.log("----------", item[key]);

                                    return <List.Item
                                        onPress={() => {
                                            console.log("ok");

                                            openModal();
                                        }}
                                        title={
                                            key === "preLesson" ? "Pre-lesson questions" : 
                                                key === "localChallenges" ? "Local challenges" :
                                                    key === "mindfullExercises" ? "Mindfulness exercises" :
                                                        key === "rle" ? " Real-life existing examples" : key


                                        }
                                        titleStyle={{
                                            fontWeight: "bold"
                                        }}
                                        key={key}
                                        description="2/3 questions"
                                        left={props => <List.Icon {...props}
                                            icon={
                                                key === "preLesson" ? "apps" :
                                                    key === "localChallenges" ? "offer" :
                                                        key === "mindfullExercises" ? "odnoklassniki" :
                                                            key === "rle" ? "run" : key

                                            }
                                            color={
                                                key === "preLesson" ? "chocolate" :
                                                    key === "localChallenges" ? "blue" :
                                                        key === "mindfullExercises" ? "green" :
                                                            key === "rle" ? "magenta" : key
                                            }
                                        />}
                                        right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
                                    />
                                });
                        })} */}

                </Block>
            </ScrollView>
            {
                RenderBottom()
            }
            {
                RenderBottomCK()
            }

        </BottomSheetModalProvider>

        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>Images</Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
                <FlatList
                    data={images}
                    keyExtractor={(item) => item.image}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                    )}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Close</Button>
            </Dialog.Actions>
        </Dialog>

        <Dialog visible={dialogVisibleMap} onDismiss={hideDialogMap}>
            <Dialog.Title>MAP</Dialog.Title>
            <Dialog.Content style={styles.dialogContent}>
                <Map />
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialogMap}>Close</Button>
            </Dialog.Actions>
        </Dialog>
    </GestureHandlerRootView>
};


const styles = StyleSheet.create({

    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
    },
    profileImageLeft: {
        top: -10,
        left: -10,
    },
    profileImageBottomRight: {
        bottom: -10,
        right: -10,
    },
    page: {
        display: "flex",
        padding: 20
    },
    pageIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
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
    selectDropdown: {
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        borderColor: COLORS.darkgray
    },
    textInput: {
        marginTop: 10
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
    cancel: {
        position: 'absolute',
        zIndex: 100,
        margin: 10,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius * 2,
        overflow: "hidden"
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9, // Replace with the aspect ratio of your images
        margin: 5,
    },
    dialogContent: {
        height: SIZES.height * 0.5, // 50% of the screen height
    },
});


export default MainScreen