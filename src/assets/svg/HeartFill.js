
import * as React from "react"
import Svg, { Path } from "react-native-svg"
const HeartFill = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <Path
            fill={props.color || "#AABB5D"}
            d="M1.243 8.243 8 15l6.757-6.757a4.243 4.243 0 0 0 1.243-3v-.19A4.052 4.052 0 0 0 8.783 2.52L8 3.5l-.783-.98A4.052 4.052 0 0 0 0 5.053v.19c0 1.126.447 2.205 1.243 3Z"
        />
    </Svg>
)
export default HeartFill
