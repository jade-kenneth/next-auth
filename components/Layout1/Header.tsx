import React from "react";

import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";
import { Avatar, Button, Flex, HStack, Text } from "@chakra-ui/react";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Flex
      justify="space-between"
      align="center"
      mx="auto"
      height="10vh"
      width="95%"
    >
      <Text fontWeight="bolder" letterSpacing="2px">
        NEXT AUTH APP
      </Text>
      <HStack height="auto" width="auto" spacing={2}>
        <Avatar src={`${session?.user?.image}`} size="md" />
        {session && (
          <Text>
            {session?.user?.name
              ? session?.user?.name?.substring(0, 15)
              : session?.user?.email?.substring(0, 15)}
            ...
          </Text>
        )}
        <Button
          colorScheme="linkedin"
          onClick={() => {
            session
              ? signOut({
                  callbackUrl: "http://localhost:3000/",
                })
              : router.push("/");
          }}
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
      </HStack>
    </Flex>
  );
};

export default Header;
