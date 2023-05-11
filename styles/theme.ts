import { $Object } from "@/types/Object";

export const theme: $Object = {
  token: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,

    colorPrimary: "#ffffff",
    colorPrimaryHover: "#ffffff",
    colorPrimaryActive: "#ffffff",

    colorPrimaryBg: "#ffffff",
    colorPrimaryBgHover: "#ffffff",

    colorPrimaryBorder: "#ffffff",
    colorPrimaryBorderHover: "#ffffff",

    colorPrimaryText: "red",
    colorPrimaryTextHover: "red",
    colorPrimaryTextActive: "red",

    colorSuccess: "#1b7c17",
    colorInfo: "#2d75ee",
    colorError: "#d11d34",
    colorWarning: "#f69808",

    colorBgLayout: "#262b31",
  },

  components: {
    Layout: { colorBgHeader: "#262b31" },
  },
};
