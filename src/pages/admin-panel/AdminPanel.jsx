import React, { useState } from 'react'
import AllSimCards from './panels/AllSimCards'

export default function AdminPanel() {

    const panels = [
        {
            title: "سیم کارت ها",
            svg: "",
            component: <AllSimCards />
        }
    ]

    


    const [selectedPanel, setSelectedPanel] = useState(panels[0])

    return (
        <main className='admin-panel-page'>
            {
                selectedPanel.component
            }
        </main>
    )
}
