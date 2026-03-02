<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Verificar usuarios y disciplinas
echo "=== USUARIOS Y SUS DISCIPLINAS ===\n\n";

$users = App\Models\User::with('discipline')->get();

foreach ($users as $user) {
    $disciplineName = $user->discipline ? $user->discipline->name : 'Sin disciplina';
    echo "• {$user->name} {$user->lastname} ({$user->role})\n";
    echo "  Email: {$user->email}\n";
    echo "  Disciplina: {$disciplineName}\n";
    echo "  Discipline ID: " . ($user->discipline_id ?: 'NULL') . "\n\n";
}

echo "Total usuarios: " . $users->count() . "\n";
echo "Usuarios con disciplina: " . $users->whereNotNull('discipline_id')->count() . "\n";
echo "Usuarios sin disciplina: " . $users->whereNull('discipline_id')->count() . "\n";

?>