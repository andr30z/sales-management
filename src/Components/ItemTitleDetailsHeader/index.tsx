import { Entypo, Ionicons } from "@expo/vector-icons";
import { Portal } from "@gorhom/portal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { View } from "moti";
import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { useBoolean, useCommonThemeColors } from "../../Hooks";
import { PortalLocations } from "../../PortalLocations";
import { ConfirmActionModal } from "../ConfirmActionModal";
import { Container } from "../Container";
import { Text } from "../Text";
import { styles } from "./Styles";

export const DELETE_CONFIRM_MESSAGE = "Deseja realmente deletar o item?";
export const PRESSABLE_DELETE_ICON_TEST_ID = "delete_entity_pressable_id";
interface ItemTitleDetailsHeaderProps {
  backgroundColor: string;
  onConfirmDelete: () => void;
  name: string;
  date: string;
  children?: React.ReactNode;
  height?: number;
  stickyHeader?: boolean;
  headerMainContainerFirstChild?: React.ReactNode;
  headerMiddleItem?: React.ReactNode;
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
  stickyHeader = false,
  headerMainContainerFirstChild,
  headerMiddleItem,
}) => {
  const {
    value: showConfirmDelete,
    setValue: setShowConfirmDelete,
    setTrue,
    setFalse,
  } = useBoolean();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const { warningColor, primaryColor } = useCommonThemeColors();

  const header = (
    <View
      from={{ opacity: 0, translateY: -15 }}
      animate={{ opacity: 1, translateY: 0 }}
      delay={300}
      transition={{
        type: "spring",
      }}
      style={[
        styles.headerContainer,
        stickyHeader
          ? styles.headerContainerSticky
          : styles.headerContainerNotSticky,
      ]}
    >
      <LinearGradient
        colors={
          stickyHeader
            ? [warningColor, primaryColor]
            : [warningColor, "transparent"]
        }
        style={[
          styles.headerGradient,
          stickyHeader ? styles.headerStickyGradient : undefined,
        ]}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Pressable onPress={navigation.goBack}>
          <Ionicons name="chevron-back-circle" size={38} color={"#fff"} />
        </Pressable>
        {headerMiddleItem}
        <Pressable testID={PRESSABLE_DELETE_ICON_TEST_ID} onPress={setTrue}>
          <Entypo name="trash" size={34} color={"#fff"} />
        </Pressable>
      </LinearGradient>
    </View>
  );
  return (
    <Container
      flex={typeof height !== "number" ? 2 : null}
      height={height}
      testID="HEADER_ID"
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      backgroundColor={backgroundColor}
    >
      <ConfirmActionModal
        onActionConfirmed={() => {
          onConfirmDelete();
          setFalse();
        }}
        confirmText={DELETE_CONFIRM_MESSAGE}
        open={showConfirmDelete}
        setOpen={setShowConfirmDelete}
      />
      <StatusBar translucent backgroundColor={backgroundColor} />
      {stickyHeader && isFocused ? (
        <Portal hostName={PortalLocations.ROOT}>{header}</Portal>
      ) : (
        header
      )}
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
          position="relative"
          {...styles.header}
        >
          {headerMainContainerFirstChild}
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
