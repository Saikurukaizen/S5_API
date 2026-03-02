// Test de conectividad con el backend
// Ejecutar en la consola del navegador (F12)

console.log('🔗 Iniciando test de conectividad...');

// Test 1: Verificar que la API responde
fetch('http://localhost:8000/api/status')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Status API:', data);
  })
  .catch(error => {
    console.error('❌ Error Status API:', error);
  });

// Test 2: Verificar endpoints públicos
fetch('http://localhost:8000/api/v1/disciplines')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Disciplines (público):', data);
  })
  .catch(error => {
    console.error('❌ Error Disciplines:', error);
  });

// Test 3: Verificar communities público
fetch('http://localhost:8000/api/v1/communities')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Communities (público):', data);
  })
  .catch(error => {
    console.error('❌ Error Communities:', error);
  });

console.log('🔗 Tests enviados, revisa los resultados arriba...');