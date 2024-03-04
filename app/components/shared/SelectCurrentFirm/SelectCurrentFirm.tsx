import { graphql, useFragment } from "react-relay";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Autocomplete, AutocompleteOption, Stack } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import { useSelectCurrentFirm } from "./useSelectCurrentFirm";
import Typography from "../../v2/Typography";
import { SelectCurrentFirm_AccountFragment$key } from "../../../artifacts/SelectCurrentFirm_AccountFragment.graphql";

interface SelectCurrentFirmProps {
  accountFragmentRef: SelectCurrentFirm_AccountFragment$key;
}

const SelectCurrentFirm = ({ accountFragmentRef }: SelectCurrentFirmProps) => {
  const account = useFragment(
    graphql`
      fragment SelectCurrentFirm_AccountFragment on Account {
        ...useSelectCurrentFirm_AccountFragment
        firm {
          id
        }

        firms {
          id
          title
          address {
            country
            city
          }
        }
      }
    `,
    accountFragmentRef
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  const form = useSelectCurrentFirm(account);
  const selectedFirmField = form.useFormField("firmId");
  const options = React.useMemo(
    () =>
      account?.firms?.map(({ id, title, address }) => ({
        firmId: id,
        label: title,
        secondary: address ? `${address?.country}, ${address?.city}` : null,
      })) || [],
    [account]
  );

  const selectedFirm = React.useMemo(
    () => options.find(({ firmId }) => firmId === selectedFirmField.value),
    [selectedFirmField, options]
  );
  const searchParams = useSearchParams();
  const firmIdQueryValue = searchParams.get("firmId");

  React.useEffect(() => {
    if (firmIdQueryValue && formRef.current) {
      selectedFirmField.onChange(firmIdQueryValue);

      formRef.current.submit();
    }
  }, [firmIdQueryValue, formRef.current]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()} ref={formRef}>
        <Autocomplete
          variant="plain"
          disableClearable
          value={selectedFirm}
          options={options}
          onChange={(event, value) => {
            selectedFirmField.onChange(value.firmId);
          }}
          renderOption={(optionProps, option, { selected }) => (
            <AutocompleteOption
              {...optionProps}
              color={selected ? "primary" : "neutral"}
            >
              <Stack>
                <Typography>{option.label}</Typography>
                {option.secondary && (
                  <Typography fontSize="10px">{option.secondary}</Typography>
                )}
              </Stack>
            </AutocompleteOption>
          )}
        />
      </form>
    </FormProvider>
  );
};

export default React.memo(SelectCurrentFirm);
