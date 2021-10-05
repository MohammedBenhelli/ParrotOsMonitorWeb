import React, {lazy, Suspense} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {ThemeProvider} from "styled-components";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {TerminalContextProvider} from "react-terminal";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css"

const Home = lazy(() => import("./views/Home/Home"));
const Parrot = lazy(() => import("./views/Parrot/Parrot"));
const Osint = lazy(() => import("./views/Osint/Osint"));

const theme = {
    primary: "#426dea",
    secondary: "#808080"
};

function App() {
    return (<Router>
        <ThemeProvider theme={theme}>
            <TerminalContextProvider>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Toolkit</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/parrot">Parrot</Nav.Link>
                            <Nav.Link href="/osint">Osint</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Switch>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/parrot">
                            <Parrot/>
                        </Route>
                        <Route path="/osint">
                            <Osint/>
                        </Route>
                    </Suspense>
                </Switch>
            </TerminalContextProvider>
        </ThemeProvider>
    </Router>);
}

export default App;
