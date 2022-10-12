import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ScrollViewProps } from "react-native";
import Toast, { ToastProvider } from "react-native-toast-notifications";
import { ClientSalesListingProvider } from "../../../Context/ClientSalesListing";
import { MAIN_STACK_ROUTES } from "../../../Routes/MainStack/Types";
import {
  clientWithNoSales,
  EvaApplicationProvider,
  initialMockClient,
  MockedSalesInfoContext,
  MockedStackNavigator,
} from "../../../TestCommons";
import { CONFIRM_ACTION_BUTTON_TEST_ID } from "../../ConfirmActionModal";
import { PRESSABLE_DELETE_ICON_TEST_ID } from "../../ItemTitleDetailsHeader";
import {
  ClientScrollViewWrapper,
  PRESSABLE_OPEN_CLIENT_FORM_TEST_ID,
} from "../index";

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,

    useNavigation: () => ({
      navigate: mockedNavigate,
      dispatch: jest.fn(),
      goBack: mockedGoBack,
    }),
  };
});

describe("<ClientScrollViewWrapper />", () => {
  const TestClientScrollViewWrapper: React.FC<
    ScrollViewProps & { clientId?: string }
  > = ({ clientId, ...props }) => {
    return (
      <MockedSalesInfoContext>
        <ToastProvider>
          <EvaApplicationProvider>
            <MockedStackNavigator
              params={{
                id: clientId ?? initialMockClient.id,
              }}
            >
              {() => (
                <ClientSalesListingProvider>
                  <ClientScrollViewWrapper
                    {...props}
                    style={{
                      height: 781,
                      width: "100%",
                      flex: 1,
                      ...(props?.style ?? ({} as any)),
                    }}
                  />
                </ClientSalesListingProvider>
              )}
            </MockedStackNavigator>
          </EvaApplicationProvider>
          <Toast ref={(ref) => ((global as any)["toast"] = ref)} />
        </ToastProvider>
      </MockedSalesInfoContext>
    );
  };
  it("should render correctly", () => {
    const { getByText, toJSON } = render(
      <TestClientScrollViewWrapper />
    );
    const clientID = getByText(`ID: ${initialMockClient.id}`);

    expect(clientID).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("should delete the client", async () => {
    //WARNING!!! clientWithNoSales is important and should not be changed because
    // a client can only be deleted if he is not bonded to any sales
    const { getByTestId } = render(
      <TestClientScrollViewWrapper clientId={clientWithNoSales.id} />
    );

    const deleteClientPressable = getByTestId(PRESSABLE_DELETE_ICON_TEST_ID);

    //fire delete button to open confirmation modal
    fireEvent.press(deleteClientPressable);

    const confirmDeleteButton = await waitFor(() =>
      getByTestId(CONFIRM_ACTION_BUTTON_TEST_ID)
    );

    //confirm client delete action
    fireEvent.press(confirmDeleteButton);

    expect(mockedGoBack).toBeCalled();
  });

  it("should open client form", async () => {
    const { getByTestId } = render(<TestClientScrollViewWrapper />);

    const openClientForm = getByTestId(PRESSABLE_OPEN_CLIENT_FORM_TEST_ID);

    //fire open form action
    fireEvent.press(openClientForm);

    expect(mockedNavigate).toBeCalledWith(MAIN_STACK_ROUTES.CLIENTS_FORM, {
      id: initialMockClient.id,
    });
  });
});
