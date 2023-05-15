export const onSearchFilter = (input: any, option: any) =>
  (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase());

export const onSortFilter = (optionA: any, optionB: any) =>
  (optionA?.label ?? "")
    .toString()
    .toLowerCase()
    .localeCompare((optionB?.label ?? "").toString().toLowerCase());
