import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.contact.send)["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.contact.send)["$post"]
>["json"];

export const useContactForm = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contact.send["$post"]({ json });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "送信に失敗しました");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "お問い合わせを送信しました");
    },
    onError: (error) => {
      toast.error(error.message || "送信に失敗しました");
    },
  });

  return mutation;
};
