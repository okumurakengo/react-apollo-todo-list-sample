import * as React from "react";
import { FILTER } from '../global'

interface IProps {
    toggleCompleted: (arg: any) => any;
}

const Footer: React.FC<IProps> = ({ toggleCompleted }): JSX.Element => {
    return (
        <>
            <span>Show:</span>
            <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ALL }})}>
                ALL
            </button>
            <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_COMPLETED }})}>
                Active
            </button>
            <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ACTIVE }})}>
                Completed
            </button>
        </>
    )
}

export default Footer;
