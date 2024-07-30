import { useDispatch, useSelector } from "react-redux";
import { Block, Text } from "../../components"
import { logoutUser } from "@/redux/authReducer";
import { Avatar, Button, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { COLORS, SIZES } from "@/constants";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const MainScreen = ({ navigation }) => {
    const { error, isLoading, success, user } = useSelector((state) => state.user);

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
                    "icon":"folder"
                }
            ],
            "localChallenges": [
                {
                    "fr": "Défis locaux",
                    "eng": "Local challenges",
                    "local": "Changamoto za ndani",
                    "_id": "66a90b3f2ca5a67f23e20450",
                    "icon":"folder"
                }
            ],
            "mindfullExercises": [
                {
                    "fr": "Exercices de pleine conscience",
                    "eng": "Mindfulness exercises",
                    "local": "Mazoezi ya akili",
                    "_id": "66a90b3f2ca5a67f23e20451",
                    "icon":"folder"
                }
            ],

            "rle":[
                {
                    "fr": "Exercices de pleine conscience",
                    "eng": "Mindfulness exercises",
                    "local": "Mazoezi ya akili",
                    "_id": "66a90b3f2ca5a67f23e20451",
                    "icon":"folder"
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

    return <Block flex style={{ position: "relative", }}>
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
                {

                    translations.map(item => {
                        return Object.keys(item)
                            .filter(key => key !== "tribe" && key !== "_id" && key !== "status" 
                                && key !== "__v" && key !== "ststus"  && key !== "timestamp"  )
                            .map((key, val)=> {
                        console.log("----------",item[key]);
                                
                                return <List.Item
                                    title={
                                        key == "preLesson"? "Pre-lesson questions": 
                                        key == "localChallenges"? "Local challenges":
                                        key == "mindfullExercises"? "Mindfulness exercises":
                                        key == "rle"? " Real-life existing examples":key

                                       
                                    }
                                    titleStyle={{
                                        fontWeight: "bold"
                                    }}
                                    key={key}
                                    description="2/3 questions"
                                    left={props => <List.Icon {...props} 
                                    icon={
                                        key == "preLesson"? "apps": 
                                        key == "localChallenges"? "offer":
                                        key == "mindfullExercises"? "odnoklassniki":
                                        key == "rle"? "run":key

                                    }
                                    color={
                                        key == "preLesson"? "chocolate": 
                                        key == "localChallenges"? "blue":
                                        key == "mindfullExercises"? "green":
                                        key == "rle"? "magenta":key

                                    } 
                                     />}
                                    right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
                                />
                    });
                    })}


            </Block>
        </ScrollView>
    </Block>
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
});


export default MainScreen
