/**
 * SECTION 2 MENU REGISTRY
 *
 * To add a new panel to Section 2:
 * 1. Create your panel component in src/features/section2Panels/
 *    - It must accept PanelComponentProps
 * 2. Import it here
 * 3. Add a new MenuItemDefinition to the array
 *
 * The component will automatically appear in the Section 2 icon menu
 * and its content area when selected.
 */

import type { MenuItemDefinition } from "../types"

// Import icons
import ChatIcon from "@mui/icons-material/Chat"
import FolderIcon from "@mui/icons-material/Folder"
import SettingsIcon from "@mui/icons-material/Settings"

// Import panel components
import { ChatPanel } from "../../../features/section2Panels/ChatPanel"
import { FilesPanel } from "../../../features/section2Panels/FilesPanel"
import { SettingsPanel } from "../../../features/section2Panels/SettingsPanel"

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
