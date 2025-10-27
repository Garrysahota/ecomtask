import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ListIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <G fill={props.color || "#000"}>
            <Path
                fill={props.color || "#000"}
                d="M208 80h264v32H208zM40 96a64 64 0 1 0 64-64 64.072 64.072 0 0 0-64 64Zm64-32a32 32 0 1 1-32 32 32.036 32.036 0 0 1 32-32ZM208 240h264v32H208zM104 320a64 64 0 1 0-64-64 64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32 32.036 32.036 0 0 1 32-32ZM208 400h264v32H208zM104 480a64 64 0 1 0-64-64 64.072 64.072 0 0 0 64 64Zm0-96a32 32 0 1 1-32 32 32.036 32.036 0 0 1 32-32Z"
                className="ci-primary"
            />
        </G>
    </Svg>
)
export default ListIcon
