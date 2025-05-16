import { currentUser, SignOutButton, useUser } from "@clerk/nextjs";
import { Report, User } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import JadenScreen from "./components/swoopMain";

//sort archive and active by date
//add archive for reports
export default function Home() {
  return (
    <>
      <JadenScreen signInNeed={false} />
    </>
  );
}
