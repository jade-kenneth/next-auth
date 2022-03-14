import React, { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
  getSession,
} from "next-auth/react";
import {
  Button,
  Center,
  Divider,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BuiltInProviderType } from "next-auth/providers";

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";

import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Loading from "components/Loading/Loading";
import Layout1 from "components/Layouts/Layout1";

import LoginForm from "components/Form/LoginForm";
import SocialMediaButton from "components/Button/SocialMediaButton";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/about",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
const Home = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    (async function getProvider() {
      const provider = await getProviders();
      setProviders(provider);
    })();
  }, []);

  if (status === "loading") return <Loading />;
  // if (session) return null;
  return (
    <Center h="78vh" w="100%">
      <Stack
        w="auto"
        height="80vh"
        borderRadius="lg"
        fontSize="2rem"
        spacing={8}
        align="center"
        direction="row-reverse"
      >
        <LoginForm provider={providers} />
        <Divider orientation="vertical" height="100%" />
        <VStack w="300px">
          <SocialMediaButton
            leftIcon={<FaFacebook />}
            colorScheme="facebook"
            onClick={() =>
              signIn(providers?.facebook.id, {
                callbackUrl: "http://localhost:3000/about",
              })
            }
          >
            Facebook
          </SocialMediaButton>
          <SocialMediaButton
            leftIcon={<FaGoogle />}
            colorScheme="red"
            onClick={() =>
              signIn(providers?.google.id, {
                callbackUrl: "http://localhost:3000/about",
              })
            }
          >
            Google
          </SocialMediaButton>
          <SocialMediaButton
            leftIcon={<FaGithub />}
            colorScheme="black"
            variant="outline"
            onClick={() =>
              signIn(providers?.github.id, {
                callbackUrl: "http://localhost:3000/about",
              })
            }
          >
            Github
          </SocialMediaButton>
        </VStack>
      </Stack>
    </Center>
  );
};

export default Home;

Home.getLayout = (page: React.ReactElement) => {
  return <Layout1>{page}</Layout1>;
};
