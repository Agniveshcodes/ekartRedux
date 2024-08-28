import { FC , memo } from "react"
import { ImSpinner9 } from "react-icons/im";


type LoadingProps = {}


const Loading : FC<LoadingProps> = () => {
    return (
        <>
        <div className=" flex items-center justify-center h-100">
        <ImSpinner9 className="text-5xl text-orange-500 font-bold animate-spin" />
      </div>
        </>
    )
}

export default memo(Loading)