import { Center, CircularProgress, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Image from "next/image";

const Loading = () => {
  return (
    <Center height="85vh">
      <CircularProgress
        size="150px"
        isIndeterminate
        color="green.300"
        position="relative"
      ></CircularProgress>
    </Center>
  );
};

export default Loading;
