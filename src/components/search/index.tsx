import { Input } from "../ui/input";
import Styles from "./search.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={Styles.searchBar}>
      <Input
        type="text"
        placeholder="Search products..."
        onChange={handleChange}
      />
    </div>
  );
}
