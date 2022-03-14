import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import { Inputs } from "types/inputInterface";
import InputForm from "./Input";
interface FormProps {
  provider: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const LoginForm = ({ provider }: FormProps) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn(provider?.credentials.id, {
      email: data.email,
      password: data.password,
      location: "hell",
      callbackUrl: "http://localhost:3000/about",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack w="300px">
        <Text letterSpacing="2px" width="100%">
          Sign in manually
        </Text>
        <InputForm
          type="email"
          placeholder="example@email.com"
          {...register("email")}
        />
        <InputForm
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <Text fontSize="1rem" width="100%" color="red.400">
          {router.query.error === "CredentialsSignin" &&
            "Invalid username or password 😡"}{" "}
        </Text>
        <Button
          borderRadius="50px"
          w="100%"
          h="50px"
          type="submit"
          colorScheme="linkedin"
        >
          Sign in with email
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
