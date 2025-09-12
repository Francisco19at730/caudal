import React, { useState, useEffect } from 'react';

// Estilos mejorados
const styles = {
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '32px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  subtitle: {
    color: '#718096',
    fontSize: '18px'
  },
  savedText: {
    fontSize: '14px',
    color: '#48bb78',
    marginTop: '8px',
    fontWeight: '500'
  },
  headerControls: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  buttonBlue: {
    backgroundColor: '#4299e1',
    color: 'white'
  },
  buttonGreen: {
    backgroundColor: '#48bb78',
    color: 'white'
  },
  buttonRed: {
    backgroundColor: '#f56565',
    color: 'white'
  },
  buttonPurple: {
    backgroundColor: '#9f7aea',
    color: 'white'
  },
  buttonGray: {
    backgroundColor: '#e2e8f0',
    color: '#4a5568'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    padding: '24px',
    position: 'relative',
    overflow: 'hidden'
  },
  statCardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#2d3748'
  },
  statSubValue: {
    fontSize: '14px',
    color: '#a0aec0',
    marginTop: '4px'
  },
  statIcon: {
    fontSize: '32px',
    opacity: '0.8'
  },
  filterCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    padding: '24px',
    marginBottom: '32px'
  },
  searchContainer: {
    position: 'relative',
    flex: '1'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    fontSize: '20px'
  },
  searchInput: {
    width: '100%',
    paddingLeft: '48px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.3s',
    outline: 'none'
  },
  accreditationCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    marginBottom: '32px',
    overflow: 'hidden'
  },
  accreditationHeader: {
    padding: '28px',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  accreditationTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  accreditationIcon: {
    fontSize: '36px'
  },
  accreditationContent: {
    padding: '28px'
  },
  annexGrid: {
    display: 'grid',
    gap: '16px'
  },
  annexItem: {
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s',
    backgroundColor: '#f8fafc'
  },
  annexContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px'
  },
  annexLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: '1'
  },
  annexIcon: {
    fontSize: '24px'
  },
  annexTitle: {
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '16px'
  },
  progressContainer: {
    textAlign: 'center',
    minWidth: '120px'
  },
  progressBadge: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    color: 'white',
    display: 'inline-block'
  },
  progressBar: {
    width: '120px',
    marginTop: '8px'
  },
  progressBarTrack: {
    width: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: '10px',
    height: '10px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '10px',
    borderRadius: '10px',
    transition: 'all 0.5s ease-out'
  },
  select: {
    padding: '8px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    minWidth: '80px'
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  iconButton: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '18px'
  }
};

const CaudalDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [tempProgress, setTempProgress] = useState('');
  const [tempComment, setTempComment] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  // Lista completa de anexos
  const annexes = [
    { id: 11, name: "Procedimiento de calibración", icon: "⚙️" },
    { id: 12, name: "Procedimiento para incertidumbre", icon: "📊" },
    { id: 13, name: "Procedimiento de verificaciones", icon: "✅" },
    { id: 14, name: "Procedimiento para el aseguramiento", icon: "⚠️" },
    { id: 15, name: "Procedimientos para patrones", icon: "⚙️" },
    { id: 16, name: "Procedimientos para los ítems de calibración", icon: "📄" },
    { id: 17, name: "Validación de método", icon: "✅" },
    { id: 18, name: "Presupuesto de la incertidumbre", icon: "📊" },
    { id: 19, name: "Informe de validación de HC", icon: "📄" },
    { id: 20, name: "Condiciones ambientales", icon: "⚙️" },
    { id: 21, name: "Personal", icon: "👥" },
    { id: "22a", name: "Alcance solicitado", icon: "📄" },
    { id: "22b", name: "Declaración de conformidad", icon: "✅" },
    { id: 26, name: "Equipos", icon: "⚙️" },
    { id: 27, name: "Aseguramiento de los resultados", icon: "⚠️" },
    { id: 28, name: "Lista de persona(s) autorizada", icon: "👥" },
    { id: 29, name: "Ejemplo de certificado", icon: "📄" },
    { id: 30, name: "Lista de Interlaboratorios", icon: "👥" }
  ];

  // Única acreditación: Caudal
  const accreditation = { 
    id: 'caudal', 
    name: 'Medidores de Caudal', 
    icon: '🌊',
    color: '#4299e1',
    description: 'Acreditación para medición de caudal en líquidos y gases'
  };

  // Función para crear datos iniciales
  const createInitialData = () => {
    const initial = { caudal: {} };
    annexes.forEach(annex => {
      initial.caudal[annex.id] = {
        progress: 1,
        comment: '',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    });
    return initial;
  };

  // Cargar datos desde LocalStorage
  const [progressData, setProgressData] = useState(() => {
    try {
      const savedData = localStorage.getItem('acreditacion-caudal');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        
        // Verificar que existan todos los anexos
        if (!parsed.caudal) {
          parsed.caudal = {};
        }
        
        annexes.forEach(annex => {
          if (!parsed.caudal[annex.id]) {
            parsed.caudal[annex.id] = {
              progress: 1,
              comment: '',
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          }
          // Verificar propiedades
          if (!parsed.caudal[annex.id].lastUpdated) {
            parsed.caudal[annex.id].lastUpdated = new Date().toISOString().split('T')[0];
          }
          if (parsed.caudal[annex.id].progress === undefined) {
            parsed.caudal[annex.id].progress = 1;
          }
          if (!parsed.caudal[annex.id].comment) {
            parsed.caudal[annex.id].comment = '';
          }
        });
        
        return parsed;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
      return createInitialData();
    }
    return createInitialData();
  });

  // Guardar automáticamente
  useEffect(() => {
    try {
      localStorage.setItem('acreditacion-caudal', JSON.stringify(progressData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [progressData]);

  const updateProgress = (annexId, progress, comment) => {
    setProgressData(prev => ({
      ...prev,
      caudal: {
        ...prev.caudal,
        [annexId]: {
          progress: parseInt(progress),
          comment,
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      }
    }));
  };

  const startEditing = (annexId) => {
    const current = progressData.caudal[annexId];
    setEditingItem(annexId);
    setTempProgress(current.progress.toString());
    setTempComment(current.comment);
  };

  const saveEditing = (annexId) => {
    updateProgress(annexId, tempProgress, tempComment);
    setEditingItem(null);
    setTempProgress('');
    setTempComment('');
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setTempProgress('');
    setTempComment('');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `acreditacion-caudal-backup-${new Date().toISOString().split('T')[0]}.json`;
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
          alert('¡Datos importados exitosamente!');
        } catch (error) {
          alert('Error al importar el archivo. Verifica que sea un archivo válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetAllData = () => {
    if (window.confirm('⚠️ ¿Estás seguro de que quieres resetear TODOS los datos? Esta acción no se puede deshacer.')) {
      setProgressData(createInitialData());
      alert('Todos los datos han sido reseteados.');
    }
  };

  const getProgressColor = (progress) => {
    if (progress <= 3) return '#f56565';
    if (progress <= 6) return '#ed8936';
    if (progress <= 8) return '#4299e1';
    return '#48bb78';
  };

  const getStatusText = (progress) => {
    if (progress === 10) return 'Completado';
    if (progress >= 7) return 'Avanzado';
    if (progress >= 4) return 'En Progreso';
    return 'Iniciando';
  };

  const calculateProgress = () => {
    const annexProgress = annexes.map(annex => progressData.caudal[annex.id].progress);
    return Math.round(annexProgress.reduce((acc, p) => acc + p, 0) / annexes.length);
  };

  const generateHTMLReport = () => {
    setGeneratingReport(true);
    
    const overallProgress = calculateProgress();
    
    // Identificar anexos por estado
    const completedAnnexes = annexes.filter(annex => progressData.caudal[annex.id].progress === 10);
    const urgentAnnexes = annexes.filter(annex => progressData.caudal[annex.id].progress <= 2);
    const delayedAnnexes = annexes.filter(annex => {
      const progress = progressData.caudal[annex.id].progress;
      return progress > 2 && progress < 5;
    });
    
    // Actividad reciente
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7*24*60*60*1000);
    const recentlyUpdated = annexes.filter(annex => {
      const updateDate = new Date(progressData.caudal[annex.id].lastUpdated);
      return updateDate >= weekAgo;
    });
    
    const estimatedCompletionDays = Math.max(30, (10 - overallProgress) * 7);
    const projectedCompletion = new Date(today.getTime() + estimatedCompletionDays*24*60*60*1000);
    
    const reportHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Ejecutivo - Acreditación Medidores de Caudal ${new Date().toLocaleDateString('es-ES')}</title>
    <style>
        @page { size: A4; margin: 20mm; }
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2d3748; background: white; }
        .container { max-width: 210mm; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4299e1 0%, #2b77cb 100%); color: white; padding: 40px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header .subtitle { font-size: 18px; opacity: 0.95; margin-bottom: 5px; }
        .header .date { margin-top: 20px; font-size: 14px; opacity: 0.9; }
        .alert-box { padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 5px solid; }
        .alert-success { background: #f0fff4; border-left-color: #48bb78; color: #22543d; }
        .alert-warning { background: #fffbeb; border-left-color: #ed8936; color: #744210; }
        .alert-danger { background: #fff5f5; border-left-color: #f56565; color: #742a2a; }
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .kpi-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 4px solid; }
        .kpi-success { border-left-color: #48bb78; }
        .kpi-warning { border-left-color: #ed8936; }
        .kpi-danger { border-left-color: #f56565; }
        .kpi-info { border-left-color: #4299e1; }
        .kpi-card h3 { color: #2d3748; margin-bottom: 10px; font-size: 16px; }
        .kpi-card .metric { font-size: 32px; font-weight: bold; margin-bottom: 5px; }
        .kpi-success .metric { color: #48bb78; }
        .kpi-warning .metric { color: #ed8936; }
        .kpi-danger .metric { color: #f56565; }
        .kpi-info .metric { color: #4299e1; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 24px; color: #2d3748; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .recommendations { background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%); padding: 30px; border-radius: 10px; margin-top: 40px; }
        .recommendations h2 { color: #4299e1; margin-bottom: 20px; }
        .recommendations h3 { color: #4a5568; margin: 20px 0 10px 0; }
        .recommendations ul { list-style: none; padding-left: 0; }
        .recommendations li { margin-bottom: 12px; padding-left: 25px; position: relative; }
        .recommendations li:before { content: "✓"; position: absolute; left: 0; color: #48bb78; font-weight: bold; }
        .priority-high { color: #e53e3e; font-weight: bold; }
        .priority-medium { color: #dd6b20; font-weight: 600; }
        .priority-low { color: #38a169; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; }
        .print-button { position: fixed; top: 20px; right: 20px; padding: 12px 24px; background: linear-gradient(135deg, #4299e1 0%, #2b77cb 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0,0,0,0.15); }
        .accreditation-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        .accreditation-table th { background: linear-gradient(135deg, #4299e1 0%, #2b77cb 100%); color: white; padding: 15px; text-align: left; font-weight: 600; }
        .accreditation-table td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; }
        .accreditation-table tr:nth-child(even) { background: #f8fafc; }
        .executive-summary { background: #f8fafc; border-left: 4px solid #4299e1; padding: 25px; margin-bottom: 30px; border-radius: 8px; }
        .executive-summary h2 { color: #4299e1; margin-bottom: 15px; font-size: 24px; }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
    
    <div class="container">
        <div class="header">
            <h1>🌊 REPORTE EJECUTIVO</h1>
            <p class="subtitle">Acreditación Metrológica - Medidores de Caudal</p>
            <p class="subtitle">Sistema de Gestión de Calidad</p>
            <p class="date">Fecha: ${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} | Hora: ${new Date().toLocaleTimeString('es-ES')}</p>
        </div>
        
        ${overallProgress >= 8 ? `
            <div class="alert-box alert-success">
                <h3>✅ ESTADO GENERAL: ÓPTIMO</h3>
                <p>La acreditación de medidores de caudal mantiene un avance excelente con ${overallProgress * 10}% de progreso general.</p>
            </div>
        ` : overallProgress >= 6 ? `
            <div class="alert-box alert-warning">
                <h3>⚠️ ESTADO GENERAL: REQUIERE ATENCIÓN</h3>
                <p>La acreditación avanza con ${overallProgress * 10}% de progreso. Se requiere monitoreo de ${urgentAnnexes.length + delayedAnnexes.length} anexos críticos.</p>
            </div>
        ` : `
            <div class="alert-box alert-danger">
                <h3>🚨 ESTADO GENERAL: CRÍTICO</h3>
                <p>La acreditación requiere intervención inmediata. Solo ${overallProgress * 10}% de progreso con ${urgentAnnexes.length} anexos urgentes.</p>
            </div>
        `}
        
        <div class="section">
            <h2 class="section-title">📈 INDICADORES CLAVE</h2>
            <div class="kpi-grid">
                <div class="kpi-card kpi-info">
                    <h3>Progreso General</h3>
                    <div class="metric">${overallProgress * 10}%</div>
                    <p>Proyección: ${projectedCompletion.toLocaleDateString('es-ES')}</p>
                </div>
                
                <div class="kpi-card ${completedAnnexes.length > 15 ? 'kpi-success' : 'kpi-warning'}">
                    <h3>Anexos Completados</h3>
                    <div class="metric">${completedAnnexes.length}</div>
                    <p>de ${annexes.length} anexos totales</p>
                </div>
                
                <div class="kpi-card ${urgentAnnexes.length === 0 ? 'kpi-success' : 'kpi-danger'}">
                    <h3>Anexos Urgentes</h3>
                    <div class="metric">${urgentAnnexes.length}</div>
                    <p>Requieren acción inmediata</p>
                </div>
                
                <div class="kpi-card kpi-info">
                    <h3>Actividad Reciente</h3>
                    <div class="metric">${recentlyUpdated.length}</div>
                    <p>actualizaciones en 7 días</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">📋 PROGRESO DETALLADO</h2>
            <table class="accreditation-table">
                <thead>
                    <tr>
                        <th>Anexo</th>
                        <th>Descripción</th>
                        <th>Progreso</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${annexes.map(annex => {
                        const progress = progressData.caudal[annex.id].progress;
                        const status = progress === 10 ? 'Completado' : 
                                      progress >= 7 ? 'Avanzado' : 
                                      progress >= 4 ? 'En Progreso' : 'Iniciando';
                        return `
                            <tr>
                                <td><strong>${annex.id}</strong></td>
                                <td>${annex.name}</td>
                                <td>${progress * 10}%</td>
                                <td><span style="color: ${progress === 10 ? '#48bb78' : progress >= 7 ? '#4299e1' : progress >= 4 ? '#ed8936' : '#f56565'}">${status}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="recommendations">
            <h2>🎯 RECOMENDACIONES ESTRATÉGICAS</h2>
            
            <h3>1. ACCIONES INMEDIATAS</h3>
            <ul>
                ${urgentAnnexes.length > 0 ? `
                    <li class="priority-high">Asignar recursos adicionales a ${urgentAnnexes.length} anexos urgentes</li>
                ` : ''}
                <li class="priority-medium">Revisar asignación de personal técnico especializado</li>
                <li class="priority-low">Actualizar cronograma detallado del proyecto</li>
            </ul>
            
            <h3>2. OBJETIVOS CLAVE</h3>
            <ul>
                <li><strong>Semanal:</strong> Incremento mínimo de 5% en progreso general</li>
                <li><strong>Mensual:</strong> Completar todos los anexos críticos</li>
                <li><strong>Final:</strong> 100% de anexos implementados en ${estimatedCompletionDays} días</li>
            </ul>
        </div>
        
        <div class="section">
            <div class="executive-summary">
                <h2>📋 CONCLUSIONES EJECUTIVAS</h2>
                <p><strong>Estado Actual:</strong> La acreditación de medidores de caudal avanza con un ${overallProgress * 10}% de progreso general.</p>
                
                <p><strong>Situación de Riesgo:</strong> ${urgentAnnexes.length === 0 ? 
                    'Controlada - No se identificaron riesgos críticos inmediatos.' : 
                    `Requiere atención - ${urgentAnnexes.length} anexos en estado urgente que pueden impactar el cronograma.`}</p>
                
                <p><strong>Proyección:</strong> Con las acciones correctivas propuestas, se estima completar el proyecto en 
                ${estimatedCompletionDays} días (${projectedCompletion.toLocaleDateString('es-ES')}).</p>
                
                <p><strong>Recomendación Ejecutiva:</strong> ${overallProgress >= 7 ? 
                    'Mantener el ritmo actual y monitorear progreso semanalmente.' : 
                    'Implementar inmediatamente el plan de acción propuesto y considerar recursos adicionales.'}</p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Sistema de Gestión de Acreditaciones Metrológicas - Caudal</strong></p>
            <p>Laboratorio de Metrología | Reporte Confidencial Nivel Gerencial</p>
            <p>Generado automáticamente el ${new Date().toLocaleString('es-ES')}</p>
        </div>
    </div>
</body>
</html>
    `;
    
    // Abrir el reporte en una nueva ventana
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
    
    setTimeout(() => setGeneratingReport(false), 1000);
  };

  const overallProgress = calculateProgress();

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '20px'}}>
            <div>
              <h1 style={styles.title}>
                <span>🌊</span>
                Sistema de Acreditación Metrológica - Caudal
              </h1>
              <p style={styles.subtitle}>Control profesional de avance por anexos y procedimientos</p>
              <p style={{...styles.subtitle, fontSize: '16px', marginTop: '8px'}}>
                Acreditación para medición de caudal en líquidos y gases
              </p>
              {lastSaved && (
                <p style={styles.savedText}>
                  ✅ Último guardado automático: {lastSaved.toLocaleString('es-ES')}
                </p>
              )}
            </div>
            
            {/* Controles de datos */}
            <div style={styles.headerControls}>
              <button
                onClick={generateHTMLReport}
                style={{...styles.button, ...styles.buttonPurple}}
                disabled={generatingReport}
              >
                {generatingReport ? '⏳ Generando...' : '📋 Generar Reporte Ejecutivo'}
              </button>
              
              <button
                onClick={exportData}
                style={{...styles.button, ...styles.buttonBlue}}
              >
                💾 Exportar
              </button>
              
              <label style={{...styles.button, ...styles.buttonGreen, cursor: 'pointer'}}>
                📂 Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  style={{display: 'none'}}
                />
              </label>
              
              <button
                onClick={resetAllData}
                style={{...styles.button, ...styles.buttonRed}}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, #4299e1 0%, #2b77cb 100%)`,
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }} />
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Progreso General</p>
                <p style={{...styles.statValue, color: '#4299e1'}}>{overallProgress}/10</p>
                <p style={styles.statSubValue}>{overallProgress * 10}% Completado</p>
              </div>
              <span style={styles.statIcon}>📊</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: '#48bb78',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }} />
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Anexos Completados</p>
                <p style={{...styles.statValue, color: '#48bb78'}}>
                  {annexes.filter(annex => progressData.caudal[annex.id].progress === 10).length}
                </p>
                <p style={styles.statSubValue}>de {annexes.length} anexos</p>
              </div>
              <span style={styles.statIcon}>✅</span>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: '#ed8936',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }} />
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>En Progreso</p>
                <p style={{...styles.statValue, color: '#ed8936'}}>
                  {annexes.filter(annex => {
                    const p = progressData.caudal[annex.id].progress;
                    return p >= 4 && p < 10;
                  }).length}
                </p>
                <p style={styles.statSubValue}>anexos activos</p>
              </div>
              <span style={styles.statIcon}>⚙️</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: '#f56565',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px'
            }} />
            <div style={styles.statCardContent}>
              <div>
                <p style={styles.statLabel}>Requieren Atención</p>
                <p style={{...styles.statValue, color: '#f56565'}}>
                  {annexes.filter(annex => progressData.caudal[annex.id].progress < 4).length}
                </p>
                <p style={styles.statSubValue}>anexos críticos</p>
              </div>
              <span style={styles.statIcon}>⚠️</span>
            </div>
          </div>
        </div>

        {/* Search Filter */}
        <div style={styles.filterCard}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar anexos por nombre o número..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>

        {/* Accreditation Detail */}
        <div style={styles.accreditationCard}>
          <div style={{
            ...styles.accreditationHeader,
            background: `linear-gradient(135deg, ${accreditation.color} 0%, ${accreditation.color}dd 100%)`
          }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <h2 style={styles.accreditationTitle}>
                  <span style={styles.accreditationIcon}>{accreditation.icon}</span>
                  {accreditation.name}
                </h2>
                <p style={{marginTop: '8px', opacity: '0.95', fontSize: '16px'}}>
                  {accreditation.description}
                </p>
              </div>
              <div style={{textAlign: 'center', minWidth: '150px'}}>
                <p style={{fontSize: '14px', opacity: '0.9', marginBottom: '8px'}}>Progreso Total</p>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}>
                  <div style={{textAlign: 'center'}}>
                    <p style={{fontSize: '36px', fontWeight: 'bold'}}>
                      {overallProgress}
                    </p>
                    <p style={{fontSize: '14px', opacity: '0.9'}}>de 10</p>
                  </div>
                </div>
                <p style={{fontSize: '18px', marginTop: '8px', fontWeight: '600'}}>
                  {overallProgress * 10}%
                </p>
              </div>
            </div>
          </div>

          <div style={styles.accreditationContent}>
            <div style={styles.annexGrid}>
              {annexes
                .filter(annex => 
                  annex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  annex.id.toString().includes(searchTerm)
                )
                .map(annex => {
                  const data = progressData.caudal[annex.id];
                  const isEditing = editingItem === annex.id;
                  
                  return (
                    <div 
                      key={annex.id} 
                      style={{
                        ...styles.annexItem,
                        ...(data.progress === 10 ? {backgroundColor: '#f0fdf4', borderColor: '#48bb78'} : {}),
                        ...(isEditing ? {backgroundColor: '#fef3c7', borderColor: '#f59e0b'} : {})
                      }}
                      onMouseEnter={(e) => {
                        if (!isEditing) e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={styles.annexContent}>
                        <div style={styles.annexLeft}>
                          <span style={styles.annexIcon}>{annex.icon}</span>
                          <div style={{flex: 1}}>
                            <h3 style={styles.annexTitle}>
                              Anexo {annex.id} - {annex.name}
                              {data.progress === 10 && <span style={{marginLeft: '8px', color: '#48bb78'}}>✓</span>}
                            </h3>
                            {!isEditing && data.comment && (
                              <div style={{display: 'flex', alignItems: 'start', gap: '8px', marginTop: '8px'}}>
                                <span style={{color: '#4299e1', marginTop: '2px'}}>💬</span>
                                <p style={{fontSize: '14px', color: '#718096', lineHeight: '1.4'}}>
                                  {data.comment}
                                </p>
                              </div>
                            )}
                            {isEditing && (
                              <div style={{marginTop: '12px', display: 'grid', gap: '12px'}}>
                                <div>
                                  <label style={{fontSize: '13px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '6px'}}>
                                    Nivel de Avance:
                                  </label>
                                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <select
                                      value={tempProgress}
                                      onChange={(e) => setTempProgress(e.target.value)}
                                      style={styles.select}
                                    >
                                      {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                          {i + 1} - {i + 1 === 10 ? 'Completado' : i + 1 >= 7 ? 'Avanzado' : i + 1 >= 4 ? 'En Progreso' : 'Iniciando'}
                                        </option>
                                      ))}
                                    </select>
                                    <span style={{fontSize: '14px', color: '#718096', fontWeight: '600'}}>
                                      ({tempProgress * 10}%)
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <label style={{fontSize: '13px', fontWeight: '600', color: '#4a5568', display: 'block', marginBottom: '6px'}}>
                                    Observaciones y Pendientes:
                                  </label>
                                  <textarea
                                    value={tempComment}
                                    onChange={(e) => setTempComment(e.target.value)}
                                    placeholder="Describe el estado actual, qué falta completar o comentarios importantes..."
                                    style={styles.textarea}
                                    rows="3"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                          {!isEditing && (
                            <>
                              <div style={styles.progressContainer}>
                                <div style={{
                                  ...styles.progressBadge,
                                  backgroundColor: getProgressColor(data.progress)
                                }}>
                                  {getStatusText(data.progress)}
                                </div>
                                <div style={{fontSize: '18px', fontWeight: 'bold', color: '#2d3748', marginTop: '8px'}}>
                                  {data.progress}/10
                                </div>
                              </div>
                              <div style={styles.progressBar}>
                                <div style={styles.progressBarTrack}>
                                  <div
                                    style={{
                                      ...styles.progressBarFill,
                                      backgroundColor: getProgressColor(data.progress),
                                      width: `${data.progress * 10}%`
                                    }}
                                  />
                                </div>
                                <p style={{fontSize: '12px', color: '#718096', marginTop: '4px', textAlign: 'center'}}>
                                  {data.progress * 10}%
                                </p>
                              </div>
                              <button
                                onClick={() => startEditing(annex.id)}
                                style={{
                                  ...styles.iconButton,
                                  backgroundColor: '#edf2f7',
                                  color: '#4a5568'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#edf2f7';
                                }}
                              >
                                ✏️
                              </button>
                            </>
                          )}
                          
                          {isEditing && (
                            <div style={{display: 'flex', gap: '8px'}}>
                              <button
                                onClick={() => saveEditing(annex.id)}
                                style={{
                                  ...styles.iconButton,
                                  backgroundColor: '#c6f6d5',
                                  color: '#22543d'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#9ae6b4';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#c6f6d5';
                                }}
                              >
                                ✅
                              </button>
                              <button
                                onClick={cancelEditing}
                                style={{
                                  ...styles.iconButton,
                                  backgroundColor: '#fed7d7',
                                  color: '#742a2a'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#feb2b2';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fed7d7';
                                }}
                              >
                                ❌
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {data.lastUpdated && !isEditing && (
                        <div style={{marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0'}}>
                          <p style={{fontSize: '12px', color: '#a0aec0'}}>
                            📅 Última actualización: {new Date(data.lastUpdated).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaudalDashboard;
