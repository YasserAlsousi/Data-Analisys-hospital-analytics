// Hospital Dashboard Application JavaScript - Enhanced Version

// Global data from JSON
const hospitalData = {
    "hospital_overview": {"name": "City Medical Center", "total_beds": 450, "current_census": 389, "bed_occupancy": 86.4, "staff_count": 1142},
    "kpi_summary": {"daily_admissions": 46, "daily_admissions_target": 50, "patient_satisfaction": 4.6, "financial_performance": 92.3, "staff_utilization": 87.2, "ed_wait_time": 18.5},
    "departments": [
        {"name": "Emergency", "beds": 25, "occupancy": 92.1, "patients": 23, "staff": 45, "satisfaction": 4.3},
        {"name": "ICU", "beds": 40, "occupancy": 87.4, "patients": 35, "staff": 95, "satisfaction": 4.5},
        {"name": "Surgery", "beds": 35, "occupancy": 85.2, "patients": 30, "staff": 68, "satisfaction": 4.4},
        {"name": "Cardiology", "beds": 50, "occupancy": 89.6, "patients": 45, "staff": 78, "satisfaction": 4.7},
        {"name": "Oncology", "beds": 45, "occupancy": 91.3, "patients": 41, "staff": 65, "satisfaction": 4.8},
        {"name": "Pediatrics", "beds": 60, "occupancy": 78.9, "patients": 47, "staff": 85, "satisfaction": 4.6},
        {"name": "Orthopedics", "beds": 40, "occupancy": 83.7, "patients": 33, "staff": 52, "satisfaction": 4.4},
        {"name": "Neurology", "beds": 35, "occupancy": 86.8, "patients": 30, "staff": 48, "satisfaction": 4.5},
        {"name": "Internal Medicine", "beds": 120, "occupancy": 88.4, "patients": 106, "staff": 145, "satisfaction": 4.3}
    ],
    "financial_metrics": {"total_revenue": 45670000, "operating_expenses": 42120000, "net_income": 3550000, "operating_margin": 7.8, "days_cash_on_hand": 187, "cost_per_discharge": 8950, "bad_debt_rate": 2.1},
    "quality_metrics": {"patient_satisfaction": 4.6, "hcahps_score": 4.4, "mortality_rate": 2.3, "infection_rate": 1.8, "readmission_rate": 11.2, "medication_error_rate": 0.5, "hand_hygiene_compliance": 94.5},
    "staffing_data": [
        {"category": "Physicians", "count": 145, "satisfaction": 4.5, "turnover": 6.8},
        {"category": "Nurses", "count": 485, "satisfaction": 4.2, "turnover": 12.5},
        {"category": "Technicians", "count": 156, "satisfaction": 4.1, "turnover": 15.2},
        {"category": "Support Staff", "count": 267, "satisfaction": 3.9, "turnover": 18.9},
        {"category": "Administration", "count": 89, "satisfaction": 4.3, "turnover": 9.1}
    ],
    "ed_metrics": {"total_visits": 31250, "door_to_doctor_time": 18.5, "avg_length_stay": 4.2, "lwbs_rate": 3.8, "admission_rate": 18.6, "current_census": 23, "triage_breakdown": {"level_1": 12.5, "level_2": 23.8, "level_3": 35.2, "level_4": 21.1, "level_5": 7.4}},
    "monthly_trends": [
        {"month": "Jan 2024", "admissions": 1485, "discharges": 1398, "revenue": 3.8, "satisfaction": 4.5},
        {"month": "Feb 2024", "admissions": 1342, "discharges": 1287, "revenue": 3.6, "satisfaction": 4.6},
        {"month": "Mar 2024", "admissions": 1456, "discharges": 1423, "revenue": 3.9, "satisfaction": 4.4},
        {"month": "Apr 2024", "admissions": 1378, "discharges": 1356, "revenue": 3.7, "satisfaction": 4.7},
        {"month": "May 2024", "admissions": 1423, "discharges": 1401, "revenue": 3.8, "satisfaction": 4.6},
        {"month": "Jun 2024", "admissions": 1398, "discharges": 1376, "revenue": 3.7, "satisfaction": 4.5}
    ],
    "alerts": [
        {"type": "warning", "message": "Emergency Department wait time above target", "department": "Emergency", "value": 18.5, "target": 15},
        {"type": "critical", "message": "Support staff turnover rate high", "department": "HR", "value": 18.9, "target": 15},
        {"type": "info", "message": "ICU bed occupancy optimal", "department": "ICU", "value": 87.4, "target": 85}
    ]
};

// Chart color scheme - Power BI inspired
const chartColors = ['#0078D4', '#00BCF2', '#40E0D0', '#1BA1E2', '#0050EF', '#6A5ACD', '#DA70D6', '#FF6347', '#FFA500', '#32CD32'];

// Generate detailed data for charts
function generateDailyPatientFlowData() {
    const data = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Generate realistic patient flow data
        const baseAdmissions = 45 + Math.sin(i * 0.2) * 10;
        const baseDischarges = 42 + Math.sin((i + 1) * 0.15) * 8;
        const baseTransfers = 8 + Math.sin(i * 0.3) * 3;

        data.push({
            date: `${date.getDate()}/${date.getMonth() + 1}`,
            admissions: Math.round(baseAdmissions + (Math.random() - 0.5) * 10),
            discharges: Math.round(baseDischarges + (Math.random() - 0.5) * 8),
            transfers: Math.round(baseTransfers + (Math.random() - 0.5) * 4),
            census: Math.round(380 + Math.sin(i * 0.1) * 20 + (Math.random() - 0.5) * 15)
        });
    }

    return data;
}

// Generate length of stay data by department
function generateLengthOfStayData() {
    const departments = [
        { name: 'الطوارئ', current: 4.2, benchmark: 3.8, target: 3.5 },
        { name: 'العناية المركزة', current: 8.5, benchmark: 7.2, target: 7.0 },
        { name: 'الجراحة', current: 5.8, benchmark: 5.2, target: 5.0 },
        { name: 'الباطنية', current: 6.2, benchmark: 5.8, target: 5.5 },
        { name: 'الأطفال', current: 3.9, benchmark: 3.5, target: 3.2 },
        { name: 'النساء والولادة', current: 2.8, benchmark: 2.5, target: 2.3 },
        { name: 'القلب', current: 7.1, benchmark: 6.8, target: 6.5 },
        { name: 'العظام', current: 4.5, benchmark: 4.2, target: 4.0 }
    ];

    return departments;
}

// Generate patient satisfaction data by department
function generateSatisfactionByDepartment() {
    return [
        { name: 'الطوارئ', satisfaction: 4.3, hcahps: 4.1, national_avg: 4.2 },
        { name: 'العناية المركزة', satisfaction: 4.5, hcahps: 4.4, national_avg: 4.3 },
        { name: 'الجراحة', satisfaction: 4.4, hcahps: 4.3, national_avg: 4.4 },
        { name: 'الباطنية', satisfaction: 4.2, hcahps: 4.0, national_avg: 4.1 },
        { name: 'الأطفال', satisfaction: 4.7, hcahps: 4.6, national_avg: 4.5 },
        { name: 'النساء والولادة', satisfaction: 4.6, hcahps: 4.5, national_avg: 4.4 },
        { name: 'القلب', satisfaction: 4.4, hcahps: 4.2, national_avg: 4.3 },
        { name: 'العظام', satisfaction: 4.3, hcahps: 4.1, national_avg: 4.2 }
    ];
}

// Generate core quality measures data
function generateCoreQualityMeasures() {
    return [
        {
            name: 'معدل العدوى المكتسبة',
            current: 1.8,
            target: 1.5,
            benchmark: 2.1,
            trend: 'improving',
            unit: '%'
        },
        {
            name: 'معدل إعادة الدخول',
            current: 11.2,
            target: 10.0,
            benchmark: 12.5,
            trend: 'stable',
            unit: '%'
        },
        {
            name: 'معدل الوفيات',
            current: 2.3,
            target: 2.0,
            benchmark: 2.8,
            trend: 'improving',
            unit: '%'
        },
        {
            name: 'أخطاء الأدوية',
            current: 0.5,
            target: 0.3,
            benchmark: 0.8,
            trend: 'improving',
            unit: '%'
        },
        {
            name: 'امتثال النظافة',
            current: 94.5,
            target: 95.0,
            benchmark: 92.0,
            trend: 'stable',
            unit: '%'
        },
        {
            name: 'سقوط المرضى',
            current: 2.1,
            target: 1.8,
            benchmark: 2.5,
            trend: 'improving',
            unit: 'لكل 1000 يوم مريض'
        }
    ];
}

// Generate staff to patient ratio data
function generateStaffPatientRatios() {
    return {
        byDepartment: [
            { name: 'العناية المركزة', nurses: 2.8, target: 3.0, patients: 35 },
            { name: 'الطوارئ', nurses: 1.9, target: 2.2, patients: 23 },
            { name: 'الجراحة', nurses: 2.1, target: 2.3, patients: 30 },
            { name: 'الباطنية', nurses: 1.8, target: 2.0, patients: 45 },
            { name: 'الأطفال', nurses: 2.5, target: 2.8, patients: 28 },
            { name: 'النساء والولادة', nurses: 2.2, target: 2.5, patients: 32 }
        ],
        byShift: [
            { shift: 'الصباح (7-15)', nurses: 2.3, target: 2.5, coverage: 92 },
            { shift: 'المساء (15-23)', nurses: 2.1, target: 2.3, coverage: 91 },
            { shift: 'الليل (23-7)', nurses: 1.8, target: 2.0, coverage: 90 }
        ]
    };
}

// Global chart instances to prevent memory leaks
let chartInstances = {};

// Wait for Chart.js to load
function waitForChartJS(callback) {
    if (typeof Chart !== 'undefined') {
        callback();
    } else {
        console.log('Waiting for Chart.js to load...');
        setTimeout(() => waitForChartJS(callback), 100);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Hospital Dashboard...');
    initializeDateTime();
    initializeNavigation();
    initializeEventListeners();

    // Wait for Chart.js to load before initializing charts
    waitForChartJS(() => {
        console.log('Chart.js loaded, starting chart initialization...');
        setTimeout(() => {
            initializeOverviewCharts();
            console.log('Overview charts initialization complete');
        }, 200);
    });

    // Update datetime every minute
    setInterval(updateDateTime, 60000);

    console.log('Dashboard initialization complete');
});

// DateTime functions
function initializeDateTime() {
    updateDateTime();
}

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const arabicDate = now.toLocaleDateString('ar-SA', options);
    const datetimeElement = document.getElementById('currentDateTime');
    if (datetimeElement) {
        datetimeElement.textContent = arabicDate;
    }
}

// Enhanced Navigation functions
function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            console.log('Switching to tab:', targetTab);
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Initialize charts for the active tab with delay
                setTimeout(() => {
                    initializeChartsForTab(targetTab);
                }, 200);
            }
        });
    });
}

// Enhanced Event Listeners
function initializeEventListeners() {
    // Emergency button
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            alert('🚨 تم تفعيل نظام الطوارئ! سيتم إخطار الفريق الطبي فوراً.');
        });
    }

    // Export button
    const exportBtn = document.querySelector('[data-action="export"]');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReport);
    }

    // Date range selector
    const dateRangeSelect = document.getElementById('dateRange');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            const selectedRange = this.value;
            const selectedText = this.options[this.selectedIndex].text;
            console.log('Date range changed to:', selectedRange);
            alert(`تم تغيير النطاق الزمني إلى: ${selectedText}`);
            // Refresh current tab charts
            const activeTab = document.querySelector('.nav-tab.active');
            if (activeTab) {
                const tabName = activeTab.getAttribute('data-tab');
                setTimeout(() => initializeChartsForTab(tabName), 100);
            }
        });
    }

    // KPI Cards click handlers for drill-down
    document.addEventListener('click', function(e) {
        if (e.target.closest('.kpi-card')) {
            const card = e.target.closest('.kpi-card');
            const cardTitle = card.querySelector('h3').textContent;
            
            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Show drill-down info
            alert(`عرض تفاصيل: ${cardTitle}\n\nهذه ميزة للمعاينة - في النظام الكامل ستفتح نافذة تفصيلية مع مزيد من البيانات والرسوم البيانية.`);
        }
    });

    // Settings button
    const settingsBtn = document.querySelector('[href="#"]');
    if (settingsBtn && settingsBtn.textContent.includes('إعدادات')) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('إعدادات النظام\n\nالميزات المتاحة:\n• إعدادات العرض\n• تخصيص لوحة التحكم\n• إعدادات التنبيهات\n• إدارة المستخدمين');
        });
    }
}

// Chart initialization functions
function initializeChartsForTab(tabName) {
    console.log('Initializing charts for tab:', tabName);
    
    // Destroy existing charts for this tab to prevent conflicts
    destroyChartsForTab(tabName);
    
    switch(tabName) {
        case 'overview':
            initializeOverviewCharts();
            break;
        case 'financial':
            initializeFinancialCharts();
            break;
        case 'quality':
            initializeQualityCharts();
            break;
        case 'operations':
            initializeOperationsCharts();
            break;
        case 'emergency':
            initializeEmergencyCharts();
            break;
        default:
            console.log('Unknown tab:', tabName);
    }
}

function destroyChartsForTab(tabName) {
    const tabCharts = Object.keys(chartInstances).filter(key => key.startsWith(tabName));
    tabCharts.forEach(chartKey => {
        if (chartInstances[chartKey]) {
            chartInstances[chartKey].destroy();
            delete chartInstances[chartKey];
        }
    });
}

function createChart(canvasId, config, tabPrefix = 'overview') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn('Canvas not found:', canvasId);
        showChartError(canvasId, 'لم يتم العثور على عنصر المخطط');
        return null;
    }

    const chartKey = `${tabPrefix}_${canvasId}`;

    // Show loading state
    showChartLoading(canvasId);

    // Destroy existing chart if exists
    if (chartInstances[chartKey]) {
        chartInstances[chartKey].destroy();
    }

    // Create new chart
    try {
        // Add Arabic language support to config
        config = addArabicSupport(config);

        console.log('Creating chart with config:', canvasId, config);
        chartInstances[chartKey] = new Chart(canvas, config);
        console.log('Chart created successfully:', chartKey);

        // Hide loading state
        hideChartLoading(canvasId);

        return chartInstances[chartKey];
    } catch (error) {
        console.error('Error creating chart:', canvasId, error);
        console.error('Chart config:', config);
        hideChartLoading(canvasId);
        showChartError(canvasId, 'حدث خطأ في تحميل المخطط: ' + error.message);
        return null;
    }
}

// Show loading state for chart
function showChartLoading(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.closest('.chart-container');
    if (!container) return;

    // Create loading overlay if it doesn't exist
    let loadingOverlay = container.querySelector('.chart-loading');
    if (!loadingOverlay) {
        loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'chart-loading';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text">جاري تحميل المخطط...</div>
        `;
        container.appendChild(loadingOverlay);
    }

    loadingOverlay.style.display = 'flex';
}

// Hide loading state for chart
function hideChartLoading(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.closest('.chart-container');
    if (!container) return;

    const loadingOverlay = container.querySelector('.chart-loading');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// Show error state for chart
function showChartError(canvasId, errorMessage) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.closest('.chart-container');
    if (!container) return;

    // Create error overlay if it doesn't exist
    let errorOverlay = container.querySelector('.chart-error');
    if (!errorOverlay) {
        errorOverlay = document.createElement('div');
        errorOverlay.className = 'chart-error';
        container.appendChild(errorOverlay);
    }

    errorOverlay.innerHTML = `
        <div class="error-icon">⚠️</div>
        <div class="error-text">${errorMessage}</div>
        <button class="retry-btn" onclick="retryChart('${canvasId}')">إعادة المحاولة</button>
    `;
    errorOverlay.style.display = 'flex';
}

// Add Arabic language support to chart config
function addArabicSupport(config) {
    // Set default font family for Arabic text
    if (!config.options) config.options = {};
    if (!config.options.font) config.options.font = {};
    config.options.font.family = 'Inter, Arial, sans-serif';

    // Ensure RTL support for tooltips and labels
    if (config.options.plugins) {
        if (config.options.plugins.tooltip) {
            config.options.plugins.tooltip.rtl = true;
            config.options.plugins.tooltip.textDirection = 'rtl';
        }
        if (config.options.plugins.legend) {
            config.options.plugins.legend.rtl = true;
        }
    }

    return config;
}

// Retry chart creation
function retryChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const container = canvas.closest('.chart-container');
    if (!container) return;

    // Hide error overlay
    const errorOverlay = container.querySelector('.chart-error');
    if (errorOverlay) {
        errorOverlay.style.display = 'none';
    }

    // Determine which tab and reinitialize charts
    const tabContent = canvas.closest('.tab-content');
    if (tabContent) {
        const tabId = tabContent.id;
        initializeChartsForTab(tabId);
    }
}

function initializeOverviewCharts() {
    console.log('Initializing overview charts...');

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded!');
        return;
    }

    console.log('Chart.js version:', Chart.version);
    
    // Department Performance Chart
    createChart('departmentChart', {
        type: 'bar',
        data: {
            labels: hospitalData.departments.map(d => d.name),
            datasets: [{
                label: 'معدل الإشغال %',
                data: hospitalData.departments.map(d => d.occupancy),
                backgroundColor: chartColors[0],
                borderRadius: 6,
                borderWidth: 1,
                borderColor: chartColors[0]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'معدل إشغال الأسرة حسب القسم'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45
                    }
                }
            }
        }
    });

    // Patients Distribution Chart
    createChart('patientsDistributionChart', {
        type: 'doughnut',
        data: {
            labels: hospitalData.departments.map(d => d.name),
            datasets: [{
                data: hospitalData.departments.map(d => d.patients),
                backgroundColor: chartColors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'توزيع المرضى حسب القسم'
                }
            }
        }
    });

    // ED Wait Time Gauge Chart
    createChart('edWaitTimeChart', {
        type: 'doughnut',
        data: {
            labels: ['الوقت الحالي', 'المتبقي من الهدف'],
            datasets: [{
                data: [hospitalData.kpi_summary.ed_wait_time, Math.max(0, 30 - hospitalData.kpi_summary.ed_wait_time)],
                backgroundColor: [
                    hospitalData.kpi_summary.ed_wait_time > 15 ? chartColors[2] : chartColors[0],
                    '#E5E5E5'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'وقت انتظار الطوارئ'
                }
            }
        }
    });

    // Daily Patient Flow Chart
    console.log('Creating daily patient flow chart...');
    const patientFlowData = generateDailyPatientFlowData();
    console.log('Patient flow data:', patientFlowData);
    createChart('dailyPatientFlowChart', {
        type: 'line',
        data: {
            labels: patientFlowData.map(d => d.date),
            datasets: [
                {
                    label: 'الدخولات',
                    data: patientFlowData.map(d => d.admissions),
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'الخروج',
                    data: patientFlowData.map(d => d.discharges),
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'التحويلات',
                    data: patientFlowData.map(d => d.transfers),
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'تدفق المرضى اليومي - آخر 30 يوم',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        title: function(context) {
                            return 'التاريخ: ' + context[0].label;
                        },
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' مريض';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'التاريخ'
                    },
                    ticks: {
                        maxTicksLimit: 10,
                        maxRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'عدد المرضى'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' مريض';
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function initializeFinancialCharts() {
    // Cost Per Discharge Chart
    createChart('costPerDischargeChart', {
        type: 'line',
        data: {
            labels: hospitalData.monthly_trends.map(m => m.month.split(' ')[0]),
            datasets: [{
                label: 'التكلفة لكل تسريح (ريال)',
                data: hospitalData.monthly_trends.map(() => hospitalData.financial_metrics.cost_per_discharge + Math.random() * 1000 - 500),
                borderColor: chartColors[1],
                backgroundColor: chartColors[1] + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ريال';
                        }
                    }
                }
            }
        }
    }, 'financial');

    // Payer Mix Chart
    createChart('payerMixChart', {
        type: 'pie',
        data: {
            labels: ['التأمين الحكومي', 'التأمين الخاص', 'الدفع النقدي', 'أخرى'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [chartColors[0], chartColors[1], chartColors[2], chartColors[3]],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }, 'financial');
}

function initializeQualityCharts() {
    console.log('Initializing quality charts...');

    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded!');
        return;
    }

    // Safety Metrics Radar Chart
    createChart('safetyMetricsChart', {
        type: 'radar',
        data: {
            labels: ['رضا المرضى', 'معدل العدوى', 'معدل الوفيات', 'أخطاء الأدوية', 'النظافة الصحية'],
            datasets: [{
                label: 'المعايير الحالية',
                data: [
                    hospitalData.quality_metrics.patient_satisfaction * 20,
                    100 - hospitalData.quality_metrics.infection_rate * 10,
                    100 - hospitalData.quality_metrics.mortality_rate * 10,
                    100 - hospitalData.quality_metrics.medication_error_rate * 20,
                    hospitalData.quality_metrics.hand_hygiene_compliance
                ],
                backgroundColor: chartColors[0] + '40',
                borderColor: chartColors[0],
                pointBackgroundColor: chartColors[0],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    }, 'quality');

    // Additional quality charts...
    createChart('readmissionChart', {
        type: 'bar',
        data: {
            labels: hospitalData.departments.slice(0, 6).map(d => d.name),
            datasets: [{
                label: 'معدل الإعادة %',
                data: hospitalData.departments.slice(0, 6).map(() => hospitalData.quality_metrics.readmission_rate + Math.random() * 6 - 3),
                backgroundColor: chartColors[2],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    }, 'quality');

    // Patient Satisfaction by Department Chart
    console.log('Creating patient satisfaction by department chart...');
    const satisfactionData = generateSatisfactionByDepartment();
    console.log('Satisfaction data:', satisfactionData);
    createChart('satisfactionByDeptChart', {
        type: 'bar',
        data: {
            labels: satisfactionData.map(d => d.name),
            datasets: [
                {
                    label: 'رضا المرضى الحالي',
                    data: satisfactionData.map(d => d.satisfaction),
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1
                },
                {
                    label: 'نقاط HCAHPS',
                    data: satisfactionData.map(d => d.hcahps),
                    backgroundColor: chartColors[1],
                    borderColor: chartColors[1],
                    borderWidth: 1
                },
                {
                    label: 'المتوسط الوطني',
                    data: satisfactionData.map(d => d.national_avg),
                    backgroundColor: chartColors[2] + '60',
                    borderColor: chartColors[2],
                    borderWidth: 2,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'رضا المرضى حسب القسم (من 5)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.x.toFixed(1) + '/5';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'درجة الرضا'
                    },
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + '/5';
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'الأقسام'
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    }, 'quality');

    // Core Quality Measures Chart
    const coreQualityData = generateCoreQualityMeasures();
    createChart('coreMeasuresChart', {
        type: 'radar',
        data: {
            labels: coreQualityData.map(d => d.name),
            datasets: [
                {
                    label: 'الأداء الحالي',
                    data: coreQualityData.map(d => {
                        // Normalize data to 0-100 scale for radar chart
                        if (d.unit === '%') {
                            return d.current;
                        } else {
                            return Math.max(0, 100 - (d.current / d.target) * 50);
                        }
                    }),
                    backgroundColor: chartColors[0] + '30',
                    borderColor: chartColors[0],
                    pointBackgroundColor: chartColors[0],
                    borderWidth: 2,
                    pointRadius: 5
                },
                {
                    label: 'الهدف المطلوب',
                    data: coreQualityData.map(d => {
                        if (d.unit === '%') {
                            return d.target;
                        } else {
                            return 100;
                        }
                    }),
                    backgroundColor: chartColors[2] + '20',
                    borderColor: chartColors[2],
                    pointBackgroundColor: chartColors[2],
                    borderWidth: 2,
                    pointRadius: 4,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'المقاييس الأساسية للجودة',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const dataIndex = context.dataIndex;
                            const measure = coreQualityData[dataIndex];
                            if (context.datasetIndex === 0) {
                                return 'الحالي: ' + measure.current + ' ' + measure.unit;
                            } else {
                                return 'الهدف: ' + measure.target + ' ' + measure.unit;
                            }
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        display: false
                    },
                    grid: {
                        color: '#e0e0e0'
                    },
                    angleLines: {
                        color: '#e0e0e0'
                    }
                }
            }
        }
    }, 'quality');
}

function initializeOperationsCharts() {
    // Staff Category Chart
    createChart('staffCategoryChart', {
        type: 'doughnut',
        data: {
            labels: hospitalData.staffing_data.map(s => s.category),
            datasets: [{
                data: hospitalData.staffing_data.map(s => s.count),
                backgroundColor: chartColors.slice(0, 5),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    }, 'operations');

    // Staff Satisfaction Chart
    createChart('staffSatisfactionChart', {
        type: 'bar',
        data: {
            labels: hospitalData.staffing_data.map(s => s.category),
            datasets: [{
                label: 'رضا الموظفين',
                data: hospitalData.staffing_data.map(s => s.satisfaction),
                backgroundColor: chartColors[3],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        callback: function(value) {
                            return value + '/5';
                        }
                    }
                }
            }
        }
    }, 'operations');

    // Staff to Patient Ratio Chart
    const staffRatioData = generateStaffPatientRatios();

    // Staff Ratio by Department
    createChart('staffRatioByDeptChart', {
        type: 'bar',
        data: {
            labels: staffRatioData.byDepartment.map(d => d.name),
            datasets: [
                {
                    label: 'النسبة الحالية',
                    data: staffRatioData.byDepartment.map(d => d.nurses),
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1,
                    borderRadius: 6
                },
                {
                    label: 'النسبة المطلوبة',
                    data: staffRatioData.byDepartment.map(d => d.target),
                    backgroundColor: chartColors[2] + '60',
                    borderColor: chartColors[2],
                    borderWidth: 2,
                    borderRadius: 6,
                    type: 'line',
                    fill: false,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'نسبة الممرضات للمرضى حسب القسم',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' ممرضة/مريض';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'الأقسام'
                    },
                    ticks: {
                        maxRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'نسبة الممرضات للمرضى'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    }, 'operations');

    // Staff Coverage by Shift
    createChart('staffCoverageByShiftChart', {
        type: 'doughnut',
        data: {
            labels: staffRatioData.byShift.map(s => s.shift),
            datasets: [{
                label: 'تغطية الورديات',
                data: staffRatioData.byShift.map(s => s.coverage),
                backgroundColor: [
                    chartColors[0],
                    chartColors[1],
                    chartColors[2]
                ],
                borderWidth: 3,
                borderColor: '#fff',
                hoverBorderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'تغطية الموظفين حسب الوردية (%)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    }, 'operations');
}

function initializeEmergencyCharts() {
    // Triage Chart
    createChart('triageChart', {
        type: 'bar',
        data: {
            labels: ['المستوى 1', 'المستوى 2', 'المستوى 3', 'المستوى 4', 'المستوى 5'],
            datasets: [{
                label: 'نسبة المرضى %',
                data: [
                    hospitalData.ed_metrics.triage_breakdown.level_1,
                    hospitalData.ed_metrics.triage_breakdown.level_2,
                    hospitalData.ed_metrics.triage_breakdown.level_3,
                    hospitalData.ed_metrics.triage_breakdown.level_4,
                    hospitalData.ed_metrics.triage_breakdown.level_5
                ],
                backgroundColor: [
                    chartColors[2], // Critical - Red
                    chartColors[1], // High - Orange
                    chartColors[6], // Moderate - Yellow
                    chartColors[0], // Low - Teal
                    chartColors[3]  // Very Low - Light
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    }, 'emergency');

    // Wait Times Chart
    createChart('waitTimesChart', {
        type: 'line',
        data: {
            labels: Array.from({length: 12}, (_, i) => `${i + 8}:00`),
            datasets: [{
                label: 'وقت الانتظار (دقيقة)',
                data: Array.from({length: 12}, () => hospitalData.ed_metrics.door_to_doctor_time + Math.random() * 10 - 5),
                borderColor: chartColors[2],
                backgroundColor: chartColors[2] + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + ' دقيقة';
                        }
                    }
                }
            }
        }
    }, 'emergency');

    // Length of Stay Chart
    const losData = generateLengthOfStayData();
    createChart('lengthOfStayChart', {
        type: 'bar',
        data: {
            labels: losData.map(d => d.name),
            datasets: [
                {
                    label: 'متوسط مدة الإقامة الحالية',
                    data: losData.map(d => d.current),
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1,
                    borderRadius: 6
                },
                {
                    label: 'المعيار المرجعي',
                    data: losData.map(d => d.benchmark),
                    backgroundColor: chartColors[1] + '80',
                    borderColor: chartColors[1],
                    borderWidth: 1,
                    borderRadius: 6
                },
                {
                    label: 'الهدف المطلوب',
                    data: losData.map(d => d.target),
                    backgroundColor: chartColors[2] + '60',
                    borderColor: chartColors[2],
                    borderWidth: 2,
                    borderRadius: 6,
                    type: 'line',
                    fill: false,
                    tension: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'متوسط مدة الإقامة حسب القسم (بالأيام)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' يوم';
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'الأقسام'
                    },
                    ticks: {
                        maxRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'عدد الأيام'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + ' يوم';
                        }
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    }, 'emergency');
}

// Utility functions
function exportReport() {
    alert('تصدير التقرير...\n\nسيتم تحميل ملف PDF يحتوي على جميع بيانات لوحة التحكم الحالية.');
    setTimeout(() => {
        window.print();
    }, 1000);
}

// Cleanup function
window.addEventListener('beforeunload', function() {
    Object.values(chartInstances).forEach(chart => {
        if (chart) chart.destroy();
    });
});