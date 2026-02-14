import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { type FC, type ReactNode } from "react"

interface Section1FooterProps {
    children?: ReactNode
}

export const Section1Footer: FC<Section1FooterProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1,
                borderTop: 1,
                borderColor: "divider",
                flexShrink: 0,
                minHeight: 48,
            }}
        >
            {children ?? (
                <Typography variant="caption" color="text.secondary">
                    Footer
                </Typography>
            )}
        </Box>
    )
}
