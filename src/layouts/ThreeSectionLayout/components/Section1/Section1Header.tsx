import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { type FC, type ReactNode } from "react"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { Section1Action } from "../../types"

interface Section1HeaderProps {
    children?: ReactNode
    actions?: Section1Action[]
}

export const Section1Header: FC<Section1HeaderProps> = ({ children, actions }) => {
    const { selectMenuItem } = useLayoutContext()

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1.5,
                borderBottom: 1,
                borderColor: "divider",
                flexShrink: 0,
                minHeight: 56,
            }}
        >
            <Box sx={{ flex: 1 }}>
                {children ?? (
                    <Typography variant="h6" noWrap>
                        Main Content
                    </Typography>
                )}
            </Box>
            {actions && actions.length > 0 && (
                <Box sx={{ display: "flex", gap: 0.5, ml: 1 }}>
                    {actions.map((action) => (
                        <Tooltip key={action.id} title={action.label}>
                            <IconButton
                                size="small"
                                onClick={() => selectMenuItem(action.targetSection, action.targetMenuItemId)}
                            >
                                <action.icon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    ))}
                </Box>
            )}
        </Box>
    )
}
