import { useState } from "react";

export default function useInput(initText = ''){
    const [text, setText] = useState(initText);
    return [text, setText];
}