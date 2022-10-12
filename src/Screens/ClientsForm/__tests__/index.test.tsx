import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from "@testing-library/react-native";
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
  CLIENT_FORM_NAME_REQUIRED_MESSAGE,
  CLIENT_FORM_PHONE_INPUT,
  CLIENT_FORM_PHONE_NUMBER_ERROR_MSG,
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

  const validatePhoneField = async ({
    getByTestId,
    queryByText,
  }: RenderAPI) => {
    const submitBtn = getByTestId(CLIENT_FORM_SUBMIT_BTN);
    await waitFor(async () => {
      //trigger submit form to validate all fields and since they are empty the error messages should appear on screen.
      await fireEvent.press(submitBtn);
    });
    const phoneMsg = queryByText(CLIENT_FORM_PHONE_NUMBER_ERROR_MSG);
    expect(phoneMsg).toBeTruthy();
  };

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

  it("should show input errors", async () => {
    const renderApi = render(<TestClientForm />);
    const { queryByText } = renderApi;
    await validatePhoneField(renderApi);

    const nameRequiredMsg = queryByText(CLIENT_FORM_NAME_REQUIRED_MESSAGE);
    expect(nameRequiredMsg).toBeTruthy();
  });

  it("should validate phone input size", async () => {
    const renderApi = render(<TestClientForm />);
    const { queryByText, getByTestId } = renderApi;
    await validatePhoneField(renderApi);
    const phoneInput = getByTestId(CLIENT_FORM_PHONE_INPUT);
    await act(() => {
      fireEvent.changeText(phoneInput, "5561992999156806");
    });
    const phoneMsgAfterChange = queryByText(CLIENT_FORM_PHONE_NUMBER_ERROR_MSG);
    expect(phoneMsgAfterChange).toBeFalsy();
  });
});
