"use client";
import { useLocalStorage } from "@/app/_hooks/useLoacalStrage";
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { PasswordResponse } from "@/app/_types/password/PasswoesResponse";

const concatenate = (input: string | string[]): string => {
  if (typeof input === "string") {
    return input;
  } else {
    return input.join("");
  }
};

export const usePassword = () => {
  const [password, setPassword] = useLocalStorage<string>("password", "");
  const params = useParams();
  const [error, setError] = useState<string | null | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const roomId = params.id;
  const roomUrlId = concatenate(roomId);
  const checkPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch("/api/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomUrlId, password: inputValue }),
        });
        if (response.status !== 200) {
          const errorData = await response.json();
          const errorMessage = errorData.message || "登録に失敗しました。";
          throw new Error(errorMessage);
        }
        const { message }: PasswordResponse = await response.json();
        if (message === "correct") {
          setPassword(inputValue);
          setError(null);
        } else {
          setError("合言葉が違います");
        }
      } catch (e) {
        console.error(e);
        setError("エラーが発生しました");
      }
    },
    [roomUrlId, setPassword, inputValue]
  );

  return {
    password,
    error,
    checkPassword,
    inputValue,
    setInputValue,
  };
};
