import { Suspense, lazy } from "react"

// Home page parts
const First = lazy(() => import('./First'))

export default function Home() {
  return (
    <div className="px-2 flex flex-col">
      <Suspense>
        <First />
      </Suspense>
    </div>
  )
}
