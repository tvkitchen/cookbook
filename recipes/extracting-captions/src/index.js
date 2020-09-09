import { Countertop } from '@tvkitchen/countertop'
import { VideoFileIngestionAppliance } from '@tvkitchen/appliance-video-file-ingestion'
import { CcExtractorAppliance } from '@tvkitchen/appliance-ccextractor'

const countertop = new Countertop()
countertop.addAppliance(VideoFileIngestionAppliance, {
	filePath: ''
})
countertop.addAppliance(CcExtractorAppliance)
countertop.start()
