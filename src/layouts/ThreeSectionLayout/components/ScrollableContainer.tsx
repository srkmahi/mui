import { Box } from "@mui/material"
import { type FC } from "react"
import { SCROLLBAR_STYLES } from "../constants"
import type { ScrollableContainerProps } from "../types"

export const ScrollableContainer: FC<ScrollableContainerProps> = ({ children, maxHeight = "100%" }) => {
    return (
        <Box
            sx={{
                flex: 1,
                maxHeight,
                ...SCROLLBAR_STYLES,
            }}
        >
            {children}
        </Box>
    )
}
