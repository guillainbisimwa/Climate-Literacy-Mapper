import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "../../components"
import { Avatar, Button, IconButton, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS, SIZES } from "@/constants";
import { Animated, TouchableOpacity, Image, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PageIndicator } from 'react-native-page-indicator';


const MainScreen = ({ navigation }) => {
    const { error, isLoading, success, user } = useSelector((state) => state.user);
    const snapPoints = useMemo(() => ["50%", '70%', '80%', '90%'], []);
    const [open, setOpen] = useState(false);
    const pages = ['Page 1', 'Page 2', 'Page 3'];

    const bottomSheet = useRef(null);

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

    const renderBottom = () => {
        const { width, height } = useWindowDimensions();
        const scrollX = useRef(new Animated.Value(0)).current;
        const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
        const scrollViewRef = useRef(null);

        const goToNextPage = () => {
            const currentPageIndex = Math.floor(scrollX._value / width);
            const nextPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
            scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
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
            snapPoints={snapPoints}
            onDismiss={() => setOpen(false)}
        >

            <Block row space='between' padding={[0, 20]}>
                <Block m_b={10} flex={1}>
                    <Text bold h2>CLIMATE KNOWLEDGE</Text>
                    <Text color={COLORS.blue}>{`In our local language`}</Text>
                </Block>
                <TouchableOpacity
                    onPress={() => hideModal()}
                >
                    <IconButton
                        icon="close"
                        iconColor={COLORS.red}
                        size={40}
                    />
                </TouchableOpacity>

            </Block>
            <Block>

                <Block >
                    <View style={styles.pageIndicator}>
                        <PageIndicator count={pages.length} current={Animated.divide(scrollX, width)} />
                    </View>

                    <Animated.ScrollView
                        ref={scrollViewRef}
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
                                <Text>{pages.length}</Text>

                                <Block padding={[10, 0]} row space="between" >
                                    <Button disabled={index == 0? true:false} mode="contained-tonal" onPress={goToPreviousPage} style={styles.button}>
                                        <Text>Previous</Text>
                                    </Button>
                                    <Button disabled={index == pages.length - 1? true:false} mode="contained-tonal" onPress={goToNextPage} style={styles.button}>
                                        <Text>Next</Text>
                                    </Button>
                                </Block>
                            </Block>
                        ))}
                    </Animated.ScrollView>

                </Block>

            </Block>

        </BottomSheetModal>
    };




    const dispatch = useDispatch();
    // Use useEffect or any other method to handle the success state and display the alert
    useEffect(() => {
        checkLoginStatus();
        if (error && !success) {
            console.log("====>", error);
            // Toast.warn("Verifier votre internet!", 'top');

            Toast.error("An error has occurred", 'top');
            setValid(false);
            setPasswordError(true)

        }
    }, []);

    const checkLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            console.log("value main", value)
            if (value == null) {
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

    return <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <Block flex style={{ position: "relative", }}>
                <Block paddingBottom={60} padding={30} middle row space="between" color={COLORS.primary}>
                    <Block>
                        <Text white >Climate Literacy Mapper</Text>
                        <Text bold h2 white >Hi, Guillain weza </Text>
                    </Block>
                    <Avatar.Icon size={54} icon="account-circle" />
                </Block>
                <Block center padding={[30, 10, 30, 20]} row
                    space="between" color={COLORS.white} card shadow style={{
                        width: '90%',
                        position: "relative", left: '2.5%', top: -30
                    }}
                >
                    <Block>
                        <Text gray>
                            Please the form here!
                        </Text>
                        <Text bold h3>Climate Literacy Mapper</Text>
                    </Block>
                    <PieChart
                        donut
                        radius={30}
                        innerRadius={25}
                        data={pieData}
                        centerLabelComponent={() => {
                            return <Text style={{ fontSize: 15 }}>70%</Text>;
                        }}
                    />


                </Block>
                <ScrollView style={{ marginTop: -25 }}>
                    <Block margin={20} padding={40} card shadow color={COLORS.yellow} >
                        <Text center bold>
                            Do you know people from other tribes that would like to participate in this exercise?
                        </Text>
                        <Button style={{ marginTop: 15 }} mode="outlined" >Invite a friend</Button>
                        <Image
                            source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                            style={[styles.profileImage, styles.profileImageLeft]}
                        />
                        <Image
                            source={{ uri: 'https://deep-image.ai/_next/static/media/app-info-deepimage.a6eea05d.webp' }}
                            style={[styles.profileImage, styles.profileImageBottomRight]}
                        />
                    </Block>

                    <Block padding={[0, 20]} flex>
                        <Text bold>What is climate change in your native language?</Text>
                        <Text accent>MBURA</Text>
                    </Block>
                    <Block>
                        <List.Item
                            onPress={() => {
                                console.log("ok");

                                openModal();
                            }}
                            title="Start here"
                            titleStyle={{
                                fontWeight: "bold"
                            }}
                            description="2/3 questions"
                            left={props => <List.Icon {...props}
                                icon="plus"
                                color="red"
                            />}
                            right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
                        />
                        {

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
                                                key == "preLesson" ? "Pre-lesson questions" :
                                                    key == "localChallenges" ? "Local challenges" :
                                                        key == "mindfullExercises" ? "Mindfulness exercises" :
                                                            key == "rle" ? " Real-life existing examples" : key


                                            }
                                            titleStyle={{
                                                fontWeight: "bold"
                                            }}
                                            key={key}
                                            description="2/3 questions"
                                            left={props => <List.Icon {...props}
                                                icon={
                                                    key == "preLesson" ? "apps" :
                                                        key == "localChallenges" ? "offer" :
                                                            key == "mindfullExercises" ? "odnoklassniki" :
                                                                key == "rle" ? "run" : key

                                                }
                                                color={
                                                    key == "preLesson" ? "chocolate" :
                                                        key == "localChallenges" ? "blue" :
                                                            key == "mindfullExercises" ? "green" :
                                                                key == "rle" ? "magenta" : key

                                                }
                                            />}
                                            right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
                                        />
                                    });
                            })}

                    </Block>
                </ScrollView>
            </Block>
            {
                renderBottom()
            }
        </BottomSheetModalProvider>
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

});


export default MainScreen
