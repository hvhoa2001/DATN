import { useProductSelector } from "@datn/redux/hook";
import { Grid2 } from "@mui/material";

export default function ImageDetail() {
  const { data } = useProductSelector().productDetail;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 0, md: 2 }}>
        <Grid2 container spacing={2}>
          {data?.variants?.map((item) =>
            item.image.map((i, index) => {
              return (
                <Grid2 size={{ xs: 12 }} key={index}>
                  <img
                    src={i}
                    alt="img"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Grid2>
              );
            })
          )}
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 10 }}>
        {data?.variants?.map((item, index) => {
          return (
            <img
              src={item.image[0]}
              alt="img"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              key={index}
            />
          );
        })}
      </Grid2>
    </Grid2>
  );
}
