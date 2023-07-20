"use client";
import snapshot from "@snapshot-labs/snapshot.js";
import { Web3Provider } from "@ethersproject/providers";
import { useAccount } from "wagmi";

const hub = "https://hub.snapshot.org"; // or https://testnet.snapshot.org for testnet
const client = new snapshot.Client712(hub);

export const useSnapshotFunctions = () => {
  const { address: account } = useAccount();

  const createTestProposal = async () => {
    //@ts-ignore
    const web3 = new Web3Provider(window.ethereum);
    const [account] = await web3.listAccounts();
    console.log(account);
    const receipt = await client.proposal(web3, account, {
      space: "0xnill.eth",
      type: "single-choice", // define the voting system
      title: "Test proposal using Snapshot.js",
      body: "This is the content of the proposal",
      choices: ["Alice", "Bob", "Carol"],
      start: Math.floor(new Date().getTime() / 1000),
      end: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 * 3,
      snapshot: 13620822,
      discussion:
        "https://gov.yearn.finance/t/proposal-1-extend-yip-61-vesting-schedule/11187",
      plugins: JSON.stringify({}),
      app: "my-app", // provide the name of your project which is using this snapshot.js integration
    });
    console.log(receipt);
  };

  const createSpace = async () => {
    try {
      //@ts-ignore
      const web3 = new Web3Provider(window.ethereum);
      const [account] = await web3.listAccounts();
      console.log({ account });
      if (!account) return;
      console.log({ account });
      const receipt = await client.space(web3, account, {
        space: "0xnill.eth",
        settings: JSON.stringify({
          name: "0xnill.eth",
          avatar: "", // IPFS address of space avatar
          about: "",
          network: "56",
          symbol: "XYZ",
          website: "",
          twitter: "",
          github: "",
          coingecko: "",
          domain: "", // custom domain address
          skin: "", // custom skin when custom domain is set
          guidelines: "", // guidelines for proposal creation
          template: "", // template for new proposals
          private: false, // visibility in the space list
          moderators: [], //  list of space Moderators
          members: [], // list of Authors
          admins: [],
          categories: ["social", "media"],
          plugins: {
            hal: {},
          },
          parent: "", // main space ID
          children: [], // list of sub-spaces
          voting: {
            delay: 0, // voting delay in seconds
            hideAbstain: false,
            period: 0, // voting duration in seconds
            quorum: 0,
            type: "", // define the default voting system
            privacy: "", // pass "shutter" for shielded voting
          },
          strategies: [
            {
              name: "ticket",
              network: "56",
              params: { symbol: "TICKET" },
            },
          ], // provide up to 8 strategies with their configuration
          validation: {
            name: "basic",
            params: {},
          }, // provide one proposal validation strategy
          filters: {
            onlyMembers: false, // enable Authors only to create proposals
          },
          voteValidation: {
            name: "any",
            params: {},
          }, // provide one voting validation strategy
          treasuries: [], // provide the organization's treasury account(s)
        }),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return { createTestProposal, createSpace };
};
