import { type FC } from "react"

import { ThreeSectionLayout } from "./layouts/ThreeSectionLayout"
import { section2MenuItems } from "./layouts/ThreeSectionLayout/registry/section2Registry"
import { section3MenuItems } from "./layouts/ThreeSectionLayout/registry/section3Registry"
import MyMainSection from "./MyMainSection"

const App: FC = () => {
    return (
        <ThreeSectionLayout
            section2MenuItems={section2MenuItems}
            section3MenuItems={section3MenuItems}
            section1Content={<MyMainSection />}
        />
    )
}

export default App
