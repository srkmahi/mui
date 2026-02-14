import { lazy } from "react"
import type { MenuItemDefinition } from "../types"

import ChatIcon from "@mui/icons-material/Chat"
import FolderIcon from "@mui/icons-material/Folder"
import SettingsIcon from "@mui/icons-material/Settings"

const ChatPanel = lazy(() =>
    import("../../../features/section2Panels/ChatPanel").then((m) => ({ default: m.ChatPanel })),
)
const FilesPanel = lazy(() =>
    import("../../../features/section2Panels/FilesPanel").then((m) => ({ default: m.FilesPanel })),
)
const SettingsPanel = lazy(() =>
    import("../../../features/section2Panels/SettingsPanel").then((m) => ({ default: m.SettingsPanel })),
)

export const section2MenuItems: MenuItemDefinition[] = [
    {
        id: "s2-chat",
        label: "Chat",
        icon: ChatIcon,
        component: ChatPanel,
        badgeCount: 3,
    },
    {
        id: "s2-files",
        label: "Files",
        icon: FolderIcon,
        component: FilesPanel,
    },
    {
        id: "s2-settings",
        label: "Settings",
        icon: SettingsIcon,
        component: SettingsPanel,
    },
]
