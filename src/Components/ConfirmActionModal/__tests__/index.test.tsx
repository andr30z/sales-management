import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from "@testing-library/react-native";
import { ApplicationProvider, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { ConfirmActionModal, ConfirmActionModalProps } from "..";
import * as eva from "@eva-design/eva";
import { default as theme } from "../../../../theme.json";
describe("<ConfirmActionModal />", () => {
  const openButtonId = "@modal/open-button";
  const TestModal = (
    props: Omit<ConfirmActionModalProps, "open" | "setOpen">
  ) => {
    const [open, setOpen] = useState(false);
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <React.Fragment>
          <ConfirmActionModal open={open} setOpen={setOpen} {...props} />
          <Button testID={openButtonId} onPress={() => setOpen(true)} />
        </React.Fragment>
      </ApplicationProvider>
    );
  };

  const touchables = {
    findOpenButton: (api: RenderAPI) => api.getByTestId(openButtonId),
  };
  it("should open confirmation modal", async () => {
    const confirmationText = "ConfirmationText";
    const component = render(
      <TestModal
        onActionConfirmed={() => {
          console.log("I'm confirmed by the user :D!");
        }}
        confirmText={confirmationText}
      />
    );
    const { debug, getByText } = component;
    fireEvent.press(touchables.findOpenButton(component));
    debug();
    const text = await waitFor(() => getByText(confirmationText));
    expect(text).toBeTruthy();
  });

  it("should press confirm button", async () => {
    const onPress = jest.fn();
    const component = render(<TestModal onActionConfirmed={onPress} />);
    const { debug, getByTestId } = component;
    fireEvent.press(touchables.findOpenButton(component));
    debug();
    await waitFor(() => fireEvent.press(getByTestId("onPressConfirm")));
    expect(onPress).toBeCalled();
  });

  it("should press cancel button and close modal", async () => {
    const confirmMsg = "I'am closed?";
    const component = render(
      <TestModal confirmText={confirmMsg} onActionConfirmed={() => {}} />
    );
    const { getByTestId, queryByText } = component;
    fireEvent.press(touchables.findOpenButton(component));

    const closedTextBeforeModalClose = queryByText(confirmMsg);
    expect(closedTextBeforeModalClose).toBeTruthy();

    await waitFor(() => fireEvent.press(getByTestId("onPressCancel")));
    const closedTextAfterModalClose2 = queryByText(confirmMsg);
    expect(closedTextAfterModalClose2).toBeFalsy();
  });
});
