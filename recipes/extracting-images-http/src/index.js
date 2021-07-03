import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoHttpIngestionAppliance } from '@tvkitchen/appliance-video-http-ingestion'
import { VideoImageExtractorAppliance } from '@tvkitchen/appliance-video-image-extractor'

const URL_FLAG = '-u'

const countertop = new Countertop()

const getUrl = (args) => {
	const flagIndex = args.indexOf(URL_FLAG)
	if (flagIndex === -1 || args.length <= flagIndex + 1) {
		return ''
	}
	return args[flagIndex + 1]
}

const streamUrl = getUrl(process.argv)

if (streamUrl === '') {
	console.log(
		'\x1b[35mERROR:\x1b[0m',
		'You must pass a url (-u).',
	)
	process.exit()
}

countertop.addAppliance(VideoHttpIngestionAppliance, {
	url: streamUrl,
})
countertop.addAppliance(VideoImageExtractorAppliance)

countertop.on('data', (payload) => {
	if (payload.type === 'IMAGE.PNG') {
		console.log(payload)
		const fileName = `${Date.now()}.png`
		const filePath = path.join(__dirname, '../output/', fileName)
		fs.writeFileSync(filePath, payload.data)
	}
})

countertop.start()
