import { Box, CssBaseline } from "@mui/material"
import { type FC, useCallback, useEffect, useRef, useState } from "react"
import { LayoutProvider } from "./context/LayoutContext"
import { LayoutInner } from "./LayoutInner"
import type { ThreeSectionLayoutProps } from "./types"

export const ThreeSectionLayout: FC<ThreeSectionLayoutProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    const updateWidth = useCallback(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
        }
    }, [])

    useEffect(() => {
        updateWidth()
        const resizeObserver = new ResizeObserver(updateWidth)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }
        return () => resizeObserver.disconnect()
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
