import { Components } from "./components"

export function HomeModule() {
  return (
    <main>
      <Components.Nav />
      <Components.Hero />
      <Components.About />
      <Components.Footer />
    </main>
  )
}
