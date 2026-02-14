import Box from "@mui/material/Box"
import { type FC, type ReactNode } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"

interface Section1CardProps {
    children?: ReactNode
}

export const Section1Card: FC<Section1CardProps> = ({ children }) => {
    const { computedWidths, isResizing } = useLayoutContext()

    return (
        <Box
            sx={{
                width: computedWidths.section1,
                minWidth: 0,
                height: "100%",
                flexShrink: 0,
                overflow: "hidden",
                transition: isResizing ? "none" : `width ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`,
            }}
        >
            {children}
        </Box>
    )
}
