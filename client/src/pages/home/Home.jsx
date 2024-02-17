import { Suspense, lazy } from "react"

// Home page parts
const First = lazy(() => import('./First'))

export default function Home() {
  return (
    <div className="py-20 md:py-0 px-2 flex flex-col">
      <Suspense>
        <First />
      </Suspense>
    </div>
  )
}
