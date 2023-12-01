import Spinnies from 'spinnies'

type BoardStatus = {
  moveCount: number
  position: number
}

class Activity {
  #spinnies = new Spinnies()
  #options: Spinnies.SpinnerOptions

  constructor(
    public name: string,
    status: BoardStatus,
  ) {
    this.#options = this.#spinnies.add(name, { text: this.#formatText(status) })
  }

  update(status: BoardStatus) {
    this.#options.text = this.#formatText(status)
  }

  succeed() {
    this.#spinnies.succeed(this.name, { text: 'Tour Complete!' })
  }

  fail(text?: string) {
    this.#spinnies.fail(this.name, { text })
  }

  #formatText = ({ position, moveCount }: BoardStatus) =>
    `Position: ${position}, Move count: ${moveCount}`
}

export default Activity
