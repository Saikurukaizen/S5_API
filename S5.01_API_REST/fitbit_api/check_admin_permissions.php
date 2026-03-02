<?php

require 'vendor/autoload.php';

$app = require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$user = App\Models\User::where('email', 'lux@admin.com')->first();

if ($user) {
    echo "Usuario encontrado: " . $user->name . PHP_EOL;
    echo "Email: " . $user->email . PHP_EOL;
    echo "Rol: " . $user->role . PHP_EOL;
    echo "Puede ver stats: " . ($user->can('viewStats') ? 'SI' : 'NO') . PHP_EOL;
    
    // Listar todos los permisos
    echo "Permisos disponibles:" . PHP_EOL;
    $permissions = [
        'manage-users', 'manage-communities', 'manage-disciplines', 'viewStats'
    ];
    
    foreach ($permissions as $permission) {
        echo "  - $permission: " . ($user->can($permission) ? 'SI' : 'NO') . PHP_EOL;
    }
} else {
    echo "Usuario admin@test.com no encontrado" . PHP_EOL;
    echo "Usuarios disponibles:" . PHP_EOL;
    $users = App\Models\User::all();
    foreach ($users as $u) {
        echo "  - " . $u->email . " (rol: " . $u->role . ")" . PHP_EOL;
    }
}