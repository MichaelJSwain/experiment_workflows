import { useEffect, useState } from "react";
import { fetchOptlyTests } from "../../services/optimizelyService";
import { validateExpStatusChange } from "../../utils/validateExp";

export const Dashboard = () => {
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        </div>
    )
};