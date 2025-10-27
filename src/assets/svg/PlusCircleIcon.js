import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PlusCircleIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <Path
            fill={props.color || "#AABB5D"}
            fillRule="evenodd"
            d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
        />
    </Svg>
)
export default PlusCircleIcon
