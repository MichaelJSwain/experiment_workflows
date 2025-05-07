import { useEffect, useState } from "react";
import { fetchOptlyTests } from "../../../services/optimizelyService";
import { validateExpStatusChange } from "../../../utils/validateExp";
import { createPortal } from "react-dom";
import { Modal } from "../../../components/Modal/Modal";
import './Dashboard.css';

export const Dashboard = () => {
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowingModal, setIsShowingModal] = useState(false)
    const [validationResult, setValidationResult] = useState();

    const fetchTests = async () => {
        setIsLoading(true);
        
        const tests = await fetchOptlyTests();
        setTests(tests);
        setIsLoading(false);
    };

    const handleTestLaunch = (testID) => {
        console.log("handling status change");
        const res = validateExpStatusChange(testID);
        console.log("res recieved in dashboard = ", res);
        setValidationResult(res);
        setIsShowingModal(true);
    }

    const handleTestPause = () => {
        console.log("handling test pause");
        const res = {
            isValid: true,
            issues: [],
            message: "Are you sure you want to pause this test?",
            name: "[qa] - A/B onboarding test"
        }
        setValidationResult(res);
        setIsShowingModal(true);
    }

    const handleConfirmAction = (result) => {
        console.log("validation result = ", result);
        const updatedTests = tests.map(test => {
            if (test.name === result.name) {
                console.log("matching test");
                test.status = test.status.includes("running") ? "paused" : "running";
            }
            return test;
        })

        setTests(updatedTests);
        setIsShowingModal(false); 
        setValidationResult(null);
    }

    useEffect(() => {
        // "fetch" tests from Optimizely
        fetchTests();
    }, []);

    return (
        <div>
            {isLoading && <div>Loading...</div>}

            {!!tests.length && <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th> 
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => {
                            return  <tr key={test.id}>
                                        <td>{test.name}</td>
                                        <td>{test.status}</td>
                                        <td>
                                           {test.status.includes("running") ? <button style={{background: "orange", color: "white", fontWeight: "bold"}} onClick={() => handleTestPause(test.id)}>
                                                Pause
                                            </button> : 
                                            <button style={{background: "orange", color: "white", fontWeight: "bold"}} onClick={() => handleTestLaunch(test.id)}>
                                                Start
                                            </button>}
                                        </td>
                                    </tr>
                        })
                        
                       }
                    </tbody>
                </table>
            }
            {isShowingModal && createPortal(<Modal><div className="modal-inner">
                <h2>{validationResult.message}</h2>
                <ul style={{textAlign: "left"}}>
                    {validationResult.issues.map(issue => {
                        return <li>{issue}</li>
                    })}
                </ul>
                <div style={{display: "flex", justifyContent: "flex-end", gap: "5px"}}>
                    {validationResult.issues.length ?
                        <button onClick={() => {setIsShowingModal(false); setValidationResult(null)}} style={{background: "orange", color: "white", fontWeight: "bold"}}>Ok</button> :
                        <><button onClick={() => {setIsShowingModal(false); setValidationResult(null)}} style={{background: "blue", color: "white", fontWeight: "bold"}}>Cancel</button><button  onClick={() => handleConfirmAction(validationResult)} style={{background: "orange", color: "white"}}>Confirm</button></>}
                </div>
            </div></Modal>, document.getElementById('react_portal'))}
        </div>
    )
};