import { useQuery, useUpdateQuery } from "lib/hooks/useQuery";
import Input from "components/v2/Input";
import React from "react";
import { InputProps } from "components/v2/Input/Input";

interface BaseQueryInputProps {
  queryName: string;
}

interface QueryInputProps
  extends Omit<InputProps, keyof BaseQueryInputProps>,
    BaseQueryInputProps {}

const QueryInput = ({ queryName, ...rest }: QueryInputProps) => {
  const value = useQuery(queryName);
  const onChange = useUpdateQuery(queryName);
  const [internalQuery, setInternalQuery] = React.useState(value);

  return (
    <Input
      onChange={(val) => setInternalQuery(val)}
      onKeyUp={(evt) => {
        if (evt.code === "Enter") {
          onChange(internalQuery);
        }
      }}
      onBlur={() => onChange(internalQuery)}
      {...rest}
      value={internalQuery}
    />
  );
};

export default React.memo(QueryInput);
