<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

echo "=== VERIFICACIÓN DE USUARIOS Y ROLES ===\n\n";

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
echo "Users: " . User::where('role', 'user')->count() . "\n";

echo "\n=== TEST LOGIN DOOM (USER) ===\n";
$doom = User::where('email', 'doom@user.com')->first();
if ($doom) {
    echo "Usuario encontrado: {$doom->name}\n";
    echo "Role: {$doom->role}\n";
    echo "Password check '666': " . (Hash::check('666', $doom->password) ? 'OK' : 'FAIL') . "\n";
} else {
    echo "Usuario Doom NO encontrado\n";
}

echo "\n=== TEST LOGIN LUX (ADMIN) ===\n";
$lux = User::where('email', 'lux@admin.com')->first();
if ($lux) {
    echo "Usuario encontrado: {$lux->name}\n";
    echo "Role: {$lux->role}\n";
    echo "Password check '8000': " . (Hash::check('8000', $lux->password) ? 'OK' : 'FAIL') . "\n";
} else {
    echo "Usuario Lux NO encontrado\n";
}