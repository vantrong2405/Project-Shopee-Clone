import { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
    return  <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}>
    <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
      <div className="text-9xl font-bold text-orange mb-4">500</div>
      <h1 className="text-4xl font-bold text-orange mb-6">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you're looking for seems to have gone on a little adventure. Don't
        worry, we'll help you find your way back home.</p>
      <Link to={'/'}
        className="inline-block bg-orange text-white font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-colors duration-300">
        Go Back Home
      </Link>
    </div>
  </div>
    }

    return this.props.children
  }
}
