import { CompleteChallerges } from "../components/CompleteChallerges";
import { CountDown } from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from "next/head";

import styles from "../styles/pages/Home.module.css";
import ChallangeBox from "../components/ChallangeBox";
import React from "react";
import { CountDonwProvider } from "../contexts/CountdonwContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio Lucas Pereira | move.it</title>
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
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
