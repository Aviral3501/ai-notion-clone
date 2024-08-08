import { ClipLoader } from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ClipLoader size={50} color="red" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Redirecting...</p>
    </div>
  )
}

export default LoadingSpinner
