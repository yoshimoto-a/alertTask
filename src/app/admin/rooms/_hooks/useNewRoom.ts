import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequest } from "@/app/_types/admin/room/PostRequest";
import { PostResponse } from "@/app/_types/admin/room/PostResponse";
import { KeyedMutator } from "swr";
import { IndexResponse } from "@/app/_types/admin/room/IndexResponse";
import { useState } from "react";
// import toast from "react-hot-toast";

interface NewRoom {
  token: string;
  password: string;
}

export const useNewRoom = (mutate: KeyedMutator<IndexResponse | undefined>) => {
  const { post } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const schema = z.object({
    token: z.string().min(1, { message: "APIトークンは必須です" }),
    password: z.string().min(1, { message: "合言葉は必須です" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewRoom>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (formdata: NewRoom) => {
    try {
      await post<PostRequest, PostResponse>("/api/admin/room", {
        lineToken: formdata.token,
        password: formdata.password,
      });
      reset();
      mutate();
      setIsOpen(false);
    } catch (e) {
      alert(e);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    setIsOpen,
    isOpen,
  };
};
