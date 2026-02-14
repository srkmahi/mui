/**
 * SECTION 3 MENU REGISTRY
 *
 * To add a new panel to Section 3:
 * 1. Create your panel component in src/features/section3Panels/
 *    - It must accept PanelComponentProps
 * 2. Import it here
 * 3. Add a new MenuItemDefinition to the array
 */

import type { MenuItemDefinition } from "../types"

// Import icons
import HistoryIcon from "@mui/icons-material/History"
import InfoIcon from "@mui/icons-material/Info"
import NotificationsIcon from "@mui/icons-material/Notifications"

// Import panel components
import { HistoryPanel } from "../../../features/section3Panels/HistoryPanel"
import { NotificationsPanel } from "../../../features/section3Panels/NotificationsPanel"
import { PropertiesPanel } from "../../../features/section3Panels/PropertiesPanel"

export const section3MenuItems: MenuItemDefinition[] = [
    {
        id: "s3-properties",
        label: "Properties",
        icon: InfoIcon,
        component: PropertiesPanel,
    },
    {
        id: "s3-history",
        label: "History",
        icon: HistoryIcon,
        component: HistoryPanel,
    },
    {
        id: "s3-notifications",
        label: "Notifications",
        icon: NotificationsIcon,
        component: NotificationsPanel,
        badgeCount: 5,
    },
]
