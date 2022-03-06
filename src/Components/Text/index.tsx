import React from "react";
import { Text as KittenText, TextProps } from "@ui-kitten/components";
interface TextComponentProps extends TextProps {
  fontFamily?: "heading" | "subtitles" | "other";
}
const fonts = {
  heading: "Satisfy_400Regular",
  subtitles: "Montserrat_700Bold",
  other: "Montserrat_500Medium",
};
export const Text: React.FC<TextComponentProps> = ({
  fontFamily = "subtitles",
  children,
  style,
  ...props
}) => {
  // const customHeadingStyles =
  //   fontFamily === "heading" ? { fontSize: 60 } : undefined;
  return (
    <KittenText
      style={[
        style,
        {
          fontFamily: fonts[fontFamily],
          // ...customHeadingStyles,
        },
      ]}
      {...props}
    >
      {children}
    </KittenText>
  );
};
