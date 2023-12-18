import FlexCenter from "./display/FlexCenter"
import { CircularProgress } from "@mui/material"

export default function Loader({className, text, size = 35, color = "primary"}){
    return <FlexCenter className={"gap-2 flex-column " + (!className || !className.includes("py") ? "py-4 " : "")+className}>
        <CircularProgress size={size} color={color}/>
        {text && <div>{text}</div>}
    </FlexCenter>
}