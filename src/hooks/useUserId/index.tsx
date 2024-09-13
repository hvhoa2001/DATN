import { useAppDispatch, useCommonDataSelector } from "@datn/redux/hook";
import { getUsername } from "@datn/redux/slices/common/fetchFunction";
import { useEffect } from "react";

export default function useUserId() {
  const { data } = useCommonDataSelector().userName;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getUsername());
    }
  }, [dispatch, data]);
  return data?.userId;
}
