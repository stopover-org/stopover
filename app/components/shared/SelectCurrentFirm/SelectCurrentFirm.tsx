import { graphql, useFragment } from "react-relay";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Autocomplete, AutocompleteOption, Stack } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import Typography from "components/v2/Typography";
import { SelectCurrentFirm_AccountFragment$key } from "artifacts/SelectCurrentFirm_AccountFragment.graphql";
import { useSelectCurrentFirm } from "./useSelectCurrentFirm";

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
          firmType
          address {
            country
            city
          }
        }
      }
    `,
    accountFragmentRef
  );
  const form = useSelectCurrentFirm(account);
  const selectedFirmField = form.useFormField("firmId");
  const options = React.useMemo(
    () =>
      account?.firms?.map(({ id, title, address, firmType }) => ({
        firmId: id,
        label: title,
        secondary: `${
          address ? `${address?.country}, ${address?.city || ""} | ` : ""
        }${firmType}`,
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
    if (firmIdQueryValue && selectedFirmField.value !== firmIdQueryValue) {
      selectedFirmField.onChange(firmIdQueryValue);
    }
  }, [firmIdQueryValue]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit()}>
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
