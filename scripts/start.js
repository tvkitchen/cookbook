import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

if (process.argv.length < 3) {
	console.log(
		'\x1b[35mERROR:\x1b[0m',
		'You must pass a recipe name.',
	)
	console.log(
		'\x1b[35mERROR:\x1b[0m',
		'yarn start {recipe-name}',
	)
	process.exit()
}

const recipe = process.argv[2]
const recipePath = path.join(
	'recipes/',
	recipe,
	'src/index.js',
)

if (!fs.existsSync(recipePath)) {
	console.log(
		'\x1b[35mERROR:\x1b[0m',
		`'${recipePath}' does not exist.`,
	)
	process.exit()
}

const scriptParameters = process.argv.slice(3)

execSync(
	`docker compose up --no-recreate ${recipe} ${scriptParameters.join(' ')}`,
	{ stdio: 'inherit' },
)
