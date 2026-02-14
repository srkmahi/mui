import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import { type FC } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { Section1CardProps } from "../../types"
import { Section1Content } from "./Section1Content"
import { Section1Footer } from "./Section1Footer"
import { Section1Header } from "./Section1Header"

export const Section1Card: FC<Section1CardProps> = ({ header, content, footer, actions }) => {
    const { computedWidths, isResizing } = useLayoutContext()

    return (
        <Box
            sx={{
                width: computedWidths.section1,
                minWidth: 0,
                height: "100%",
                flexShrink: 0,
                transition: isResizing ? "none" : `width ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                    borderLeft: 1,
                    borderRight: 1,
                    borderColor: "divider",
                    overflow: "hidden",
                }}
            >
                <Section1Header actions={actions}>{header}</Section1Header>
                <Section1Content>{content}</Section1Content>
                <Section1Footer>{footer}</Section1Footer>
            </Paper>
        </Box>
    )
}
