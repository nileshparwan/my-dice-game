## Variables Documentation

### totalDice

- **Type:** `number`
- **Description:** Represents the total number of dice available in the game.
- **Example Usage:** `const totalDice: number = 6;`

### listOfPlayers

- **Type:** `Array<number>`
- **Description:** An array containing the player IDs participating in the game.
- **Example Usage:** `const listOfPlayers: Array<number> = [1, 2];`

### totalNuberOfPlayers

- **Type:** `number`
- **Description:** Represents the total number of players in the game, derived from the length of `listOfPlayers`.
- **Example Usage:** `const totalNuberOfPlayers = listOfPlayers.length;`

### loaderDelay

- **Type:** `number`
- **Description:** Specifies the delay (in milliseconds) for a loader or any asynchronous operation.
- **Example Usage:** `const loaderDelay = 3000;`

### maxDiceRolls

- **Type:** `number`
- **Description:** Represents the maximum number of times a player can roll the dice during the game.
- **Example Usage:** `const maxDiceRolls = 2;`
- **note** `2` means 2*2 = `4`

## Functions Documentation

### `rollDice`

- **Description:** Initiates the dice rolling process, updating game state variables such as dice results, player scores, and current player.

### `buttonHandler`
**Type:** MouseEventHandler<HTMLButtonElement>
**Description:** Handles the click event on a button, triggering the rollDice function.

### `keyPressHandler`
**Type:** KeyboardEventHandler<HTMLButtonElement>
**Description:** Handles keyboard events, specifically the "Enter" key, to trigger the rollDice function.

### `playerWon`
**Type:** () => number
**Description:** Determines the player with the highest score and returns their ID as the winner.

### `resetGame`
**Type:** () => void
**Description:** Resets the game state, including scores, dice results, current player, and game-related flags.