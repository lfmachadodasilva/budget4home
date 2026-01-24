import { formatCurrency } from 'common'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Budget4Home</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your home budget with ease
        </p>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="text-lg">
            Example from common package: {formatCurrency(1234.56)}
          </p>
        </div>
      </div>
    </main>
  )
}
