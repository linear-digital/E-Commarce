export default function Custom404({ params }) {
  return <div className="flex items-center justify-center w-full h-96">
    <h2><span className="text-red-500 uppercase font-bold">{params.status}</span> - Page Not Found</h2>
  </div>
}