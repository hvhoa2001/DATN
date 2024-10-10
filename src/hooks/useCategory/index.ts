import { useParams } from "react-router-dom";

export function useCategory() {
  const { category } = useParams<{ category: string }>();
  return category;
}
