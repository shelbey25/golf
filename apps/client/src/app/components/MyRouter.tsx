import React, { Suspense, useEffect, useState } from "react";
import { ClerkProvider, SignedOut, useClerk, useUser } from "@clerk/clerk-expo";

import { api } from "../../utils/api";

import { SafeAreaView, Text, View } from "react-native";
import tw from "twrnc";

import { useAppState } from "./RouteWrap";
import MainV2 from "./MainV2";
import Sessions from "./Sessions";

const MyRouter = () => {
  
  const { mode, setMode } = useAppState();
  
const override = true
if (override) {
  return <Suspense fallback={null}>
  <MainV2 />
</Suspense>;
}

  if (mode === "Main") {
    return (
      <Suspense fallback={null}>
        <MainV2 />
      </Suspense>
    );
  } else {
    return null;
  }
};

export default MyRouter;
