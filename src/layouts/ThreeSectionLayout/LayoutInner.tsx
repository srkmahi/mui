import Box from "@mui/material/Box"
import { type FC, type ReactNode } from "react"
import { ResizeHandle } from "./components/ResizeHandle"
import { Section1Card } from "./components/Section1/Section1Card"
import { Section2Drawer } from "./components/Section2/Section2Drawer"
import { Section3Drawer } from "./components/Section3/Section3Drawer"
import { useLayoutContext } from "./context/useLayoutContext"
import type { MenuItemDefinition, Section1Action } from "./types"

interface LayoutInnerProps {
    section1Header?: ReactNode
    section1Content?: ReactNode
    section1Footer?: ReactNode
    section1Actions?: Section1Action[]
    section2MenuItems: MenuItemDefinition[]
    section3MenuItems: MenuItemDefinition[]
}

export const LayoutInner: FC<LayoutInnerProps> = ({
    section1Header,
    section1Content,
    section1Footer,
    section1Actions,
    section2MenuItems,
    section3MenuItems,
}) => {
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
            {/* Section 2: Left Drawer (Icon Panel LEFT, Content RIGHT) */}
            <Section2Drawer section="section2" menuItems={section2MenuItems} />

            {/* Resize Handle between Section 2 and Section 1 */}
            <ResizeHandle position="left" visible={s2Expanded} />

            {/* Section 1: Main Card */}
            <Section1Card
                header={section1Header}
                content={section1Content}
                footer={section1Footer}
                actions={section1Actions}
            />

            {/* Resize Handle between Section 1 and Section 3 */}
            <ResizeHandle position="right" visible={s3Expanded} />

            {/* Section 3: Right Drawer (Content LEFT, Icon Panel RIGHT) */}
            <Section3Drawer section="section3" menuItems={section3MenuItems} />
        </Box>
    )
}
