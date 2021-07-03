import fs from 'fs'
import path from 'path'
import { dataTypes } from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import { VideoFileIngestionAppliance } from '@tvkitchen/appliance-video-file-ingestion'
import { VideoImageExtractorAppliance } from '@tvkitchen/appliance-video-image-extractor'

const countertop = new Countertop()

countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: path.join(__dirname, '../data/sample.ts'),
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
