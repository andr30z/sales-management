import { Button, Divider, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { useBoolean } from "../../Hooks";
import { Container } from "../Container";
import { AntDesign } from "@expo/vector-icons";
export const SalesListingFilters: React.FC = () => {
  const { value: showFilters, toggle } = useBoolean();
  const theme = useTheme();
  return (
    <Container marginTop={30}>
      <Container
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
      >
        <Text style={{ textAlign: "center" }} category="h4" status="primary">
          Filtros
        </Text>
        <AntDesign
          name="eye"
          style={{ marginLeft: 10 }}
          color={theme["color-primary-default"]}
          onPress={toggle}
          size={34}
        />
      </Container>
      {showFilters && <Container>
          </Container>}
      <Divider style={{ backgroundColor: theme["color-primary-default"] }} />
    </Container>
  );
};
