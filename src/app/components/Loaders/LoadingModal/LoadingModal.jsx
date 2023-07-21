import Loader2 from "../Loader2/Loader2"
import "./Styles.scss"

const LoadingModal = () => {
  return (
    <section className="absolute w-screen h-screen bg-black z-10 flex justify-center items-center top-0 left-0">
        <section className="flex flex-col justify-start items-center">
            <Loader2/>
            <span className="mt-5 font-bold text-[20px]">Loading Weather Info...</span>
        </section>
    </section>
  )
}

export default LoadingModal