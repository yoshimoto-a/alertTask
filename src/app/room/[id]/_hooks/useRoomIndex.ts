import { useFetch } from "./useFetch";
import { IndexResponse } from "@/app/_types/room/[id]/IndexResponse";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { dayjs } from "@/app/_utils/dayjs";
export const useRoomIndex = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword") || "";
  const startDate = searchParams?.get("from") || "";
  const endDate = searchParams?.get("to") || "";
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchDate, setSearchDate] = useState({
    startDate: startDate ? dayjs.tz(startDate).format("YYYY-MM-DD") : "",
    endDate: endDate ? dayjs.tz(endDate).format("YYYY-MM-DD") : "",
  });
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, searchDate.endDate, searchDate.startDate]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const { data, isLoading, error, mutate } = useFetch<IndexResponse>(
    `/api/room/${params?.id}?keyword=${searchKeyword}&page=${currentPage}&from=${searchDate.startDate}&to=${searchDate.endDate}`
  );
  return {
    isLoading,
    tasks: data?.tasks,
    error,
    mutate,
    searchDate,
    searchKeyword,
    setSearchKeyword,
    setCurrentPage,
    setSearchDate,
  };
};
