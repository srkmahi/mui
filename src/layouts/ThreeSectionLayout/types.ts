import type { SvgIconComponent } from "@mui/icons-material"
import type { ComponentType, ReactNode } from "react"

// ─── Menu Item Registry Types ───────────────────────────────────────────────

export interface MenuItemDefinition {
    id: string
    label: string
    icon: SvgIconComponent
    component: ComponentType<PanelComponentProps>
    disabled?: boolean
    badgeCount?: number
}

export interface PanelComponentProps {
    menuItemId: string
    onSelectOtherSection?: (targetSection: "section2" | "section3", menuItemId: string) => void
    onSection1Action?: (actionId: string) => void
}

// ─── Drawer State Types ─────────────────────────────────────────────────────

export type DrawerState = "collapsed" | "expanded"

export interface DrawerConfig {
    state: DrawerState
    activeMenuItemId: string | null
    width: number
}

// ─── Layout State ───────────────────────────────────────────────────────────

export interface LayoutState {
    section2: DrawerConfig
    section3: DrawerConfig
    section1StoredWidth: number | null
    resizeRatios: {
        section2Ratio: number
        section3Ratio: number
    }
}

// ─── Layout Action Types (useReducer) ───────────────────────────────────────

export type LayoutAction =
    | { type: "TOGGLE_SECTION2" }
    | { type: "TOGGLE_SECTION3" }
    | { type: "SET_SECTION2_ACTIVE_ITEM"; payload: string | null }
    | { type: "SET_SECTION3_ACTIVE_ITEM"; payload: string | null }
    | {
          type: "SELECT_MENU_ITEM"
          payload: { section: "section2" | "section3"; menuItemId: string }
      }
    | {
          type: "RESIZE_SECTIONS"
          payload: { section2Width?: number; section3Width?: number }
      }
    | { type: "COLLAPSE_SECTION2" }
    | { type: "COLLAPSE_SECTION3" }
    | { type: "EXPAND_SECTION2"; payload?: string }
    | { type: "EXPAND_SECTION3"; payload?: string }

// ─── Resize Handle Types ────────────────────────────────────────────────────

export type ResizeHandlePosition = "left" | "right"

export interface ResizeHandleProps {
    position: ResizeHandlePosition
    onResize: (deltaX: number) => void
    onResizeStart?: () => void
    onResizeEnd?: () => void
}

// ─── Layout Context ─────────────────────────────────────────────────────────

export interface LayoutContextValue {
    state: LayoutState
    dispatch: React.Dispatch<LayoutAction>
    selectMenuItem: (section: "section2" | "section3", menuItemId: string) => void
    toggleSection: (section: "section2" | "section3") => void
    computedWidths: ComputedWidths
    section2MenuItems: MenuItemDefinition[]
    section3MenuItems: MenuItemDefinition[]
    containerWidth: number
    isResizing: boolean
    setIsResizing: (resizing: boolean) => void
}

export interface ComputedWidths {
    section1: number
    section2: number
    section3: number
    section2IconPanel: number
    section2Content: number
    section3IconPanel: number
    section3Content: number
}

// ─── Component Props ────────────────────────────────────────────────────────

export interface ThreeSectionLayoutProps {
    /** Menu items for section 2 */
    section2MenuItems: MenuItemDefinition[]
    /** Menu items for section 3 */
    section3MenuItems: MenuItemDefinition[]
    /** Section 1 content — pass any component/JSX directly */
    section1Content?: ReactNode
    /** Initial state overrides */
    initialState?: Partial<LayoutState>
}

export interface DrawerProps {
    section: "section2" | "section3"
    menuItems: MenuItemDefinition[]
}

export interface IconMenuPanelProps {
    section: "section2" | "section3"
    menuItems: MenuItemDefinition[]
    activeItemId: string | null
    isExpanded: boolean
    onToggle: () => void
    onSelectItem: (itemId: string) => void
}

export interface ContentAreaProps {
    section: "section2" | "section3"
    activeMenuItem: MenuItemDefinition | null
    isExpanded: boolean
    width: number
}

export interface ScrollableContainerProps {
    children: ReactNode
    maxHeight?: string | number
}
