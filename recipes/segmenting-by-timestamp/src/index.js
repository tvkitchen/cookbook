import fs from 'fs'
import path from 'path'
import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoFileIngestionAppliance } from '@tvkitchen/appliance-video-file-ingestion'
import { CCExtractorAppliance } from '@tvkitchen/appliance-ccextractor'
import { VideoSegmentGeneratorAppliance } from '@tvkitchen/appliance-video-segment-generator'

const countertop = new Countertop()
countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: path.join(__dirname, '../data/sample.ts'),
})
countertop.addAppliance(CCExtractorAppliance)
countertop.addAppliance(
	VideoSegmentGeneratorAppliance,
	{
		interval: 1000,
		segments: [0],
	}
)

countertop.on('data', (payload) => {
	if (payload.type === 'SEGMENT.START') {
		process.stdout.write(`\n====NEW SEGMENT (${payload.position})=====\n`)
	}
	if (payload.type === 'TEXT.ATOM') {
		process.stdout.write(payload.data)
	}
})

countertop.start()
