import { Link } from "react-router-dom"

export const NotFound = () => {
	return (
		<div className="not-found pt-5 text-center">
			<h1 className="mb-3">That page doesn't exist!</h1>
			<p className="mb-4">Sorry, the page you were looking for could not be found.</p>
			<Link to='/'>Click here to return home.</Link>
		</div>
	)
}
