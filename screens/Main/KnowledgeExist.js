import React, { useCallback, useRef } from "react"
import { Block, Text } from "../../components";
import { BottomSheetModal } from "@gorhom/bottom-sheet";



const KnowledgeExist = () =>{


    const bottomSheet = useRef(null);

    // const BackdropElement = useCallback(
    //     (backdropProps) => (
    //         <BottomSheetBackdrop
    //             {...backdropProps}
    //             opacity={0.7}
    //             appearsOnIndex={0}
    //             disappearsOnIndex={-1}
    //         />
    //     ),
    //     []
    // );

    const hideModal = () => handleClosePress();
    const handleClosePress = useCallback(() => {
        bottomSheet.current?.close();
    }, []);


    // const openModal = useCallback(() => {
    //     bottomSheet.current?.present();
    //     setTimeout(() => {
    //         setOpen(true);
    //     }, 5);
    // }, []);


    // const renderBottom = () => {
    //     return <BottomSheetModal
    //         ref={bottomSheet}
    //         index={0}
    //         backdropComponent={BackdropElement}
    //         snapPoints={snapPoints}
    //         onDismiss={() => setOpen(false)}
    //     ></BottomSheetModal>
    // }
    return <Block>
        <Text>KnowledgeExist</Text>
    </Block>
};

export default KnowledgeExist;
