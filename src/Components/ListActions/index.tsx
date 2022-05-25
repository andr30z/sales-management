import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Container } from "../Container";
interface ListActionsProps {
  iconsColors: {
    close: string;
    deleteItems: string;
    selectAll: string;
    clearAll: string;
  };
  onDelete: () => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onClose: () => void;
}
/**
 *
 * @author andr30z
 **/
export const ListActions: React.FC<ListActionsProps> = ({
  iconsColors: { clearAll, close, deleteItems, selectAll },
  onClearAll,
  onDelete,
  onSelectAll,
  onClose,
}) => {
  return (
    <Container
      flexDirection="row"
      justifyContent="space-around"
      width="100%"
      marginTop={30}
    >
      <AntDesign name="close" size={30} color={close} onPress={onClose} />
      <AntDesign
        onPress={onDelete}
        name="delete"
        size={30}
        color={deleteItems}
      />
      <MaterialIcons
        name="check-box"
        size={32}
        onPress={onSelectAll}
        color={selectAll}
      />
      <MaterialIcons
        name="check-box-outline-blank"
        size={32}
        onPress={onClearAll}
        color={clearAll}
      />
    </Container>
  );
};
