"use client";

import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import Cookies from "js-cookie";
import { BsTelegram } from "react-icons/bs";
import Nav from "@/components/common/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useKeylessAccounts } from "@/libs/useKeylessAccounts";
import { collapseAddress } from "@/libs/collapseAddress";
import useAptos from "@/context/useAptos";
import { Account, SimpleTransaction } from "@aptos-labs/ts-sdk";
import GoogleLogo from "../components/GoogleLogo";

const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/";

export default function Home() {
  const wallet = Cookies.get("dream_starter_wallet");

  const { aptos, moduleAddress } = useAptos();

  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
  console.log("activeAccount", activeAccount);

  const [hovered, setHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loginbox, setloginbox] = useState(false);
  const [accountdetails, setaccountdetails] = useState(true);
  const [balance, setbalance] = useState(null);
  const [faucetTrigger, setFaucetTrigger] = useState(false);

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", "_blank");
    }
  };

  const connectWallet = async () => {
    const aptosWallet = getAptosWallet();
    try {
      const response = await aptosWallet.connect();
      console.log(response); // { address: string, publicKey: string }
      // Check the connected network
      const network = await aptosWallet.network();
      if (network === "Devnet") {
        // signing message
        const payload = {
          message: "Hello! from dream starter",
          nonce: Math.random().toString(16),
        };
        const res = await aptosWallet.signMessage(payload);
        // signing message

        Cookies.set("dream_starter_wallet", response.address, { expires: 7 });
        window.location.reload();
      } else {
        alert(`Switch to Devnet in your Petra wallet`);
      }
    } catch (error) {
      console.error(error); // { code: 4001, message: "User rejected the request."}
    }
  };

  const handleDeleteCookie = () => {
    Cookies.remove("dream_starter_wallet");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRandomNumber = () => Math.floor(Math.random() * 1000);
        const apiUrl = `https://api.multiavatar.com/${getRandomNumber()}`;

        const response = await axios.get(apiUrl);
        const svgDataUri = `data:image/svg+xml,${encodeURIComponent(
          response.data
        )}`;
        setAvatarUrl(svgDataUri);
      } catch (error) {
        console.error("Error fetching avatar:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const getAccountAPTAmount = async (accountAddress) => {
          const amount = await aptos.getAccountAPTAmount({
            accountAddress,
          });
          return amount;
        };

        const senderBalance = await getAccountAPTAmount(
          activeAccount.accountAddress
        );
        console.log("Sender balance:", senderBalance);
        setbalance(senderBalance);
        setFaucetTrigger(false);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    };

    fetchBalance();
  }, [activeAccount, faucetTrigger]);

  const faucetapt = async () => {
    try {
      await aptos.fundAccount({
        accountAddress: activeAccount.accountAddress,
        amount: 100_000_000,
      });
      // After faucet, set the faucetTrigger to true to re-run useEffect
      setFaucetTrigger(true);
    } catch (error) {
      console.error("Error funding account:", error.message);
    }
  };

  const signmessage = async () => {
    try {
      // ----------------------------------------------------- for faucet account and transfer transaction ----------------------------------------

      // const balance = async (
      //   name,
      //   accountAddress,
      //  ) => {
      //   const amount = await aptos.getAccountAPTAmount({
      //     accountAddress,
      //   });
      //   console.log(`${name}'s balance is: ${amount}`);
      //   return amount;
      // };

      //   const bob = Account.generate();

      //   await aptos.fundAccount({
      //     accountAddress: activeAccount.accountAddress,
      //     amount: 100_000_000,
      //   });

      // const transaction = await aptos.transferCoinTransaction({
      //     sender: activeAccount.accountAddress,
      //     recipient: bob.accountAddress,
      //     amount: 100_100_100,
      // });

      // ------------------------------------------------------- smart contract fucntion transaction --------------------------------

      const transaction = await aptos.transaction.build.simple({
        sender: activeAccount.accountAddress,
        data: {
          function: `0x973d0f394a028c4fc74e069851114509e78aba9e91f52d000df2d7e40ec5205b::tarot::draws_card`,
          functionArguments: [],
        },
      });

      const committedTxn = await aptos.signAndSubmitTransaction({
        signer: activeAccount,
        transaction: transaction,
      });

      const committedTransactionResponse = await aptos.waitForTransaction({
        transactionHash: committedTxn.hash,
      });

      // const senderBalance = await balance("Alice", activeAccount.accountAddress);
      // const recieverBalance = await balance("Bob", bob.accountAddress);

      console.log(
        "Transaction submitted successfully:",
        committedTransactionResponse
      );
    } catch (error) {
      console.error("Error signing and submitting transaction:", error);
    }
  };

  return (
    <>
      <main
        className="flex"
        style={{
          backgroundImage: `url('/home.png')`,
          backgroundSize: "cover",
          height: "710px",
          width: "1515px",
        }}
      >
        {wallet && (
          <div className="justify-center items-center h-[50px] w-[200px] my-10 mx-10 ">
            <button
              onClick={handleDeleteCookie}
              className="bg-white p-2 px-3  hover:bg-sky-500 rounded-xl"
            >
              Logout
            </button>
          </div>
        )}
        {!wallet && !activeAccount && (
          <div className="justify-center items-center h-[50px] w-[200px] my-10 mx-10">
            <button
              style={{
                color: "black",
                borderRadius: "9999px",
                border: "1.5px solid black",
              }}
              className="bg-white p-2  hover:bg-sky-500 {`btn-login ${provider}`}"
              onClick={() => {
                setloginbox(true);
              }}
            >
              Login Now
            </button>
          </div>
        )}
        <div className="bg-cyan-100 h-[650px] w-[750px] my-6 absolute bottom-4 right-8 rounded-lg ">
          <Nav />
          <div className="h-[300px] w-[700px] my-20 mt-44 mx-6">
            <div className="flex">
              <div className="border border-black rounded-full p-2">
                <h1 className="text-black font-raleway font-medium text-5xl">
                  Innovate. &nbsp;
                </h1>
              </div>
              <div className="border border-black rounded-full p-2">
                <h1 className="text-black font-raleway font-medium text-5xl">
                  Funds.
                </h1>
              </div>
            </div>
            <div className="flex">
              <div className="border border-black rounded-full p-2">
                <h1 className="text-black font-raleway font-medium text-5xl">
                  Build. &nbsp;
                </h1>
              </div>
              <div className="border border-black rounded-full p-2">
                <h1 className="text-black font-raleway font-medium text-5xl">
                  Collaborate.
                </h1>
              </div>
            </div>

            <h1 className="p-6 text-black font-raleway font-medium text-lg ">
              Crowdfund Your Next Big Event with Us
            </h1>

            {/* <button className="mx-6"><ConnectWallet
              theme={lightTheme({
                colors: { primaryButtonBg: "none" },
              })}
              style={{ color: "black", borderRadius: '9999px', border: '1.5px solid black' }}
              className="hover:bg-sky-500"
            /></button> */}
            {!wallet && !activeAccount && (
              <div className="justify-center items-center h-[50px] w-[200px] my-10 mx-10">
                <button
                  style={{
                    color: "black",
                    borderRadius: "9999px",
                    border: "1.5px solid black",
                  }}
                  className="bg-white p-2  hover:bg-sky-500 {`btn-login ${provider}`}"
                  onClick={() => {
                    setloginbox(true);
                  }}
                >
                  Login Now
                </button>
              </div>
            )}

            <div className="my-20 mx-6">
              <h1 className="text-black font-raleway font-medium text-xl">
                Where Dreams Meet Reality
              </h1>
            </div>
          </div>
        </div>
      </main>

      <div className="flex p-36">
        <h1 className="text-black font-raleway font-medium text-5xl leading-none">
          We help local Communities to{" "}
          <span className="text-purple-600">Crowdfund</span> <br />
          and <span className="text-purple-600">Launch</span> Events
          Successfully
        </h1>
      </div>

      <div className="flex mx-28">
        <div
          className="mx-6 rounded-xl"
          style={{
            backgroundImage: `url('/build.png')`,
            backgroundSize: "cover",
            height: "400px",
            width: "400px",
          }}
        >
          <div className="bg-white h-[40px] w-[200px] m-4 flex-shrink-0 rounded-full bg-white">
            <h1 className="p-2 text-black font-raleway font-semibold text-base">
              1.Build Your Community
            </h1>
          </div>
          <h1 className="text-white font-raleway font-semibold text-base p-6 mt-60">
            Shape a digital community where you and like-mindedindividuals
            govern together.
          </h1>
        </div>

        <div
          className="mx-6 rounded-xl"
          style={{
            backgroundImage: `url('/plan.png')`,
            backgroundSize: "cover",
            height: "400px",
            width: "400px",
          }}
        >
          <div className="bg-white h-[40px] w-[200px] m-4 flex-shrink-0 rounded-full bg-white">
            <h1 className="p-2 text-black font-raleway font-semibold text-base">
              2.Plan your Events
            </h1>
          </div>
          <h1 className="text-white font-raleway font-semibold text-base p-6 mt-60">
            Easily organize, manage, and spread the word about your gatherings.
          </h1>
        </div>

        <div
          className="mx-6 rounded-xl"
          style={{
            backgroundImage: `url('/earn.png')`,
            backgroundSize: "cover",
            height: "400px",
            width: "400px",
          }}
        >
          <div className="bg-white h-[40px] w-[200px] m-4 flex-shrink-0 rounded-full bg-white">
            <h1 className="p-2 text-black font-raleway font-semibold text-base">
              3.Earn with Events
            </h1>
          </div>
          <h1 className="text-white font-raleway font-semibold text-base p-6 mt-60">
            Enjoy a portion of event earnings by holding relevant NFTs.
          </h1>
        </div>
      </div>

      <div className="flex mx-48">
        <div className="bg-blue-200 h-[400px] w-[700px] mt-44 ">
          <h1 className="text-black font-raleway font-medium text-4xl mt-28 mx-20">
            Create Communities, <br />
            Launch Events Effortlessly
          </h1>
          {/* <button className="mx-20 mt-8"><ConnectWallet
            theme={lightTheme({
              colors: { primaryButtonBg: "#0F4C81" },
            })}
            style={{ color: "white", borderRadius: '9999px' }}
            className="hover:bg-sky-500"
          /></button> */}
          {!wallet && !activeAccount && (
            <div className="justify-center items-center h-[50px] w-[200px] my-10 mx-10">
              <button
                style={{
                  color: "black",
                  borderRadius: "9999px",
                  border: "1.5px solid black",
                }}
                className="bg-white p-2  hover:bg-sky-500 {`btn-login ${provider}`}"
                onClick={() => {
                  setloginbox(true);
                }}
              >
                Login Now
              </button>
            </div>
          )}
        </div>
        <div
          className="h-[400px] w-[450px] mt-44"
          style={{
            backgroundImage: `url('/create.png')`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      <footer className=" mt-20">
        <div className=" py-4 text-black text-center">
          <p className="text-black font-raleway font-medium text-4xl capitalize">
            Connect with us
          </p>
        </div>
        <div className="container mx-auto py-10 px-6">
          <div className="flex justify-center">
            <a href="#" className="text-blue-900 mx-5">
              <FaDiscord size={40} />
            </a>
            <a href="#" className="text-blue-900 mx-5">
              <FaXTwitter size={40} />
            </a>
            <a href="#" className="text-blue-900 mx-2">
              <BsTelegram size={40} />
            </a>
          </div>
        </div>
        {activeAccount && !wallet ? (
          <>
            <div className="flex gap-4">
              <Link href="/profile">
                {avatarUrl && (
                  <img src={avatarUrl} alt="Avatar" style={{ width: 45 }} />
                )}{" "}
              </Link>

              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    activeAccount?.accountAddress.toString()
                  );
                }}
                className="flex justify-center items-center gap-4 rounded-lg px-4 font-semibold"
                style={{ marginTop: "5px", cursor: "pointer" }}
              >
                <GoogleLogo />
                <div style={{ marginLeft: "-10px" }}>
                  {collapseAddress(activeAccount?.accountAddress.toString())}
                </div>
              </div>
              <button
                onClick={() => {
                  setaccountdetails(true);
                }}
                className="text-2xl"
              >
                &#11167;
              </button>
            </div>
          </>
        ) : (
          <></>
        )}

        {loginbox && (
          <div
            style={{ backgroundColor: "#222944E5" }}
            className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
            id="popupmodal"
          >
            <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
              <div className="relative rounded-3xl shadow bg-black text-white">
                <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                  <button
                    onClick={() => setloginbox(false)}
                    type="button"
                    className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* <Image src={emoji} alt="info" className="mx-auto"/> */}

                <div className="p-4 space-y-4">
                  <p
                    className="text-3xl text-center font-bold"
                    style={{ color: "#E8C6AA" }}
                  >
                    Login Options
                  </p>
                </div>
                <div className="flex justify-center p-4 pb-10">
                  <button
                    className="text-black px-6 py-2 bg-white"
                    style={{ borderRadius: "10px" }}
                    onClick={connectWallet}
                  >
                    Connect with Petra
                  </button>
                </div>
                <div className="flex justify-center p-4 pb-20">
                  <div
                    className="text-black px-8 py-2 bg-white"
                    style={{ borderRadius: "10px" }}
                  >
                    <Link href={"/login"}>Login with google</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}
