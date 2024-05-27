import React from 'react';
import {PieChartFill,GearFill,ListTask,DatabaseFill} from 'react-bootstrap-icons';

 import * as RiIcons from "react-icons/ri";

 const MenuBarData=[
    {
        title: "DASHBOARD",
        path: "/dashboard",
          icon: <PieChartFill />,
    },
    {
        title: "MASTER",
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        icon: <GearFill />,
        subNav: [
        {
            title: "Category",
            path: "/category",
        },
        {
            title: "Client",
            path: "/client",
        },
        {
            title: "Employee",
            path: "/employee",
        },
    ]
},
        {
            title: "TASK ALLOCATION",
            path: "/taskalloc",
            icon: <ListTask />,
        },
    
        {
            title: "REPORTS",
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            icon: <DatabaseFill />,
            subNav: [
            {
                title: "ET   EmpWiseTasks",
                path: "/empwisetaskcount"
            },
            {
                title: "UD   User Details",
                path: "/userdetails",
            },
            {
                title:"CategoryWiseAllocation",
                path:"/categorywisealloc",
            },
            {
                title:"ClientWiseAllocation",
                path:"/clientwisealloc",
            }
          
        ],
    },
]
export default MenuBarData;
