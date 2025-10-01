<?php
/**
 * DEBUG SIMPLIFICADO - VERIFICACIÓN DE SEEDERS SIN TOCAR PASSPORT
 * Este archivo diagnostica problemas con seeders de forma segura
 * BORRAR DESPUÉS DE RESOLVER LOS PROBLEMAS
 */

require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Discipline;

echo "=== DEBUG SEEDERS - DIAGNÓSTICO SEGURO ===\n\n";

try {
    // 1. CARGAR LARAVEL APP
    echo "1. Cargando Laravel App...\n";
    $app = require_once __DIR__ . '/bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
    echo "✓ Laravel App cargado exitosamente\n\n";

    // 2. VERIFICAR CONEXIÓN CON DATABASE
    echo "2. Verificando conexión con la base de datos...\n";
    $connection = DB::connection();
    $databaseName = $connection->getDatabaseName();
    echo "✓ Conectado a la base de datos: {$databaseName}\n";
    echo "✓ Driver: " . $connection->getDriverName() . "\n\n";

    // 3. VERIFICAR SI LAS TABLAS EXISTEN
    echo "3. Verificando si las tablas existen...\n";
    $tables = ['users', 'disciplines', 'oauth_clients', 'oauth_access_tokens'];
    foreach ($tables as $table) {
        if (Schema::hasTable($table)) {
            $count = DB::table($table)->count();
            echo "✓ Tabla '{$table}' existe con {$count} registros\n";
        } else {
            echo "✗ Tabla '{$table}' NO EXISTE\n";
        }
    }
    echo "\n";

    // 4. VERIFICAR ESTRUCTURA DE LA TABLA USERS
    echo "4. Verificando estructura de la tabla users...\n";
    if (Schema::hasTable('users')) {
        $columns = Schema::getColumnListing('users');
        echo "Columnas en la tabla users: " . implode(', ', $columns) . "\n";
        
        $expectedColumns = ['id', 'name', 'lastname', 'email', 'password', 'role', 'discipline_id', 'bank_acc', 'date_of_birth'];
        foreach ($expectedColumns as $col) {
            if (in_array($col, $columns)) {
                echo "✓ Columna '{$col}' existe\n";
            } else {
                echo "✗ Columna '{$col}' NO EXISTE\n";
            }
        }
    }
    echo "\n";

    // 5. LIMPIAR DATOS EXISTENTES DE FORMA SEGURA (SIN TRUNCATE)
    echo "5. Limpiando datos existentes de forma segura...\n";
    try {
        DB::table('users')->delete();
        echo "✓ Tabla users limpiada\n";
        
        DB::table('disciplines')->delete();
        echo "✓ Tabla disciplines limpiada\n";
    } catch (Exception $e) {
        echo "⚠ Advertencia al limpiar tablas: " . $e->getMessage() . "\n";
    }
    echo "\n";

    // 6. CREAR DISCIPLINE MANUALMENTE (COMO EN EL SEEDER)
    echo "6. Creando discipline manualmente...\n";
    try {
        $discipline = Discipline::create([
            'id' => 1,
            'name' => 'Karate',
            'description' => 'Arte marcial japonés'
        ]);
        echo "✓ Discipline creada con ID: {$discipline->id} - {$discipline->name}\n";
        
        // Crear disciplines adicionales usando factory
        $additionalDisciplines = Discipline::factory()->count(3)->create();
        echo "✓ " . count($additionalDisciplines) . " disciplines adicionales creadas via factory\n";
        
    } catch (Exception $e) {
        echo "✗ Error al crear Discipline: " . $e->getMessage() . "\n";
    }
    echo "\n";

    // 7. CREAR USUARIOS MANUALMENTE (COMO EN EL SEEDER) SIN TOKENS
    echo "7. Creando usuarios manualmente SIN tokens...\n";
    try {
        $user = User::factory()->create([
            'name' => 'Doom',
            'lastname' => 'Eternal',
            'date_of_birth' => '1999-06-06',
            'email' => 'doom@user.com',
            'email_verified_at' => now(),
            'password' => bcrypt('666'),
            'remember_token' => \Illuminate\Support\Str::random(10),
            'bank_acc' => '666666666D',
            'discipline_id' => 1,
            'role' => 'user',
        ]);
        echo "✓ Usuario 'Doom' creado con ID: {$user->id}\n";
        
        $admin = User::factory()->create([
            'name' => 'Lux',
            'lastname' => 'Triumfantis',
            'date_of_birth' => '2000-01-01',
            'email' => 'lux@admin.com',
            'email_verified_at' => now(),
            'password' => bcrypt('8000'),
            'remember_token' => \Illuminate\Support\Str::random(10),
            'bank_acc' => '1234567890',
            'discipline_id' => null,
            'role' => 'admin',
        ]);
        echo "✓ Usuario 'Lux' (admin) creado con ID: {$admin->id}\n";
        
    } catch (Exception $e) {
        echo "✗ Error al crear usuarios: " . $e->getMessage() . "\n";
    }
    echo "\n";

    // 8. VERIFICAR SI PASSPORT ESTÁ DISPONIBLE Y CONFIGURADO
    echo "8. Verificando configuración de Passport (sin reinstalar)...\n";
    try {
        // Verificar si las llaves OAuth existen
        $privateKeyPath = storage_path('oauth-private.key');
        $publicKeyPath = storage_path('oauth-public.key');
        
        if (file_exists($privateKeyPath) && file_exists($publicKeyPath)) {
            echo "✓ Llaves OAuth existen en storage/\n";
        } else {
            echo "✗ Llaves OAuth NO EXISTEN en storage/\n";
        }
        
        // Verificar si hay clientes OAuth
        $clientsCount = 0;
        if (Schema::hasTable('oauth_clients')) {
            $clientsCount = DB::table('oauth_clients')->count();
            echo "✓ Clientes OAuth en BD: {$clientsCount}\n";
        }
        
        if ($clientsCount == 0) {
            echo "⚠ No hay clientes OAuth configurados - esto es normal en desarrollo\n";
        }
        
    } catch (Exception $e) {
        echo "⚠ Error al verificar Passport: " . $e->getMessage() . "\n";
    }
    echo "\n";

    // 9. PROBAR CREACIÓN DE TOKENS SI PASSPORT ESTÁ DISPONIBLE
    echo "9. Probando creación de tokens (si Passport está disponible)...\n";
    try {
        $testUser = User::first();
        if ($testUser) {
            // Intentar crear token solo si Passport está configurado
            if (method_exists($testUser, 'createToken')) {
                $token = $testUser->createToken('Test Token');
                echo "✓ Token creado para usuario {$testUser->name}\n";
                echo "✓ Token tipo: " . get_class($token) . "\n";
                
                if (isset($token->accessToken)) {
                    echo "✓ Access token: " . substr($token->accessToken, 0, 20) . "...\n";
                }
            } else {
                echo "⚠ Método createToken no disponible - Passport no completamente configurado\n";
            }
        }
    } catch (Exception $e) {
        echo "⚠ No se pudieron crear tokens: " . $e->getMessage() . "\n";
        echo "  Esto es normal si Passport no está completamente configurado\n";
    }
    echo "\n";

    // 10. ESTADO FINAL DE LAS TABLAS
    echo "10. Estado final de las tablas:\n";
    foreach ($tables as $table) {
        if (Schema::hasTable($table)) {
            $count = DB::table($table)->count();
            echo "Tabla '{$table}': {$count} registros\n";
            
            if ($count > 0 && in_array($table, ['users', 'disciplines'])) {
                echo "Últimos registros creados:\n";
                $records = DB::table($table)->orderBy('id', 'desc')->limit(2)->get();
                foreach ($records as $record) {
                    $recordArray = (array) $record;
                    $id = $recordArray['id'] ?? 'N/A';
                    $name = $recordArray['name'] ?? 'N/A';
                    echo "  - ID: {$id}, Nombre: {$name}\n";
                }
            }
        }
    }
    echo "\n";

    // 11. RESUMEN Y RECOMENDACIONES
    echo "11. RESUMEN Y PRÓXIMOS PASOS:\n";
    $usersCount = DB::table('users')->count();
    $disciplinesCount = DB::table('disciplines')->count();
    
    if ($usersCount > 0 && $disciplinesCount > 0) {
        echo "✅ ÉXITO: Se crearon usuarios y disciplines correctamente\n";
        echo "✅ El problema NO está en los seeders básicos\n";
        echo "📌 El issue original puede estar en:\n";
        echo "   - El comando 'php artisan migrate:fresh --seed' no ejecuta correctamente\n";
        echo "   - El PassportSeeder está causando errores silenciosos\n";
        echo "   - Problemas con createToken() en el DatabaseSeeder\n";
    } else {
        echo "❌ AÚN HAY PROBLEMAS: No se crearon todos los datos\n";
        echo "🔍 Revisa los errores arriba para más detalles\n";
    }
    
    echo "\n=== FIN DEL DIAGNÓSTICO SEGURO ===\n";

} catch (Exception $e) {
    echo "✗ ERROR CRÍTICO: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}