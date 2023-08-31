# Lesson 13 - Frontend

## Architecture overview

* The browser
* HTML
* CSS
* Javascript
* Dynamic content
* Languages and frameworks
* Responsiveness

### References

<https://en.wikipedia.org/wiki/Web_application>

## Design of User Experience and User Interface

* Feature mapping
* User interface
* Page structure

### References

<https://fuzzymath.com/blog/components-of-good-ui-design-examples/>

## Frameworks

* Modern programming languages and frameworks
* Picking a framework
* React
* NextJS

### References

<https://stackdiary.com/front-end-frameworks/>

<https://merehead.com/blog/top-css-frameworks-developers-designers-2023/>

<https://react.dev/learn>

<https://nextjs.org/learn/foundations/about-nextjs/what-is-nextjs>

## Implementing the dApp using create-web3-dapp

* Creating the project
* Project structure
* Components
* Overview of jsx syntax
* Adding content to pages

### References

<https://github.com/alchemyplatform/create-web3-dapp>

<https://react.dev/learn/writing-markup-with-jsx>

<https://docs.alchemy.com/docs/create-web3-dapp>

<https://www.rainbowkit.com/docs/introduction>

<https://wagmi.sh/react/getting-started>

### Code reference

    import styles from "./instructionsComponent.module.css";
    import { useAccount, useNetwork } from "wagmi";
    
    export default function InstructionsComponent() {
      return (
        <div className={styles.container}>
          <header className={styles.header_container}>
            <div className={styles.header}>
              <h1>My App</h1>
            </div>
          </header>
          <p className={styles.get_started}>
            <PageBody></PageBody>
          </p>
        </div>
      );
    }
    
    function PageBody() {
      return (
        <div>
          <WalletInfo></WalletInfo>
        </div>
      );
    }
    
    function WalletInfo() {
      const { address, isConnecting, isDisconnected } = useAccount()
      const { chain } = useNetwork();
      if (address)
        return (
          <div>
            <p>Your account address is {address}</p>
            <p>Connected to the network {chain?.name}</p>
          </div>
        );
      if (isConnecting)
        return (
          <div>
            <p>Loading...</p>
          </div>
        );
      if (isDisconnected)
        return (
          <div>
            <p>Wallet disconnected. Connect wallet to continue</p>
          </div>
        );
      return (
        <div>
          <p>Connect wallet to continue</p>
        </div>
      );
    }
    

---

## Homework

* Create Github Issues with your questions about this lesson
* Read the references
