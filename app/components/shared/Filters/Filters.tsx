import {
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from "@mui/joy";
import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import {
  parseValue,
  useQuery,
  useRemoveQuery,
  useUpdateQuery,
} from "lib/hooks/useQuery";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";

interface FiltersProps {
  availableFilters: Record<string, React.ReactNode>;
  defaultFilters: string[];
  scope: string;
}

const Filters = ({
  availableFilters,
  defaultFilters = [],
  scope,
}: FiltersProps) => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const selectedFilters: string[] = useQuery(
    "selectedFilters",
    defaultFilters,
    (value) => Array.from(parseValue(value))
  );
  const updateSelectedFilters = useUpdateQuery("selectedFilters");
  const removeQueryKey = useRemoveQuery();
  const selectableFilters = React.useMemo(
    () =>
      Object.keys(availableFilters)
        .filter((key) => !selectedFilters.includes(key))
        .map((key) => [key, t(`filters.${scope}.${key}`)]),
    [availableFilters, selectedFilters]
  );

  const onAddFilter = React.useCallback(
    (filterKey: string) => {
      updateSelectedFilters([...selectedFilters, filterKey]);
    },
    [selectedFilters]
  );

  const onRemoveFilter = React.useCallback(
    (filterKey: string) => {
      updateSelectedFilters(
        selectedFilters.filter((key: string) => key !== filterKey)
      );
    },
    [selectedFilters]
  );

  React.useEffect(() => {
    const query = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    const filters = Array.from(query.entries());

    filters.forEach((filter: string[]) => {
      if (!Object.keys(availableFilters).includes(filter[0])) {
        return;
      }

      if (!selectedFilters.includes(filter[0])) {
        removeQueryKey(filter[0]);
      }
    });
  }, [selectedFilters]);

  return (
    <Stack direction="row" alignItems="flex-end" flexWrap="wrap">
      <Dropdown>
        <MenuButton size="sm" variant="soft" sx={{ marginBottom: "5px" }}>
          <FilterAltIcon />
        </MenuButton>
        {selectableFilters.length > 0 && (
          <Menu>
            {selectableFilters.map((key) => (
              <MenuItem onClick={() => onAddFilter(key[0])}>{key[1]}</MenuItem>
            ))}
          </Menu>
        )}
      </Dropdown>
      {selectedFilters.map((key: string) => (
        <>
          {availableFilters[key]}
          <IconButton
            size="sm"
            sx={{ marginBottom: "5px" }}
            onClick={() => onRemoveFilter(key)}
          >
            <CloseIcon />
          </IconButton>
        </>
      ))}
    </Stack>
  );
};

export default React.memo(Filters);
