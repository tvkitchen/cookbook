import path from 'path'
import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoFileIngestionAppliance } from '@tvkitchen/appliance-video-file-ingestion'
import { VideoCaptionExtractorAppliance } from '@tvkitchen/appliance-video-caption-extractor'

const countertop = new Countertop()

countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: path.join(__dirname, '../data/sample.ts'),
})
countertop.addAppliance(VideoCaptionExtractorAppliance)

countertop.on('data', (payload) => {
	if (payload.type === dataTypes.TEXT.ATOM) {
		process.stdout.write(payload.data)
	}
})

countertop.start()
