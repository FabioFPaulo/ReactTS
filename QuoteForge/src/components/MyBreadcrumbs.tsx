import type { Breadcrumb } from "@/@types/privateLayout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
    Breadcrumbs,
    Link as MLink,
    Skeleton,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

type Props = {
    breadcrumbs: Breadcrumb[];
    loading: boolean;
};

export default function MyBreadcrumbs(props: Props) {
    const navigate = useNavigate();
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{
                border: "2px solid #5367E455",
                borderRadius: "8px",
                padding: "0.5em 1em",
                bgcolor: "#5367E411",
                color: "#111D67",
                userSelect: "none",
                height: "2.5rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            {props.loading
                ? [1, 2, 3].map((e) => (
                      <Skeleton height={25} width={55} key={e} />
                  ))
                : props.breadcrumbs.map((bc, index) =>
                      bc.active ? (
                          <Typography
                              key={index}
                              sx={{
                                  color: "#111D67",
                                  display: "flex",
                                  alignItems: "center",
                              }}
                          >
                              <bc.Icon sx={{ mr: 0.5 }} fontSize="inherit" />
                              {bc.label}
                          </Typography>
                      ) : (
                          <MLink
                              underline="hover"
                              sx={{ display: "flex", alignItems: "center" }}
                              color="inherit"
                              onClick={() => navigate(bc.to)}
                              key={index}
                          >
                              <bc.Icon sx={{ mr: 0.5 }} fontSize="inherit" />
                              {bc.label}
                          </MLink>
                      )
                  )}
        </Breadcrumbs>
    );
}
