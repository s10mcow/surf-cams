import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Layout from "./components/Layout";
import PlayersContainer from "./containers/PlayersContainer";

export default function App() {
    const [isOpen, toggleOpen] = React.useState(false);

    return (
        <>
            <Drawer open={isOpen} onClose={() => toggleOpen(!isOpen)}>
                change country
            </Drawer>
            <Layout>
                <header className="page__header">
                    <h1>Portugal Beach Cams</h1>
                </header>

                <PlayersContainer />
            </Layout>
        </>
    );
}
