import { useCallback, useEffect, useRef } from "react"
import {
    DIVIDER_WIDTH,
    ICON_PANEL_WIDTH,
    MIN_CONTENT_WIDTH,
    MIN_SECTION1_WIDTH,
    RESIZE_HANDLE_WIDTH,
} from "../constants"
import { useLayoutContext } from "../context/useLayoutContext"
import type { ResizeHandlePosition } from "../types"

interface UseResizableReturn {
    handleMouseDown: (e: React.MouseEvent) => void
}

export function useResizable(position: ResizeHandlePosition): UseResizableReturn {
    const { state, dispatch, computedWidths, containerWidth, setIsResizing } = useLayoutContext()

    const startXRef = useRef(0)
    const startWidthS2Ref = useRef(0)
    const startWidthS3Ref = useRef(0)
    const stateRef = useRef(state)
    const containerWidthRef = useRef(containerWidth)
    const dispatchRef = useRef(dispatch)
    const rafIdRef = useRef<number | null>(null)

    const handleMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null)
    const handleMouseUpRef = useRef<(() => void) | null>(null)

    useEffect(() => {
        stateRef.current = state
    }, [state])

    useEffect(() => {
        containerWidthRef.current = containerWidth
    }, [containerWidth])

    useEffect(() => {
        dispatchRef.current = dispatch
    }, [dispatch])

    const cleanup = useCallback(() => {
        setIsResizing(false)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current)
            rafIdRef.current = null
        }
        if (handleMouseMoveRef.current) {
            document.removeEventListener("mousemove", handleMouseMoveRef.current)
        }
        if (handleMouseUpRef.current) {
            document.removeEventListener("mouseup", handleMouseUpRef.current)
        }
        handleMouseMoveRef.current = null
        handleMouseUpRef.current = null
    }, [setIsResizing])

    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            setIsResizing(true)
            startXRef.current = e.clientX
            startWidthS2Ref.current = computedWidths.section2
            startWidthS3Ref.current = computedWidths.section3
            document.body.style.cursor = "col-resize"
            document.body.style.userSelect = "none"

            let latestClientX = e.clientX

            const processResize = () => {
                rafIdRef.current = null
                const deltaX = latestClientX - startXRef.current
                const currentState = stateRef.current
                const cw = containerWidthRef.current

                if (position === "left") {
                    const newS2Width = startWidthS2Ref.current - deltaX
                    const s2ContentWidth = newS2Width - ICON_PANEL_WIDTH
                    const s3Expanded = currentState.section3.state === "expanded"
                    const s3TotalWidth = s3Expanded ? currentState.section3.width : ICON_PANEL_WIDTH
                    const totalGapWidth = RESIZE_HANDLE_WIDTH + (s3Expanded ? RESIZE_HANDLE_WIDTH : DIVIDER_WIDTH)
                    const section1Width = cw - newS2Width - s3TotalWidth - totalGapWidth

                    if (s2ContentWidth >= MIN_CONTENT_WIDTH && section1Width >= MIN_SECTION1_WIDTH) {
                        dispatchRef.current({
                            type: "RESIZE_SECTIONS",
                            payload: { section2Width: newS2Width },
                        })
                    }
                } else {
                    const newS3Width = startWidthS3Ref.current - deltaX
                    const s3ContentWidth = newS3Width - ICON_PANEL_WIDTH
                    const s2Expanded = currentState.section2.state === "expanded"
                    const s2TotalWidth = s2Expanded ? currentState.section2.width : ICON_PANEL_WIDTH
                    const totalGapWidth = RESIZE_HANDLE_WIDTH + (s2Expanded ? RESIZE_HANDLE_WIDTH : DIVIDER_WIDTH)
                    const section1Width = cw - s2TotalWidth - newS3Width - totalGapWidth

                    if (s3ContentWidth >= MIN_CONTENT_WIDTH && section1Width >= MIN_SECTION1_WIDTH) {
                        dispatchRef.current({
                            type: "RESIZE_SECTIONS",
                            payload: { section3Width: newS3Width },
                        })
                    }
                }
            }

            const onMouseMove = (moveEvent: MouseEvent) => {
                latestClientX = moveEvent.clientX
                if (rafIdRef.current === null) {
                    rafIdRef.current = requestAnimationFrame(processResize)
                }
            }

            const onMouseUp = () => {
                cleanup()
            }

            handleMouseMoveRef.current = onMouseMove
            handleMouseUpRef.current = onMouseUp

            document.addEventListener("mousemove", onMouseMove)
            document.addEventListener("mouseup", onMouseUp)
        },
        [position, computedWidths, setIsResizing, cleanup],
    )

    useEffect(() => {
        return () => {
            cleanup()
        }
    }, [cleanup])

    return { handleMouseDown }
}
