"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  configureChains,
  createConfig,
  useAccount,
  useDisconnect,
  useSwitchNetwork,
  WagmiConfig,
} from "wagmi";
import {
  mainnet,
  goerli,
  bscTestnet,
  bsc,
  avalanche,
  avalancheFuji,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const testEnvs = ["development", "staging"];
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bsc, mainnet, avalanche],
  [publicProvider()]
);

const projectId = "680a79ea8d1873053b92b970da717428";

const { wallets } = getDefaultWallets({
  appName: "Bit5",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      /*argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),*/
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export const Web3WalletProvider = ({ children }: { children: any }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export const ConnectButtonWrapper = ({ children }: { children: any }) => {
  const { address } = useAccount();

  if (address) return null;

  return (
    <ConnectButton.Custom>
      {({ openConnectModal }: { openConnectModal: () => void }) => (
        <div onClick={openConnectModal} className="cursor-pointer">
          {children}
        </div>
      )}
    </ConnectButton.Custom>
  );
};

export const ConnectButtons = () => {
  return (
    <>
      <ConnectButtonWrapper>
        <div>Connect Wallet</div>
      </ConnectButtonWrapper>
      <DisconnectButtonWrapper>
        <div>Disconnect Wallet</div>
      </DisconnectButtonWrapper>
    </>
  );
};

export const DisconnectButtonWrapper = ({ children }: { children: any }) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  if (!address) return null;

  return (
    <div onClick={disconnect as any} className="cursor-pointer">
      {children}
    </div>
  );
};

export const useSwitchNetworkWrapper = () => {
  const { chains, switchNetwork } = useSwitchNetwork();

  if (!switchNetwork) {
    return {
      chains,
      switchNetwork: () => {
        alert(
          "Please Manually Switch Your Network to And Connect Your Wallet Again!"
        );
      },
    };
  }

  return { chains, switchNetwork };
};
