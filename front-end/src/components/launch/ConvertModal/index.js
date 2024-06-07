import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import Button from "@/components/common/Button";
import { Select, DatePicker } from "antd";
import * as Yup from "yup";
import { useProposal } from "@/ContextProviders/ProposalProvider";
import { enqueueSnackbar } from "notistack";
import Lottie from "lottie-react";
import notFound from "@/components/Empty/notFound.json";
import Nav3 from "@/components/common/Nav/nav3.js";
import Cookies from "js-cookie";
import { useKeylessAccounts } from "@/libs/useKeylessAccounts";
import useAptos from "@/context/useAptos";
import { Account, SimpleTransaction } from "@aptos-labs/ts-sdk";
import axios from "axios";

const ConvertModal = () => {
  const { proposal } = useProposal();

  const initialValues = proposal
    ? {
        title: proposal.title,
        description: proposal.description,
        priceperNFT: proposal.priceperNFT,
        funding_goal: proposal.funding_goal,
        stable_coin_option: "APT",
        starting_date: "",
        ending_date: "",
      }
    : {
        title: "",
        description: "",
        priceperNFT: 0,
        funding_goal: 0,
        stable_coin_option: "",
        starting_date: "",
        ending_date: "",
      };

  const validationSchema = Yup.object().shape({
    stable_coin_option: Yup.string().required("Required"),
    starting_date: Yup.string().required("Required"),
    ending_date: Yup.string().required("Required"),
  });

  // aptos
  const { aptos, moduleAddress } = useAptos();

  const { activeAccount, disconnectKeylessAccount } = useKeylessAccounts();
  console.log("activeAccount", activeAccount);

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
      if (network === "TESTNET") {
        // signing message
        const payload = {
          message: "Hello! from dream starter",
          nonce: Math.random().toString(16),
        };
        const res = await aptosWallet.signMessage(payload);
        // signing message

        Cookies.set("dream_starter_wallet", response.address, {
          expires: 7,
        });
        window.location.reload();
      } else {
        alert(`Switch to TESTNET in your Petra wallet`);
      }
    } catch (error) {
      console.error(error); // { code: 4001, message: "User rejected the request."}
    }
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

  const handleLaunchCollection = async () => {
    // setLoading(true);

    try {
      const launchCollection = {
        type: "entry_function_payload",
        function:
          "0x752d1c37fe7060e599af08f584b6ba0aa989ac163f83424622592f714a8df2e7::dreamstarter::launch_collection",
        type_arguments: [],
        arguments: ["s1", "s2"],
      };

      const launchResponse = await window.aptos.signAndSubmitTransaction(
        launchCollection
      );
      console.log("launch Response:", launchResponse);
      // setmintdone(true);
    } catch (error) {
      console.error("Error handling draw card and fetching rap:", error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          enqueueSnackbar(`Proposal Converted`, {
            variant: "success",
          });
          actions.setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue, errors }) => (
          <Form>
            <div className="">
              <div className="w-[500px]  text-sm  px-4 py-4 flex flex-col gap-4">
                <div className="text-lg font-medium ">{values.title}</div>
                <div>{values.description}</div>
                <div>Price Per NFT: {values.priceperNFT}</div>
                <div>
                  Funding Goal: {values.funding_goal}{" "}
                  {values.stable_coin_option}
                </div>
                <div>
                  <label htmlFor="stable_coin_option" className="block mb-2">
                    StableCoin for the funding :
                  </label>
                  <Select
                    aria-required
                    defaultValue={values.stable_coin_option}
                    className="w-full"
                    onChange={(e) => {
                      setFieldValue("stable_coin_option", e);
                    }}
                    options={[
                      { value: "USDT", label: "USDT" },
                      { value: "USDC", label: "USDC" },
                      { value: "APT", label: "APT" },
                    ]}
                  />
                </div>
                <div className="flex gap-6 items-center">
                  <div>
                    <label htmlFor="starting_date" className="block mb-2">
                      Starting Date
                    </label>
                    <DatePicker
                      onChange={(e) => {
                        setFieldValue("starting_date", e);
                      }}
                    />
                    <div className="text-red-500 text-xs mt-1">
                      <ErrorMessage name="ending_date" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ending_date" className="block mb-2">
                      Ending Date
                    </label>
                    <DatePicker
                      onChange={(e) => {
                        setFieldValue("ending_date", e);
                      }}
                    />
                    <div className="text-red-500 text-xs mt-1">
                      <ErrorMessage name="ending_date" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="flex justify-center"
                    _isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleLaunchCollection}
                  >
                    Launch crowdfunding
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ConvertModal;
