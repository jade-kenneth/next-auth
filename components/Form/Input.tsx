import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Inputs } from "types/inputInterface";

let schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(5, "Password at least minimun of 5 characters")
    .max(11, "Password at least maximum of 10 characters")
    .required("Password is required"),
});

const InputForm = ({ ...props }) => {
  const {
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  return (
    <FormControl isInvalid={!!errors.email}>
      <Input {...props} />
      <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputForm;
