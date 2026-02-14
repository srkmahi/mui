import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material"
import { type FC } from "react"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const PropertiesPanel: FC<PanelComponentProps> = ({ onSelectOtherSection }) => {
    const properties = [
        { key: "Name", value: "Document.pdf" },
        { key: "Type", value: "PDF Document" },
        { key: "Size", value: "2.4 MB" },
        { key: "Created", value: "2024-01-15" },
        { key: "Modified", value: "2024-06-20" },
        { key: "Author", value: "John Doe" },
    ]

    return (
        <Box>
            <Typography variant="body2" gutterBottom>
                Item Properties
            </Typography>
            <Table size="small">
                <TableBody>
                    {properties.map(({ key, value }) => (
                        <TableRow key={key}>
                            <TableCell sx={{ fontWeight: 600, border: "none", pl: 0, py: 0.5 }}>{key}</TableCell>
                            <TableCell sx={{ border: "none", py: 0.5 }}>{value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Cross-section control: open chat in section 2 */}
            <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => onSelectOtherSection?.("section2", "s2-chat")}
            >
                Open Chat in Section 2
            </Button>
        </Box>
    )
}
