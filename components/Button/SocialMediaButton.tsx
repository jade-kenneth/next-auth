import { Button as SocialButton, ButtonProps } from "@chakra-ui/react";

const SocialMediaButton = ({ children, ...props }: ButtonProps) => {
  return (
    <SocialButton w="100%" h="50px" borderRadius="50px" {...props}>
      {children}
    </SocialButton>
  );
};

export default SocialMediaButton;
