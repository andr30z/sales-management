import { PortalProvider } from "@gorhom/portal";
import { render } from "@testing-library/react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import { ScrollViewProps } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { ClientSalesListingProvider } from "../../../Context/ClientSalesListing";
import {
  EvaApplicationProvider,
  initialMockClient,
  MockedSalesInfoContext,
  MockedStackNavigator,
} from "../../../TestCommons";
import {
  ClientScrollViewWrapper,
  CLIENT_SCROLL_VIEW_WRAPPER_CLIENT_ID,
} from "../index";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      dispatch: jest.fn(),
    }),
  };
});

describe("<ClientScrollViewWrapper />", () => {
  const TestClientScrollViewWrapper: React.FC<ScrollViewProps> = (props) => {
    return (
      <MockedSalesInfoContext>
        <ToastProvider>
          <EvaApplicationProvider>
            <MockedStackNavigator
              params={{
                id: initialMockClient.id,
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
        </ToastProvider>
      </MockedSalesInfoContext>
    );
  };
  it("should render correctly", () => {
    const { getByText, debug } = render(<TestClientScrollViewWrapper />);
    debug();
    const clientID = getByText(`ID: ${initialMockClient.id}`);

    expect(clientID).toBeTruthy();
  });

  it("should render correctly", () => {
    const { getByText, debug } = render(<TestClientScrollViewWrapper />);
    debug();
    const clientID = getByText(`ID: ${initialMockClient.id}`);

    expect(clientID).toBeTruthy();
  });
});
