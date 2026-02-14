import { Box } from "@mui/material"
import { type FC } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { DrawerProps } from "../../types"
import { Section2ContentArea } from "./Section2ContentArea"
import { Section2IconMenu } from "./Section2IconMenu"

export const Section2Drawer: FC<DrawerProps> = ({ menuItems }) => {
    const { state, computedWidths, selectMenuItem, toggleSection, isResizing } = useLayoutContext()

    const { section2 } = state
    const isExpanded = section2.state === "expanded"

    const activeMenuItem = menuItems.find((item) => item.id === section2.activeMenuItemId) ?? null

    const handleToggle = () => {
        if (isExpanded) {
            toggleSection("section2")
        } else {
            // If collapsing but no active item, select first item
            const firstItem = menuItems[0]
            if (firstItem) {
                selectMenuItem("section2", firstItem.id)
            } else {
                toggleSection("section2")
            }
        }
    }

    const handleSelectItem = (itemId: string) => {
        selectMenuItem("section2", itemId)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                flexShrink: 0,
                width: computedWidths.section2,
                transition: isResizing ? "none" : `width ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`,
                backgroundColor: "background.paper",
            }}
        >
            {/* Section 2: Icon Menu on LEFT, Content on RIGHT */}
            <Section2IconMenu
                section="section2"
                menuItems={menuItems}
                activeItemId={section2.activeMenuItemId}
                isExpanded={isExpanded}
                onToggle={handleToggle}
                onSelectItem={handleSelectItem}
            />
            <Section2ContentArea
                section="section2"
                activeMenuItem={activeMenuItem}
                isExpanded={isExpanded}
                width={computedWidths.section2Content}
            />
        </Box>
    )
}
