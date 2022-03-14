import { Box, Flex, Grid } from "@chakra-ui/react";

import Header from "components/Layout1/Header";
import Image from "next/image";
import React from "react";

import Footer from "components/Layout1/Footer";

type Layout1Props = {
  children: JSX.Element;
};

const Layout1: React.FC<Layout1Props> = ({ children }) => {
  return (
    <Grid templateRows="auto auto 10vh">
      <Header />

      {children}
      <Footer />
    </Grid>
  );
};

export default Layout1;
