import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Header() {

    const navigator = useNavigate()

    const menu = [
        {
            title: "خانه",
            svg: <Icon icon="material-symbols:home" />,
            link: "/"
        },
        {
            title: "سیمکارت ها",
            svg: <Icon icon="eos-icons:admin" />,
            link: "/admin/panel/sim-cards"
        },
        {
            title: "فروش ها",
            svg: <Icon icon="eos-icons:admin" />,
            link: "/admin/panel/sales"
        },
        {
            title: "خرید ها",
            svg: <Icon icon="eos-icons:admin" />,
            link: "/admin/panel/buys"
        },


    ]


    const [selectedPage, setSelectedPage] = useState(undefined)

    useEffect(() => {
        if (selectedPage) {
            navigator(selectedPage.link)
        }
    }, [selectedPage])


    return (
        <header>
            <ul>
                {menu.map((item, index) => {
                    return <li
                        key={index}
                        onClick={() => setSelectedPage(item)}
                    >
                        <span>{item.title}</span>
                        {item.svg}
                    </li>
                })}
            </ul>
        </header>
    )
}
