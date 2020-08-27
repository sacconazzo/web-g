import React, { useEffect } from "react";
import { useDencrypt } from "use-dencrypt-effect";

const options = {
    chars: ["#", "_"]
}

const TitleAnim = (props) => {
    const values = props.texts;
    const { result, dencrypt } = useDencrypt(options);

    useEffect(() => {
        let i = 0;

        dencrypt(values[i]);
        i = i === values.length - 1 ? 0 : i + 1;

        if (!props.static) {
            const action = setInterval(() => {
                dencrypt(values[i]);
                i = i === values.length - 1 ? 0 : i + 1;
            }, 2500);

            return () => clearInterval(action);
        } else { return }

        // eslint-disable-next-line
    }, []);

    return <>{result}</>;
};

export default TitleAnim;