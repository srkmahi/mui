import { Box, Typography } from "@mui/material"
import { type FC } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

// Note: If @mui/lab Timeline is not available, use a simple list instead.
// Here's a simple list fallback:

import { Chip, List, ListItem, ListItemText } from "@mui/material"

export const HistoryPanel: FC<PanelComponentProps> = () => {
    const history = [
        { action: "Created", time: "2 hours ago", user: "Alice" },
        { action: "Modified", time: "1 hour ago", user: "Bob" },
        { action: "Reviewed", time: "45 min ago", user: "Charlie" },
        { action: "Approved", time: "30 min ago", user: "Diana" },
        { action: "Published", time: "15 min ago", user: "Alice" },
        { action: "Updated", time: "5 min ago", user: "Bob" },
    ]

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Activity History
            </Typography>
            <List dense>
                {history.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                        <ListItemText
                            primary={
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Chip label={item.action} size="small" color="primary" variant="outlined" />
                                    <Typography variant="caption">{item.user}</Typography>
                                </Box>
                            }
                            secondary={item.time}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
