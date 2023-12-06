module.exports = {
    parseGame(game) {
        const gameNumberRegex = /^Game (?<gameNumber>\d+):/
        const gameNumber = Number(game.match(gameNumberRegex).groups.gameNumber)

        const rawGame = game.replace(gameNumberRegex, '')
        const rawRounds = rawGame.split(';').map(r => r.trim())
        
        const roundRegex = /(\d+) (\w+)/g
        const rounds = rawRounds.map(round => round.matchAll(roundRegex))

        return {
            gameNumber,
            rounds: rounds.map(round => {
                return [...round].reduce((acc, turn) => {
                    acc[turn[2]] = Number(turn[1])

                    return acc
                }, {})
            })
        }
    },

    findMaxColor(rounds, color) {
        return rounds.reduce((max, turn) => {
            if (turn[color] > max) {
                return turn[color]
            } else {
                return max
            }
        }, 0) 
    }
}
