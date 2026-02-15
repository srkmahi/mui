# Three-Section Resizable Layout

A highly manageable, responsive, 3-section resizable layout system built with React, TypeScript, and Material UI.

```
┌──────────────────────┬───┬──────────────────-┬───┬──────────────────┐
│                      │ ║ │    Section 2      │ ║ │    Section 3     │
│                      │ ║ │  ┌────┬────────┐  │ ║ │  ┌────────┬──-─┐ │
│                      │ ║ │  │Icon│Content │  │ ║ │  │Content │Icon│ │
│     Section 1        │ ║ │  │Menu│  Area  │  │ ║ │  │  Area  │Menu│ │
│   (Your Component)   │ ║ │  │    │        │  │ ║ │  │        │    │ │
│                      │ ║ │  │ L  │   R    │  │ ║ │  │   L    │ R  │ │
│                      │ ║ │  │    │        │  │ ║ │  │        │    │ │
│                      │ ║ │  └────┴────────┘  │ ║ │  └────────┴──-─┘ │
└──────────────────────┴───┴────────────────-──┴───┴──────────────────┘
                         ↑ Resize Handle         ↑ Resize Handle
```

---

## Table of Contents

- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [Section 1 — Your Main Component](#section-1--your-main-component)
- [Section 2 & 3 — Adding Panels](#section-2--3--adding-panels)
- [Cross-Section Communication](#cross-section-communication)
- [Configuration Constants](#configuration-constants)
- [API Reference](#api-reference)
- [Do's and Don'ts](#dos-and-donts)

---

## Quick Start

```tsx
import { ThreeSectionLayout } from "./layouts/ThreeSectionLayout"
import { section2MenuItems } from "./layouts/ThreeSectionLayout/registry/section2Registry"
import { section3MenuItems } from "./layouts/ThreeSectionLayout/registry/section3Registry"

function App() {
    return (
        <ThreeSectionLayout
            section2MenuItems={section2MenuItems}
            section3MenuItems={section3MenuItems}
            section1Content={<YourMainComponent />}
        />
    )
}
```

That's it. The layout handles all resizing, drawer toggling, and width calculations automatically.

---

## File Structure

```
src/
├── layouts/ThreeSectionLayout/
│   ├── constants.ts              ← ✏️ CONFIGURE: widths, percentages, timing
│   ├── types.ts                  ← Type definitions (read-only reference)
│   ├── index.ts                  ← Public exports
│   ├── ThreeSectionLayout.tsx    ← 🔒 CORE: Do not modify
│   ├── LayoutInner.tsx           ← 🔒 CORE: Do not modify
│   ├── context/                  ← 🔒 CORE: Do not modify
│   ├── hooks/                    ← 🔒 CORE: Do not modify
│   ├── components/               ← 🔒 CORE: Do not modify
│   └── registry/
│       ├── section2Registry.ts   ← ✏️ ADD: Section 2 menu items here
│       └── section3Registry.ts   ← ✏️ ADD: Section 3 menu items here
│
├── features/
│   ├── section2Panels/           ← ✏️ ADD: Section 2 panel components here
│   │   ├── ChatPanel.tsx
│   │   ├── FilesPanel.tsx
│   │   └── SettingsPanel.tsx
│   └── section3Panels/           ← ✏️ ADD: Section 3 panel components here
│       ├── PropertiesPanel.tsx
│       ├── HistoryPanel.tsx
│       └── NotificationsPanel.tsx
│
└── App.tsx                       ← ✏️ Your app entry point
```

### Legend

| Icon | Meaning                                        |
| ---- | ---------------------------------------------- |
| ✏️   | Safe to edit — this is where you add your code |
| 🔒   | Core layout logic — do not modify              |

---

## Section 1 — Your Main Component

Section 1 accepts **any React component** as its content. You have full control over its internal structure — headers, footers, scrolling, whatever you need.

### Basic Usage

```tsx
<ThreeSectionLayout
    section1Content={<MyDashboard />}
    section2MenuItems={section2MenuItems}
    section3MenuItems={section3MenuItems}
/>
```

### With Layout Context (Control Drawers from Section 1)

Your Section 1 component can use `useLayoutContext()` to control the drawers:

```tsx
import { useLayoutContext } from "./layouts/ThreeSectionLayout"
import { SCROLLBAR_STYLES } from "./layouts/ThreeSectionLayout/constants"

function MyDashboard() {
    const { selectMenuItem, toggleSection } = useLayoutContext()

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Your header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider", flexShrink: 0 }}>
                <Typography variant="h6">Dashboard</Typography>
                <Button onClick={() => selectMenuItem("section2", "s2-chat")}>Open Chat</Button>
                <Button onClick={() => selectMenuItem("section3", "s3-properties")}>Open Properties</Button>
            </Box>

            {/* Your scrollable content — use SCROLLBAR_STYLES for consistent hover scrollbar */}
            <Box sx={{ flex: 1, ...SCROLLBAR_STYLES }}>
                <Box sx={{ p: 2 }}>{/* Your content here */}</Box>
            </Box>

            {/* Your footer */}
            <Box sx={{ p: 1, borderTop: 1, borderColor: "divider", flexShrink: 0 }}>
                <Typography variant="caption">Ready</Typography>
            </Box>
        </Box>
    )
}
```

> **Important:** Your Section 1 component should use `height: "100%"` as its root container to fill the available space properly.

> **Tip:** Import `SCROLLBAR_STYLES` from constants and spread it onto any scrollable container. This gives you the same hover-only thin scrollbar used throughout the layout.

---

## Section 2 & 3 — Adding Panels

Adding a new panel is a **3-step process**:

### Step 1: Create Your Panel Component

Create a new file in the appropriate folder:

- **Section 2 panels:** `src/features/section2Panels/YourPanel.tsx`
- **Section 3 panels:** `src/features/section3Panels/YourPanel.tsx`

```tsx
// src/features/section2Panels/MyNewPanel.tsx
import { type FC } from "react"
import { Box, Typography } from "@mui/material"
import type { PanelComponentProps } from "../../layouts/ThreeSectionLayout/types"

export const MyNewPanel: FC<PanelComponentProps> = ({ onSelectOtherSection }) => {
    return (
        <Box>
            <Typography>My new panel content</Typography>

            {/* Optional: Open a panel in the other section */}
            <Button onClick={() => onSelectOtherSection?.("section3", "s3-properties")}>Open Properties</Button>
        </Box>
    )
}
```

### Step 2: Register It in the Registry

Open the corresponding registry file and add your entry:

```tsx
// src/layouts/ThreeSectionLayout/registry/section2Registry.ts

import { lazy } from "react"
import type { MenuItemDefinition } from "../types"
import BuildIcon from "@mui/icons-material/Build" // ← Pick any MUI icon

// Lazy import for code-splitting
const MyNewPanel = lazy(() =>
    import("../../../features/section2Panels/MyNewPanel").then((m) => ({ default: m.MyNewPanel })),
)

export const section2MenuItems: MenuItemDefinition[] = [
    // ... existing items ...

    // ↓ Add your new item here
    {
        id: "s2-my-new-panel", // Unique ID (prefix with s2- or s3-)
        label: "My New Panel", // Tooltip text
        icon: BuildIcon, // MUI icon component
        component: MyNewPanel, // Your lazy-loaded component
        disabled: false, // Optional: disable the menu item
        badgeCount: 0, // Optional: show a badge count
    },
]
```

### Step 3: Done!

The panel will automatically appear in the icon menu. No other files need to be touched.

### Registry Entry Reference

```tsx
interface MenuItemDefinition {
    id: string // Unique identifier (required)
    label: string // Tooltip / accessibility label (required)
    icon: SvgIconComponent // MUI icon component (required)
    component: ComponentType<PanelComponentProps> // Panel component (required)
    disabled?: boolean // Grey out the icon (optional)
    badgeCount?: number // Red badge number on icon (optional)
}
```

### Panel Component Props

Every panel component receives these props automatically:

```tsx
interface PanelComponentProps {
    /** The menu item ID that triggered this panel */
    menuItemId: string

    /** Open a panel in the other section */
    onSelectOtherSection?: (targetSection: "section2" | "section3", menuItemId: string) => void

    /** Trigger a custom action in Section 1 */
    onSection1Action?: (actionId: string) => void
}
```

---

## Cross-Section Communication

Panels and components can control each other across all three sections.

### From Section 1 → Open a Drawer Panel

```tsx
import { useLayoutContext } from "./layouts/ThreeSectionLayout"

function MyMainComponent() {
    const { selectMenuItem } = useLayoutContext()

    return <Button onClick={() => selectMenuItem("section2", "s2-chat")}>Open Chat Panel</Button>
}
```

### From Section 2 Panel → Open a Section 3 Panel

```tsx
// Inside any Section 2 panel component
export const ChatPanel: FC<PanelComponentProps> = ({ onSelectOtherSection }) => {
    return <Button onClick={() => onSelectOtherSection?.("section3", "s3-properties")}>Open Properties</Button>
}
```

### From Section 3 Panel → Open a Section 2 Panel

```tsx
// Inside any Section 3 panel component
export const PropertiesPanel: FC<PanelComponentProps> = ({ onSelectOtherSection }) => {
    return <Button onClick={() => onSelectOtherSection?.("section2", "s2-files")}>Open Files</Button>
}
```

### Toggle a Drawer (Collapse/Expand)

```tsx
const { toggleSection } = useLayoutContext()

// Toggle section 2 open/closed
toggleSection("section2")

// Toggle section 3 open/closed
toggleSection("section3")
```

### Programmatic Collapse/Expand

```tsx
const { dispatch } = useLayoutContext()

// Force collapse
dispatch({ type: "COLLAPSE_SECTION2" })
dispatch({ type: "COLLAPSE_SECTION3" })

// Force expand (optionally with a specific panel)
dispatch({ type: "EXPAND_SECTION2", payload: "s2-chat" })
dispatch({ type: "EXPAND_SECTION3", payload: "s3-properties" })
```

### Read Current State

```tsx
const { state } = useLayoutContext()

// Check if a section is expanded
const isChatOpen = state.section2.state === "expanded" && state.section2.activeMenuItemId === "s2-chat"

// Get current active panel ID
const activeS3Panel = state.section3.activeMenuItemId // e.g., "s3-properties" or null
```

### Communication Flow Diagram

```
┌─────────────┐     selectMenuItem()      ┌─────────────┐
│  Section 1  │ ─────────────────────────→ │  Section 2  │
│  (Your App) │ ─────────────────────────→ │  Section 3  │
└─────────────┘     useLayoutContext()     └─────────────┘

┌─────────────┐   onSelectOtherSection()   ┌─────────────┐
│  Section 2  │ ─────────────────────────→ │  Section 3  │
│   Panel     │ ←───────────────────────── │   Panel     │
└─────────────┘   onSelectOtherSection()   └─────────────┘
```

---

## Configuration Constants

All configurable values live in **one file**: `src/layouts/ThreeSectionLayout/constants.ts`

### Layout Dimensions

| Constant              | Default | Description                                                 |
| --------------------- | ------- | ----------------------------------------------------------- |
| `ICON_PANEL_WIDTH`    | `48`    | Width (px) of the collapsed icon menu strip                 |
| `MIN_CONTENT_WIDTH`   | `300`   | Minimum width (px) of a drawer's content area when expanded |
| `MIN_SECTION1_WIDTH`  | `400`   | Minimum width (px) Section 1 can shrink to                  |
| `RESIZE_HANDLE_WIDTH` | `6`     | Width (px) of the draggable resize gutter                   |
| `DIVIDER_WIDTH`       | `1`     | Width (px) of the thin line between sections when collapsed |

### Default Drawer Sizes

| Constant                         | Default | Description                                                |
| -------------------------------- | ------- | ---------------------------------------------------------- |
| `DEFAULT_SECTION2_WIDTH_PERCENT` | `20`    | Default width of Section 2 as % of container width         |
| `DEFAULT_SECTION3_WIDTH_PERCENT` | `20`    | Default width of Section 3 as % of container width         |
| `MAX_DRAWER_WIDTH_PERCENT`       | `40`    | Maximum width a single drawer can occupy as % of container |

**How percentage defaults resolve across screen sizes:**

| Screen Width | 20% Value | Actual Drawer Width | Notes                     |
| ------------ | --------- | ------------------- | ------------------------- |
| 1280px       | 256px     | 348px               | Clamped to min (300 + 48) |
| 1440px       | 288px     | 348px               | Clamped to min            |
| 1600px       | 320px     | 368px               | Percentage used           |
| 1920px       | 384px     | 432px               | Percentage used           |
| 2560px       | 512px     | 560px               | Percentage used           |

### Animation

| Constant              | Default                        | Description                                  |
| --------------------- | ------------------------------ | -------------------------------------------- |
| `TRANSITION_DURATION` | `10`                           | Duration (ms) of drawer open/close animation |
| `TRANSITION_EASING`   | `cubic-bezier(0.4, 0, 0.2, 1)` | Easing curve for transitions                 |

### Scrollbar Styling

| Constant           | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `SCROLLBAR_STYLES` | Spread onto any `Box` to get hover-only thin scrollbar behavior |

**Usage in your components:**

```tsx
import { SCROLLBAR_STYLES } from "./layouts/ThreeSectionLayout/constants"
;<Box sx={{ flex: 1, ...SCROLLBAR_STYLES }}>
    {/* Scrollbar hidden by default, thin light scrollbar appears on hover */}
</Box>
```

---

## API Reference

### `<ThreeSectionLayout />` Props

```tsx
interface ThreeSectionLayoutProps {
    section1Content?: ReactNode // Your Section 1 component
    section2MenuItems: MenuItemDefinition[] // From section2Registry
    section3MenuItems: MenuItemDefinition[] // From section3Registry
    initialState?: Partial<LayoutState> // Override initial state (advanced)
}
```

### `useLayoutContext()` Hook

Available inside any component rendered within `<ThreeSectionLayout />`.

```tsx
const {
    state, // Current layout state (drawer configs)
    dispatch, // Raw dispatch for advanced actions
    selectMenuItem, // (section, menuItemId) => void
    toggleSection, // (section) => void
    computedWidths, // Current pixel widths of all sections
    containerWidth, // Container width in pixels
    isResizing, // Whether user is currently dragging a resize handle
} = useLayoutContext()
```

### Dispatch Actions

| Action              | Payload                   | Description                                      |
| ------------------- | ------------------------- | ------------------------------------------------ |
| `TOGGLE_SECTION2`   | —                         | Toggle Section 2 open/closed                     |
| `TOGGLE_SECTION3`   | —                         | Toggle Section 3 open/closed                     |
| `COLLAPSE_SECTION2` | —                         | Force collapse Section 2                         |
| `COLLAPSE_SECTION3` | —                         | Force collapse Section 3                         |
| `EXPAND_SECTION2`   | `string?`                 | Force expand Section 2 (optional: panel ID)      |
| `EXPAND_SECTION3`   | `string?`                 | Force expand Section 3 (optional: panel ID)      |
| `SELECT_MENU_ITEM`  | `{ section, menuItemId }` | Open specific panel (or close if already active) |

---

## Do's and Don'ts

### ✅ Do

```
✅ Add panel components in src/features/section2Panels/ or section3Panels/
✅ Register new panels in the registry files
✅ Use useLayoutContext() to communicate between sections
✅ Use SCROLLBAR_STYLES for consistent scrollbar behavior
✅ Adjust constants.ts for layout sizing preferences
✅ Use height: "100%" on your Section 1 root container
✅ Use PanelComponentProps type for your panel components
✅ Prefix panel IDs with s2- or s3- to avoid collisions
```

### ❌ Don't

```
❌ Modify files in context/, hooks/, or components/ folders
❌ Modify ThreeSectionLayout.tsx or LayoutInner.tsx
❌ Import internal components directly (use the public index.ts exports)
❌ Use fixed pixel heights inside Section 1 (use flex + 100%)
❌ Forget to lazy-load panel components in the registry
❌ Use duplicate menu item IDs across sections
```

---

## Common Recipes

### Open a specific panel on app load

```tsx
<ThreeSectionLayout
    section1Content={<MyApp />}
    section2MenuItems={section2MenuItems}
    section3MenuItems={section3MenuItems}
    initialState={{
        section2: {
            state: "expanded",
            activeMenuItemId: "s2-chat",
            width: 400, // optional: override default percentage
        },
    }}
/>
```

### Conditionally show a badge count

Update the registry dynamically or use state:

```tsx
const menuItems = useMemo(() =>
  section2MenuItems.map(item =>
    item.id === "s2-chat"
      ? { ...item, badgeCount: unreadCount }
      : item
  ),
  [unreadCount]
);

<ThreeSectionLayout section2MenuItems={menuItems} ... />
```

### Panel with internal scrolling

```tsx
import { SCROLLBAR_STYLES } from "../../layouts/ThreeSectionLayout/constants"

export const MyPanel: FC<PanelComponentProps> = () => {
    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Panel Header
            </Typography>
            <Box sx={{ flex: 1, ...SCROLLBAR_STYLES }}>{/* Long content here */}</Box>
        </Box>
    )
}
```

### Check which panel is currently active

```tsx
const { state } = useLayoutContext()

if (state.section2.activeMenuItemId === "s2-chat") {
    // Chat panel is open
}

if (state.section3.state === "collapsed") {
    // Section 3 is fully collapsed
}
```
