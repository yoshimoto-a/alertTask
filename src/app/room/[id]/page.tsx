"use client";
import { RoomIndex } from "./_components/RoomIndex";
import { usePassword } from "./_hooks/usePassword";
import { InputPassword } from "./_components/InputPassword";
export default function Page() {
  const { password, error, checkPassword, inputValue, setInputValue } =
    usePassword();

  if (!password)
    return (
      <InputPassword
        checkPassword={checkPassword}
        error={error}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    );

  return <RoomIndex />;
}
