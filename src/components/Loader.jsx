import { ThreeDots } from "react-loader-spinner"

export const Loader = () => {
  return (
    <div className="loader d-flex justify-content-center align-items-center">
        <ThreeDots 
            width={70}
            height={70}
            color='#626666'
        />
    </div>
  )
}
