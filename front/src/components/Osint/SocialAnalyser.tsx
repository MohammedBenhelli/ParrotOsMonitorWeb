import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import ReactJson from "react-json-view";
import options from "../../constants/social-analyser";

export default function SocialAnalyser() {
    const [username, setUsername] = useState("");
    const [websites, setWebsites] = useState("");
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);

    const webOptions = options.map(option => {
        return {value: option, label: option}
    });

    const handleSearch = async () => {
        if (websites.length === 0)
            setWebsites("all");
        if (username.length === 0)
            return;
        setLoading(true);
        const config = {
            method: "POST",
            body: JSON.stringify({username, websites}),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const res = await fetch('osint/social-analyser', config);
        setResult(await res.json());
        setLoading(false);
    };

    return (<Row>
        <Col>
            <RightDiv className={"text-center"}>
                <h1>Social Analyser</h1>
                <div className="form">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control onChange={e => setUsername(e.target.value)} type="text"
                                          placeholder="Username"/>
                        </Form.Group>
                        <Select onChange={v => setWebsites(v.map(i => i.value).join(", "))} options={webOptions}
                                isMulti/>
                    </Form>
                </div>
                <Button disabled={loading} onClick={handleSearch}>Send</Button>
            </RightDiv>
        </Col>
        <Col>
            <LeftDiv>
                <h1>Results</h1>
                <ReactJson theme="monokai" src={result}/>
            </LeftDiv>
        </Col>
    </Row>);
}

const RightDiv = styled.div`
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    color: ${props => props.theme.primary};
  }

  .form {
    text-align: left;
    margin-top: 40px;
  }
  
  button {
    margin-top: 20px;
  }
`;

const LeftDiv = styled.div`
  text-align: center;

  h1 {
    color: ${props => props.theme.primary};
  }
`;