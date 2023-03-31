import React, { useCallback, useRef, useState } from "react";
import Input from "../../../components/v1/Input";

const CodeInput = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void;
  value: string;
}) => {
  const [current, setCurrent] = useState(0);
  const inputs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const focusNext = useCallback(() => {
    if (current < inputs.length) {
      if (!inputs[current + 1].current) return;

      // @ts-ignore
      inputs[current + 1].current?.focus();

      setCurrent(current + 1);
    }
  }, [current, setCurrent, inputs]);

  const onInputChange = useCallback(() => {
    onChange(
      inputs
        // @ts-ignore
        .map((ref) => ref.current?.target?.value)
        .join("")
    );

    focusNext();
  }, [value, onChange, inputs]);

  return (
    <div>
      <Input onChange={onInputChange} value={value[0] || ""} ref={inputs[0]} />
      <Input onChange={onInputChange} value={value[1] || ""} ref={inputs[1]} />
      <Input onChange={onInputChange} value={value[2] || ""} ref={inputs[2]} />
      <Input onChange={onInputChange} value={value[3] || ""} ref={inputs[3]} />
      <Input onChange={onInputChange} value={value[4] || ""} ref={inputs[4]} />
    </div>
  );
};

export default React.memo(CodeInput);
