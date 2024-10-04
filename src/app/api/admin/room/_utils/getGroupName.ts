interface LineStatus {
  status: number;
  message: string;
  targetType: string;
  target: string;
}

export const getGroupName = async (token: string) => {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const resp = await fetch("https://notify-api.line.me/api/status", headers);
  const data: LineStatus = await resp.json();

  //アクセストークンが無効の場合
  if (data.status !== 200) {
    throw new Error(data.message);
  }

  return { groupName: data.target };
};
