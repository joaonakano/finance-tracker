import { UploadIcon } from "lucide-react"
import { useCSVReader } from "react-papaparse"

import { Button } from "@renderer/components/ui/button"

type Props = {
    onUpload: (result: any) => void
}

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader()
    
    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto p-4"
                    {...getRootProps()}
                >
                    <UploadIcon className="size-4 mr-2" />
                    Importar    
                </Button>
            )}
        </CSVReader>
    )
}