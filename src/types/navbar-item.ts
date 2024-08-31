type Item = {
  title: string;
  href: string;
  isOpen?: boolean;
  iconComponent?: React.ReactNode;
};

type NavbarItem = Item & { children?: Item[] };
