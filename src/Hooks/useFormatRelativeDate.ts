import { formatRelative } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

export function useFormatRelativeDate(date?: string) {
  return useMemo(() => {
    return date
      ? formatRelative(new Date(date), new Date(), {
          locale: ptBR,
        })
      : "";
  }, [date]);
}
