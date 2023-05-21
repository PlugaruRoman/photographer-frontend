import React, { useState } from "react";
import { Card, Checkbox, Divider, Space } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Wedding", "Couples", "Maternity", "Newborn", "Kids", "Family", "Portrait"];

export const LeftFilters: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  return (
    <Card title="Category" bordered={false} style={{ maxWidth: "200px" }}>
      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
    </Card>
  );
};
