import Badge from "@mui/material/Badge"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { type FC, memo, useCallback, useMemo } from "react"
import type { MenuItemDefinition } from "../types"

type RailMenuItemProps = {
    item: MenuItemDefinition
    isActive: boolean
    onClick: (id: string) => void
    overlayVisible: boolean
}

const RailMenuItem: FC<RailMenuItemProps> = memo(function RailMenuItem({ item, isActive, onClick, overlayVisible }) {
    const handleClick = useCallback(() => onClick(item.id), [onClick, item.id])
    const iconSx = useMemo(
        () => ({
            color: isActive ? "primary.main" : "text.secondary",
            backgroundColor: isActive ? "action.selected" : "transparent",
            "&:hover": { backgroundColor: isActive ? "action.selected" : "action.hover" },
        }),
        [isActive],
    )

    return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 0.5 }}>
            <Tooltip title={overlayVisible ? "" : item.label} placement="left">
                <span>
                    <IconButton size="small" disabled={item.disabled} onClick={handleClick} sx={iconSx}>
                        {item.badgeCount ? (
                            <Badge badgeContent={item.badgeCount} color="error" max={99}>
                                <item.icon fontSize="small" />
                            </Badge>
                        ) : (
                            <item.icon fontSize="small" />
                        )}
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    )
})

export default memo(RailMenuItem)
