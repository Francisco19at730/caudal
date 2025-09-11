import { useState, useEffect } from ‘react’;

// Sistema de Acreditación Metrológica - Solo Caudal
const CaudalSystem = () => {
const [searchTerm, setSearchTerm] = useState(’’);
const [editingItem, setEditingItem] = useState(null);
const [tempProgress, setTempProgress] = useState(’’);
const [tempComment, setTempComment] = useState(’’);
const [lastSaved, setLastSaved] = useState(null);
const [generatingReport, setGeneratingReport] = useState(false);

// Lista completa de anexos para Caudal
const annexes = [
{ id: 11, name: “Procedimiento de calibración”, icon: “🔧” },
{ id: 12, name: “Procedimiento para incertidumbre”, icon: “📊” },
{ id: 13, name: “Procedimiento de verificaciones”, icon: “✅” },
{ id: 14, name: “Procedimiento para el aseguramiento”, icon: “🛡” },
{ id: 15, name: “Procedimientos para patrones”, icon: “📐” },
{ id: 16, name: “Procedimientos para los ítems de calibración”, icon: “📄” },
{ id: 17, name: “Validación de método”, icon: “✅” },
{ id: 18, name: “Presupuesto de la incertidumbre”, icon: “📊” },
{ id: 19, name: “Informe de validación de HC”, icon: “📋” },
{ id: 20, name: “Condiciones ambientales”, icon: “🌡” },
{ id: 21, name: “Personal”, icon: “👥” },
{ id: “22a”, name: “Alcance solicitado”, icon: “📄” },
{ id: “22b”, name: “Declaración de conformidad”, icon: “✅” },
{ id: 26, name: “Equipos”, icon: “⚙” },
{ id: 27, name: “Aseguramiento de los resultados”, icon: “🔒” },
{ id: 28, name: “Lista de persona(s) autorizada”, icon: “👥” },
{ id: 29, name: “Ejemplo de certificado”, icon: “📜” },
{ id: 30, name: “Lista de Interlaboratorios”, icon: “🏢” }
];

// Configuración específica para Caudal
const caudalConfig = {
id: ‘caudal’,
name: ‘Medición de Caudal’,
icon: ‘💧’,
color: ‘#2196F3’,
description: ‘Acreditación para medición de caudal de fluidos’
};

// Crear datos iniciales solo para Caudal
const createInitialData = () => {
const initial = {};
annexes.forEach(annex => {
initial[annex.id] = {
progress: 1,
comment: ‘’,
lastUpdated: new Date().toISOString().split(‘T’)[0]
};
});
return initial;
};

// Estado para datos de progreso
const [progressData, setProgressData] = useState(() => {
try {
const savedData = localStorage.getItem(‘caudal-acreditacion’);
if (savedData) {
const parsed = JSON.parse(savedData);
// Verificar integridad
annexes.forEach(annex => {
if (!parsed[annex.id]) {
parsed[annex.id] = {
progress: 1,
comment: ‘’,
lastUpdated: new Date().toISOString().split(‘T’)[0]
};
}
});
return parsed;
}
} catch (error) {
console.error(‘Error loading saved data:’, error);
}
return createInitialData();
});

// Guardar automáticamente
useEffect(() => {
try {
localStorage.setItem(‘caudal-acreditacion’, JSON.stringify(progressData));
setLastSaved(new Date());
} catch (error) {
console.error(‘Error saving data:’, error);
}
}, [progressData]);

// Funciones de manejo
const updateProgress = (annexId, progress, comment) => {
setProgressData(prev => ({
…prev,
[annexId]: {
progress: parseInt(progress),
comment,
lastUpdated: new Date().toISOString().split(‘T’)[0]
}
}));
};

const startEditing = (annexId) => {
const current = progressData[annexId];
setEditingItem(annexId);
setTempProgress(current.progress.toString());
setTempComment(current.comment);
};

const saveEditing = (annexId) => {
updateProgress(annexId, tempProgress, tempComment);
setEditingItem(null);
setTempProgress(’’);
setTempComment(’’);
};

const cancelEditing = () => {
setEditingItem(null);
setTempProgress(’’);
setTempComment(’’);
};

const exportData = () => {
const dataStr = JSON.stringify(progressData, null, 2);
const dataBlob = new Blob([dataStr], {type: ‘application/json’});
const url = URL.createObjectURL(dataBlob);
const link = document.createElement(‘a’);
link.href = url;
link.download = caudal-backup-${new Date().toISOString().split('T')[0]}.json;
link.click();
URL.revokeObjectURL(url);
};

const importData = (event) => {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onload = (e) => {
try {
const importedData = JSON.parse(e.target.result);
setProgressData(importedData);
alert(‘Datos importados exitosamente!’);
} catch (error) {
alert(‘Error al importar el archivo.’);
}
};
reader.readAsText(file);
}
};

const resetData = () => {
if (window.confirm(’¿Estás seguro de resetear todos los datos de Caudal?’)) {
setProgressData(createInitialData());
}
};

// Funciones utilitarias
const getProgressColor = (progress) => {
if (progress <= 3) return ‘#f44336’;
if (progress <= 6) return ‘#FF9800’;
if (progress <= 8) return ‘#2196F3’;
return ‘#4CAF50’;
};

const getStatusText = (progress) => {
if (progress === 10) return ‘Completado’;
if (progress >= 7) return ‘Avanzado’;
if (progress >= 4) return ‘En Progreso’;
return ‘Iniciando’;
};

const calculateOverallProgress = () => {
const total = annexes.reduce((sum, annex) => sum + progressData[annex.id].progress, 0);
return Math.round(total / annexes.length);
};

// Generar reporte específico para Caudal
const generateReport = () => {
setGeneratingReport(true);


setTimeout(() => {
  const overallProgress = calculateOverallProgress();
  const completedAnnexes = annexes.filter(annex => progressData[annex.id].progress === 10);
  const urgentAnnexes = annexes.filter(annex => progressData[annex.id].progress <= 3);
  
  const reportHTML = `


<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Acreditación - Caudal</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 28px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; border: 1px solid #e0e0e0; }
        .stat-value { font-size: 32px; font-weight: bold; color: #2196F3; margin-bottom: 10px; }
        .progress-table { width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .progress-table th { background: #2196F3; color: white; padding: 15px; text-align: left; }
        .progress-table td { padding: 12px 15px; border-bottom: 1px solid #ddd; }
        .progress-table tr:nth-child(even) { background: #f9f9f9; }
        .progress-bar { width: 100px; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 10px; }
        .recommendations { background: #f5f5f5; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #2196F3; }
        .urgent-items { background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #FF9800; }
    </style>
</head>
<body>
    <div class="header">
        <h1>💧 REPORTE DE ACREDITACIÓN - CAUDAL</h1>
        <p>Sistema de Medición de Caudal de Fluidos</p>
        <p>Fecha: ${new Date().toLocaleDateString('es-ES')}</p>
    </div>


<div class="stats">
    <div class="stat-card">
        <div class="stat-value">${overallProgress}/10</div>
        <p>Progreso General</p>
    </div>
    <div class="stat-card">
        <div class="stat-value">${completedAnnexes.length}</div>
        <p>Anexos Completados</p>
    </div>
    <div class="stat-card">
        <div class="stat-value">${urgentAnnexes.length}</div>
        <p>Anexos Urgentes</p>
    </div>
    <div class="stat-card">
        <div class="stat-value">${annexes.length}</div>
        <p>Total Anexos</p>
    </div>
</div>

${urgentAnnexes.length > 0 ? `
<div class="urgent-items">
    <h3>⚠ Anexos que Requieren Atención Urgente</h3>
    <ul>
        ${urgentAnnexes.map(annex => `<li><strong>Anexo ${annex.id}</strong>: ${annex.name}</li>`).join('')}
    </ul>
</div>
` : ''}

<h2>Estado Detallado de Anexos</h2>
<table class="progress-table">
    <thead>
        <tr>
            <th>Anexo</th>
            <th>Progreso</th>
            <th>Estado</th>
            <th>Última Actualización</th>
            <th>Observaciones</th>
        </tr>
    </thead>
    <tbody>
        ${annexes.map(annex => {
            const data = progressData[annex.id];
            const progress = data.progress;
            return `
                <tr>
                    <td>${annex.icon} <strong>${annex.id}</strong> - ${annex.name}</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress * 10}%; background: ${getProgressColor(progress)}"></div>
                        </div>
                        <small>${progress * 10}%</small>
                    </td>
                    <td style="color: ${getProgressColor(progress)}; font-weight: bold;">${getStatusText(progress)}</td>
                    <td>${data.lastUpdated}</td>
                    <td>${data.comment || '<em>Sin comentarios</em>'}</td>
                </tr>
            `;
        }).join('')}
    </tbody>
</table>

<div class="recommendations">
    <h3>📋 Recomendaciones</h3>
    <ul>
        ${urgentAnnexes.length > 0 ? `<li><strong>Prioridad Alta:</strong> Atender ${urgentAnnexes.length} anexo(s) en estado inicial</li>` : ''}
        <li><strong>Seguimiento:</strong> Realizar revisiones semanales del progreso</li>
        <li><strong>Documentación:</strong> Mantener registros actualizados de cada anexo</li>
        <li><strong>Preparación para Auditoría:</strong> ${overallProgress >= 8 ? 'Sistema listo para auditoría' : `Alcanzar 80% de progreso antes de solicitar auditoría (actual: ${overallProgress * 10}%)`}</li>
        <li><strong>Personal:</strong> Asegurar capacitación continua del equipo técnico</li>
    </ul>
</div>

<div style="text-align: center; margin-top: 40px; padding: 20px; border-top: 2px solid #e0e0e0; color: #666;">
    <p><strong>Sistema de Acreditación Metrológica - Caudal</strong></p>
    <p>Generado el ${new Date().toLocaleString('es-ES')}</p>
    <p><em>Este reporte es confidencial y de uso interno</em></p>
</div>


</body>
</html>`;


  const reportWindow = window.open('', '_blank');
  reportWindow.document.write(reportHTML);
  reportWindow.document.close();
  
  setGeneratingReport(false);
}, 1000);


};

const overallProgress = calculateOverallProgress();
const filteredAnnexes = annexes.filter(annex =>
annex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
annex.id.toString().includes(searchTerm)
);

return (
<div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 p-6">
<div className="max-w-6xl mx-auto">
{/* Header */}
<div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
<div className="flex justify-between items-start flex-wrap gap-6">
<div>
<h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
💧 Acreditación Metrológica - Caudal
</h1>
<p className="text-gray-600 text-lg">Sistema de medición de caudal de fluidos</p>
{lastSaved && (
<p className="text-green-600 text-sm mt-2 font-medium">
Último guardado: {lastSaved.toLocaleString(‘es-ES’)}
</p>
)}
</div>


        <div className="flex gap-3 flex-wrap">
          <button
            onClick={generateReport}
            disabled={generatingReport}
            className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md"
          >
            📄 {generatingReport ? 'Generando...' : 'Generar Reporte'}
          </button>
          
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            💾 Exportar
          </button>
          
          <label className="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md cursor-pointer">
            📁 Importar
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
          
          <button
            onClick={resetData}
            className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>

    {/* Stats Card */}
    <div className="bg-white rounded-2xl p-8 mb-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        {caudalConfig.icon} {caudalConfig.name}
      </h2>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div 
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#2196F3 ${overallProgress * 36}deg, #e2e8f0 0deg)`
          }}
        >
          <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-blue-600">{overallProgress}</div>
            <div className="text-gray-500">de 10</div>
          </div>
        </div>
      </div>
      
      <p className="text-3xl font-bold text-blue-600 mb-2">
        {overallProgress * 10}% Completado
      </p>
      <p className="text-gray-600">{caudalConfig.description}</p>
    </div>

    {/* Search */}
    <div className="bg-white rounded-xl p-6 mb-6">
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
          🔍
        </span>
        <input
          type="text"
          placeholder="Buscar anexos..."
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* Annexes */}
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-2xl font-bold text-blue-600 mb-6">Anexos de Acreditación</h3>
      <div className="space-y-4">
        {filteredAnnexes.map(annex => {
          const data = progressData[annex.id];
          const isEditing = editingItem === annex.id;
          
          return (
            <div
              key={annex.id}
              className={`border-2 rounded-xl p-5 transition-all ${
                data.progress === 10 
                  ? 'bg-green-50 border-green-500' 
                  : isEditing 
                    ? 'bg-orange-50 border-orange-500' 
                    : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{annex.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      Anexo {annex.id} - {annex.name}
                      {data.progress === 10 && <span className="ml-2 text-green-500">✓</span>}
                    </h4>
                    {!isEditing && data.comment && (
                      <p className="text-gray-600 mt-2">{data.comment}</p>
                    )}
                    {isEditing && (
                      <div className="mt-3 space-y-3">
                        <select
                          value={tempProgress}
                          onChange={(e) => setTempProgress(e.target.value)}
                          className="border-2 border-gray-200 rounded-md px-3 py-2"
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}/10</option>
                          ))}
                        </select>
                        <textarea
                          value={tempComment}
                          onChange={(e) => setTempComment(e.target.value)}
                          placeholder="Observaciones..."
                          className="w-full border-2 border-gray-200 rounded-md px-3 py-2 resize-vertical"
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {!isEditing && (
                    <>
                      <div className="text-center">
                        <div
                          className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: getProgressColor(data.progress) }}
                        >
                          {getStatusText(data.progress)}
                        </div>
                        <div className="text-xl font-bold mt-2">{data.progress}/10</div>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-500"
                            style={{
                              backgroundColor: getProgressColor(data.progress),
                              width: `${data.progress * 10}%`
                            }}
                          />
                        </div>
                      </div>
                      
                      <button
                        onClick={() => startEditing(annex.id)}
                        className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        ✏
                      </button>
                    </>
                  )}
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEditing(annex.id)}
                        className="p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        ✅
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        ❌
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>


);
};

export default CaudalSystem;
