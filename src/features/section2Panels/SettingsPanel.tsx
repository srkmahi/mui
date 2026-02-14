import { Box, Divider, FormControlLabel, Slider, Switch, Typography } from "@mui/material"
import { type FC, useState } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const SettingsPanel: FC<PanelComponentProps> = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [fontSize, setFontSize] = useState(14)

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Settings
            </Typography>
            <FormControlLabel
                control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
                label="Dark Mode"
            />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" gutterBottom>
                Font Size: {fontSize}px
            </Typography>
            <Slider value={fontSize} onChange={(_, val) => setFontSize(val as number)} min={10} max={24} step={1} />
        </Box>
    )
}
