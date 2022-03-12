import React from "react";
import { Text } from "../Text";
interface FormErrorDisplayerProps {
  text?: string;
}
export const FormErrorDisplayer: React.FC<FormErrorDisplayerProps> = ({
  text,
}) => {
  return text ? (
    <Text style={{ marginTop: 5 }} status={"danger"} category="s2">
      {text}
    </Text>
  ) : (
    <></>
  );
};
