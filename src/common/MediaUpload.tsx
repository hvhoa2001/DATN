import { uploadImage } from "@datn/api/services";
import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, SxProps } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Image } from "./Image";

export type MediaType = "image" | "video";
export const checkMediaType = (mediaSrc: string) => {
  const isImage = [".gif", ".jpg", ".jpeg", ".png"];
  const isVideo = [".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mp4"];
  let res: MediaType | undefined;
  isImage.forEach((type) => {
    if (mediaSrc.endsWith(type)) {
      res = "image";
    }
  });
  isVideo.forEach((type) => {
    if (mediaSrc.endsWith(type)) {
      res = "video";
    }
  });
  return res || "image";
};

type Props = {
  video?: boolean;
  limit?: number;
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  mediaTypes: MediaType[];
  setMediaTypes: React.Dispatch<React.SetStateAction<MediaType[]>>;
  sx?: SxProps;
};

export default function MediaUploader({
  video,
  limit = 3,
  mediaTypes,
  setMediaTypes,
  setUrls,
  urls,
  sx,
}: Props) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [avatars, setAvatars] = useState<Array<string>>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [updatedFlag, setUpdatedFlag] = useState<boolean>(false);

  const handleAddImage = () => {
    if (urls.length < limit + 1) imageInput.current?.click();
    else {
      toast.warning("You must use three media in a post!");
    }
  };

  //init avatars as url
  useEffect(() => {
    if (urls?.length && !updatedFlag) {
      setAvatars(urls);
      setUpdatedFlag(true);
    }
  }, [updatedFlag, urls]);

  const handleRemoveImage = (id: number) => {
    const newFilePostLink = urls.filter((_, index) => index !== id);
    setAvatars((prev) => prev.filter((_, index) => index !== id));
    setMediaTypes((prev) => prev.filter((_, index) => index !== id));
    setUrls(newFilePostLink);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e?.target?.files?.length || 0) > 0) {
      if (e?.target?.files) {
        setUploading(true);
        try {
          if (e.target.files) {
            const link = await uploadImage({ file: e.target.files[0] });
            if (link) {
              setUrls((prev) => [...prev, ...link.cid]);
              setAvatars((prev) => [
                ...prev,
                ...Object.values(e.target.files || []).map((i) =>
                  URL.createObjectURL(i)
                ),
              ]);
              setMediaTypes((prev) => {
                const newTypes = Object.values(e.target.files || []).map((i) =>
                  checkMediaType(i.name)
                );
                return [...prev, ...newTypes];
              });
            }
          }
          if (e?.target?.files.length + urls.length > 3) {
            toast.warning("You must use three images in a post!");
          }
        } catch (error) {
          toast.error((error as Error).message);
        }
        setUploading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "unset" },
        justifyContent: { xs: "center", sm: "unset" },
        ...(sx || {}),
      }}
    >
      <Box
        className="custom-scrollbar"
        mt={2}
        sx={{
          display: "flex",
          mx: 2,
          flexDirection: { xs: "column", sm: "unset" },
          justifyContent: { xs: "center", sm: "unset" },
          alignItems: "center",
          overflow: "auto",
        }}
      >
        {avatars.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                position: "relative",
                border: "1px solid #314652",
                borderRadius: "10px",
                mr: { xs: 0, sm: 4 },
                mt: { xs: 2, sm: 0 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              {mediaTypes[index] === "image" && (
                <Image
                  style={{ objectFit: "fill" }}
                  src={`${item}`}
                  alt={"avatar"}
                  loading="lazy"
                  height={200}
                />
              )}
              {mediaTypes[index] === "video" && (
                <video height="200" controls autoPlay>
                  <source src={`${item}`} />
                </video>
              )}
              <IconButton
                sx={{ position: "absolute", right: 10, top: 10 }}
                onClick={() => handleRemoveImage(index)}
              >
                <Delete fontSize="small" sx={{ color: "#5D84A7" }} />
              </IconButton>
            </Box>
          );
        })}
      </Box>
      {avatars.length < 3 && (
        <Box
          sx={{
            height: "200px",
            minWidth: "200px",
            mt: 2,
            border: "1px dashed #31566F",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            if (uploading) {
              return;
            }
            handleAddImage();
          }}
        >
          {!uploading && <Add fontSize="small" color="secondary" />}
          {/* {uploading && <CenticLoading size={30} />} */}
        </Box>
      )}
      <input
        key={String(avatars)}
        type="file"
        accept={`image/png, image/gif, image/jpeg${
          video ? ", video/mp4, video/x-m4v, video/*" : ""
        }`}
        style={{ display: "none" }}
        ref={imageInput}
        onChange={handleFileChange}
        multiple
      />
    </Box>
  );
}
