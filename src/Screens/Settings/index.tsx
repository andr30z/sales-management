import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Card } from "@ui-kitten/components";
import React, { useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { ConfirmActionModal } from "../../Components/ConfirmActionModal";
import { Container } from "../../Components/Container";
import { Text } from "../../Components/Text";
import { useSalesInfoContext } from "../../Context/SalesInfo";
import {
  ActionsTypes,
  SalesManagementState,
} from "../../Context/SalesInfo/Reducer";
import { useBoolean, useCommonThemeColors } from "../../Hooks";
import { styles } from "./Styles";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { isTypeOf } from "../../Utils";

enum SettingsResetSyncAction {
  RESET,
  SYNC,
  IMPORT,
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
  const importData = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });
      if (result.type !== "success") return;
      const fileData = await FileSystem.readAsStringAsync(result.uri);
      console.log(fileData);
      const convertedFile: SalesManagementState = JSON.parse(fileData) || {};
      if (!isTypeOf<SalesManagementState>(convertedFile, "hasSyncedContacts"))
        throw new Error();
      dispatcher({ type: ActionsTypes.IMPORT_DATA, payload: convertedFile });
      toast.show("Dados importados com sucesso!", { type: "success" });
    } catch (e) {
      toast.show("Falha ao converter dados do arquivo", { type: "danger" });
    }
    setFalse();
  };
  const shareData = () => {
    const fileUri = FileSystem.documentDirectory + "data.json";

    FileSystem.writeAsStringAsync(fileUri, JSON.stringify(salesInfo), {
      encoding: FileSystem.EncodingType.UTF8,
    })
      .then(() => {
        const UTI = "public.json";

        Sharing.shareAsync(fileUri, { UTI }).catch((error) => {
          console.log(error);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const confirmTextOptions = {
    [SettingsResetSyncAction.RESET]:
      "Deseja realmente resetar o app? Todos os dados de vendas e clientes serão perdidos.",
    [SettingsResetSyncAction.SYNC]:
      "Deseja realmente sincronizar os contatos? Isso pode adicionar contatos previamente deletados.",
    [SettingsResetSyncAction.IMPORT]:
      "Deseja realmente importar os dados do app? Isso irá substituir todos os dados de vendas e clientes atuais do app.",
  };
  return (
    <Container backgroundColor="white" flex={1} center>
      <ConfirmActionModal
        open={value}
        setOpen={setValue}
        confirmText={confirmTextOptions[action]}
        onActionConfirmed={async () => {
          if (action === SettingsResetSyncAction.IMPORT) {
            return importData();
          }
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
            actionRef.current = SettingsResetSyncAction.IMPORT;
            setTrue();
          }}
          style={styles.card}
        >
          <Container height="100%" flexDirection="column" center flex={1}>
            <FontAwesome5 name="file-import" size={27} color={primaryColor} />
            <Text status="primary" center>
              Importar Dados
            </Text>
          </Container>
        </Card>
      </Container>
    </Container>
  );
};
