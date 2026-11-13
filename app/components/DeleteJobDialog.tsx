'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Job } from "../dashboard/recruiter/jobs/new/page"
import { deleteJob } from "@/lib/action/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

//className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#777982] transition-colors hover:border-red-500/40 "


export function DeleteJobDialog({ job }: { job: Job }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        // const res = fetch(``, {
        console.log(job._id)
        // })
        const res = await deleteJob(job._id)
        console.log('deleting', res)
        if (res.deletedCount) {
            setOpen(false)
            toast.add({
                title: "Job Deleted",
                description: "Sunday, December 3 at 9:00 AM",
            })
            router.refresh()
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={<Button className='hover:bg-red-500/10 hover:text-red-400' variant="outline"><Trash2 className="size-3.5 " /></Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
