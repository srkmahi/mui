import Box from "@mui/material/Box"
import { type FC, type ReactNode } from "react"
import { ResizeHandle } from "./components/ResizeHandle"
import { Section1Card } from "./components/Section1/Section1Card"
import { Section2Drawer } from "./components/Section2/Section2Drawer"
import { Section3Drawer } from "./components/Section3/Section3Drawer"
import { useLayoutContext } from "./context/useLayoutContext"
import type { MenuItemDefinition } from "./types"

interface LayoutInnerProps {
    section1Content?: ReactNode
    section2MenuItems: MenuItemDefinition[]
    section3MenuItems: MenuItemDefinition[]
}

export const LayoutInner: FC<LayoutInnerProps> = ({ section1Content, section2MenuItems, section3MenuItems }) => {
    const { state } = useLayoutContext()

    const s2Expanded = state.section2.state === "expanded"
    const s3Expanded = state.section3.state === "expanded"

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <Section1Card>{section1Content}</Section1Card>

            <ResizeHandle position="left" visible={s2Expanded} />

            <Section2Drawer section="section2" menuItems={section2MenuItems} />

            <ResizeHandle position="right" visible={s3Expanded} />

            <Section3Drawer section="section3" menuItems={section3MenuItems} />
        </Box>
    )
}
