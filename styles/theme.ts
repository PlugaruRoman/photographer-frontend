import { $Object } from "@/types/properties";

export const theme: $Object = {
  token: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,

    colorPrimary: "#70CF97",
    colorPrimaryHover: "#70CF97",
    colorPrimaryActive: "red",

    colorPrimaryBg: "#ffffff",
    colorPrimaryBgHover: "red",

    colorPrimaryBorder: "red",
    colorPrimaryBorderHover: "red",

    colorPrimaryText: "red",
    colorPrimaryTextHover: "red",
    colorPrimaryTextActive: "red",

    colorSuccess: "#70CF97",
    colorInfo: "#407BFF",
    colorError: "#EA6042",
    colorWarning: "#f69808",

    colorBgLayout: "#ffffff",
  },

  components: {
    Layout: { colorBgHeader: "#ffffff" },
  },
};
