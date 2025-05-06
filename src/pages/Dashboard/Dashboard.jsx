import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTests = async () => {
        setIsLoading(true);
        
        setTimeout(() => {
            setTests([{name: 'test 1'}]);
            setIsLoading(false);
        }, 2000);
    };

    useEffect(() => {
        // "fetch" tests from Optimizely
        fetchTests();
    }, []);

    return (
        <div>
            {isLoading && <div>Loading...</div>}

            {!!tests.length && tests.map(test => {
                return <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Status</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => {
                            return  <tr>
                                    <td>{test.name}</td>
                                    <td>{test.status}</td>
                                    <td>
                                        <button>
                                            Start
                                        </button>
                                    </td>
                                </tr>
                        })
                        
                       }
                    </tbody>
                </table>
            })}
        </div>
    )
};