import { Button, Layout, Modal, Text } from "@ui-kitten/components";
import React from "react";
import { Container } from "../../Components/Container";
import { AntDesign } from "@expo/vector-icons";
import { useBoolean } from "../../Hooks/useBoolean";
import { SalesForm } from "../../Components/SalesForm";
import { styles } from "./Styles";
export const SalesListing: React.FC = () => {
  const { value: showCreateSale, setTrue, setFalse } = useBoolean();
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
            onPress={setTrue}
            accessoryLeft={() => (
              <AntDesign name="plus" size={25} color="#fff" />
            )}
          />
        </Container>
        <Modal
          visible={showCreateSale}
          backdropStyle={styles.backdrop}
          onBackdropPress={setFalse}
          style={{ width: "95%", height: "80%" }}
        >
          <SalesForm />
        </Modal>
      </Layout>
    </Container>
  );
};
