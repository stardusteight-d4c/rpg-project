import { Home } from "./components"

export function HomeModule() {
  return (
    <main>
      <Home.Nav />
      <Home.Hero />
      <Home.About />
      <Home.Footer />
    </main>
  )
}
