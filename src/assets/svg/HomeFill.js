import * as React from "react"
import Svg, { Path } from "react-native-svg"
const HomeFill = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <Path
            fill={props.color || "#000"}
            d="m4 10 8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H4V10Z"
            opacity={1}
        />
        <Path
            stroke={props.color || "#000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m4 10 8-7 8 7v10h-5v-4a3 3 0 0 0-6 0v4H4V10Z"
        />
    </Svg>
)
export default HomeFill
