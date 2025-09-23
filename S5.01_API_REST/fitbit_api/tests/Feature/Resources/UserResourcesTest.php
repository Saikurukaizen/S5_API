<?php

namespace Tests\Feature\Resources;

use App\Models\User;
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
        User::factory()->count(3)->create();

        $response = $this->getJson('/api/v1/users');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
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

    #[Test]
    public function it_returns_correct_values(): void{
        $this->actingAsAdmin();
        $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $this->actingAsUser()->id);

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'id' => $this->actingAsUser()->id,
            'name' => $this->actingAsUser()->name,
            'lastname' => $this->actingAsUser()->lastname,
            'date_of_birth' => $this->actingAsUser()->date_of_birth,
            'email' => $this->actingAsUser()->email,
            'bank_acc' => $this->actingAsUser()->bank_acc,
            'discipline_id' => $this->actingAsUser()->discipline_id,
        ]);
    }

    #[Test]
    public function it_does_not_return_extra_fields(): void{
        $this->actingAsAdmin();
        $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $this->actingAsUser()->id);

        $response->assertStatus(200);
        $response->assertJsonMissing([
            'password',
            'remember_token',
            'created_at',
            'updated_at',
        ]);
    }

    #[Test]
    public function it_returns_a_json_format(): void{
        $this->actingAsAdmin();
        $this->actingAsUser();

        $response = $this->getJson('/api/v1/users/' . $this->actingAsUser()->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'id',
            'name',
            'lastname',
            'date_of_birth',
            'email',
            'bank_acc',
            'discipline_id',
        ]);
    }
}
?>