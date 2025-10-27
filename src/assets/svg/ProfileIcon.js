import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const ProfileIcon = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={props.width || 24}
        height={props.height || 24}
        {...props}
    >
        <G
            stroke={props.color || "#AABB5D"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            clipRule="evenodd"
        >
            <Path d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948Z" />
            <Path
                d="M11.985 12.006A4.596 4.596 0 1 0 7.389 7.41a4.58 4.58 0 0 0 4.563 4.596h.033Z"
                opacity={1}
            />
        </G>
    </Svg>
)
export default ProfileIcon
