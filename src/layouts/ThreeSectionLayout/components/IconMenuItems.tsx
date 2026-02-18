import Badge from "@mui/material/Badge"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { type FC, memo, useCallback, useMemo } from "react"
import { TRANSITION_DURATION } from "../constants"
import type { MenuItemDefinition } from "../types"

type OverlayMenuItemProps = {
    item: MenuItemDefinition
    isActive: boolean
    onClick: (id: string) => void
}

export const OverlayMenuItem: FC<OverlayMenuItemProps> = memo(function OverlayMenuItem({ item, isActive, onClick }) {
    const handleClick = useCallback(() => {
        if (!item.disabled) onClick(item.id)
    }, [onClick, item.id, item.disabled])

    const sx = useMemo(
        () => ({
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 1,
            cursor: item.disabled ? "default" : "pointer",
            opacity: item.disabled ? 0.4 : 1,
            backgroundColor: isActive ? "action.selected" : "transparent",
            borderInlineStart: isActive ? 2 : 0,
            borderInlineStartColor: "primary.main",
            transition: `background-color ${TRANSITION_DURATION}ms ease`,
            "&:hover": {
                backgroundColor: item.disabled ? "transparent" : isActive ? "action.selected" : "action.hover",
            },
        }),
        [isActive, item.disabled],
    )

    return (
        <Box onClick={handleClick} sx={sx}>
            <item.icon fontSize="small" sx={{ color: isActive ? "primary.main" : "text.secondary", flexShrink: 0 }} />
            <Typography
                variant="body2"
                noWrap
                sx={{ color: isActive ? "primary.main" : "text.primary", fontWeight: isActive ? 600 : 400, flex: 1 }}
            >
                {item.label}
            </Typography>
            {item.badgeCount ? (
                <Badge badgeContent={item.badgeCount} color="error" max={99} sx={{ flexShrink: 0 }} />
            ) : null}
        </Box>
    )
})

type RailMenuItemProps = {
    item: MenuItemDefinition
    isActive: boolean
    onClick: (id: string) => void
    overlayVisible: boolean
}

export const RailMenuItem: FC<RailMenuItemProps> = memo(function RailMenuItem({
    item,
    isActive,
    onClick,
    overlayVisible,
}) {
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
