import { CssBaseline } from "@mui/material"
import Box from "@mui/material/Box"
import { type FC, useCallback, useEffect, useRef, useState } from "react"
import { LayoutProvider } from "./context/LayoutContext"
import { LayoutInner } from "./LayoutInner"
import type { ThreeSectionLayoutProps } from "./types"

/** Minimum pixel change to trigger a state update */
const RESIZE_THRESHOLD = 1

export const ThreeSectionLayout: FC<ThreeSectionLayoutProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const rafIdRef = useRef<number | null>(null)
    const lastWidthRef = useRef(0)

    const updateWidth = useCallback((entries: ResizeObserverEntry[]) => {
        if (rafIdRef.current !== null) {
            cancelAnimationFrame(rafIdRef.current)
        }

        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null

            // Use contentRect from ResizeObserver entry directly (avoids forced reflow)
            const entry = entries[0]
            if (!entry) return

            const newWidth = Math.round(entry.contentRect.width)

            // Only setState if width changed beyond threshold
            if (Math.abs(newWidth - lastWidthRef.current) >= RESIZE_THRESHOLD) {
                lastWidthRef.current = newWidth
                setContainerWidth(newWidth)
            }
        })
    }, [])

    useEffect(() => {
        // Synchronous initial measurement
        if (containerRef.current) {
            const initialWidth = Math.round(containerRef.current.offsetWidth)
            lastWidthRef.current = initialWidth
            setContainerWidth(initialWidth)
        }

        const observer = new ResizeObserver(updateWidth)
        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => {
            observer.disconnect()
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current)
            }
        }
    }, [updateWidth])

    return (
        <>
            <CssBaseline />
            <Box
                ref={containerRef}
                sx={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {containerWidth > 0 && (
                    <LayoutProvider
                        section2MenuItems={props.section2MenuItems}
                        section3MenuItems={props.section3MenuItems}
                        initialState={props.initialState}
                        containerWidth={containerWidth}
                    >
                        <LayoutInner
                            section1Header={props.section1Header}
                            section1Content={props.section1Content}
                            section1Footer={props.section1Footer}
                            section1Actions={props.section1Actions}
                            section2MenuItems={props.section2MenuItems}
                            section3MenuItems={props.section3MenuItems}
                        />
                    </LayoutProvider>
                )}
            </Box>
        </>
    )
}
