import { Card } from "@ui-kitten/components";
import React, { useRef } from "react";
import { Container } from "../../Components/Container";
import { Text } from "../../Components/Text";
import { styles } from "./Styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useBoolean, useCommonThemeColors } from "../../Hooks";
import { ConfirmActionModal } from "../../Components/ConfirmActionModal";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes } from "../../Context/SalesInfo/Reducer";
import { useToast } from "react-native-toast-notifications";

enum SettingsResetSyncAction {
  RESET,
  SYNC,
}

/**
 *
 * @author andr30z
 **/
export const Settings: React.FC = () => {
  const { primaryColor } = useCommonThemeColors();
  const actionRef = useRef<SettingsResetSyncAction>(
    SettingsResetSyncAction.RESET
  );
  const {
    dispatcher,
    salesInfo: { clients },
    syncContacts,
  } = useSalesInfoContext();
  const { value, setValue, setTrue, setFalse } = useBoolean();
  const action = actionRef.current;
  const toast = useToast();
  const actionIsReset = action === SettingsResetSyncAction.RESET;
  return (
    <Container
      backgroundColor="white"
      flex={1}
      justifyContent="space-evenly"
      flexDirection="row"
      center
    >
      <ConfirmActionModal
        open={value}
        setOpen={setValue}
        confirmText={
          actionIsReset
            ? "Deseja realmente resetar o app? Todos os dados de vendas e clientes serão perdidos."
            : "Deseja realmente sincronizar os contatos? Isso pode adicionar contatos previamente deletados."
        }
        onActionConfirmed={async () => {
          if (actionIsReset) {
            toast.show("App resetado com sucesso!", { type: "success" });
            setFalse();
            return dispatcher({
              type: ActionsTypes.RESET_APP,
            });
          }
          setFalse();
          await syncContacts(
            JSON.stringify({ hasSyncedContacts: false, clients })
          );
          toast.show("Contatos atualizados com sucesso!", { type: "success" });
        }}
      />
      <Card
        onPress={() => {
          actionRef.current = SettingsResetSyncAction.RESET;
          setTrue();
        }}
        style={styles.card}
      >
        <Container height="100%" flexDirection="column" center flex={1}>
          <FontAwesome5 name="eraser" size={24} color={primaryColor} />
          <Text status="primary" center>
            Resetar App
          </Text>
        </Container>
      </Card>
      <Card
        onPress={() => {
          actionRef.current = SettingsResetSyncAction.SYNC;
          setTrue();
        }}
        style={styles.card}
      >
        <Container height="100%" flexDirection="column" center flex={1}>
          <FontAwesome5 name="sync" size={27} color={primaryColor} />
          <Text status="primary" center>
            Sincronizar Contatos
          </Text>
        </Container>
      </Card>
    </Container>
  );
};
