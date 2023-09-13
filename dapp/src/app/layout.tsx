import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Web3Provider } from './Web3Provider'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Final project Dapp",
  description: "Final project Dapp",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
