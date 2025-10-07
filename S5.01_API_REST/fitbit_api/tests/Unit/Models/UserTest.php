<?php

namespace Tests\Unit\Models;

use App\Models\User;
use App\Models\Discipline;
use App\Models\Community;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void{
        parent::setUp();
        User::query()->delete();
        Discipline::query()->delete();
        Community::query()->delete();
    }

    #[Test]
    public function it_requires_name_email_and_password(): void{
        $user = new User();
        $user->name = 'John';
        $user->lastname = 'Woo';
        $user->email = 'john@example.com';
        $user->password = 'password123';

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('John', $user->name);
        $this->assertEquals('Woo', $user->lastname);
        $this->assertEquals('john@example.com', $user->email);
        $this->assertNotEmpty($user->password);
    }

    #[Test]
    public function it_cannot_duplicate_email(): void{
        $this->expectException(QueryException::class);

        User::factory()->create(['email' => 'john@example.com']);
        User::factory()->create(['email' => 'john@example.com']);

    }

    #[Test]
    public function it_hiddens_password_and_remember_token(): void{
        $user = User::factory()->create();
        $hiddenAttributes = $user->getHidden();

        $this->assertContains('password', $hiddenAttributes);
        $this->assertContains('remember_token', $hiddenAttributes);
    }

    #[Test]
    public function it_has_a_default_role(): void{
        $user = User::factory()->create();
        $this->assertEquals('user', $user->role);
    }

    #[Test]
    public function it_can_have_admin_role(): void{
        $user = User::factory()->admin()->create();      
        $this->assertEquals('admin', $user->role);
    }

    #[Test]
    public function it_can_have_moderator_role(): void{
        $user = User::factory()->moderator()->create();        
        $this->assertEquals('moderator', $user->role);
    }

    #[Test]
    public function it_belongs_to_a_discipline(): void{
        $discipline = Discipline::factory()->create();
        $user = User::factory()->create(['discipline_id' => $discipline->id]);

        $this->assertInstanceOf(Discipline::class, $user->discipline);
        $this->assertEquals($discipline->id, $user->discipline_id);
    }

    #[Test]
    public function it_can_belong_to_many_communities(): void{
        $discipline = Discipline::factory()->create();
        $user = User::factory()->create(['discipline_id' => $discipline->id]);

        $this->assertInstanceOf(Discipline::class, $user->discipline);
        $this->assertEquals($discipline->id, $user->discipline_id);
    }
}
