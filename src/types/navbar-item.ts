type Item = {
  label: string;
  key: string;
  isOpen?: boolean;
  iconComponent?: React.ReactNode;
};

type NavbarItem = Item & { children?: Item[] };
