
import React, { useState } from 'react'
import { Button } from "@/components/admin/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/admin/ui/dialog"
import { Input } from "@/components/admin/ui/input"
import { Label } from "@/components/admin/ui/label"
import { Plus } from 'lucide-react'

interface myProps {
    addItems: (value: string) => void;
}

const AddItemModal: React.FC<myProps> = ({ addItems }) => {
    const [value, setValue] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const onSubmit = () => {
        addItems(value);
        setOpen(false);
    }
    return (
        <div>
            <Dialog onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button><Plus /> Add NavItem</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New NavItem</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nav Item
                            </Label>
                            <Input
                                id="name"
                                defaultValue="New Value"
                                className="col-span-3"
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={onSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddItemModal;