import { useCallback, useMemo, useReducer, useState, type FC, type PropsWithChildren } from "react"
import {
    DEFAULT_EXPANDED_WIDTH,
    ICON_PANEL_WIDTH,
    MIN_CONTENT_WIDTH,
    MIN_SECTION1_WIDTH,
    RESIZE_HANDLE_WIDTH,
} from "../constants"
import type { ComputedWidths, LayoutAction, LayoutContextValue, LayoutState, MenuItemDefinition } from "../types"
import { LayoutContext } from "./LayoutContextDef"

// ─── Initial State ──────────────────────────────────────────────────────────

const createInitialState = (overrides?: Partial<LayoutState>): LayoutState => ({
    section2: {
        state: "collapsed",
        activeMenuItemId: null,
        width: DEFAULT_EXPANDED_WIDTH,
    },
    section3: {
        state: "collapsed",
        activeMenuItemId: null,
        width: DEFAULT_EXPANDED_WIDTH,
    },
    section1StoredWidth: null,
    resizeRatios: {
        section2Ratio: 0.5,
        section3Ratio: 0.5,
    },
    ...overrides,
})

// ─── Reducer ────────────────────────────────────────────────────────────────

function layoutReducer(state: LayoutState, action: LayoutAction): LayoutState {
    switch (action.type) {
        case "TOGGLE_SECTION2": {
            const newDrawerState = state.section2.state === "collapsed" ? "expanded" : "collapsed"
            return {
                ...state,
                section2: {
                    ...state.section2,
                    state: newDrawerState,
                    activeMenuItemId: newDrawerState === "collapsed" ? null : state.section2.activeMenuItemId,
                },
            }
        }

        case "TOGGLE_SECTION3": {
            const newDrawerState = state.section3.state === "collapsed" ? "expanded" : "collapsed"
            return {
                ...state,
                section3: {
                    ...state.section3,
                    state: newDrawerState,
                    activeMenuItemId: newDrawerState === "collapsed" ? null : state.section3.activeMenuItemId,
                },
            }
        }

        case "SET_SECTION2_ACTIVE_ITEM":
            return {
                ...state,
                section2: {
                    ...state.section2,
                    activeMenuItemId: action.payload,
                    state: action.payload ? "expanded" : "collapsed",
                },
            }

        case "SET_SECTION3_ACTIVE_ITEM":
            return {
                ...state,
                section3: {
                    ...state.section3,
                    activeMenuItemId: action.payload,
                    state: action.payload ? "expanded" : "collapsed",
                },
            }

        case "SELECT_MENU_ITEM": {
            const { section, menuItemId } = action.payload
            const currentSection = state[section]

            if (currentSection.activeMenuItemId === menuItemId) {
                return {
                    ...state,
                    [section]: {
                        ...currentSection,
                        state: "collapsed",
                        activeMenuItemId: null,
                    },
                }
            }

            return {
                ...state,
                [section]: {
                    ...currentSection,
                    state: "expanded",
                    activeMenuItemId: menuItemId,
                },
            }
        }

        case "RESIZE_SECTIONS": {
            const newState = { ...state }
            if (action.payload.section2Width !== undefined) {
                newState.section2 = {
                    ...state.section2,
                    width: Math.max(ICON_PANEL_WIDTH + MIN_CONTENT_WIDTH, action.payload.section2Width),
                }
            }
            if (action.payload.section3Width !== undefined) {
                newState.section3 = {
                    ...state.section3,
                    width: Math.max(ICON_PANEL_WIDTH + MIN_CONTENT_WIDTH, action.payload.section3Width),
                }
            }
            return newState
        }

        case "COLLAPSE_SECTION2":
            return {
                ...state,
                section2: {
                    ...state.section2,
                    state: "collapsed",
                    activeMenuItemId: null,
                },
            }

        case "COLLAPSE_SECTION3":
            return {
                ...state,
                section3: {
                    ...state.section3,
                    state: "collapsed",
                    activeMenuItemId: null,
                },
            }

        case "EXPAND_SECTION2":
            return {
                ...state,
                section2: {
                    ...state.section2,
                    state: "expanded",
                    activeMenuItemId: action.payload ?? state.section2.activeMenuItemId,
                },
            }

        case "EXPAND_SECTION3":
            return {
                ...state,
                section3: {
                    ...state.section3,
                    state: "expanded",
                    activeMenuItemId: action.payload ?? state.section3.activeMenuItemId,
                },
            }

        default:
            return state
    }
}

// ─── Compute Widths ─────────────────────────────────────────────────────────

function computeWidths(state: LayoutState, containerWidth: number): ComputedWidths {
    const s2Expanded = state.section2.state === "expanded"
    const s3Expanded = state.section3.state === "expanded"

    const s2IconPanel = ICON_PANEL_WIDTH
    const s3IconPanel = ICON_PANEL_WIDTH
    const totalIconPanels = s2IconPanel + s3IconPanel

    let totalHandleWidth = 0
    if (s2Expanded) totalHandleWidth += RESIZE_HANDLE_WIDTH
    if (s3Expanded) totalHandleWidth += RESIZE_HANDLE_WIDTH

    const availableForContent = containerWidth - totalIconPanels - totalHandleWidth

    let s2ContentWidth = 0
    let s3ContentWidth = 0
    let section1Width: number

    if (!s2Expanded && !s3Expanded) {
        section1Width = availableForContent
    } else if (s2Expanded && !s3Expanded) {
        s2ContentWidth = Math.max(MIN_CONTENT_WIDTH, state.section2.width - ICON_PANEL_WIDTH)
        section1Width = availableForContent - s2ContentWidth
        if (section1Width < MIN_SECTION1_WIDTH) {
            section1Width = MIN_SECTION1_WIDTH
            s2ContentWidth = availableForContent - section1Width
        }
    } else if (!s2Expanded && s3Expanded) {
        s3ContentWidth = Math.max(MIN_CONTENT_WIDTH, state.section3.width - ICON_PANEL_WIDTH)
        section1Width = availableForContent - s3ContentWidth
        if (section1Width < MIN_SECTION1_WIDTH) {
            section1Width = MIN_SECTION1_WIDTH
            s3ContentWidth = availableForContent - section1Width
        }
    } else {
        s2ContentWidth = Math.max(MIN_CONTENT_WIDTH, state.section2.width - ICON_PANEL_WIDTH)
        s3ContentWidth = Math.max(MIN_CONTENT_WIDTH, state.section3.width - ICON_PANEL_WIDTH)
        section1Width = availableForContent - s2ContentWidth - s3ContentWidth

        if (section1Width < MIN_SECTION1_WIDTH) {
            const excess = MIN_SECTION1_WIDTH - section1Width
            const totalDrawer = s2ContentWidth + s3ContentWidth
            if (totalDrawer > 0) {
                const s2Reduction = (s2ContentWidth / totalDrawer) * excess
                const s3Reduction = (s3ContentWidth / totalDrawer) * excess
                s2ContentWidth = Math.max(MIN_CONTENT_WIDTH, s2ContentWidth - s2Reduction)
                s3ContentWidth = Math.max(MIN_CONTENT_WIDTH, s3ContentWidth - s3Reduction)
            }
            section1Width = availableForContent - s2ContentWidth - s3ContentWidth
        }
    }

    return {
        section1: Math.max(0, section1Width),
        section2: s2Expanded ? s2IconPanel + s2ContentWidth : s2IconPanel,
        section3: s3Expanded ? s3IconPanel + s3ContentWidth : s3IconPanel,
        section2IconPanel: s2IconPanel,
        section2Content: s2ContentWidth,
        section3IconPanel: s3IconPanel,
        section3Content: s3ContentWidth,
    }
}

// ─── Provider (ONLY component export from this file) ────────────────────────

interface LayoutProviderProps extends PropsWithChildren {
    section2MenuItems: MenuItemDefinition[]
    section3MenuItems: MenuItemDefinition[]
    initialState?: Partial<LayoutState>
    containerWidth: number
}

export const LayoutProvider: FC<LayoutProviderProps> = ({
    children,
    section2MenuItems,
    section3MenuItems,
    initialState,
    containerWidth,
}) => {
    const [state, dispatch] = useReducer(layoutReducer, initialState, (init) => createInitialState(init))
    const [isResizing, setIsResizing] = useState(false)

    const selectMenuItem = useCallback((section: "section2" | "section3", menuItemId: string) => {
        dispatch({
            type: "SELECT_MENU_ITEM",
            payload: { section, menuItemId },
        })
    }, [])

    const toggleSection = useCallback((section: "section2" | "section3") => {
        dispatch({
            type: section === "section2" ? "TOGGLE_SECTION2" : "TOGGLE_SECTION3",
        })
    }, [])

    const computedWidths = useMemo(() => computeWidths(state, containerWidth), [state, containerWidth])

    const value = useMemo<LayoutContextValue>(
        () => ({
            state,
            dispatch,
            selectMenuItem,
            toggleSection,
            computedWidths,
            section2MenuItems,
            section3MenuItems,
            containerWidth,
            isResizing,
            setIsResizing,
        }),
        [
            state,
            dispatch,
            selectMenuItem,
            toggleSection,
            computedWidths,
            section2MenuItems,
            section3MenuItems,
            containerWidth,
            isResizing,
            setIsResizing,
        ],
    )

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
