import { useEffect, useState } from "react";
import { fetchOptlyTests } from "../../services/optimizelyService";
import { validateExpStatusChange } from "../../utils/validateExp";
import { createPortal } from "react-dom";
import { Modal } from "../../components/Modal/Modal";

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

    const handleStatusChange = (testID) => {
        console.log("handling status change");
        const res = validateExpStatusChange(testID);
        console.log("res recieved in dashboard = ", res);
        setValidationResult(res);
        setIsShowingModal(true);
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
                            <td>Name</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => {
                            return  <tr key={test.id}>
                                        <td>{test.name}</td>
                                        <td>{test.status}</td>
                                        <td>
                                            <button onClick={() => handleStatusChange(test.id)}>
                                                Start
                                            </button>
                                        </td>
                                    </tr>
                        })
                        
                       }
                    </tbody>
                </table>
            }
            {isShowingModal && createPortal(<Modal><div className="modal-inner">
                <h2>{validationResult.message}</h2>
                <ul>
                    {validationResult.issues.map(issue => {
                        return <li>{issue}</li>
                    })}
                </ul>
                <div>
                    <button onClick={() => {setIsShowingModal(false); setValidationResult(null)}}>Ok</button>
                </div>
            </div></Modal>, document.getElementById('react_portal'))}
            {/* {        createPortal(
                <Modal closeFunc={() => setIsShowingModal(false)} submitFunc={handleCreateFlag} header="Create Flag" cta="Create">
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='name'>Name:</label>
                            <input id='name' placeholder='Add name' value={nameInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='key'>Key:</label>
                            <input id='key' placeholder='Add key' value={keyInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '24px'}}>
                            <label htmlFor='description'>Description:</label>
                            <input id='description' placeholder='Add description' value={descInputText} onChange={(e) => handleChange(e)} style={{background: 'white', borderRadius: '2px', border: '0.5px solid gray', marginTop: '8px', color: 'black'}}></input>
                        </div>
                </Modal>, 
                document.getElementById('react_portal')
            )}} */}
        </div>
    )
};