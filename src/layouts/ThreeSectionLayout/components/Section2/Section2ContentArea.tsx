import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { type FC, Suspense } from "react"
import { TRANSITION_DURATION, TRANSITION_EASING } from "../../constants"
import { useLayoutContext } from "../../context/useLayoutContext"
import type { ContentAreaProps } from "../../types"
import { ScrollableContainer } from "../ScrollableContainer"

const PanelSkeleton: FC = () => (
    <Stack spacing={1.5} sx={{ p: 2 }}>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
    </Stack>
)

export const Section2ContentArea: FC<ContentAreaProps> = ({ activeMenuItem, isExpanded, width }) => {
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

                    <ScrollableContainer>
                        {ActiveComponent ? (
                            <Suspense fallback={<PanelSkeleton />}>
                                <Box sx={{ p: 2 }}>
                                    <ActiveComponent
                                        menuItemId={activeMenuItem!.id}
                                        onSelectOtherSection={(targetSection, menuItemId) =>
                                            selectMenuItem(targetSection, menuItemId)
                                        }
                                    />
                                </Box>
                            </Suspense>
                        ) : (
                            <Box sx={{ p: 2 }}>
                                <Typography color="text.secondary">Select an item from the menu</Typography>
                            </Box>
                        )}
                    </ScrollableContainer>
                </Box>
            )}
        </Box>
    )
}
