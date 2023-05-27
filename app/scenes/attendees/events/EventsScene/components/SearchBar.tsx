import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import Input from "../../../../../components/v2/Input";

const SearchBar = () => <Input label="Search" endDecorator={<SearchIcon />} />;

export default React.memo(SearchBar);
