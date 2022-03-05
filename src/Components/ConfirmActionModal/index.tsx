import { Button, Modal, Text } from "@ui-kitten/components";
import React, { Dispatch, SetStateAction } from "react";
import { globalStyles } from "../../GlobalStyles";
import { Container } from "../Container";

interface ConfirmActionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmText?: string;
  btnConfirmActionColor?: string;
  onActionConfirmed: () => void;
}
export const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  open,
  setOpen,
  btnConfirmActionColor = "danger",
  confirmText = "Deseja realmente realizar essa ação?",
  onActionConfirmed,
}) => {
  const close = () => {
    setOpen(false);
  };
  return (
    <Modal
      style={{
        width: "95%",
        height: "30%",
      }}
      backdropStyle={globalStyles.backdrop}
      onBackdropPress={close}
      visible={open}
    >
      <Container
        borderRadius={13}
        flex={1}
        height="100%"
        backgroundColor="#fff"
        padding={10}
      >
        <Container justifyContent="center" flex={3}>
          <Text style={{ textAlign: "left" }} category="h5">
            {confirmText}
          </Text>
        </Container>
        <Container
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          height={"30%"}
          flex={null as any}
        >
          <Button onPress={close} status="control">
            Cancelar
          </Button>
          <Button
            onPress={onActionConfirmed}
            status={btnConfirmActionColor}
            style={{ marginLeft: 5 }}
          >
            Confirmar
          </Button>
        </Container>
      </Container>
    </Modal>
  );
};
