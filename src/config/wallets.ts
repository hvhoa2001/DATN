// import { isFirefox } from "react-device-detect";

export type WalletConfig = {
  id: string;
  title: string;
  icon: string;
  connectorId?: string;
  deepLink?: string;
  installed?: boolean;
  guide?: string | { desktop?: string; mobile?: string };
  downloadLink?: string | { desktop?: string; mobile?: string };
  mobileOnly?: boolean;
  qrCode?: () => Promise<string>;
};

export const ConnectorIDs = {
  metamask: "metaMask",
  walletConnect: "walletConnect",
  coinbase: "coinbaseWalletSDK",
  trustWallet: "trustWallet",
  tronLink: "tronLink",
};

export const walletsConfig: () => WalletConfig[] = () => {
  return [
    {
      id: "metamask",
      title: "Metamask",
      icon: "/images/wallets/metamask.png",
      connectorId: ConnectorIDs.metamask,
      deepLink: "https://metamask.app.link/dapp/centic.io/",
      downloadLink: {
        desktop:
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
        mobile: "https://metamask.app.link/dapp/centic.io/",
      },
      get installed() {
        if (typeof window === "undefined") {
          return false;
        }
        if (window.ethereum?.isMetaMask) {
          return true;
        }
        // @ts-ignore
        if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
          return true;
        }
        return false;
      },
    },
    // {
    //   id: "coinbase",
    //   title: "Coinbase Wallet",
    //   icon: "/images/wallets/coinbase.png",
    //   connectorId: ConnectorIDs.coinbase,
    //   installed: true,
    // },

    // {
    //   id: "trust",
    //   title: "Trust Wallet",
    //   icon: "/images/wallets/trustwallet.png",
    //   connectorId: ConnectorIDs.trustWallet,
    //   deepLink: "https://link.trustwallet.com/open_url?url=https://centic.io/",
    //   downloadLink:
    //     "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
    //   guide: {
    //     desktop: "https://trustwallet.com/browser-extension",
    //     mobile: "https://trustwallet.com/",
    //   },
    //   get installed() {
    //     if (typeof window === "undefined") {
    //       return false;
    //     }
    //     if (window.ethereum?.isTrust) {
    //       return true;
    //     }
    //     // @ts-ignore
    //     if (window.ethereum?.providers?.some((p) => p.isTrust)) {
    //       return true;
    //     }
    //     // @ts-ignore
    //     if (window.trustWallet) {
    //       return true;
    //     }
    //     return false;
    //   },
    // },

    // {
    //   id: "walletconnect",
    //   title: "WalletConnect",
    //   icon: "/images/wallets/walletconnect.png",
    //   connectorId: ConnectorIDs.walletConnect,
    //   installed: true,
    // },
  ];
};
