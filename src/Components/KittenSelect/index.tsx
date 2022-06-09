import { IndexPath, Select, SelectItem, Text } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import React from "react";
import { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { FormErrorDisplayer } from "../FormErrorDisplayer";

interface KittenSelectProps {
  value: number | Array<number>;
  options: Array<string>;
  onChange: (index: IndexPath | IndexPath[]) => void;
  selectStyle?: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
  multiSelect?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  status?: EvaStatus;
}

/**
 *
 * @author andr30z
 **/
export const KittenSelect: React.FC<KittenSelectProps> = ({
  value,
  options,
  onChange,
  selectStyle,
  multiSelect = false,
  placeholder = "Selecione",
  label,
  error,
  status,
}) => {
  const index = useMemo(
    () =>
      Array.isArray(value)
        ? value.map((x) => new IndexPath(x))
        : value === undefined || value === ("" as any)
        ? undefined
        : new IndexPath(value),
    [value]
  );
  const isEmpty = () =>
    Array.isArray(index) ? index.length === 0 : index === undefined;
  return (
    <Select
      label={label}
      status={status}
      placeholder={placeholder}
      multiSelect={multiSelect}
      caption={<FormErrorDisplayer text={error} />}
      value={
        isEmpty()
          ? undefined
          : () =>
              Array.isArray(index) ? (
                <Text>
                  {index.map(
                    (x, index) => (index !== 0 ? ", " : "") + options[x.row]
                  )}
                </Text>
              ) : (
                <Text>
                  {index?.row === undefined ? "" : options[index.row]}
                </Text>
              )
      }
      style={selectStyle}
      selectedIndex={index}
      onSelect={onChange}
    >
      {options.map((opt, idx) => (
        <SelectItem key={idx} title={opt} />
      ))}
    </Select>
  );
};
