import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardWithForm() {
  return (
    <Card className="w-[30rem] h-[19rem] bg-black border-gray-700 ">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Create NFTs</CardTitle>
        <CardDescription>Create your new NFTs in one-click.</CardDescription>
      </CardHeader>
      <CardContent className="translate-y-5">
        <form>
          <div className="grid w-full items-center gap-4">
           
            <div className="flex flex-col space-y-1.5">
              <Label className="text-white" htmlFor="framework">NFTs</Label>
              <Select>
                <SelectTrigger className="text-white" id="framework">
                  <SelectValue className="text-white" placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Just Spaceship</SelectItem>
                  <SelectItem value="sveltekit">Earth</SelectItem>


                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between translate-y-7">
        <Button variant="outline">Cancel</Button>
        <Button variant="custom_yellow">Verify</Button>
      </CardFooter>
    </Card>
  )
}
