import { Children } from "react";
import Dashboard from "../pages/Dashboard";
import SearchScores from "../pages/SearchScores";
import Reports from "../pages/Reports";
import MainLayout from "../layouts/MainLayouts";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "search-scores",
                element: <SearchScores />,
            },
            {
                path: "reports",
                element: <Reports />,
            },
        ],
    },
];

export default routes;