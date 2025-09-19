import { useState } from "react";

function ButtonDateTime() {
    const [dateTime, setDateTime] = useState(new Date());

    return <button onClick={() => setDateTime(new Date())}>
            Time now is {dateTime.toTimeString()}
            </button>
}

export default ButtonDateTime;