import React, { useState } from 'react';
import { ACTIVE_AGENTS, INACIVE_AGENTS, PENDING_AGENTS } from '../../assets/constants';

const Agents = () => {
    const [selectedOption, setSelectedOption] = useState(ACTIVE_AGENTS);

    const handleOptionChange = (event) => {
        // setSelectedOption(event.target.value);
    };

    return (
        <div>
             <div>
                <label>
                    <input
                    type="radio"
                    name="options"
                    value= {ACTIVE_AGENTS}
                    checked={selectedOption === ACTIVE_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Active Agents
                </label>
                <label>
                    <input
                    type="radio"
                    name="options"
                    value={INACIVE_AGENTS}
                    checked={selectedOption === INACIVE_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Inactive Agents
                </label>
                <label>
                    <input
                    type="radio"
                    name="options"
                    value={PENDING_AGENTS}
                    checked={selectedOption === PENDING_AGENTS}
                    onChange={handleOptionChange}
                    />
                    Pending Agents
                </label>
            </div>
        </div>
    );
}

export default Agents;
