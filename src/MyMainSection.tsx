import ChatIcon from "@mui/icons-material/Chat"
import InfoIcon from "@mui/icons-material/Info"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { Box, Button, Card, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import { type FC } from "react"

import { useLayoutContext } from "./layouts/ThreeSectionLayout"
import { SCROLLBAR_STYLES } from "./layouts/ThreeSectionLayout/constants"

const MyMainSection: FC = () => {
    const { selectMenuItem } = useLayoutContext()

    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Custom header */}
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
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6">Workspace</Typography>
                    <Chip label="v2.0" size="small" color="primary" />
                </Box>

                <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Tooltip title="Open Chat">
                        <IconButton size="small" onClick={() => selectMenuItem("section2", "s2-chat")}>
                            <ChatIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open Properties">
                        <IconButton size="small" onClick={() => selectMenuItem("section3", "s3-properties")}>
                            <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open Notifications">
                        <IconButton size="small" onClick={() => selectMenuItem("section3", "s3-notifications")}>
                            <NotificationsIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Custom scrollable content */}
            <Box sx={{ flex: 1, ...SCROLLBAR_STYLES }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Welcome to the Three-Section Layout
                    </Typography>
                    <Typography paragraph>
                        This is a fully custom Section 1 component. The developer has complete control over header,
                        content, footer, and any internal structure.
                    </Typography>
                    <Typography paragraph>
                        Use <code>useLayoutContext()</code> to control drawers from anywhere inside the layout.
                    </Typography>

                    {Array.from({ length: 20 }, (_, i) => (
                        <Typography key={i} paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* Custom footer */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    py: 1,
                    borderTop: 1,
                    borderColor: "divider",
                    flexShrink: 0,
                }}
            >
                <Typography variant="caption" color="text.secondary">
                    Ready
                </Typography>
                <Button size="small" variant="contained">
                    Save
                </Button>
            </Box>
        </Card>
    )
}

export default MyMainSection
