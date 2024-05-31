import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"

import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    return (
        <nav className="flex justify-between p-4 h-[15vh] bg-red-600 text-white">
            <div className="w-full flex lg:hidden justify-between items-center mx-4">
                <h1>Blogs</h1>
                <Sheet>
                    <SheetTrigger><MenuIcon /></SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        </SheetHeader>
                        <ul className="flex flex-col items-center justify-between align-middle gap-2 my-4">
                            <li className="text-gray-800 block py-2 cursor-pointer">Home</li>
                            <li className="text-gray-800 block py-2 cursor-pointer">Create Post</li>
                            <li className="text-gray-800 block py-2 cursor-pointer">My Profile</li>
                        </ul>
                    </SheetContent>
                </Sheet>

            </div>
            <div className='hidden lg:flex justify-between items-center w-full mx-4 text-white'>
                <h1>Blogs</h1>
                <ul className="flex justify-between align-middle gap-4 mx-4">
                    <li className="block py-2 cursor-pointer">Home</li>
                    <li className="block py-2 cursor-pointer">Create Post</li>
                    <li className="block py-2 cursor-pointer">My Profile</li>
                </ul>
            </div>
        </nav>
    )
}