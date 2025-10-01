<?php

require_once __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

echo "=== ANÁLISIS COMPLETO DE BASE DE DATOS ===\n\n";

// 1. Información de la base de datos
$databaseName = DB::connection()->getDatabaseName();
$driver = DB::connection()->getDriverName();

echo "🗄️  BASE DE DATOS:\n";
echo "- Nombre: {$databaseName}\n";
echo "- Driver: {$driver}\n";
echo "- Host: " . config('database.connections.mysql.host') . "\n";
echo "- Puerto: " . config('database.connections.mysql.port') . "\n\n";

// 2. Listar todas las tablas
$tables = DB::select("SHOW TABLES");
$tableNames = array_map(function($table) use ($databaseName) {
    return $table->{"Tables_in_{$databaseName}"};
}, $tables);

echo "📋 TABLAS EN LA BASE DE DATOS (" . count($tableNames) . "):\n";
foreach ($tableNames as $tableName) {
    $count = DB::table($tableName)->count();
    echo "- {$tableName} ({$count} registros)\n";
}
echo "\n";

// 3. Análisis detallado de tablas principales
$mainTables = ['users', 'disciplines', 'oauth_clients', 'oauth_access_tokens', 'oauth_refresh_tokens'];

foreach ($mainTables as $tableName) {
    if (in_array($tableName, $tableNames)) {
        echo "🔍 TABLA: {$tableName}\n";
        echo "=" . str_repeat("=", strlen($tableName) + 8) . "\n";
        
        // Mostrar estructura de columnas
        $columns = Schema::getColumnListing($tableName);
        echo "Columnas: " . implode(', ', $columns) . "\n";
        
        // Mostrar contenido si tiene pocos registros
        $count = DB::table($tableName)->count();
        if ($count > 0 && $count <= 10) {
            echo "\nContenido:\n";
            $records = DB::table($tableName)->get();
            
            foreach ($records as $index => $record) {
                echo "  Registro " . ($index + 1) . ":\n";
                $recordArray = (array) $record;
                foreach ($recordArray as $key => $value) {
                    // Truncar valores largos para mejor legibilidad
                    if (is_string($value) && strlen($value) > 50) {
                        $value = substr($value, 0, 47) . '...';
                    }
                    echo "    {$key}: " . ($value ?? 'null') . "\n";
                }
                echo "\n";
            }
        } elseif ($count > 10) {
            echo "\nPrimeros 3 registros de {$count} totales:\n";
            $records = DB::table($tableName)->limit(3)->get();
            
            foreach ($records as $index => $record) {
                echo "  Registro " . ($index + 1) . ":\n";
                $recordArray = (array) $record;
                foreach ($recordArray as $key => $value) {
                    if (is_string($value) && strlen($value) > 50) {
                        $value = substr($value, 0, 47) . '...';
                    }
                    echo "    {$key}: " . ($value ?? 'null') . "\n";
                }
                echo "\n";
            }
        } else {
            echo "\n(Tabla vacía)\n";
        }
        
        echo "\n" . str_repeat("-", 60) . "\n\n";
    }
}

// 4. Información adicional sobre tokens
$tokenCount = DB::table('oauth_access_tokens')->count();
if ($tokenCount > 0) {
    echo "🎫 INFORMACIÓN DE TOKENS:\n";
    $tokens = DB::table('oauth_access_tokens')
        ->select('user_id', 'name', 'expires_at', 'created_at')
        ->get();
    
    foreach ($tokens as $token) {
        $user = DB::table('users')->where('id', $token->user_id)->first();
        echo "- Usuario: {$user->name} ({$user->email})\n";
        echo "  Token: {$token->name}\n";
        echo "  Creado: {$token->created_at}\n";
        echo "  Expira: {$token->expires_at}\n\n";
    }
}

echo "✅ ANÁLISIS COMPLETO FINALIZADO\n";