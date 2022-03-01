import { useTheme } from "@ui-kitten/components";

export function useCommonThemeColors() {
  const theme = useTheme();

  return {
    theme,
    primaryColor: theme["color-primary-default"],
    dangerColor: theme["color-danger-default"],
    warningColor: theme["color-warning-default"],
  };
}
