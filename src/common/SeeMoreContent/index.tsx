import { useCommonDataSelector } from "@datn/redux/hook";
import { Box, SvgIconProps, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type Props = {
  text?: string;
  Icon?: React.FC<SvgIconProps>;
};

export default function SeeMoreContent({ text, Icon }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const { exportMode } = useCommonDataSelector();
  const textRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (exportMode) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [exportMode]);

  useEffect(() => {
    if (textRef.current) {
      const maxHeight =
        parseFloat(getComputedStyle(textRef.current).lineHeight || "0") * 3;
      if (textRef.current.scrollHeight > maxHeight) {
        setShowSeeMore(true);
      } else {
        setShowSeeMore(false);
        setIsExpanded(true);
      }
    }
  }, [text]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!text) {
    return null;
  }

  return (
    <Box
      sx={{
        py: "18px",
        position: "relative",
        display: "flex",
        width: "100%",
        my: -1,
      }}
      className="graph-comment"
    >
      {Icon && <Icon sx={{ fontSize: "16px", mr: 2 }} />}
      <Typography
        ref={textRef}
        component="pre"
        color="text.label1"
        variant="body1"
        sx={{
          fontWeight: 500,
          whiteSpace: isExpanded ? "pre-wrap" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: isExpanded ? "none" : 3,
          width: "100%",
          mr: 2,
        }}
      >
        {text}
        {isExpanded && !exportMode && showSeeMore && (
          <Typography
            variant="body2"
            component="span"
            onClick={handleToggle}
            sx={{ cursor: "pointer", fontWeight: 500, color: "#009FDB" }}
          >
            Short
          </Typography>
        )}
      </Typography>
      {showSeeMore && !isExpanded && (
        <Typography
          width="80px"
          variant="body2"
          onClick={handleToggle}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
            fontWeight: 500,
            color: "#009FDB",
          }}
        >
          See more
        </Typography>
      )}
    </Box>
  );
}
