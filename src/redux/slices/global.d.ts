import { StateStatus } from "@datn/common/component";

export interface DataWithStatus<T> {
  data?: T;
  status: StateStatus;
}
