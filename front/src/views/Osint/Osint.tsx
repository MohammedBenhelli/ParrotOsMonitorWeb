import React, {lazy, Suspense, useState} from "react";
import {Button, Offcanvas, Spinner} from "react-bootstrap";
import styled from "styled-components";
import options from "../../constants/osint-options";

const SocialAnalyser = lazy(() => import("../../components/Osint/SocialAnalyser"));

export default function Osint() {
    const [showTools, setShowTools] = useState(false);
    const [selectedTool, setSelectedTool] = useState(-1)

    const handleCloseTools = () => setShowTools(false);
    const handleShowTools = () => setShowTools(true);
    const handleSelection = id => {
        setSelectedTool(id);
        handleCloseTools();
    }

    return (<>
        <Button variant="primary" onClick={handleShowTools}>
            Show tools
        </Button>
        <Suspense fallback={<Spinner animation="grow" variant="primary"/>}>
            {(() => {
                switch (selectedTool) {
                    case -1:
                        return <p>Select a tool</p>
                    case 0:
                        return <SocialAnalyser/>
                }
            })()}
        </Suspense>
        <Offcanvas show={showTools} onHide={handleCloseTools}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>OSINT toolkit</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {options.map((option, id) => <OsintOption key={id} id={id} selected={selectedTool}
                                                          className="osint-option">
                    <h3 title={option.description} onClick={() => handleSelection(id)}>{option.placeholder}</h3>
                </OsintOption>)}
            </Offcanvas.Body>
        </Offcanvas>
    </>);
}

const OsintOption = styled.div`
  h3 {
    color: ${props => props.id === props.selected ? props.theme.secondary : props.theme.primary};

    &:hover {
      cursor: pointer;
    }
  }
`;