import MenuIcon from "@mui/icons-material/Menu"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { type FC, useCallback, useEffect, useRef, useState } from "react"
import { ICON_PANEL_OVERLAY_WIDTH, ICON_PANEL_WIDTH, SCROLLBAR_STYLES, TRANSITION_DURATION } from "../../constants"
import type { IconMenuPanelProps } from "../../types"
import OverlayMenuItem from "../OverlayMenuItem"
import RailMenuItem from "../RailMenuItem"

const OVERLAY_LIST_SX = { flex: 1, ...SCROLLBAR_STYLES }

const HOVER_DELAY = 300
const LEAVE_DELAY = 200

export const Section2IconMenu: FC<IconMenuPanelProps> = ({
    menuItems,
    activeItemId,
    isExpanded,
    onToggle,
    onSelectItem,
}) => {
    const [showOverlay, setShowOverlay] = useState(false)
    const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (enterTimerRef.current) clearTimeout(enterTimerRef.current)
            if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
        }
    }, [])

    const handleMouseEnter = useCallback(() => {
        if (!isExpanded) return
        if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current)
            leaveTimerRef.current = null
        }
        enterTimerRef.current = setTimeout(() => {
            setShowOverlay(true)
        }, HOVER_DELAY)
    }, [isExpanded])

    const handleMouseLeave = useCallback(() => {
        if (enterTimerRef.current) {
            clearTimeout(enterTimerRef.current)
            enterTimerRef.current = null
        }
        leaveTimerRef.current = setTimeout(() => {
            setShowOverlay(false)
        }, LEAVE_DELAY)
    }, [])

    const handleItemClick = useCallback(
        (itemId: string) => {
            onSelectItem(itemId)
            setShowOverlay(false)
            if (enterTimerRef.current) {
                clearTimeout(enterTimerRef.current)
                enterTimerRef.current = null
            }
        },
        [onSelectItem],
    )

    const overlayVisible = showOverlay && isExpanded

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ position: "relative", height: "100%", flexShrink: 0 }}
        >
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
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Tooltip title={isExpanded ? "Collapse panel" : "Expand panel"} placement="right">
                    <IconButton size="small" onClick={onToggle} sx={{ mb: 0.5 }}>
                        <MenuIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                <Divider sx={{ width: "70%", my: 0.5 }} />

                <Box sx={{ flex: 1, width: "100%", ...SCROLLBAR_STYLES }}>
                    {menuItems.map((item) => (
                        <RailMenuItem
                            key={item.id}
                            item={item}
                            isActive={activeItemId === item.id}
                            onClick={handleItemClick}
                            overlayVisible={overlayVisible}
                        />
                    ))}
                </Box>
            </Box>

            <Fade in={overlayVisible} timeout={TRANSITION_DURATION} unmountOnExit>
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: ICON_PANEL_WIDTH,
                        width: ICON_PANEL_OVERLAY_WIDTH,
                        height: "100%",
                        backgroundColor: "background.paper",
                        borderRight: 1,
                        borderColor: "divider",
                        boxShadow: 4,
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        pointerEvents: overlayVisible ? "auto" : "none",
                    }}
                >
                    <Box
                        sx={{
                            px: 1.5,
                            py: 1,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            minHeight: 42,
                        }}
                    >
                        <Typography
                            variant="caption"
                            fontWeight={700}
                            sx={{
                                textTransform: "uppercase",
                                color: "text.secondary",
                                letterSpacing: 0.5,
                            }}
                        >
                            Features
                        </Typography>
                    </Box>

                    <Divider />

                    <Box sx={OVERLAY_LIST_SX}>
                        {menuItems.map((item) => (
                            <OverlayMenuItem
                                key={item.id}
                                item={item}
                                isActive={activeItemId === item.id}
                                onClick={handleItemClick}
                            />
                        ))}
                    </Box>
                </Box>
            </Fade>
        </Box>
    )
}
