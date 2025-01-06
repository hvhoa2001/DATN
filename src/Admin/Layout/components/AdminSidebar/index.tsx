import { Box, SxProps, Theme, Typography } from "@mui/material";
import { SidebarConfigItem } from "../sidebar-configs/sidebar-configs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@datn/context/AuthContext";

const sideBarItem: SxProps<Theme> = (theme: Theme) => ({
  textTransform: "none",
  textAlign: "left",
  pl: 2,
  py: 1.5,
  maxWidth: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});

const AdminSidebar = ({
  configs,
  loading,
  basePath,
}: {
  configs: SidebarConfigItem[];
  loading?: boolean;
  basePath?: string;
}) => {
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "230px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "calc(100vh - 60px)",
        borderRight: "1px solid #16242E",
      }}
    >
      {!loading && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {configs.map((item, index: number) => {
              const base = basePath ? `/${basePath}` : "/";
              const itemPath = `${item.path}`;
              const isActive =
                (itemPath === base && itemPath === location.pathname) ||
                (itemPath !== base && location.pathname.includes(itemPath));
              return (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    opacity: item.disabled ? 0.7 : 1,
                  }}
                >
                  <NormalTab
                    tabData={item}
                    isLoggedIn={isLoggedIn}
                    active={isActive}
                  />
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

const NormalTab = ({
  tabData,
  active,
  isLoggedIn,
}: {
  tabData: SidebarConfigItem;
  isLoggedIn?: boolean;
  active?: boolean;
}) => {
  return (
    <Link
      to={tabData.redirectTo || tabData.path}
      style={{
        textDecoration: "none",
        alignItems: "center",
      }}
      target={tabData.redirect ? "_blank" : "_self"}
    >
      {(!tabData.auth || isLoggedIn) && (
        <Box
          sx={(theme) => ({
            "& :hover": {
              backgroundColor: theme.palette.background.paper2,
            },
            width: "100%",
            ...(((tabData.auth && !isLoggedIn) || tabData.disabled) && {
              cursor: "not-allowed",
              opacity: 0.6,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }),
            ...sideBarItem(theme),
          })}
        >
          <Box sx={sideBarItem}>
            <Typography
              variant="body2"
              fontWeight={500}
              ml={1}
              color={active ? "text.active" : "text.primary"}
              display="flex"
              alignItems={"center"}
            >
              <tabData.icon sx={{ mr: 1 }} /> {tabData.title}
            </Typography>
          </Box>
        </Box>
      )}
    </Link>
  );
};

export default AdminSidebar;
