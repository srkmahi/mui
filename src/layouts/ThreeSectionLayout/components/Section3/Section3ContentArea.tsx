import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"
import { type FC, Suspense } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { ContentAreaProps } from "../../types"
import { ScrollableContainer } from "../ScrollableContainer"

export const Section3ContentArea: FC<ContentAreaProps> = ({ activeMenuItem, isExpanded, width }) => {
    const { selectMenuItem, isResizing } = useLayoutContext()

    const ActiveComponent = activeMenuItem?.component

    const widthTransition = isResizing ? "none" : `width ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`

    const borderTransition = isResizing ? "none" : `border ${TRANSITION_DURATION}ms ${TRANSITION_EASING}`

    return (
        <Box
            sx={{
                width: isExpanded ? width : 0,
                minWidth: 0,
                height: "100%",
                overflow: "hidden",
                transition: `${widthTransition}, ${borderTransition}`,
                borderLeft: isExpanded ? 1 : 0,
                borderColor: "divider",
            }}
        >
            {isExpanded && (
                <Box
                    sx={{
                        width,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Content Header */}
                    <Box
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderBottom: 1,
                            borderColor: "divider",
                            flexShrink: 0,
                            minHeight: 48,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="subtitle1" noWrap fontWeight={600}>
                            {activeMenuItem?.label ?? "Panel"}
                        </Typography>
                    </Box>

                    {/* Content Body */}
                    <ScrollableContainer>
                        <Box sx={{ p: 2 }}>
                            {ActiveComponent ? (
                                <Suspense
                                    fallback={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                p: 4,
                                            }}
                                        >
                                            <CircularProgress size={24} />
                                        </Box>
                                    }
                                >
                                    <ActiveComponent
                                        menuItemId={activeMenuItem!.id}
                                        onSelectOtherSection={(targetSection, menuItemId) =>
                                            selectMenuItem(targetSection, menuItemId)
                                        }
                                    />
                                </Suspense>
                            ) : (
                                <Typography color="text.secondary">Select an item from the menu</Typography>
                            )}
                        </Box>
                    </ScrollableContainer>
                </Box>
            )}
        </Box>
    )
}
