import type { SvgIconComponent } from "@mui/icons-material"
import type { ComponentType, ReactNode } from "react"

// ─── Menu Item Registry Types ───────────────────────────────────────────────

export interface MenuItemDefinition {
    /** Unique identifier for this menu item */
    id: string
    /** Display label for tooltip / accessibility */
    label: string
    /** MUI Icon component to render in the icon panel */
    icon: SvgIconComponent
    /** The panel component to render when this menu item is active */
    component: ComponentType<PanelComponentProps>
    /** Optional: disable this menu item */
    disabled?: boolean
    /** Optional: badge count to show on the icon */
    badgeCount?: number
}

export interface PanelComponentProps {
    /** The menu item id that triggered this panel */
    menuItemId: string
    /** Callback to select a menu item in the other section */
    onSelectOtherSection?: (targetSection: "section2" | "section3", menuItemId: string) => void
    /** Callback to select a menu item in section 1's control */
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
    /** Stored width for section1 - calculated dynamically based on remaining space */
    section1StoredWidth: number | null
    /** Width ratios for resize calculations */
    resizeRatios: {
        /** Ratio of section2 content width relative to available space */
        section2Ratio: number
        /** Ratio of section3 content width relative to available space */
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
    /** Select a menu item in a specific section (cross-section control) */
    selectMenuItem: (section: "section2" | "section3", menuItemId: string) => void
    /** Toggle a section's drawer */
    toggleSection: (section: "section2" | "section3") => void
    /** Get the computed width for each section */
    computedWidths: ComputedWidths
    /** Section 2 menu registry */
    section2MenuItems: MenuItemDefinition[]
    /** Section 3 menu registry */
    section3MenuItems: MenuItemDefinition[]
    /** Container ref for width calculations */
    containerWidth: number
    /** Whether a resize is in progress */
    isResizing: boolean
    /** Set resize state */
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
    /** Section 1 header content */
    section1Header?: ReactNode
    /** Section 1 main content */
    section1Content?: ReactNode
    /** Section 1 footer content */
    section1Footer?: ReactNode
    /** Section 1 action buttons that can control other sections */
    section1Actions?: Section1Action[]
    /** Initial state overrides */
    initialState?: Partial<LayoutState>
}

export interface Section1Action {
    id: string
    label: string
    icon: SvgIconComponent
    /** Which section this action targets */
    targetSection: "section2" | "section3"
    /** Which menu item to activate */
    targetMenuItemId: string
}

export interface Section1CardProps {
    header?: ReactNode
    content?: ReactNode
    footer?: ReactNode
    actions?: Section1Action[]
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
