import ChatIcon from "@mui/icons-material/Chat"
import InfoIcon from "@mui/icons-material/Info"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { type FC } from "react"

import { ThreeSectionLayout } from "./layouts/ThreeSectionLayout"
import { section2MenuItems } from "./layouts/ThreeSectionLayout/registry/section2Registry"
import { section3MenuItems } from "./layouts/ThreeSectionLayout/registry/section3Registry"
import type { Section1Action } from "./layouts/ThreeSectionLayout/types"

const theme = createTheme({
    palette: {
        mode: "light",
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
})

// Section 1 action buttons that can control other sections
const section1Actions: Section1Action[] = [
    {
        id: "open-chat",
        label: "Open Chat",
        icon: ChatIcon,
        targetSection: "section2",
        targetMenuItemId: "s2-chat",
    },
    {
        id: "open-properties",
        label: "Open Properties",
        icon: InfoIcon,
        targetSection: "section3",
        targetMenuItemId: "s3-properties",
    },
    {
        id: "open-notifications",
        label: "Open Notifications",
        icon: NotificationsIcon,
        targetSection: "section3",
        targetMenuItemId: "s3-notifications",
    },
]

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <ThreeSectionLayout
                section2MenuItems={section2MenuItems}
                section3MenuItems={section3MenuItems}
                section1Actions={section1Actions}
                section1Header={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h6">Workspace</Typography>
                        <Chip label="v2.0" size="small" color="primary" />
                    </Box>
                }
                section1Content={
                    <Box>
                        <Typography variant="h5" gutterBottom>
                            Welcome to the Three-Section Layout
                        </Typography>
                        <Typography paragraph>
                            This layout demonstrates a resizable three-section architecture with mini-variant drawers on
                            both sides.
                        </Typography>
                        <Typography paragraph>
                            <strong>Section 2 (Left)</strong>: Icon menu on the left, content panel on the right. Toggle
                            with the hamburger icon.
                        </Typography>
                        <Typography paragraph>
                            <strong>Section 3 (Right)</strong>: Content panel on the left, icon menu on the right.
                            Toggle with the hamburger icon.
                        </Typography>
                        <Typography paragraph>
                            <strong>Resize</strong>: Drag the gutters between sections to resize. The handles appear
                            when a drawer is expanded.
                        </Typography>
                        <Typography paragraph>
                            <strong>Cross-section control</strong>: Use the action buttons in the header to open panels
                            in other sections. Panels can also control each other — try the "Open Properties in Section
                            3" button inside the Chat panel.
                        </Typography>

                        {/* Generate enough content to test scrolling */}
                        {Array.from({ length: 20 }, (_, i) => (
                            <Typography key={i} paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris.
                            </Typography>
                        ))}
                    </Box>
                }
                section1Footer={
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Ready
                        </Typography>
                        <Button size="small" variant="contained">
                            Save
                        </Button>
                    </Box>
                }
            />
        </ThemeProvider>
    )
}

export default App
