import { CompleteChallerges } from "../components/CompleteChallerges";
import { CountDown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from "next/head";

import styles from "../styles/pages/Home.module.css";
import ChallangeBox from "../components/ChallangeBox";
import React from "react";
import { CountDonwProvider } from "../contexts/CountdonwContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      <ExperienceBar />
      <CountDonwProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallerges />
            <CountDown />
          </div>
          <div>
            <ChallangeBox />
          </div>
        </section>
      </CountDonwProvider>
    </div>
  );
}
