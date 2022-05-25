import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useCommonThemeColors } from "../../Hooks";
import {
  MainStackRoutesTypes,
  MAIN_STACK_ROUTES,
} from "../../Routes/MainStack/Types";
import { Container } from "../Container";
import { Text } from "../Text";

interface ListingScreenHeaderProps {
  headerTitle: string;
  addEntityScreen: MAIN_STACK_ROUTES;
}

/**
 *
 * @author andr30z
 **/
export const ListingScreenHeader: React.FC<ListingScreenHeaderProps> = ({
  addEntityScreen,
  headerTitle,
}) => {
  const { primaryColor } = useCommonThemeColors();
  const navigation = useNavigation<StackNavigationProp<MainStackRoutesTypes>>();
  return (
    <>
      <StatusBar translucent backgroundColor={primaryColor} />
      <Container
        backgroundColor={primaryColor}
        minHeight={130}
        flex={null as any}
        width="100%"
        flexDirection="column"
      >
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text fontFamily="heading" style={{ fontSize: 50 }} status="control">
            {headerTitle}
          </Text>
          <Button
            style={{ borderRadius: 34 }}
            appearance="outline"
            size="small"
            status="control"
            onPress={() => navigation.navigate(addEntityScreen, {})}
          >
            {(props) => (
              <Text {...props} style={undefined} category="h6" status="control">
                Adicionar
              </Text>
            )}
          </Button>
        </Container>
      </Container>
    </>
  );
};
