import Box from "@mui/material/Box"
import { type FC } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { DrawerProps } from "../../types"
import { Section3ContentArea } from "./Section3ContentArea"
import { Section3IconMenu } from "./Section3IconMenu"

export const Section3Drawer: FC<DrawerProps> = ({ menuItems }) => {
    const { state, computedWidths, selectMenuItem, toggleSection, isResizing } = useLayoutContext()

    const { section3 } = state
    const isExpanded = section3.state === "expanded"

    const activeMenuItem = menuItems.find((item) => item.id === section3.activeMenuItemId) ?? null

    const handleToggle = () => {
        if (isExpanded) {
            toggleSection("section3")
        } else {
            const firstItem = menuItems[0]
            if (firstItem) {
                selectMenuItem("section3", firstItem.id)
            } else {
                toggleSection("section3")
            }
        }
    }

    const handleSelectItem = (itemId: string) => {
        selectMenuItem("section3", itemId)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                flexShrink: 0,
                width: computedWidths.section3,
                transition: isResizing ? "none" : `width ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`,
                backgroundColor: "background.paper",
            }}
        >
            {/* Section 3: Content on LEFT, Icon Menu on RIGHT (RTL drawer) */}
            <Section3ContentArea
                section="section3"
                activeMenuItem={activeMenuItem}
                isExpanded={isExpanded}
                width={computedWidths.section3Content}
            />
            <Section3IconMenu
                section="section3"
                menuItems={menuItems}
                activeItemId={section3.activeMenuItemId}
                isExpanded={isExpanded}
                onToggle={handleToggle}
                onSelectItem={handleSelectItem}
            />
        </Box>
    )
}
