import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { IoInformationCircleSharp } from "react-icons/io5"

export function AlertDemo() {
  return (
    <Alert className="max-w-lg lg:h-10 border-yellow-500 flex  items-center gap-x-3">
        <div><IoInformationCircleSharp className="text-yellow-500 text-2xl"/>
</div>
      <AlertDescription className="text-xs">
      You can merge NFTs by clicking on the NFTs listed below.
     </AlertDescription>
    </Alert>
  )
}
