import { Box, Button, List, ListItemButton, ListItemText, Typography } from "@mui/material"
import { type FC } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const ChatPanel: FC<PanelComponentProps> = ({ onSelectOtherSection }) => {
    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Chat messages will appear here.
            </Typography>

            <List dense>
                {Array.from({ length: 15 }, (_, i) => (
                    <ListItemButton key={i}>
                        <ListItemText
                            primary={`Message ${i + 1}`}
                            secondary={`This is a sample chat message #${i + 1}`}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => onSelectOtherSection?.("section3", "s3-properties")}
            >
                Open Properties in Section 3
            </Button>
        </Box>
    )
}
