import { useContext } from "react"
import type { LayoutContextValue } from "../types"
import { LayoutContext } from "./LayoutContextDef"

export const useLayoutContext = (): LayoutContextValue => {
    const ctx = useContext(LayoutContext)
    if (!ctx) {
        throw new Error("useLayoutContext must be used within a LayoutProvider")
    }
    return ctx
}
