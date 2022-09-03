import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Card } from "@ui-kitten/components";
import React, { useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { ConfirmActionModal } from "../../Components/ConfirmActionModal";
import { Container } from "../../Components/Container";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import { ActionsTypes } from "../../Context/SalesInfo/Reducer";
import { useBoolean, useCommonThemeColors } from "../../Hooks";
import { styles } from "./Styles";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

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
  const { dispatcher, salesInfo, syncContacts } = useSalesInfoContext();
  const { clients } = salesInfo;
  const { value, setValue, setTrue, setFalse } = useBoolean();
  const action = actionRef.current;
  const toast = useToast();
  const actionIsReset = action === SettingsResetSyncAction.RESET;
  const shareData = () => {
    const fileUri = FileSystem.documentDirectory + "data.json";

    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(salesInfo), {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(() => {
        const UTI = "public.text";

        Sharing.shareAsync(fileUri, { UTI }).catch((error) => {
          console.log(error);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container backgroundColor="white" flex={1} center>
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
      <Container
        flexDirection="row"
        alignItems="center"
        flexWrap="wrap"
        flex={null}
        justifyContent="center"
      >
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
        <Card onPress={shareData} style={styles.card}>
          <Container height="100%" flexDirection="column" center flex={1}>
            <AntDesign name="export" size={27} color={primaryColor} />
            <Text status="primary" center>
              Exportar Dados
            </Text>
          </Container>
        </Card>

        <Card
          onPress={() => {
            // actionRef.current = SettingsResetSyncAction.SYNC;
            // setTrue();
          }}
          style={styles.card}
        >
          <Container height="100%" flexDirection="column" center flex={1}>
            <FontAwesome5 name="sync" size={27} color={primaryColor} />
            <Text status="primary" center>
              Importar Dados
            </Text>
          </Container>
        </Card>
      </Container>
    </Container>
  );
};
