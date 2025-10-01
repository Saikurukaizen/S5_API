<?php

namespace Tests\Feature\Resources;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Traits\ActingAsAdminTest;
use Tests\Traits\ActingAsUserTest;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class UserResourcesTest extends TestCase{

    use RefreshDatabase;
    use ActingAsAdminTest;
    use ActingAsUserTest;

   #[Test]
    public function it_returns_expected_fields_in_user_list(): void{
        $this->actingAsAdmin();
        UserFactory::new()->count(3)->create();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'lastname',
                    'date_of_birth',
                    'email',
                    'bank_acc',
                    'discipline_id',
                ]
            ]
        ]);
    }

    #[Test]
    public function it_returns_correct_values(): void{
        $this->actingAsAdmin();
        $user = $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJsonPath('data.id', $user->id);
        $response->assertJsonPath('data.name', $user->name);
        $response->assertJsonPath('data.lastname', $user->lastname);
        $response->assertJsonPath('data.email', $user->email);
        $response->assertJsonPath('data.bank_acc', $user->bank_acc);
    }

    #[Test]
    public function it_does_not_return_extra_fields(): void{
        $this->actingAsAdmin();
        $user = $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJsonMissing([
            'password',
            'remember_token',
        ]);
    }

    #[Test]
    public function it_returns_a_json_format(): void{
        $this->actingAsAdmin();
        $user = $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'lastname',
                'date_of_birth',
                'email',
                'bank_acc',
                'discipline_id',
            ]
        ]);
    }
}
?>
?>
