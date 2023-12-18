import { classNames } from "../../dom";

export default function FlexCenter({className, children, ...props}){
    return <div className={classNames("d-flex justify-content-center align-items-center gap-2", className)} {...props}>
        {children}
    </div>
}