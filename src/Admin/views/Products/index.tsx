import { uploadImage } from "@datn/api/services";
import { Box, Button, keyframes, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Image } from "@datn/common/Image";
import BigNumber from "bignumber.js";
import { LoadingButton } from "@mui/lab";
import useNFTsAdminContract from "@datn/web3/hooks/useNFTsAdminContract";

export default function AdminProducts() {
  const { mintNFT } = useNFTsAdminContract({
    contractAddress: "0xd0C38f901fa13088ca4B363C43E00B30Cf5F13F4",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [size, setSize] = useState<Array<string>>();
  const [amount, setAmount] = useState<Array<number>>();
  const [previewImage, setPreviewImage] = useState<string>("");

  const onAvatarClick = () => {
    inputRef?.current?.click();
  };

  const handleMintNFT = async () => {
    setLoading(true);
    try {
      const res = await mintNFT(
        new BigNumber(price).times(new BigNumber(Math.pow(10, 6))),
        name,
        description,
        `https://amethyst-selected-ape-88.mypinata.cloud/ipfs/${cid}`,
        [40, 41],
        [5, 5]
      );
      setLoading(false);
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box
            sx={{
              //   cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
              height: "300px",
              backgroundColor: "#17242C",
              border: "1px solid ",
              // borderColor: helperText.avatar?.trim() ? "red" : "text.active2",
            }}
          >
            {previewImage && (
              <Image
                style={{ objectFit: "fill" }}
                src={previewImage}
                alt={"avatar"}
                loading="lazy"
                height={300}
                width={300}
              />
            )}
            {!previewImage && <CameraAltIcon />}
          </Box>
          <Button onClick={onAvatarClick} variant="outlined" sx={{ mt: 2 }}>
            Upload
          </Button>
          <input
            type="file"
            multiple={false}
            style={{ display: "none" }}
            accept="image/*"
            ref={inputRef}
            onChange={async (e) => {
              setLoading(true);
              try {
                if (e.target.files) {
                  const res = await uploadImage({ file: e.target.files[0] });
                  setCid(res.cid);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  toast.success("Upload success");
                }
              } catch (error) {
                toast.error((error as Error).message);
              }
              setLoading(false);
            }}
          />
        </Box>
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
            label="Name"
          />
          <TextField
            value={description}
            fullWidth
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            multiline
            minRows={3}
          />
          <TextField
            value={price}
            fullWidth
            onChange={(e) => setPrice(Number(e.target.value))}
            label="Price"
            type="number"
          />
        </Box>
      </Box>
      <LoadingButton
        loading={loading}
        onClick={handleMintNFT}
        variant="contained"
        sx={{ mt: 4, width: "128px" }}
      >
        Mint
      </LoadingButton>
    </Box>
  );
}
