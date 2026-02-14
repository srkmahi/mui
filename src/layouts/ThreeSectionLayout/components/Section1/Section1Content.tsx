import { Box, Typography } from "@mui/material"
import { type FC, type ReactNode } from "react"
import { ScrollableContainer } from "../ScrollableContainer"

interface Section1ContentProps {
    children?: ReactNode
}

export const Section1Content: FC<Section1ContentProps> = ({ children }) => {
    return (
        <ScrollableContainer>
            <Box sx={{ p: 2 }}>
                {children ?? <Typography color="text.secondary">Main content area. Add your content here.</Typography>}
            </Box>
        </ScrollableContainer>
    )
}
