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
                    variant="outline"
                    className="w-full lg:w-auto gap-2 rounded-lg"
                    {...getRootProps()}
                >
                    <UploadIcon className="size-4" />
                    Importar    
                </Button>
            )}
        </CSVReader>
    )
}