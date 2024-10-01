import { Grid2 } from "@mui/material";
import { useProductContext } from "../context";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const { selectedVariant } = useProductContext();
  const [selectIndex, setSelectIndex] = useState<number>(0);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   if (selectedVariant?.image && selectedVariant.image.length > 0) {
  //     interval = setInterval(() => {
  //       setSelectIndex((prev) => prev + 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval || 0);
  // }, [selectedVariant?.image]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 0, md: 2 }}>
        <Grid2 container spacing={2}>
          {selectedVariant?.image?.map((item, index) => (
            <Grid2 size={{ xs: 12 }} key={index}>
              <img
                src={item}
                alt={`img-${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectIndex(index);
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 10 }}>
        {selectedVariant?.image && selectedVariant.image.length > 0 && (
          <img
            src={selectedVariant.image[selectIndex]}
            alt={`Selected img ${selectIndex}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
