import Box from "@mui/material/Box"
import { type FC } from "react"
import { RESIZE_HANDLE_WIDTH, TRANSITION_DURATION } from "../constants"
import { useResizable } from "../hooks/useResizable"
import type { ResizeHandlePosition } from "../types"

interface ResizeHandleComponentProps {
    position: ResizeHandlePosition
    visible: boolean
}

export const ResizeHandle: FC<ResizeHandleComponentProps> = ({ position, visible }) => {
    const { handleMouseDown } = useResizable(position)

    if (!visible) return null

    return (
        <Box
            onMouseDown={handleMouseDown}
            sx={{
                width: `${RESIZE_HANDLE_WIDTH}px`,
                minWidth: `${RESIZE_HANDLE_WIDTH}px`,
                cursor: "col-resize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                height: "100%",
                position: "relative",
                zIndex: 10,
                transition: `background-color ${TRANSITION_DURATION}ms ease`,
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "2px",
                    height: "40px",
                    borderRadius: "1px",
                    backgroundColor: "divider",
                    opacity: 0,
                    transition: `opacity ${TRANSITION_DURATION}ms ease`,
                },
                "&:hover": {
                    backgroundColor: "action.hover",
                    "&::after": {
                        opacity: 1,
                    },
                },
                "&:active": {
                    backgroundColor: "primary.main",
                    "&::after": {
                        opacity: 1,
                        backgroundColor: "primary.contrastText",
                    },
                },
            }}
        />
    )
}
