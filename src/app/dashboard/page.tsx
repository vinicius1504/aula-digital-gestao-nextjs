export default function DashboardPage() {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="text-sm text-gray-500">Total de Alunos</p>
            <p className="text-xl font-semibold text-blue-600">120</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="text-sm text-gray-500">Turmas</p>
            <p className="text-xl font-semibold text-blue-600">8</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="text-sm text-gray-500">Aulas Programadas</p>
            <p className="text-xl font-semibold text-blue-600">24</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="text-sm text-gray-500">Eventos</p>
            <p className="text-xl font-semibold text-blue-600">5</p>
          </div>
        </div>
      </div>
    );
  }
  