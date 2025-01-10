import { Grid2 } from "@mui/material";
import { useProductSelector } from "@datn/redux/hook";

export default function ImageDetail() {
  const { data } = useProductSelector().NFTDetail;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 0, md: 2 }}>
        <Grid2 container spacing={2}>
          {/* {data &&
            data.map((item, index) => {
              return ( */}
          <Grid2 size={{ xs: 12 }}>
            <img
              src={data?.image}
              alt={`img`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
          </Grid2>
          {/* );
            })} */}
        </Grid2>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 10 }}>
        {/* {data &&
          data.map((item, index) => {
            return ( */}
        <img
          src={data?.image}
          alt={`img`}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
        {/* );
          })} */}
      </Grid2>
    </Grid2>
  );
}
