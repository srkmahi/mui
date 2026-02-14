import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { type FC } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const FilesPanel: FC<PanelComponentProps> = () => {
    const files = [
        "index.tsx",
        "App.tsx",
        "types.ts",
        "constants.ts",
        "utils.ts",
        "styles.css",
        "package.json",
        "tsconfig.json",
        "README.md",
    ]

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Project Files
            </Typography>
            <List dense>
                {files.map((file) => (
                    <ListItemButton key={file}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                            <InsertDriveFileIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={file} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}
