import * as eva from "@eva-design/eva";
import { PortalProvider } from "@gorhom/portal";
import {
  fireEvent,
  render
} from "@testing-library/react-native";
import { TextMatch } from "@testing-library/react-native/build/matches";
import { GetByQuery } from "@testing-library/react-native/build/queries/makeQueries";
import { TextMatchOptions } from "@testing-library/react-native/build/queries/text";
import { ApplicationProvider } from "@ui-kitten/components";
import React from "react";
import { default as theme } from "../../../../theme.json";
import { MAIN_STACK_ROUTES } from "../../../Routes/MainStack/Types";
import {
  initialMockClient,
  initialMockSale,
  initialSecondClientMock,
  MockedSalesInfoContext,
  MockedStackNavigator
} from "../../../TestCommons";
import {
  ClientDetails,
  CLIENT_DETAILS_CONTAINER,
  CLIENT_DETAILS_SALE_TOUCHABLE_ID_PREFIX
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

const renderRecyclerListView = (
  getByTestId: GetByQuery<TextMatch, TextMatchOptions>
) => {
  const recyclerListView = getByTestId("clientSalesID");
  expect(recyclerListView).toBeDefined();

  //jest doesn't render the recyclerlistview component by default
  //so with I have to fire the layout event to force the component render
  fireEvent(recyclerListView, "layout", {
    nativeEvent: { layout: { height: 781, width: 393, x: 0, y: 0 } },
  });
};
describe("<ClientDetails />", () => {
  const TestClientDetails: React.FC<{ clientId?: string }> = ({
    clientId = initialMockClient.id,
  }) => {
    return (
      <MockedSalesInfoContext>
        <PortalProvider>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <MockedStackNavigator
              params={{
                id: clientId,
              }}
              component={ClientDetails}
            />
          </ApplicationProvider>
        </PortalProvider>
      </MockedSalesInfoContext>
    );
  };

  it("should not render any sales", async () => {
    const { getByTestId, queryByTestId } = render(
      <TestClientDetails clientId={initialSecondClientMock.id} />
    );

    renderRecyclerListView(getByTestId);

    const saleItemContainer = queryByTestId(
      `sale-${initialSecondClientMock.id}`
    );
    expect(saleItemContainer).toBeFalsy();
  });

  it("should not render anything when client doesn't exits", () => {
    const { queryByTestId } = render(
      <TestClientDetails clientId="this_client_doesn't_exists_ID" />
    );
    const container = queryByTestId(CLIENT_DETAILS_CONTAINER);
    expect(container).toBeFalsy();
  });

  it("should open Sale details screen", () => {
    const { getByTestId } = render(<TestClientDetails />);
    renderRecyclerListView(getByTestId);

    const touchable = getByTestId(
      `${CLIENT_DETAILS_SALE_TOUCHABLE_ID_PREFIX}${initialMockSale.id}`
    );

    expect(touchable).toBeDefined();
    fireEvent.press(touchable);

    expect(mockedNavigate).toBeCalledTimes(1);
    expect(mockedNavigate).toBeCalledWith(MAIN_STACK_ROUTES.SALES_DETAILS, {
      id: initialMockSale.id,
    });
  });

  it("should render client sales", async () => {
    const { getByTestId, getByText, toJSON } = render(<TestClientDetails />);

    renderRecyclerListView(getByTestId);
    const saleItemContainer = getByTestId(`sale-${initialMockSale.id}`);
    const saleItemName = getByText(initialMockSale.name);
    expect(saleItemContainer).toBeDefined();
    expect(saleItemName).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});
