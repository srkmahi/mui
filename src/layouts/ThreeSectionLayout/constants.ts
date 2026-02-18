/** Width of the icon panel in collapsed/mini state */
export const ICON_PANEL_WIDTH = 48

/** Width of the label overlay that appears on rail hover */
export const ICON_PANEL_OVERLAY_WIDTH = 160

/** Minimum width of the content area when a drawer is expanded */
export const MIN_CONTENT_WIDTH = 300

/** Minimum width for section 1 */
export const MIN_SECTION1_WIDTH = 400

/** Width of the resize handle gutter */
export const RESIZE_HANDLE_WIDTH = 6

/** Width of the thin divider between sections when collapsed */
export const DIVIDER_WIDTH = 6

/** Transition duration in ms */
export const TRANSITION_DURATION = 15

/** Transition easing */
export const TRANSITION_EASING = "cubic-bezier(0.4, 0, 0.2, 1)"

/**
 * Section 2 (middle drawer):
 */
export const DEFAULT_SECTION2_WIDTH_PERCENT = 20

/**
 * Section 3 (right drawer):
 */
export const DEFAULT_SECTION3_WIDTH_PERCENT = 20

/**
 * Maximum percentage a single drawer can occupy.
 * Prevents a drawer from taking over the entire screen.
 */
export const MAX_DRAWER_WIDTH_PERCENT = 40

/** Scrollbar styles for hover-only thin scrollbar */
export const SCROLLBAR_STYLES = {
    overflowY: "hidden",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
    "&::-webkit-scrollbar": {
        width: "6px",
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "transparent",
        borderRadius: "3px",
        transition: "background 0.2s ease",
    },
    "&:hover": {
        overflowY: "auto",
        scrollbarColor: "rgba(0,0,0,0.2) transparent",
    },
    "&:hover::-webkit-scrollbar-thumb": {
        background: "rgba(0,0,0,0.2)",
    },
} as const
