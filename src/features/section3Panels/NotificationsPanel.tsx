import { Avatar, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { type FC } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const NotificationsPanel: FC<PanelComponentProps> = () => {
    const notifications = [
        {
            title: "New comment on your file",
            time: "2 min ago",
            avatar: "A",
            color: "#1976d2",
        },
        {
            title: "Build succeeded",
            time: "10 min ago",
            avatar: "B",
            color: "#2e7d32",
        },
        {
            title: "Review requested",
            time: "1 hour ago",
            avatar: "C",
            color: "#ed6c02",
        },
        {
            title: "Deployment complete",
            time: "2 hours ago",
            avatar: "D",
            color: "#9c27b0",
        },
        {
            title: "New team member joined",
            time: "3 hours ago",
            avatar: "E",
            color: "#d32f2f",
        },
    ]

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Notifications
            </Typography>
            <List dense>
                {notifications.map((notif, index) => (
                    <ListItemButton key={index}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28,
                                    fontSize: 14,
                                    bgcolor: notif.color,
                                }}
                            >
                                {notif.avatar}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary={notif.title}
                            secondary={notif.time}
                            primaryTypographyProps={{ variant: "body2" }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}
