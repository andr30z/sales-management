import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Container } from "../../Components/Container";
import { AntDesign } from "@expo/vector-icons";
export const SalesListing: React.FC = () => {
  return (
    <Container flexDirection="column">
      <Layout style={{ flex: 1 }}>
        <Container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Text category={"h1"} status="primary">
            Vendas
          </Text>
          <Button
            style={{ borderRadius: 34 }}
            status="primary"
            size="small"
            accessoryLeft={() => (
              <AntDesign name="plus" size={25} color="#fff" />
            )}
          />
        </Container>
      </Layout>
    </Container>
  );
};
