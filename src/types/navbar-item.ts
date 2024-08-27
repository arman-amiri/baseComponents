type Item = {
  title: string;
  href: string;
  isOpen?: boolean
};

type NavbarItem = Item & { children?: Item[] };
