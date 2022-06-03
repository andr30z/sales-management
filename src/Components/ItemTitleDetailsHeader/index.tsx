import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useWindowDimensions } from "react-native";
import { Pressable } from "react-native";
import { useBoolean } from "../../Hooks";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";

interface ItemTitleDetailsHeaderProps {
  backgroundColor: string;
  onConfirmDelete: () => void;
  name: string;
  date: string;
  children?: React.ReactNode;
  height?: number;
}

/**
 *
 * @author andr30z
 **/
export const ItemTitleDetailsHeader: React.FC<ItemTitleDetailsHeaderProps> = ({
  date,
  name,
  onConfirmDelete,
  backgroundColor,
  children,
  height,
}) => {
  const {
    value: showConfirmDelete,
    setValue: setShowConfirmDelete,
    setTrue,
  } = useBoolean();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <Container
      flex={typeof height !== "number" ? 2 : null}
      height={height}
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      backgroundColor={backgroundColor}
    >
      <ConfirmActionModal
        onActionConfirmed={onConfirmDelete}
        open={showConfirmDelete}
        setOpen={setShowConfirmDelete}
      />
      <StatusBar translucent backgroundColor={backgroundColor} />
      <Container
        position="absolute"
        top={20}
        width="100%"
        flexDirection="row"
        paddingHorizontal={15}
        justifyContent="space-between"
      >
        <Pressable onPress={navigation.goBack}>
          <Ionicons name="chevron-back-circle" size={38} color="#fff" />
        </Pressable>
        <Entypo onPress={setTrue} name="trash" size={34} color="#fff" />
      </Container>
      <Container
        position="absolute"
        bottom={-35}
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Container
          width="85%"
          padding={15}
          backgroundColor="#fff"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          {...styles.header}
        >
          <Text
            numberOfLines={1}
            status="warning"
            ellipsizeMode="tail"
            fontFamily="heading"
            style={{
              textAlign: "center",
              width: "100%",
              maxWidth: width * 0.85,
            }}
            category="h1"
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ textAlign: "left" }}
            category="c1"
            appearance="hint"
          >
            {format(new Date(date), "dd/MM/yyyy")}
          </Text>
          {children}
        </Container>
      </Container>
    </Container>
  );
};
