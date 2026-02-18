import Badge from "@mui/material/Badge"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { type FC, memo, useCallback, useMemo } from "react"
import { TRANSITION_DURATION } from "../constants"
import type { MenuItemDefinition } from "../types"

type OverlayMenuItemProps = {
    item: MenuItemDefinition
    isActive: boolean
    onClick: (id: string) => void
}

const OverlayMenuItem: FC<OverlayMenuItemProps> = memo(function OverlayMenuItem({ item, isActive, onClick }) {
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

export default memo(OverlayMenuItem)
