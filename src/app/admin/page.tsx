export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <a href="/admin/InvManagement" className="block p-4 border rounded-lg hover:bg-gray-100">
          Inventory Management
        </a>
        <a href="/admin/sub-admin2" className="block p-4 border rounded-lg hover:bg-gray-100">
          Go to Sub-Admin 2
        </a>
      </div>
    </div>
  )
}