import path from 'path'
import {
	applianceEvents,
	dataTypes,
} from '@tvkitchen/base-constants'
import { Countertop } from '@tvkitchen/countertop'
import VideoFileIngestionAppliance from '@tvkitchen/appliance-video-file-ingestion'
import CcExtractorAppliance from '@tvkitchen/appliance-ccextractor'

// Create the Countertop
const countertop = new Countertop({
	kafkaSettings: {
		brokers: ['127.0.0.1:9092'],
	},
})

// Add the Appliances
countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: path.join(__dirname, '../data/sample.ts'),
})
countertop.addAppliance(CcExtractorAppliance)

// Register a Payload event handler
countertop.on(
	applianceEvents.PAYLOAD,
	(payload) => {
		if (payload.type === dataTypes.TEXT.ATOM) {
			console.log(payload)
		}
	},
)

// Start processing
countertop.start()
