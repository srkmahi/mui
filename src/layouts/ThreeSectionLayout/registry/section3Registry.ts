import { lazy } from "react"
import type { MenuItemDefinition } from "../types"

import HistoryIcon from "@mui/icons-material/History"
import InfoIcon from "@mui/icons-material/Info"
import NotificationsIcon from "@mui/icons-material/Notifications"

const PropertiesPanel = lazy(() =>
    import("../../../features/section3Panels/PropertiesPanel").then((m) => ({ default: m.PropertiesPanel })),
)
const HistoryPanel = lazy(() =>
    import("../../../features/section3Panels/HistoryPanel").then((m) => ({ default: m.HistoryPanel })),
)
const NotificationsPanel = lazy(() =>
    import("../../../features/section3Panels/NotificationsPanel").then((m) => ({ default: m.NotificationsPanel })),
)

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
