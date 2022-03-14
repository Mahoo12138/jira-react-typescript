import { Select } from "antd";
import { Raw } from "types";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "options" | "onChange"> {
  value: Raw | undefined | null;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

/**
 * @description isNaN 为 true 即为默认类型, 默认类型 onChange 返回 undefined
 *
 * @param props
 * @returns
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={toNumber(value)}
      onChange={(v) => onChange(toNumber(v))}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>defaultOptionName</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};
