import fs from 'fs'
import path from 'path'
import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoFileIngestionAppliance } from '@tvkitchen/appliance-video-file-ingestion'
import { CCExtractorAppliance } from '@tvkitchen/appliance-ccextractor'
import { CaptionSrtGeneratorAppliance } from '@tvkitchen/appliance-caption-srt-generator'

const countertop = new Countertop()

countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: path.join(__dirname, '../data/sample.ts'),
})
countertop.addAppliance(CCExtractorAppliance)
countertop.addAppliance(CaptionSrtGeneratorAppliance)

countertop.on('data', (payload) => {
	if (payload.type === 'TEXT.SRT') {
		console.log(payload)
	}
	if (payload.type === 'TEXT.ATOM') {
		//console.log(payload)
	}
})

countertop.start()
