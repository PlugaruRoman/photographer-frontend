import { Properties } from "@/types/properties";
import { default as queryString } from "query-string";

export const stringifyUrl = (url: string, query: Properties = {}): string =>
  queryString.stringifyUrl(
    {
      url,
      query,
    },
    { skipEmptyString: true, skipNull: true },
  );
