import { RegisterType } from "@/lib/types";
import { FormMessage } from "../ui/form";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const FormSuccess = (props: RegisterType) => {
  return (
    <FormMessage className="text-green-500 flex gap-4">
      <CheckCircledIcon />
      <span>{props.message}</span>
    </FormMessage>
  );
};

export default FormSuccess;
