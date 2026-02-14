import MenuIcon from "@mui/icons-material/Menu"
import { Badge, Box, Divider, IconButton, Tooltip } from "@mui/material"
import { type FC } from "react"
import { ICON_PANEL_WIDTH } from "../../constants"
import type { IconMenuPanelProps } from "../../types"

export const Section3IconMenu: FC<IconMenuPanelProps> = ({
    menuItems,
    activeItemId,
    isExpanded,
    onToggle,
    onSelectItem,
}) => {
    return (
        <Box
            sx={{
                width: ICON_PANEL_WIDTH,
                minWidth: ICON_PANEL_WIDTH,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 1,
                borderLeft: 1,
                borderColor: "divider",
                backgroundColor: "background.paper",
                flexShrink: 0,
            }}
        >
            {/* Toggle button */}
            <Tooltip title={isExpanded ? "Collapse" : "Expand"} placement="left">
                <IconButton size="small" onClick={onToggle} sx={{ mb: 0.5 }}>
                    <MenuIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Divider sx={{ width: "70%", my: 0.5 }} />

            {/* Menu items */}
            {menuItems.map((item) => (
                <Tooltip key={item.id} title={item.label} placement="left">
                    <span>
                        <IconButton
                            size="small"
                            disabled={item.disabled}
                            onClick={() => onSelectItem(item.id)}
                            sx={{
                                my: 0.25,
                                color: activeItemId === item.id ? "primary.main" : "text.secondary",
                                backgroundColor: activeItemId === item.id ? "action.selected" : "transparent",
                                "&:hover": {
                                    backgroundColor: activeItemId === item.id ? "action.selected" : "action.hover",
                                },
                            }}
                        >
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
            ))}
        </Box>
    )
}
