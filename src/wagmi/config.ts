import { base, bscTestnet, mainnet, sapphireTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, base, bscTestnet, sapphireTestnet],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [bscTestnet.id]: http(),
    [sapphireTestnet.id]: http(),
  },
  connectors: [
    injected({ target: "metaMask", shimDisconnect: true }),
    // injected({
    //   target: {
    //     id: "trustWallet",
    //     name: "Trust Wallet",
    //     provider(window) {
    //       //@ts-ignore
    //       if (window?.trustWallet) return window.trustWallet;
    //       return undefined;
    //     },
    //   },
    //   shimDisconnect: true,
    // }),
  ],
});
