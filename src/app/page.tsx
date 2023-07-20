"use client";
import { useSnapshotFunctions } from "@/hooks/snapshot";
import {
  ConnectButtonWrapper,
  ConnectButtons,
  DisconnectButtonWrapper,
  Web3WalletProvider,
} from "@/providers/web3WalletProvider";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const { createTestProposal, createSpace } = useSnapshotFunctions();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3WalletProvider>
        <ConnectButtons />
        <div className="z-10 w-full space-y-10 lg:space-y-0 lg:space-x-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <button onClick={createTestProposal} className="cursor-pointer">
            Test Snapshot
          </button>
        </div>
        <div className="z-10 w-full space-y-10 lg:space-y-0 lg:space-x-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <button onClick={createSpace} className="cursor-pointer">
            Test Create Space
          </button>
        </div>
      </Web3WalletProvider>
    </main>
  );
}
