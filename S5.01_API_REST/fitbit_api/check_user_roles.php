<?php

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;

echo "=== VERIFICACIÓN DE USUARIOS Y ROLES ===\n\n";

try {
    $users = User::all();
    
    foreach ($users as $user) {
        echo "ID: {$user->id}\n";
        echo "Nombre: {$user->name} {$user->lastname}\n";
        echo "Email: {$user->email}\n";
        echo "Role: {$user->role}\n";
        echo "Disciplina ID: " . ($user->discipline_id ?? 'NULL') . "\n";
        echo "---\n";
    }
    
    echo "\n=== RESUMEN ===\n";
    echo "Total usuarios: " . $users->count() . "\n";
    echo "Admins: " . User::where('role', 'admin')->count() . "\n";
    echo "Usuarios regulares: " . User::where('role', 'user')->count() . "\n";
    echo "Otros roles: " . User::whereNotIn('role', ['admin', 'user'])->count() . "\n";
    
    // Mostrar todos los admins
    $admins = User::where('role', 'admin')->get();
    if ($admins->count() > 0) {
        echo "\n=== ADMINS EN EL SISTEMA ===\n";
        foreach ($admins as $admin) {
            echo "- {$admin->name} {$admin->lastname} ({$admin->email})\n";
        }
    }
    
    if (User::where('role', 'admin')->count() > 1) {
        echo "\n⚠️  PROBLEMA: Hay más de un admin en el sistema!\n";
    } else {
        echo "\n✅ Solo hay un admin en el sistema (correcto)\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}