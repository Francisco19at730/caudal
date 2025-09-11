// Sistema de Acreditación Metrológica - Solo Caudal
const { useState, useEffect } = React;

// Estilos específicos para Caudal
const styles = {
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  container: {
    maxWidth: '1200px',
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
    backgroundColor: '#2196F3',
    color: 'white'
  },
  buttonGreen: {
    backgroundColor: '#4CAF50',
    color: 'white'
  },
  buttonRed: {
    backgroundColor: '#f44336',
    color: 'white'
  },
  buttonPurple: {
    backgroundColor: '#9C27B0',
    color: 'white'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '32px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
    textAlign: 'center'
  },
  progressCircle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    margin: '0 auto 24px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#2196F3'
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '24px'
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
    outline: 'none'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    fontSize: '20px'
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
    backgroundColor: 'white'
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

const CaudalSystem = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [tempProgress, setTempProgress] = useState('');
  const [tempComment, setTempComment] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  // Lista completa de anexos para Caudal
  const annexes = [
    { id: 11, name: "Procedimiento de calibración", icon: "🔧" },
    { id: 12, name: "Procedimiento para incertidumbre", icon: "📊" },
    { id: 13, name: "Procedimiento de verificaciones", icon: "✅" },
    { id: 14, name: "Procedimiento para el aseguramiento", icon: "🛡️" },
    { id: 15, name: "Procedimientos para patrones", icon: "📐" },
    { id: 16, name: "Procedimientos para los ítems de calibración", icon: "📄" },
    { id: 17, name: "Validación de método", icon: "✅" },
    { id: 18, name: "Presupuesto de la incertidumbre", icon: "📊" },
    { id: 19, name: "Informe de validación de HC", icon: "📋" },
    { id: 20, name: "Condiciones ambientales", icon: "🌡️" },
    { id: 21, name: "Personal", icon: "👥" },
    { id: "22a", name: "Alcance solicitado", icon: "📄" },
    { id: "22b", name: "Declaración de conformidad", icon: "✅" },
    { id: 26, name: "Equipos", icon: "⚙️" },
    { id: 27, name: "Aseguramiento de los resultados", icon: "🔒" },
    { id: 28, name: "Lista de persona(s) autorizada", icon: "👥" },
    { id: 29, name: "Ejemplo de certificado", icon: "📜" },
    { id: 30, name: "Lista de Interlaboratorios", icon: "🏢" }
  ];

  // Configuración específica para Caudal
  const caudalConfig = {
    id: 'caudal',
    name: 'Medición de Caudal',
    icon: '💧',
    color: '#2196F3',
    description: 'Acreditación para medición de caudal de fluidos'
  };

  // Crear datos iniciales solo para Caudal
  const createInitialData = () => {
    const initial = {};
    annexes.forEach(annex => {
      initial[annex.id] = {
        progress: 1,
        comment: '',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    });
    return initial;
  };

  // Estado para datos de progreso
  const [progressData, setProgressData] = useState(() => {
    try {
      const savedData = localStorage.getItem('caudal-acreditacion');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Verificar integridad
        annexes.forEach(annex => {
          if (!parsed[annex.id]) {
            parsed[annex.id] = {
              progress: 1,
              comment: '',
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          }
        });
        return parsed;
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    return createInitialData();
  });

  // Guardar automáticamente
  useEffect(() => {
    try {
      localStorage.setItem('caudal-acreditacion', JSON.stringify(progressData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [progressData]);

  // Funciones de manejo
  const updateProgress = (annexId, progress, comment) => {
    setProgressData(prev => ({
      ...prev,
      [annexId]: {
        progress: parseInt(progress),
        comment,
        lastUpdated: new Date().toISOString().split('T')[0]
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
    link.download = `caudal-backup-${new Date().toISOString().split('T')[0]}.json`;
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
          alert('Datos importados exitosamente!');
        } catch (error) {
          alert('Error al importar el archivo.');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetData = () => {
    if (window.confirm('¿Estás seguro de resetear todos los datos de Caudal?')) {
      setProgressData(createInitialData());
    }
  };

  // Funciones utilitarias
  const getProgressColor = (progress) => {
    if (progress <= 3) return '#f44336';
    if (progress <= 6) return '#FF9800';
    if (progress <= 8) return '#2196F3';
    return '#4CAF50';
  };

  const getStatusText = (progress) => {
    if (progress === 10) return 'Completado';
    if (progress >= 7) return 'Avanzado';
    if (progress >= 4) return 'En Progreso';
    return 'Iniciando';
  };

  const calculateOverallProgress = () => {
    const total = annexes.reduce((sum, annex) => sum + progressData[annex.id].progress, 0);
    return Math.round(total / annexes.length);
  };

  // Generar reporte específico para Caudal
  const generateReport = () => {
    setGeneratingReport(true);
    
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
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 30px; border-radius: 10px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
        .stat-value { font-size: 32px; font-weight: bold; color: #2196F3; }
        .progress-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .progress-table th { background: #2196F3; color: white; padding: 12px; }
        .progress-table td { padding: 10px; border-bottom: 1px solid #ddd; }
        .progress-bar { width: 100px; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 10px; }
        .recommendations { background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0; }
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
    
    <h2>Estado de Anexos</h2>
    <table class="progress-table">
        <thead>
            <tr>
                <th>Anexo</th>
                <th>Progreso</th>
                <th>Estado</th>
                <th>Observaciones</th>
            </tr>
        </thead>
        <tbody>
            ${annexes.map(annex => {
                const data = progressData[annex.id];
                const progress = data.progress;
                return `
                    <tr>
                        <td>${annex.icon} ${annex.id} - ${annex.name}</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress * 10}%; background: ${getProgressColor(progress)}"></div>
                            </div>
                            ${progress * 10}%
                        </td>
                        <td>${getStatusText(progress)}</td>
                        <td>${data.comment || 'Sin comentarios'}</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    
    <div class="recommendations">
        <h3>Recomendaciones</h3>
        <ul>
            ${urgentAnnexes.length > 0 ? `<li>Priorizar ${urgentAnnexes.length} anexos en estado inicial</li>` : ''}
            <li>Continuar con el plan de implementación establecido</li>
            <li>Realizar seguimiento semanal del progreso</li>
            <li>Preparar documentación para auditoría cuando se alcance 80% de progreso</li>
        </ul>
    </div>
    
    <div style="text-align: center; margin-top: 40px; color: #666;">
        <p>Sistema de Acreditación de Caudal - Generado el ${new Date().toLocaleString('es-ES')}</p>
    </div>
</body>
</html>`;
    
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
    
    setTimeout(() => setGeneratingReport(false), 1000);
  };

  const overallProgress = calculateOverallProgress();
  const filteredAnnexes = annexes.filter(annex => 
    annex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    annex.id.toString().includes(searchTerm)
  );

  return React.createElement('div', { style: styles.body },
    React.createElement('div', { style: styles.container },
      // Header
      React.createElement('div', { style: styles.header },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '20px' } },
          React.createElement('div', null,
            React.createElement('h1', { style: styles.title },
              React.createElement('span', null, '💧'),
              'Acreditación Metrológica - Caudal'
            ),
            React.createElement('p', { style: styles.subtitle }, 'Sistema de medición de caudal de fluidos'),
            lastSaved && React.createElement('p', { style: styles.savedText },
              'Último guardado: ', lastSaved.toLocaleString('es-ES')
            )
          ),
          
          React.createElement('div', { style: styles.headerControls },
            React.createElement('button', {
              onClick: generateReport,
              style: { ...styles.button, ...styles.buttonPurple },
              disabled: generatingReport
            }, generatingReport ? 'Generando...' : 'Generar Reporte'),
            
            React.createElement('button', {
              onClick: exportData,
              style: { ...styles.button, ...styles.buttonBlue }
            }, 'Exportar'),
            
            React.createElement('label', {
              style: { ...styles.button, ...styles.buttonGreen, cursor: 'pointer' }
            }, 
              'Importar',
              React.createElement('input', {
                type: 'file',
                accept: '.json',
                onChange: importData,
                style: { display: 'none' }
              })
            ),
            
            React.createElement('button', {
              onClick: resetData,
              style: { ...styles.button, ...styles.buttonRed }
            }, 'Reset')
          )
        )
      ),

      // Stats Card
      React.createElement('div', { style: styles.statsCard },
        React.createElement('h2', { style: { color: '#2196F3', marginBottom: '24px' } }, 
          caudalConfig.icon + ' ' + caudalConfig.name
        ),
        React.createElement('div', {
          style: {
            ...styles.progressCircle,
            background: `conic-gradient(#2196F3 ${overallProgress * 36}deg, #e2e8f0 0deg)`
          }
        },
          React.createElement('div', {
            style: {
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }
          },
            React.createElement('div', { style: styles.progressText }, overallProgress),
            React.createElement('div', { style: { fontSize: '16px', color: '#666' } }, 'de 10')
          )
        ),
        React.createElement('p', { style: { fontSize: '24px', color: '#2196F3', fontWeight: 'bold' } },
          `${overallProgress * 10}% Completado`
        ),
        React.createElement('p', { style: { color: '#666' } }, caudalConfig.description)
      ),

      // Search
      React.createElement('div', { style: { backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' } },
        React.createElement('div', { style: styles.searchContainer },
          React.createElement('span', { style: styles.searchIcon }, '🔍'),
          React.createElement('input', {
            type: 'text',
            placeholder: 'Buscar anexos...',
            style: styles.searchInput,
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          })
        )
      ),

      // Annexes
      React.createElement('div', { style: { backgroundColor: 'white', borderRadius: '12px', padding: '24px' } },
        React.createElement('h3', { style: { marginBottom: '24px', color: '#2196F3' } }, 'Anexos de Acreditación'),
        React.createElement('div', { style: styles.annexGrid },
          ...filteredAnnexes.map(annex => {
            const data = progressData[annex.id];
            const isEditing = editingItem === annex.id;
            
            return React.createElement('div', {
              key: annex.id,
              style: {
                ...styles.annexItem,
                ...(data.progress === 10 ? { backgroundColor: '#f0fdf4', borderColor: '#4CAF50' } : {}),
                ...(isEditing ? { backgroundColor: '#fff3e0', borderColor: '#FF9800' } : {})
              }
            },
              React.createElement('div', { style: styles.annexContent },
                React.createElement('div', { style: styles.annexLeft },
                  React.createElement('span', { style: { fontSize: '24px' } }, annex.icon),
                  React.createElement('div', { style: { flex: 1 } },
                    React.createElement('h4', { style: styles.annexTitle },
                      `Anexo ${annex.id} - ${annex.name}`,
                      data.progress === 10 && React.createElement('span', { style: { marginLeft: '8px', color: '#4CAF50' } }, '✓')
                    ),
                    !isEditing && data.comment && React.createElement('p', { 
                      style: { fontSize: '14px', color: '#666', marginTop: '8px' }
                    }, data.comment),
                    isEditing && React.createElement('div', { style: { marginTop: '12px' } },
                      React.createElement('select', {
                        value: tempProgress,
                        onChange: (e) => setTempProgress(e.target.value),
                        style: { ...styles.select, marginBottom: '8px' }
                      },
                        ...Array.from({ length: 10 }, (_, i) => 
                          React.createElement('option', { key: i + 1, value: i + 1 }, `${i + 1}/10`)
                        )
                      ),
                      React.createElement('textarea', {
                        value: tempComment,
                        onChange: (e) => setTempComment(e.target.value),
                        placeholder: 'Observaciones...',
                        style: styles.textarea,
                        rows: 2
                      })
                    )
                  )
                ),
                
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
                  !isEditing && React.createElement(React.Fragment, null,
                    React.createElement('div', { style: styles.progressContainer },
                      React.createElement('div', {
                        style: {
                          ...styles.progressBadge,
                          backgroundColor: getProgressColor(data.progress)
                        }
                      }, getStatusText(data.progress)),
                      React.createElement('div', { style: { fontSize: '18px', fontWeight: 'bold', marginTop: '8px' } },
                        `${data.progress}/10`
                      )
                    ),
                    React.createElement('div', { style: styles.progressBar },
                      React.createElement('div', { style: styles.progressBarTrack },
                        React.createElement('div', {
                          style: {
                            ...styles.progressBarFill,
                            backgroundColor: getProgressColor(data.progress),
                            width: `${data.progress * 10}%`
                          }
                        })
                      )
                    ),
                    React.createElement('button', {
                      onClick: () => startEditing(annex.id),
                      style: {
                        ...styles.iconButton,
                        backgroundColor: '#e3f2fd',
                        color: '#1976D2'
                      }
                    }, '✏️')
                  ),
                  
                  isEditing && React.createElement('div', { style: { display: 'flex', gap: '8px' } },
                    React.createElement('button', {
                      onClick: () => saveEditing(annex.id),
                      style: {
                        ...styles.iconButton,
                        backgroundColor: '#c8e6c9',
                        color: '#2e7d32'
                      }
                    }, '✅'),
                    React.createElement('button', {
                      onClick: cancelEditing,
                      style: {
                        ...styles.iconButton,
                        backgroundColor: '#ffcdd2',
                        color: '#c62828'
                      }
                    }, '❌')
                  )
                )
              )
            );
          })
        )
      )
    )
  );
};

// Renderizar
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(CaudalSystem));
