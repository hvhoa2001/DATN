import { Grid2 } from "@mui/material";
import { useProductContext } from "../context";
import { useEffect, useState } from "react";

export default function ImageDetail() {
  const { selectedVariant } = useProductContext();
  const [selectIndex, setSelectIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectIndex((prevIndex) => {
        if (
          selectedVariant?.image &&
          prevIndex === selectedVariant.image.length - 1
        ) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedVariant?.image]);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 0, md: 2 }}>
        <Grid2 container spacing={2}>
          {selectedVariant?.image.map((item, index) => (
            <Grid2 size={{ xs: 12 }} key={index}>
              <img
                src={item}
                alt="img"
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
        <img
          src={selectedVariant?.image[selectIndex]}
          alt="img"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Grid2>
    </Grid2>
  );
}
