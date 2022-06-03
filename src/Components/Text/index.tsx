import React from "react";
import { Text as KittenText, TextProps } from "@ui-kitten/components";
interface TextComponentProps extends TextProps {
  fontFamily?: "heading" | "subtitles" | "other";
  center?: boolean;
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
  center,
  ...props
}) => {
  const centerStyles: any = center ? { textAlign: "center" } : {};
  // const customHeadingStyles =
  //   fontFamily === "heading" ? { fontSize: 60 } : undefined;
  return (
    <KittenText
      style={[
        style,
        {
          fontFamily: fonts[fontFamily],
          ...centerStyles,
          // ...customHeadingStyles,
        },
      ]}
      {...props}
    >
      {children}
    </KittenText>
  );
};
