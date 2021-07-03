import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoHttpReceiverAppliance } from '@tvkitchen/appliance-video-http-receiver'
import { VideoCaptionExtractorAppliance } from '@tvkitchen/appliance-video-caption-extractor'

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

countertop.addAppliance(VideoHttpReceiverAppliance, {
	url: streamUrl,
})
countertop.addAppliance(VideoCaptionExtractorAppliance)

countertop.on('data',
	(payload) => {
		if (payload.type === dataTypes.TEXT.ATOM) {
			process.stdout.write(payload.data)
		}
	})

countertop.start()
