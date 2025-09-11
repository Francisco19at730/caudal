// Generar reporte ejecutivo completo para Caudal
  const generateReport = () => {
    setGeneratingReport(true);
    
    const overallProgress = calculateOverallProgress();
    const completedAnnexes = annexes.filter(annex => progressData[annex.id].progress === 10);
    const advancedAnnexes = annexes.filter(annex => {
      const progress = progressData[annex.id].progress;
      return progress >= 7 && progress < 10;
    });
    const inProgressAnnexes = annexes.filter(annex => {
      const progress = progressData[annex.id].progress;
      return progress >= 4 && progress < 7;
    });
    const initialAnnexes = annexes.filter(annex => progressData[annex.id].progress < 4);
    
    const urgentAnnexes = [];
    const delayedAnnexes = [];
    const criticalAnnexes = [];
    
    annexes.forEach(annex => {
      const data = progressData[annex.id];
      if (data.progress < 5) {
        const item = {
          annex: `${annex.id} - ${annex.name}`,
          progress: data.progress,
          comment: data.comment || 'Sin comentarios',
          lastUpdated: data.lastUpdated
        };
        
        if (data.progress <= 2) {
          urgentAnnexes.push(item);
        } else if (data.progress <= 3) {
          delayedAnnexes.push(item);
        } else {
          criticalAnnexes.push(item);
        }
      }
    });
    
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7*24*60*60*1000);
    const recentlyUpdated = annexes.filter(annex => {
      const updateDate = new Date(progressData[annex.id].lastUpdated);
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
    <title>Reporte Ejecutivo - Acreditación Caudal ${new Date().toLocaleDateString('es-ES')}</title>
    <style>
        @page { size: A4; margin: 20mm; }
        @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
            .page-break { page-break-after: always; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2d3748; background: white; }
        .container { max-width: 210mm; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); color: white; padding: 40px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header .subtitle { font-size: 18px; opacity: 0.95; margin-bottom: 5px; }
        .header .date { margin-top: 20px; font-size: 14px; opacity: 0.9; }
        .alert-box { padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 5px solid; }
        .alert-success { background: #f0fff4; border-left-color: #4CAF50; color: #2e7d32; }
        .alert-warning { background: #fff3e0; border-left-color: #FF9800; color: #e65100; }
        .alert-danger { background: #ffebee; border-left-color: #f44336; color: #c62828; }
        .executive-summary { background: #f8fafc; border-left: 4px solid #2196F3; padding: 25px; margin-bottom: 30px; border-radius: 8px; }
        .executive-summary h2 { color: #2196F3; margin-bottom: 15px; font-size: 24px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 30px 0; }
        .kpi-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 4px solid; }
        .kpi-success { border-left-color: #4CAF50; }
        .kpi-warning { border-left-color: #FF9800; }
        .kpi-danger { border-left-color: #f44336; }
        .kpi-info { border-left-color: #2196F3; }
        .kpi-card h3 { color: #2d3748; margin-bottom: 10px; font-size: 16px; }
        .kpi-card .metric { font-size: 32px; font-weight: bold; margin-bottom: 5px; }
        .kpi-success .metric { color: #4CAF50; }
        .kpi-warning .metric { color: #FF9800; }
        .kpi-danger .metric { color: #f44336; }
        .kpi-info .metric { color: #2196F3; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 24px; color: #2d3748; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; display: flex; align-items: center; gap: 10px; }
        .status-matrix { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
        .status-card { border: 2px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .status-header { padding: 15px; color: white; font-weight: bold; text-align: center; }
        .status-complete { background: #4CAF50; }
        .status-advanced { background: #2196F3; }
        .status-progress { background: #FF9800; }
        .status-initial { background: #f44336; }
        .status-body { padding: 15px; background: white; }
        .status-list { list-style: none; padding: 0; }
        .status-list li { padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 10px; }
        .status-list li:last-child { border-bottom: none; }
        .annexes-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
        .annexes-table th { background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); color: white; padding: 15px; text-align: left; font-weight: 600; }
        .annexes-table td { padding: 12px 15px; border-bottom: 1px solid #e2e8f0; }
        .annexes-table tr:last-child td { border-bottom: none; }
        .annexes-table tr:nth-child(even) { background: #f8fafc; }
        .progress-bar { width: 100%; height: 25px; background: #e2e8f0; border-radius: 12px; overflow: hidden; position: relative; }
        .progress-fill { height: 100%; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; transition: width 0.3s ease; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; color: white; }
        .timeline { border-left: 3px solid #2196F3; padding-left: 20px; margin: 20px 0; }
        .timeline-item { position: relative; margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .timeline-item:before { content: ""; position: absolute; left: -26px; top: 20px; width: 12px; height: 12px; border-radius: 50%; background: #2196F3; }
        .recommendations { background: linear-gradient(135deg, #f6f8fb 0%, #e9ecef 100%); padding: 30px; border-radius: 10px; margin-top: 40px; }
        .recommendations h2 { color: #2196F3; margin-bottom: 20px; }
        .recommendations h3 { color: #4a5568; margin: 20px 0 10px 0; }
        .recommendations ul { list-style: none; padding-left: 0; }
        .recommendations li { margin-bottom: 12px; padding-left: 25px; position: relative; }
        .recommendations li:before { content: "✓"; position: absolute; left: 0; color: #4CAF50; font-weight: bold; }
        .priority-high { color: #f44336; font-weight: bold; }
        .priority-medium { color: #FF9800; font-weight: 600; }
        .priority-low { color: #4CAF50; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #718096; font-size: 12px; }
        .print-button { position: fixed; top: 20px; right: 20px; padding: 12px 24px; background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .print-button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0,0,0,0.15); }
        .risk-indicator { padding: 8px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; color: white; display: inline-block; margin: 2px; }
        .risk-high { background: #f44336; }
        .risk-medium { background: #FF9800; }
        .risk-low { background: #4CAF50; }
        .status-iniciando { background: #f44336; }
        .status-progreso { background: #FF9800; }
        .status-avanzado { background: #2196F3; }
        .status-completado { background: #4CAF50; }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">📄 Imprimir / Guardar PDF</button>
    
    <div class="container">
        <!-- Portada Ejecutiva -->
        <div class="header">
            <h1>📊 REPORTE EJECUTIVO</h1>
            <p class="subtitle">Acreditación Metrológica - Medición de Caudal</p>
            <p class="subtitle">Panel de Control Gerencial Especializado</p>
            <p class="date">Fecha: ${new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })} | Hora: ${new Date().toLocaleTimeString('es-ES')}</p>
        </div>
        
        <!-- Alerta de Estado General -->
        ${overallProgress >= 8 ? `
            <div class="alert-box alert-success">
                <h3>✅ ESTADO GENERAL: ÓPTIMO</h3>
                <p>La acreditación de caudal mantiene un avance excelente con ${overallProgress * 10}% de progreso general. Se proyecta cumplimiento de cronograma establecido.</p>
            </div>
        ` : overallProgress >= 6 ? `
            <div class="alert-box alert-warning">
                <h3>⚠️ ESTADO GENERAL: REQUIERE ATENCIÓN</h3>
                <p>La acreditación de caudal avanza con ${overallProgress * 10}% de progreso. Se requiere monitoreo cercano de ${urgentAnnexes.length + delayedAnnexes.length} anexos críticos.</p>
            </div>
        ` : `
            <div class="alert-box alert-danger">
                <h3>🚨 ESTADO GENERAL: CRÍTICO</h3>
                <p>La acreditación requiere intervención inmediata. Solo ${overallProgress * 10}% de progreso con ${urgentAnnexes.length} anexos urgentes.</p>
            </div>
        `}
        
        <!-- Indicadores Clave de Rendimiento (KPIs) -->
        <div class="section">
            <h2 class="section-title">📈 INDICADORES CLAVE DE RENDIMIENTO</h2>
            <div class="kpi-grid">
                <div class="kpi-card kpi-info">
                    <h3>Progreso General - Caudal</h3>
                    <div class="metric">${overallProgress * 10}%</div>
                    <p>Meta: 100% | Proyección: ${projectedCompletion.toLocaleDateString('es-ES')}</p>
                </div>
                
                <div class="kpi-card ${completedAnnexes.length > 0 ? 'kpi-success' : 'kpi-warning'}">
                    <h3>Anexos Completados</h3>
                    <div class="metric">${completedAnnexes.length}</div>
                    <p>de ${annexes.length} anexos totales</p>
                </div>
                
                <div class="kpi-card ${urgentAnnexes.length === 0 ? 'kpi-success' : 'kpi-danger'}">
                    <h3>Anexos en Riesgo Alto</h3>
                    <div class="metric">${urgentAnnexes.length}</div>
                    <p>Requieren acción inmediata</p>
                </div>
                
                <div class="kpi-card kpi-info">
                    <h3>Actividad Reciente</h3>
                    <div class="metric">${recentlyUpdated.length}</div>
                    <p>actualizaciones en 7 días</p>
                </div>
                
                <div class="kpi-card ${advancedAnnexes.length >= annexes.length * 0.5 ? 'kpi-success' : 'kpi-warning'}">
                    <h3>Anexos Avanzados</h3>
                    <div class="metric">${advancedAnnexes.length}</div>
                    <p>≥70% de progreso</p>
                </div>
                
                <div class="kpi-card kpi-info">
                    <h3>Tiempo Estimado Restante</h3>
                    <div class="metric">${estimatedCompletionDays}</div>
                    <p>días para acreditación</p>
                </div>
            </div>
        </div>
        
        <!-- Matriz de Estado por Anexos -->
        <div class="section">
            <h2 class="section-title">🎯 ESTADO POR CATEGORÍA DE ANEXOS</h2>
            <div class="status-matrix">
                ${completedAnnexes.length > 0 ? `
                    <div class="status-card">
                        <div class="status-header status-complete">
                            ✅ COMPLETADOS (${completedAnnexes.length})
                        </div>
                        <div class="status-body">
                            <ul class="status-list">
                                ${completedAnnexes.map(annex => `
                                    <li>${annex.icon} Anexo ${annex.id}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                ${advancedAnnexes.length > 0 ? `
                    <div class="status-card">
                        <div class="status-header status-advanced">
                            🔄 AVANZADOS (${advancedAnnexes.length})
                        </div>
                        <div class="status-body">
                            <ul class="status-list">
                                ${advancedAnnexes.map(annex => `
                                    <li>${annex.icon} Anexo ${annex.id} - ${progressData[annex.id].progress * 10}%</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                ${inProgressAnnexes.length > 0 ? `
                    <div class="status-card">
                        <div class="status-header status-progress">
                            ⚠️ EN PROGRESO (${inProgressAnnexes.length})
                        </div>
                        <div class="status-body">
                            <ul class="status-list">
                                ${inProgressAnnexes.map(annex => `
                                    <li>${annex.icon} Anexo ${annex.id} - ${progressData[annex.id].progress * 10}%</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                ${initialAnnexes.length > 0 ? `
                    <div class="status-card">
                        <div class="status-header status-initial">
                            🚨 CRÍTICOS (${initialAnnexes.length})
                        </div>
                        <div class="status-body">
                            <ul class="status-list">
                                ${initialAnnexes.map(annex => `
                                    <li>${annex.icon} Anexo ${annex.id} - ${progressData[annex.id].progress * 10}%</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
        
        <!-- Timeline de Hitos Proyectados para Caudal -->
        <div class="section page-break">
            <h2 class="section-title">⏰ CRONOGRAMA PROYECTADO - ACREDITACIÓN CAUDAL</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <h4>🎯 Fase 1: Estabilización de Caudal (Próximos 15 días)</h4>
                    <p><strong>Objetivo:</strong> Completar anexos urgentes de medición de caudal</p>
                    <p><strong>Meta:</strong> Eliminar ${urgentAnnexes.length + delayedAnnexes.length} anexos en riesgo</p>
                    <div class="risk-indicator risk-${urgentAnnexes.length > 3 ? 'high' : urgentAnnexes.length > 1 ? 'medium' : 'low'}">
                        Riesgo: ${urgentAnnexes.length > 3 ? 'ALTO' : urgentAnnexes.length > 1 ? 'MEDIO' : 'BAJO'}
                    </div>
                </div>
                
                <div class="timeline-item">
                    <h4>🔧 Fase 2: Consolidación Técnica (Días 16-45)</h4>
                    <p><strong>Objetivo:</strong> Avanzar calibraciones y validaciones de métodos</p>
                    <p><strong>Meta:</strong> 80% de progreso en acreditación de caudal</p>
                    <div class="risk-indicator risk-${inProgressAnnexes.length > 2 ? 'high' : inProgressAnnexes.length > 0 ? 'medium' : 'low'}">
                        Riesgo: ${inProgressAnnexes.length > 2 ? 'ALTO' : inProgressAnnexes.length > 0 ? 'MEDIO' : 'BAJO'}
                    </div>
                </div>
                
                <div class="timeline-item">
                    <h4>✅ Fase 3: Acreditación Final (Días 46-${estimatedCompletionDays})</h4>
                    <p><strong>Objetivo:</strong> Completar acreditación de caudal y auditoría</p>
                    <p><strong>Meta:</strong> 100% de implementación y certificación oficial</p>
                    <div class="risk-indicator risk-low">
                        Riesgo: CONTROLADO
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Detalle Completo de Anexos -->
        <div class="section">
            <h2 class="section-title">📋 PROGRESO DETALLADO DE ANEXOS - CAUDAL</h2>
            <table class="annexes-table">
                <thead>
                    <tr>
                        <th>Anexo</th>
                        <th>Progreso</th>
                        <th>Estado</th>
                        <th>Riesgo</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${annexes.map(annex => {
                        const data = progressData[annex.id];
                        const progress = data.progress;
                        const statusClass = progress === 10 ? 'completado' : 
                                           progress >= 7 ? 'avanzado' : 
                                           progress >= 4 ? 'progreso' : 'iniciando';
                        const riskLevel = progress < 4 ? 'ALTO' : progress < 7 ? 'MEDIO' : 'BAJO';
                        
                        return `
                            <tr>
                                <td><strong>${annex.icon} ${annex.id} - ${annex.name}</strong></td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${progress * 10}%; background: ${getProgressColor(progress)}">
                                            ${progress * 10}%
                                        </div>
                                    </div>
                                </td>
                                <td><span class="status-badge status-${statusClass}">${getStatusText(progress)}</span></td>
                                <td><span class="risk-indicator risk-${riskLevel.toLowerCase()}">${riskLevel}</span></td>
                                <td>${data.comment || 'Sin observaciones específicas'}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
        
        <!-- Análisis de Riesgos Específicos para Caudal -->
        ${(urgentAnnexes.length > 0 || delayedAnnexes.length > 0) ? `
            <div class="section page-break">
                <h2 class="section-title">⚠️ ANÁLISIS DE RIESGOS - ACREDITACIÓN CAUDAL</h2>
                
                ${urgentAnnexes.length > 0 ? `
                    <div class="alert-box alert-danger">
                        <h3>🚨 ANEXOS URGENTES CAUDAL (Progreso ≤20%)</h3>
                        <p><strong>Impacto:</strong> Riesgo alto de retraso en acreditación de medición de caudal</p>
                        <table class="annexes-table" style="margin-top: 15px;">
                            <thead>
                                <tr>
                                    <th>Anexo</th>
                                    <th>Progreso</th>
                                    <th>Última Actualización</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${urgentAnnexes.slice(0, 10).map(item => `
                                    <tr>
                                        <td><strong>${item.annex}</strong></td>
                                        <td><span style="color: #f44336; font-weight: bold;">${item.progress}/10</span></td>
                                        <td>${new Date(item.lastUpdated).toLocaleDateString('es-ES')}</td>
                                        <td>${item.comment}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : ''}
                
                ${delayedAnnexes.length > 0 ? `
                    <div class="alert-box alert-warning">
                        <h3>⚠️ ANEXOS RETRASADOS CAUDAL (Progreso 21-30%)</h3>
                        <p><strong>Impacto:</strong> Requieren atención prioritaria en próximas 2 semanas</p>
                        <table class="annexes-table" style="margin-top: 15px;">
                            <thead>
                                <tr>
                                    <th>Anexo</th>
                                    <th>Progreso</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${delayedAnnexes.slice(0, 8).map(item => `
                                    <tr>
                                        <td>${item.annex}</td>
                                        <td><span style="color: #FF9800; font-weight: bold;">${item.progress}/10</span></td>
                                        <td>${item.comment}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : ''}
            </div>
        ` : `
            <div class="alert-box alert-success">
                <h3>✅ EXCELENTE GESTIÓN DE RIESGOS</h3>
                <p>No se identificaron anexos en estado crítico para la acreditación de caudal. El proyecto mantiene un avance controlado.</p>
            </div>
        `}
        
        <!-- Recomendaciones Estratégicas para Acreditación Caudal -->
        <div class="recommendations page-break">
            <h2>🎯 RECOMENDACIONES ESTRATÉGICAS - CAUDAL</h2>
            
            <h3>1. ACCIONES INMEDIATAS (Próximos 7 días)</h3>
            <ul>
                ${urgentAnnexes.length > 0 ? `
                    <li class="priority-high">Asignar especialista en caudal a ${urgentAnnexes.length} anexos urgentes</li>
                    <li class="priority-high">Establecer reuniones diarias de seguimiento técnico</li>
                ` : ''}
                <li class="priority-medium">Revisar disponibilidad de patrones de caudal certificados</li>
                <li class="priority-medium">Validar equipos de medición de flujo</li>
                <li class="priority-low">Actualizar procedimientos específicos de caudal</li>
            </ul>
            
            <h3>2. ESTRATEGIAS TÉCNICAS ESPECÍFICAS</h3>
            <ul>
                <li><strong>Calibración de Equipos:</strong> Priorizar medidores de flujo y sistemas de referencia</li>
                <li><strong>Trazabilidad:</strong> Asegurar cadena metrológica con patrones nacionales</li>
                <li><strong>Incertidumbre:</strong> Completar análisis específico para rangos de caudal</li>
                <li><strong>Validación:</strong> Realizar comparaciones interlaboratorio</li>
            </ul>
            
            <h3>3. INVERSIONES REQUERIDAS - CAUDAL</h3>
            <ul>
                <li><strong>Personal:</strong> ${urgentAnnexes.length > 3 ? '1 especialista en metrología de fluidos' : 'Capacitación técnica adicional'}</li>
                <li><strong>Equipos:</strong> Calibración de medidores de caudal primarios</li>
                <li><strong>Instalaciones:</strong> Adecuación de banco de pruebas hidráulico</li>
                <li><strong>Software:</strong> Sistema de gestión específico para caudal</li>
            </ul>
            
            <h3>4. MÉTRICAS DE ÉXITO ESPECÍFICAS</h3>
            <ul>
                <li><strong>Objetivo Semanal:</strong> Incremento mínimo de 10% en anexos críticos</li>
                <li><strong>Objetivo Mensual:</strong> Completar validación de métodos de caudal</li>
                <li><strong>Objetivo Trimestral:</strong> Alcanzar 90% de progreso general</li>
                <li><strong>Objetivo Final:</strong> Acreditación oficial para medición de caudal</li>
            </ul>
            
            <h3>5. PLAN DE CONTINGENCIA - CAUDAL</h3>
            <ul>
                <li>Si progreso < 50%: Escalar a dirección técnica</li>
                <li>Si problemas con patrones: Activar laboratorio colaborador</li>
                <li>Si retrasos en equipos: Considerar alquiler temporal de medidores</li>
                <li>Si problemas técnicos: Activar consultoría especializada en fluidos</li>
            </ul>
            
            <h3>6. SEGUIMIENTO Y CONTROL ESPECIALIZADO</h3>
            <ul>
                <li><strong>Reporte Semanal:</strong> Dashboard específico de caudal con KPIs técnicos</li>
                <li><strong>Reunión Quincenal:</strong> Revisión técnica con especialistas en fluidos</li>
                <li><strong>Auditoría Mensual:</strong> Evaluación de procedimientos de caudal</li>
                <li><strong>Reporte Ejecutivo:</strong> Comunicación mensual sobre avance de caudal</li>
            </ul>
        </div>
        
        <!-- Especificaciones Técnicas de Caudal -->
        <div class="section">
            <h2 class="section-title">🔧 ESPECIFICACIONES TÉCNICAS - CAUDAL</h2>
            <div class="executive-summary">
                <h3>CAPACIDADES DE MEDICIÓN DE CAUDAL</h3>
                
                <h4 style="color: #4CAF50; margin-top: 20px;">✅ RANGOS DE MEDICIÓN OBJETIVO</h4>
                <ul style="margin-top: 15px;">
                    <li><strong>Caudal mínimo:</strong> Según capacidades del laboratorio</li>
                    <li><strong>Caudal máximo:</strong> Definido por instalaciones hidráulicas</li>
                    <li><strong>Fluidos:</strong> Agua, líquidos newtonianos</li>
                    <li><strong>Temperatura:</strong> Rango operativo estándar</li>
                    <li><strong>Presión:</strong> Condiciones atmosféricas y presurizado</li>
                </ul>
                
                <h4 style="color: #2196F3; margin-top: 20px;">📊 INCERTIDUMBRES OBJETIVO</h4>
                <ul style="margin-top: 15px;">
                    <li><strong>Incertidumbre expandida:</strong> ≤ 0.5% (k=2) para rangos principales</li>
                    <li><strong>Repetibilidad:</strong> ≤ 0.1% en condiciones estables</li>
                    <li><strong>Reproducibilidad:</strong> ≤ 0.2% entre mediciones</li>
                    <li><strong>Deriva:</strong> ≤ 0.05% por año</li>
                </ul>
                
                <h4 style="color: #FF9800; margin-top: 20px;">⚙️ EQUIPAMIENTO REQUERIDO</h4>
                <ul style="margin-top: 15px;">
                    <li><strong>Medidores patrón:</strong> Trazables a patrones nacionales</li>
                    <li><strong>Banco de pruebas:</strong> Sistema hidráulico calibrado</li>
                    <li><strong>Instrumentación:</strong> Sensores de presión y temperatura</li>
                    <li><strong>Software:</strong> Sistema de adquisición de datos</li>
                </ul>
            </div>
        </div>
        
        <!-- Conclusiones Ejecutivas -->
        <div class="section">
            <h2 class="section-title">📋 CONCLUSIONES EJECUTIVAS - CAUDAL</h2>
            
            <div class="executive-summary">
                <h3>RESUMEN PARA ALTA GERENCIA</h3>
                <p><strong>Estado Actual:</strong> La acreditación de medición de caudal avanza con un ${overallProgress * 10}% de progreso general, 
                cubriendo ${annexes.length} anexos técnicos específicos para esta magnitud.</p>
                
                <p><strong>Situación de Riesgo:</strong> ${urgentAnnexes.length === 0 ? 
                    'Controlada - No se identificaron riesgos críticos para la acreditación de caudal.' : 
                    `Requiere atención - ${urgentAnnexes.length} anexos en estado urgente que pueden impactar la acreditación.`}</p>
                
                <p><strong>Capacidades Técnicas:</strong> El laboratorio está desarrollando capacidades especializadas en medición de caudal 
                que le permitirán ofrecer servicios de calibración trazables para diversos tipos de medidores de flujo.</p>
                
                <p><strong>Proyección:</strong> Con las acciones correctivas propuestas, se estima completar la acreditación de caudal en 
                ${estimatedCompletionDays} días (${projectedCompletion.toLocaleDateString('es-ES')}).</p>
                
                <p><strong>Impacto Comercial:</strong> Esta acreditación permitirá al laboratorio atender la demanda creciente de calibración 
                de medidores de flujo en sectores industrial, petroquímico y de servicios públicos.</p>
                
                <p><strong>Recomendación Ejecutiva:</strong> ${overallProgress >= 7 ? 
                    'Mantener el ritmo actual y preparar estrategia comercial para servicios de caudal.' : 
                    'Implementar inmediatamente el plan de acción propuesto y considerar refuerzo técnico especializado.'}</p>
            </div>
        </div>
        
        <!-- Footer Profesional -->
        <div class="footer">
            <p><strong>Sistema de Gestión de Acreditación Metrológica - Caudal</strong></p>
            <p>Laboratorio de Metrología | Reporte Confidencial Nivel Gerencial</p>
            <p>Especialización: Medición de Caudal y Flujo de Fluidos</p>
            <p>Generado automáticamente el ${new Date().toLocaleString('es-ES')}</p>
            <p>Próxima actualización programada: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString('es-ES')}</p>
        </div>
    </div>
</body>
</html>`;
    
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
    
    setTimeout(() => setGeneratingReport(false), 1000);
  };// Sistema de Acreditación Metrológica - Solo Caudal
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
