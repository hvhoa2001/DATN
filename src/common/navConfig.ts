export type NavConfigItem = {
  id: string;
  title: string;
  href?: string;
  isExternal?: boolean;
  subPage: Array<{
    id: string;
    title: string;
    href: string;
    isExternal?: boolean;
  }>;
};

export const navConfigs: NavConfigItem[] = [
  {
    id: "men",
    title: "MEN",
    subPage: [
      {
        id: "Jordan",
        title: "Jordan",
        href: "https://app.thornprotocol.com/",
        isExternal: false,
      },
      {
        id: "Air Force",
        title: "Air Force",
        href: "/coming-soon",
        isExternal: false,
      },
    ],
  },
  {
    id: "women",
    title: "WOMEN",
    subPage: [
      {
        id: "Jordan",
        title: "Jordan",
        href: "https://app.thornprotocol.com/",
        isExternal: false,
      },
      {
        id: "Air Force",
        title: "Air Force",
        href: "/coming-soon",
        isExternal: false,
      },
    ],
  },
  {
    id: "kids",
    title: "KIDS",
    subPage: [
      {
        id: "Jordan",
        title: "Jordan",
        href: "https://app.thornprotocol.com/",
        isExternal: false,
      },
      {
        id: "Air Force",
        title: "Air Force",
        href: "/coming-soon",
        isExternal: false,
      },
    ],
  },
];
