import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SearchIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <Path
            stroke={props.color || "#000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16.672 16.641 21 21m-2-10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        />
    </Svg>
)
export default SearchIcon
