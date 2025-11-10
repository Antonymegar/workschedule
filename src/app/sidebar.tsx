'use client'
import { Workflow} from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  { label: 'Manage Work Order', icon: Workflow, href: '/' },
  
]

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="p-6 text-lg font-bold text-gray-700 border-b">Work order</div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
          >
            <Icon className="w-5 h-5 text-gray-500" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
