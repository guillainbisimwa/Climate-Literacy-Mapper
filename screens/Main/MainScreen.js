import { useDispatch, useSelector } from "react-redux";
import { Block, Location, Proof, Text } from "../../components"
import { ActivityIndicator, Avatar, Button, IconButton, List, MD3Colors, ProgressBar, SegmentedButtons, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { COLORS, SIZES } from "@/constants";
import { Animated, ImageBackground, TouchableOpacity, Image, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PageIndicator } from 'react-native-page-indicator';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchTribeByName } from "@/redux/tribeSlice";
import Container, { Toast } from "toastify-react-native";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ClimateKnowledge from "./ClimateKnowledge";
import { LinearGradient } from "react-native-svg";
import ClimateKnowledgeComponet from '../../components/ClimateKnowledgeComponet';


const MainScreen = ({ navigation }) => {
    const { user, error, success } = useSelector((state) => state.user);
    const { tribeList, isLoadingByName, errorByName, successByName, tribeByName } = useSelector((state) => state.tribe);
    const [images, setImages] = useState([]);
    const [loadPic, setLoadPic] = useState(false);

    const isSignedIn = useSelector((state) => state.auth.user);
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
    // console.log("{user?.user?.user?.name}", isSignedIn?.user?.user?.name);
    console.log("value user", user);

    // console.log("tribeList---------", tribeList);

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
        { title: "Agbogho monnwhu", icon: "square-rounded-outline" },
        { title: "Agwa", icon: "square-rounded-outline" },
        { title: "Aizi", icon: "square-rounded-outline" },
        { title: "Akan", icon: "square-rounded-outline" },
        { title: "Akuapem", icon: "square-rounded-outline" },
        { title: "Aladyan", icon: "square-rounded-outline" },
        { title: "Ambo", icon: "square-rounded-outline" },
        { title: "Anang", icon: "square-rounded-outline" },
        { title: "Anyang", icon: "square-rounded-outline" },
        { title: "Anyi", icon: "square-rounded-outline" },
        { title: "Aowin", icon: "square-rounded-outline" },
        { title: "Arugba", icon: "square-rounded-outline" },
        { title: "Asante", icon: "square-rounded-outline" },
        { title: "Asinda", icon: "square-rounded-outline" },
        { title: "Akye", icon: "square-rounded-outline" },
        { title: "Avikam", icon: "square-rounded-outline" },
        { title: "Bafo", icon: "square-rounded-outline" },
        { title: "Baga", icon: "square-rounded-outline" },
        { title: "Bakota", icon: "square-rounded-outline" },
        { title: "Balante", icon: "square-rounded-outline" },
        { title: "Bali", icon: "square-rounded-outline" },
        { title: "Bamana", icon: "square-rounded-outline" },
        { title: "Bambara", icon: "square-rounded-outline" },
        { title: "Bamileke", icon: "square-rounded-outline" },
        { title: "Bamum", icon: "square-rounded-outline" },
        { title: "Bana", icon: "square-rounded-outline" },
        { title: "Bangba", icon: "square-rounded-outline" },
        { title: "Bangubangu", icon: "square-rounded-outline" },
        { title: "Bangwa", icon: "square-rounded-outline" },
        { title: "Bankoni", icon: "square-rounded-outline" },
        { title: "Banyambo", icon: "square-rounded-outline" },
        { title: "Barambu", icon: "square-rounded-outline" },
        { title: "Bariba", icon: "square-rounded-outline" },
        { title: "Barotse", icon: "square-rounded-outline" },
        { title: "Basikasingo", icon: "square-rounded-outline" },
        { title: "Bassa", icon: "square-rounded-outline" },
        { title: "Baster", icon: "square-rounded-outline" },
        { title: "Baule", icon: "square-rounded-outline" },
        { title: "Beke", icon: "square-rounded-outline" },
        { title: "Bella", icon: "square-rounded-outline" },
        { title: "Bemba", icon: "square-rounded-outline" },
        { title: "Bembe", icon: "square-rounded-outline" },
        { title: "Bena Luluwa", icon: "square-rounded-outline" },
        { title: "Bende", icon: "square-rounded-outline" },
        { title: "Benin", icon: "square-rounded-outline" },
        { title: "Berber", icon: "square-rounded-outline" },
        { title: "Bete", icon: "square-rounded-outline" },
        { title: "Betsi", icon: "square-rounded-outline" },
        { title: "Bidjogo", icon: "square-rounded-outline" },
        { title: "Bidyogo", icon: "square-rounded-outline" },
        { title: "Bijema", icon: "square-rounded-outline" },
        { title: "Bira", icon: "square-rounded-outline" },
        { title: "Bjiri", icon: "square-rounded-outline" },
        { title: "Boa", icon: "square-rounded-outline" },
        { title: "Bobo", icon: "square-rounded-outline" },
        { title: "Bodo", icon: "square-rounded-outline" },
        { title: "Boki", icon: "square-rounded-outline" },
        { title: "Bongo", icon: "square-rounded-outline" },
        { title: "Boni", icon: "square-rounded-outline" },
        { title: "Borana", icon: "square-rounded-outline" },
        { title: "Bozo", icon: "square-rounded-outline" },
        { title: "Buganda", icon: "square-rounded-outline" },
        { title: "Bundu", icon: "square-rounded-outline" },
        { title: "Burra", icon: "square-rounded-outline" },
        { title: "Bushoong", icon: "square-rounded-outline" },
        { title: "Buyu", icon: "square-rounded-outline" },
        { title: "Bwa", icon: "square-rounded-outline" },
        { title: "Bwaka", icon: "square-rounded-outline" },
        { title: "Bwende", icon: "square-rounded-outline" },
        { title: "Bwile", icon: "square-rounded-outline" },
        { title: "Byeri", icon: "square-rounded-outline" },
        { title: "Byeru", icon: "square-rounded-outline" },
        { title: "Chagga", icon: "square-rounded-outline" },
        // { title: "Chamba", icon: "square-rounded-outline" },
        // { title: "Chokwe", icon: "square-rounded-outline" },
        // { title: "Chopi", icon: "square-rounded-outline" },
        // { title: "Dabakala", icon: "square-rounded-outline" },
        // { title: "Dagari", icon: "square-rounded-outline" },
        // { title: "Dakakari", icon: "square-rounded-outline" },
        // { title: "Damara", icon: "square-rounded-outline" },
        // { title: "Dan", icon: "square-rounded-outline" },
        // { title: "Dinka", icon: "square-rounded-outline" },
        // { title: "Diomande", icon: "square-rounded-outline" },
        // { title: "Dioula", icon: "square-rounded-outline" },
        // { title: "Djenné", icon: "square-rounded-outline" },
        // { title: "Dogon", icon: "square-rounded-outline" },
        // { title: "Dorobo", icon: "square-rounded-outline" },
        // { title: "Ebandza", icon: "square-rounded-outline" },
        // { title: "Edan", icon: "square-rounded-outline" },
        // { title: "Ega", icon: "square-rounded-outline" },
        // { title: "Ejagham", icon: "square-rounded-outline" },
        // { title: "Eket", icon: "square-rounded-outline" },
        // { title: "Ekoi", icon: "square-rounded-outline" },
        // { title: "Ekonda", icon: "square-rounded-outline" },
        // { title: "Elefon", icon: "square-rounded-outline" },
        // { title: "Elegba", icon: "square-rounded-outline" },
        // { title: "Eotile", icon: "square-rounded-outline" },
        // { title: "Epa", icon: "square-rounded-outline" },
        // { title: "Esie", icon: "square-rounded-outline" },
        // { title: "Esuma", icon: "square-rounded-outline" },
        // { title: "Ewe", icon: "square-rounded-outline" },
        // { title: "Fale", icon: "square-rounded-outline" },
        // { title: "Fang", icon: "square-rounded-outline" },
        // { title: "Fante", icon: "square-rounded-outline" },
        // { title: "Fon", icon: "square-rounded-outline" },
        // { title: "Frafra", icon: "square-rounded-outline" },
        // { title: "Fuga", icon: "square-rounded-outline" },
        // { title: "Fulani", icon: "square-rounded-outline" },
        // { title: "Few", icon: "square-rounded-outline" },
        // { title: "Gan", icon: "square-rounded-outline" },
        // { title: "Gaola", icon: "square-rounded-outline" },
        // { title: "Gato", icon: "square-rounded-outline" },
        // { title: "Gbekre", icon: "square-rounded-outline" },
        // { title: "Gciriku", icon: "square-rounded-outline" },
        // { title: "Geh", icon: "square-rounded-outline" },
        // { title: "Ghimbala", icon: "square-rounded-outline" },
        // { title: "Gio", icon: "square-rounded-outline" },
        // { title: "Giryama", icon: "square-rounded-outline" },
        // { title: "Gogo", icon: "square-rounded-outline" },
        // { title: "Goma", icon: "square-rounded-outline" },
        // { title: "Gon", icon: "square-rounded-outline" },
        // { title: "Grebo", icon: "square-rounded-outline" },
        // { title: "Guerre", icon: "square-rounded-outline" },
        // { title: "Guerze_Kpelle", icon: "square-rounded-outline" },
        // { title: "Guin", icon: "square-rounded-outline" },
        // { title: "Gurage", icon: "square-rounded-outline" },
        // { title: "Guro", icon: "square-rounded-outline" },
        // { title: "Gurunsi", icon: "square-rounded-outline" },
        // { title: "Gwa", icon: "square-rounded-outline" },
        // { title: "Hamar", icon: "square-rounded-outline" },
        // { title: "Hamba", icon: "square-rounded-outline" },
        // { title: "Hausa", icon: "square-rounded-outline" },
        // { title: "Hehe", icon: "square-rounded-outline" },
        // { title: "Hemba", icon: "square-rounded-outline" },
        // { title: "Herero", icon: "square-rounded-outline" },
        // { title: "Himba", icon: "square-rounded-outline" },
        // { title: "Holoholo", icon: "square-rounded-outline" },
        // { title: "Hutu", icon: "square-rounded-outline" },
        // { title: "Hungana", icon: "square-rounded-outline" },
        // { title: "Ibibio", icon: "square-rounded-outline" },
        // { title: "Idoma", icon: "square-rounded-outline" },
        // { title: "Igala", icon: "square-rounded-outline" },
        // { title: "Igbira", icon: "square-rounded-outline" },
        // { title: "Igbo", icon: "square-rounded-outline" },
        // { title: "Igbo Ukwu", icon: "square-rounded-outline" },
        // { title: "Ijo", icon: "square-rounded-outline" },
        // { title: "Iraqw", icon: "square-rounded-outline" },
        // { title: "Jaba", icon: "square-rounded-outline" },
        // { title: "Jukun", icon: "square-rounded-outline" },
        // { title: "Kafigeledio", icon: "square-rounded-outline" },
        // { title: "Kaguru", icon: "square-rounded-outline" },
        // { title: "Kaka", icon: "square-rounded-outline" },
        // { title: "Kanu", icon: "square-rounded-outline" },
        // { title: "Kara", icon: "square-rounded-outline" },
        // { title: "Karo", icon: "square-rounded-outline" },
        // { title: "Karagwe", icon: "square-rounded-outline" },
        // { title: "Karamojong", icon: "square-rounded-outline" },
        // { title: "Karsina", icon: "square-rounded-outline" },
        // { title: "Kassena", icon: "square-rounded-outline" },
        // { title: "Katana", icon: "square-rounded-outline" },
        // { title: "Katsina", icon: "square-rounded-outline" },
        // { title: "Kerebe", icon: "square-rounded-outline" },
        // { title: "Kete", icon: "square-rounded-outline" },
        // { title: "Kholuka", icon: "square-rounded-outline" },
        // { title: "Kigango", icon: "square-rounded-outline" },
        // { title: "Kikuyu", icon: "square-rounded-outline" },
        // { title: "Kipsigi", icon: "square-rounded-outline" },
        // { title: "Kissi", icon: "square-rounded-outline" },
        // { title: "Kiteki", icon: "square-rounded-outline" },
        // { title: "Kom", icon: "square-rounded-outline" },
        // { title: "Koma", icon: "square-rounded-outline" },
        // { title: "Komo", icon: "square-rounded-outline" },
        // { title: "Kongo", icon: "square-rounded-outline" },
        // { title: "Konso", icon: "square-rounded-outline" },
        // { title: "Koro", icon: "square-rounded-outline" },
        // { title: "Kota", icon: "square-rounded-outline" },
        // { title: "Kpaniya", icon: "square-rounded-outline" },
        // { title: "Kpelie", icon: "square-rounded-outline" },
        // { title: "Kponiugo", icon: "square-rounded-outline" },
        // { title: "Kran", icon: "square-rounded-outline" },
        // { title: "Krinjabo", icon: "square-rounded-outline" },
        // { title: "Krobu", icon: "square-rounded-outline" },
        // { title: "Kru", icon: "square-rounded-outline" },
        // { title: "Kuba", icon: "square-rounded-outline" },
        // { title: "Kusu", icon: "square-rounded-outline" },
        // { title: "Kuyu", icon: "square-rounded-outline" },
        // { title: "Kwahu", icon: "square-rounded-outline" },
        // { title: "Kwame", icon: "square-rounded-outline" },
        // { title: "Kwangali", icon: "square-rounded-outline" },
        // { title: "Kwele", icon: "square-rounded-outline" },
        // { title: "Kwere", icon: "square-rounded-outline" },
        // { title: "Kyaman", icon: "square-rounded-outline" },
        // { title: "Laka", icon: "square-rounded-outline" },
        // { title: "Lamba", icon: "square-rounded-outline" },
        // { title: "Landuma", icon: "square-rounded-outline" },
        // { title: "Lega", icon: "square-rounded-outline" },
        // { title: "Leka", icon: "square-rounded-outline" },
        // { title: "Lele", icon: "square-rounded-outline" },
        // { title: "Lemba", icon: "square-rounded-outline" },
        // { title: "Lenge", icon: "square-rounded-outline" },
        // { title: "Lengola", icon: "square-rounded-outline" },
        // { title: "Lese", icon: "square-rounded-outline" },
        // { title: "Liko", icon: "square-rounded-outline" },
        // { title: "Lobedu", icon: "square-rounded-outline" },
        // { title: "Lobi", icon: "square-rounded-outline" },
        // { title: "Loma", icon: "square-rounded-outline" },
        // { title: "Lombi", icon: "square-rounded-outline" },
        // { title: "Lomotwa", icon: "square-rounded-outline" },
        // { title: "Lovale", icon: "square-rounded-outline" },
        // { title: "Lovedu", icon: "square-rounded-outline" },
        // { title: "Lozi", icon: "square-rounded-outline" },
        // { title: "Luba Upemba", icon: "square-rounded-outline" },
        // { title: "Luchazi", icon: "square-rounded-outline" },
        // { title: "Lulua", icon: "square-rounded-outline" },
        // { title: "Lumbo", icon: "square-rounded-outline" },
        // { title: "Lunda", icon: "square-rounded-outline" },
        // { title: "Lungu", icon: "square-rounded-outline" },
        // { title: "Luvale", icon: "square-rounded-outline" },
        // { title: "Lwalwa", icon: "square-rounded-outline" },
        // { title: "Lwena", icon: "square-rounded-outline" },
        // { title: "Maasai", icon: "square-rounded-outline" },
        // { title: "Mabaan", icon: "square-rounded-outline" },
        // { title: "Mabea", icon: "square-rounded-outline" },
        // { title: "Mahafaly", icon: "square-rounded-outline" },
        // { title: "Mahongwe", icon: "square-rounded-outline" },
        // { title: "Makonde", icon: "square-rounded-outline" },
        // { title: "Malinke", icon: "square-rounded-outline" },
        // { title: "Mambila", icon: "square-rounded-outline" },
        // { title: "Mandinka", icon: "square-rounded-outline" },
        // { title: "Mangbetu", icon: "square-rounded-outline" },
        // { title: "Manja", icon: "square-rounded-outline" },
        // { title: "Mano", icon: "square-rounded-outline" },
        // { title: "Marka", icon: "square-rounded-outline" },
        // { title: "Masai", icon: "square-rounded-outline" },
        // { title: "Mau", icon: "square-rounded-outline" },
        // { title: "Mbala", icon: "square-rounded-outline" },
        // { title: "Mbanja", icon: "square-rounded-outline" },
        // { title: "Mbete", icon: "square-rounded-outline" },
        // { title: "Mbo", icon: "square-rounded-outline" },
        // { title: "Mbole", icon: "square-rounded-outline" },
        // { title: "Mbukushu", icon: "square-rounded-outline" },
        // { title: "Mbunza", icon: "square-rounded-outline" },
        // { title: "Mbuti", icon: "square-rounded-outline" },
        // { title: "Medje", icon: "square-rounded-outline" },
        // { title: "Mende", icon: "square-rounded-outline" },
        // { title: "Mfumte", icon: "square-rounded-outline" },
        // { title: "Mindumu", icon: "square-rounded-outline" },
        // { title: "Mitsogo", icon: "square-rounded-outline" },
        // { title: "Mongo", icon: "square-rounded-outline" },
        // { title: "Mossi", icon: "square-rounded-outline" },
        // { title: "Mpo", icon: "square-rounded-outline" },
        // { title: "Mumuye", icon: "square-rounded-outline" },
        // { title: "Munchi", icon: "square-rounded-outline" },
        // { title: "Mvuba", icon: "square-rounded-outline" },
        // { title: "Nalu", icon: "square-rounded-outline" },
        // { title: "Nama", icon: "square-rounded-outline" },
        // { title: "Namji", icon: "square-rounded-outline" },
        // { title: "Nande", icon: "square-rounded-outline" },
        // { title: "Ndaaka", icon: "square-rounded-outline" },
        // { title: "Ndabi", icon: "square-rounded-outline" },
        // { title: "Ndebele", icon: "square-rounded-outline" },
        // { title: "Ndengese", icon: "square-rounded-outline" },
        // { title: "Ngbaka", icon: "square-rounded-outline" },
        // { title: "Ngbandi", icon: "square-rounded-outline" },
        // { title: "Ngere", icon: "square-rounded-outline" },
        // { title: "Ngoni", icon: "square-rounded-outline" },
        // { title: "Nguni", icon: "square-rounded-outline" },
        // { title: "Nkanu", icon: "square-rounded-outline" },
        // { title: "Nkondi", icon: "square-rounded-outline" },
        // { title: "Nok", icon: "square-rounded-outline" },
        // { title: "Ntumu", icon: "square-rounded-outline" },
        // { title: "Nuna", icon: "square-rounded-outline" },
        // { title: "Nupe", icon: "square-rounded-outline" },
        // { title: "Nyamwezi", icon: "square-rounded-outline" },
        // { title: "Nyanga", icon: "square-rounded-outline" },
        // { title: "Nyanzi", icon: "square-rounded-outline" },
        // { title: "Nyindu", icon: "square-rounded-outline" },
        // { title: "Nyoro", icon: "square-rounded-outline" },
        // { title: "Obamba", icon: "square-rounded-outline" },
        // { title: "Ogboni", icon: "square-rounded-outline" },
        // { title: "Ogoni", icon: "square-rounded-outline" },
        // { title: "Ogowe", icon: "square-rounded-outline" },
        // { title: "Okua", icon: "square-rounded-outline" },
        // { title: "Ondumbo", icon: "square-rounded-outline" },
        // { title: "Oromo", icon: "square-rounded-outline" },
        // { title: "Oron", icon: "square-rounded-outline" },
        // { title: "Ovambo", icon: "square-rounded-outline" },
        // { title: "Ovimbundu", icon: "square-rounded-outline" },
        // { title: "Owe", icon: "square-rounded-outline" },
        // { title: "Owo", icon: "square-rounded-outline" },
        // { title: "Pangwa", icon: "square-rounded-outline" },
        // { title: "Pedi", icon: "square-rounded-outline" },
        // { title: "Pende", icon: "square-rounded-outline" },
        // { title: "Pere", icon: "square-rounded-outline" },
        // { title: "Pfemba", icon: "square-rounded-outline" },
        // { title: "Pokot", icon: "square-rounded-outline" },
        // { title: "Pomdo", icon: "square-rounded-outline" },
        // { title: "Punu", icon: "square-rounded-outline" },
        // { title: "Pygmy", icon: "square-rounded-outline" },
        // { title: "Qua", icon: "square-rounded-outline" },
        // { title: "Rungu", icon: "square-rounded-outline" },
        // { title: "Sakalava", icon: "square-rounded-outline" },
        // { title: "Salampasu", icon: "square-rounded-outline" },
        // { title: "Samburu", icon: "square-rounded-outline" },
        // { title: "San", icon: "square-rounded-outline" },
        // { title: "Sango", icon: "square-rounded-outline" },
        // { title: "Sanwi", icon: "square-rounded-outline" },
        // { title: "Sapi", icon: "square-rounded-outline" },
        // { title: "Segou", icon: "square-rounded-outline" },
        // { title: "Senufo", icon: "square-rounded-outline" },
        // { title: "Shamaye", icon: "square-rounded-outline" },
        // { title: "Shambaa", icon: "square-rounded-outline" },
        // { title: "Shambiu", icon: "square-rounded-outline" },
        // { title: "Shangaan", icon: "square-rounded-outline" },
        // { title: "Sherbo", icon: "square-rounded-outline" },
        // { title: "Shi", icon: "square-rounded-outline" },
        // { title: "Shilluk", icon: "square-rounded-outline" },
        // { title: "Shona", icon: "square-rounded-outline" },
        // { title: "Sikasingo", icon: "square-rounded-outline" },
        // { title: "Sikka", icon: "square-rounded-outline" },
        // { title: "Sokoto", icon: "square-rounded-outline" },
        // { title: "Somali", icon: "square-rounded-outline" },
        // { title: "Songhai", icon: "square-rounded-outline" },
        // { title: "Songo", icon: "square-rounded-outline" },
        // { title: "Songola", icon: "square-rounded-outline" },
        // { title: "Songye", icon: "square-rounded-outline" },
        // { title: "Soninke", icon: "square-rounded-outline" },
        // { title: "Sotho", icon: "square-rounded-outline" },
        // { title: "Subia", icon: "square-rounded-outline" },
        // { title: "Suku", icon: "square-rounded-outline" },
        // { title: "Surma", icon: "square-rounded-outline" },
        // { title: "Susu", icon: "square-rounded-outline" },
        // { title: "Swahili", icon: "square-rounded-outline" },
        // { title: "Swazi", icon: "square-rounded-outline" },
        // { title: "Tabwa", icon: "square-rounded-outline" },
        // { title: "Tale", icon: "square-rounded-outline" },
        // { title: "Teke", icon: "square-rounded-outline" },
        // { title: "Tellem", icon: "square-rounded-outline" },
        // { title: "Temne", icon: "square-rounded-outline" },
        // { title: "Tetela", icon: "square-rounded-outline" },
        // { title: "Thonga", icon: "square-rounded-outline" },
        // { title: "Tikar", icon: "square-rounded-outline" },
        // { title: "Tiv", icon: "square-rounded-outline" },
        // { title: "Tjiwara", icon: "square-rounded-outline" },
        // { title: "Toma", icon: "square-rounded-outline" },
        // { title: "Tongwe", icon: "square-rounded-outline" },
        // { title: "Totela", icon: "square-rounded-outline" },
        // { title: "Toubou", icon: "square-rounded-outline" },
        // { title: "Tsogho", icon: "square-rounded-outline" },
        // { title: "Tsonga", icon: "square-rounded-outline" },
        // { title: "Tswana", icon: "square-rounded-outline" },
        // { title: "Tuareg", icon: "square-rounded-outline" },
        // { title: "Tumbwe", icon: "square-rounded-outline" },
        // { title: "Tutsi", icon: "square-rounded-outline" },
        // { title: "Twifo", icon: "square-rounded-outline" },
        // { title: "Urhobo", icon: "square-rounded-outline" },
        // { title: "Venda", icon: "square-rounded-outline" },
        // { title: "Vezo", icon: "square-rounded-outline" },
        // { title: "Vili", icon: "square-rounded-outline" },
        // { title: "Wassa", icon: "square-rounded-outline" },
        // { title: "We", icon: "square-rounded-outline" },
        // { title: "Winiama", icon: "square-rounded-outline" },
        // { title: "Wodaabe", icon: "square-rounded-outline" },
        // { title: "Wolof", icon: "square-rounded-outline" },
        // { title: "Wongo", icon: "square-rounded-outline" },
        // { title: "Woyo", icon: "square-rounded-outline" },
        // { title: "Wum", icon: "square-rounded-outline" },
        // { title: "Xhosa", icon: "square-rounded-outline" },
        // { title: "Yaka", icon: "square-rounded-outline" },
        // { title: "Yaure", icon: "square-rounded-outline" },
        // { title: "Yeyi", icon: "square-rounded-outline" },
        // { title: "Ymbe", icon: "square-rounded-outline" },
        // { title: "Yoruba", icon: "square-rounded-outline" },
        // { title: "Zande", icon: "square-rounded-outline" },
        // { title: "Zaramo", icon: "square-rounded-outline" },
        // { title: "Zela", icon: "square-rounded-outline" },
        // { title: "Zimba", icon: "square-rounded-outline" },
        { title: "Zombo", icon: "square-rounded-outline" },
        { title: "Zulu", icon: "square-rounded-outline" },
    ];


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

    const renderBottom = () => {
        const { width, height } = useWindowDimensions();
        const scrollX = useRef(new Animated.Value(0)).current;
        const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
        const scrollViewRef = useRef(null);

        const goToNextPage = () => {

            const currentPageIndex = Math.floor(scrollX._value / width);
            const nextPageIndex = Math.min(currentPageIndex + 1, pages.length - 1);
            // console.log("currentPageIndex", currentPageIndex);
            // console.log("selectedTribe", selectedTribe);
            if (currentPageIndex == 0 && selectedTribe == "Other" && newTribe.trim() === "") {
                setNewTribeNext(true)
            }
            else if (currentPageIndex == 0 && selectedTribe == "Other" && newTribe.trim() !== "") {

                // check if tribe is already exists
                dispatch(fetchTribeByName({ tribeName: newTribe.trim() })).then((result) => {
                    if (fetchTribeByName.fulfilled.match(result)) {
                        // Handle successful login
                        console.log('Successful:', result.payload);
                        scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });

                    } else if (fetchTribeByName.rejected.match(result)) {
                        // Handle rejected login
                        Toast.error(`Error: ${result.payload}`, 'top');
                    }
                })
                    .catch((error) => {
                        // Handle any additional errors
                        console.error('Error during login:', error);
                        Toast.error(`Error :, ${error}`, 'top');
                    });

                scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });

            } else if (currentPageIndex == 0 && selectedTribe.length !== 0) {
                scrollViewRef.current.scrollTo({ x: nextPageIndex * width, animated: true });
            }
            else if (currentPageIndex == 1 && (selectedTribe.length !== 0 || newTribe.trim() != "")) {
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
            snapPoints={Math.floor(scrollX._value / width) == 0 ? snapPoints90 : snapPoints}
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
                            <PageIndicator variant="train" count={pages.length} current={Animated.divide(scrollX, width)} />
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
                                        index == 0 ?
                                            <>
                                                {/* <Text bold h3>Please select your tribe</Text> */}
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
                                                    />
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
                                            index == 1 ?
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
                                                index == 2 ? <>

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
                                        <Button disabled={index == 0 ? true : false} mode="contained-tonal" onPress={goToPreviousPage} style={styles.button}>
                                            <Text>Previous</Text>
                                        </Button>
                                        <Button disabled={index == pages.length - 1 ? true : false} mode="contained-tonal" onPress={goToNextPage} style={styles.button}>
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



    const renderBottomCK = () => {

        

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

                    {
                        <ClimateKnowledgeComponet />
                    }

                </Block>
            </BottomSheetScrollView>

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

    const foundTribe = () => {
        return true
    }

    return <GestureHandlerRootView>
        <BottomSheetModalProvider>
            <Container position="bottom" style={{ width: '100%' }} duration={6000} />

            <Block flex style={{ position: "relative", }}>

                <Block paddingBottom={60} padding={30} middle row space="between" color={COLORS.primary}>
                    <Block>
                        <Text white >Climate Literacy Mapper</Text>
                        <Text numberOfLines={0.5} bold h2 white >Hi, {isSignedIn?.user?.name}</Text>
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
                            Your current level
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
                        <ClimateKnowledge openModal={openModalCK}  />
                        <List.Item
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
            {
                renderBottomCK()
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
});


export default MainScreen
