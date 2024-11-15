import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FormMessage } from "../ui/form";
import { RegisterType } from "@/lib/types";

const FormError = (props: RegisterType) => {
  return (
    <FormMessage className="text-red-500 flex gap-4">
      <ExclamationTriangleIcon />
      <span>{props.message}</span>
    </FormMessage>
  );
};

export default FormError;
