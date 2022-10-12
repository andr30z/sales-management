import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { act } from "react-test-renderer";
import {
  EvaApplicationProvider,
  initialMockClient,
  MockedSalesInfoContext,
  MockedStackNavigator,
  MockedToastProvider,
} from "../../../TestCommons";
import {
  ClientsForm,
  CLIENT_FORM_CONTAINER_TEST_ID,
  CLIENT_FORM_PHONE_INPUT,
  CLIENT_FORM_SUBMIT_BTN,
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
describe("<ClientsForm />", () => {
  function TestClientForm(props: { id?: string }) {
    return (
      <MockedSalesInfoContext>
        <MockedToastProvider>
          <EvaApplicationProvider>
            <MockedStackNavigator
              params={props}
              component={ClientsForm as any}
            />
          </EvaApplicationProvider>
        </MockedToastProvider>
      </MockedSalesInfoContext>
    );
  }

  it("should render correctly", () => {
    const { toJSON, getByTestId } = render(<TestClientForm />);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId(CLIENT_FORM_CONTAINER_TEST_ID)).toBeDefined();
  });

  it("should go back to previous screen when submitted", async () => {
    const { getByTestId } = render(
      <TestClientForm id={initialMockClient.id} />
    );

    const phoneInput = getByTestId(CLIENT_FORM_PHONE_INPUT);
    fireEvent.changeText(phoneInput, "5561992999156806");

    const submitBtn = getByTestId(CLIENT_FORM_SUBMIT_BTN);
    fireEvent.press(submitBtn);
    await waitFor(() => {
      expect(mockedGoBack).toBeCalledTimes(1);
    });
  });
});
