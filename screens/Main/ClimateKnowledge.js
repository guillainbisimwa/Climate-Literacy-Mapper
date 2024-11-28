
import { List } from "react-native-paper";

const ClimateKnowledge = ({ openModal }) => {

    return <>
        <List.Item
            onPress={() => {
                console.log("ok");

                openModal();
            }}
            title="Climate knowledge2"
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
    </>

};

export default ClimateKnowledge;
