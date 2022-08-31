import { DateFnsService } from "@ui-kitten/date-fns";
import { Sale } from "../Context/SalesInfo/Reducer";
import { SalesFilterFields } from "../Interfaces/SalesFilterFields";

export function filterByName(name: string, filter: string) {
  return name.toLowerCase().includes(filter.toLowerCase());
}
export const initialSalesFilterState = {
  clientName: "",
  initialDate: "",
  finalDate: "",
  saleName: "",
  saleStatus: "" as any,
};
export const filterSalesArrays = (
  sales: Array<Sale>,
  filters: SalesFilterFields
) =>
sales.filter(({ name, date, status }) => {
    const { finalDate, initialDate, saleName, saleStatus } = filters;
    let checkDate =
      finalDate && initialDate
        ? isDateInRange(initialDate, finalDate, date)
        : true;
    const currentStatus =
      saleStatus === 0 || saleStatus === ("" as any)
        ? true
        : status === saleStatus - 1;
    return filterByName(name, saleName) && checkDate && currentStatus;
  });

export function isDateInRange(from: string, to: string, check: string) {
  let fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);
  // I have no idea on what's going on over here, but it works.
  return cDate <= lDate && cDate >= fDate;
}

export const brazilianDateService = new DateFnsService("pt-BR", {
  i18n: {
    dayNames: {
      long: [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
      ],

      short: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    },
    monthNames: {
      short: [
        "Jan",
        "Fev",
        "Mar",
        "Abril",
        "Maio",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      long: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
    },
  },
});

export const minDate = new Date("01/01/1969");
