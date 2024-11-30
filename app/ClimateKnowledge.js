
import { List } from "react-native-paper";
import { COLORS } from "../constants";

const ClimateKnowledge = ({ openModal }) => {

    return <>
        <List.Item
            onPress={() => {
                console.log("ok");

                openModal();
            }}
            title="Climate knowledge"
            titleStyle={{
                fontWeight: "bold",
                color: COLORS.black
            }}
            description="2/5 questions"
            descriptionStyle={{
                color: COLORS.darkgray
            }}
            left={props => <List.Icon {...props}
                icon="plus"
                color="red"
            />}
            right={props => <List.Icon {...props} icon="arrow-right" color="grey" />}
        />
    </>

};

export default ClimateKnowledge;
