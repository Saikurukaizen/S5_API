<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DisciplineManagementTest extends TestCase
{
    /** @test */ 
    public function a_discipline_can_be_created(){
        /*
        Estructura de test: verifica si se puede crear una disciplina (u otra categoria)
        1. Hace una peticion POST a la ruta /disciplines con datos de ejemplo.
        2. Verifica que la respuesta sea OK (200).
        3. Verifica que haya exactamente una disciplina en la base de datos.
        4. Verifica que los datos de la disciplina creada coincidan con los datos enviados
        */

        $this->withoutExceptionHandling();
        $response = $this->post('/disciplines', [
            'name' => 'Disc Name',
            'description' => 'Disc Desc.'
        ]);

        $this->assertOk();
        $this->assertCount(1, Discipline::all());

        $discipline = Discipline::first();

        $this->assertEquals($discipline->name, 'Disc Name');
        $this->assertEquals($discipline->description, 'Disc Desc.');
        
    }

    public function a_discipline_can_be_read(){
        /*
        Estructura de test: verifica si se puede leer una disciplina (u otra categoria)
        1. Crea una disciplina con una peticion POST a la ruta /disciplines.
        2. Verifica que haya exactamente una disciplina en la base de datos.
        3. Obtiene la disciplina creada.
        4. Verifica que los datos de la disciplina creada coincidan con los datos enviados
        */

        $this->withoutExceptionHandling();
        $this->post('/disciplines', [
            'name' => 'Disc Name',
            'description' => 'Disc Desc.'
        ]);

        $this->assertCount(1, Discipline::all());

        $discipline = Discipline::first();

        $this->assertEquals($discipline->name, 'Disc Name');
        $this->assertEquals($discipline->description, 'Disc Desc.');
    }

    public function a_discipline_can_be_updated(){
        /*
        Estructura de test: verifica si se puede actualizar una disciplina (u otra categoria)
        1. Crea una disciplina con una peticion POST a la ruta /disciplines.
        2. Verifica que haya exactamente una disciplina en la base de datos.
        3. Obtiene la disciplina creada.
        4. Verifica que los datos de la disciplina creada coincidan con los datos enviados
        5. Hace una peticion PUT a la ruta /disciplines/{id} para actualizar la disciplina.
        6. Verifica que haya exactamente una disciplina en la base de datos.
        7. Obtiene la disciplina actualizada.
        8. Verifica que los datos de la disciplina actualizada coincidan con los nuevos datos enviados
        9. Verifica que la respuesta sea OK (200).
        */

        $this->withoutExceptionHandling();
        $this->post('/disciplines', [
            'name' => 'Disc name',
            'description' => 'Disc Desc.'
        ]);

        $this->assertCount(1, Discipline::all());

        $discipline = Discipline::first();

        $this->assertEquals($discipline->name, 'Disc name');
        $this->assertEquals($discipline->description, 'Disc Desc.');

        $response = $this->put('/disciplines/'.$discipline->id, [
            'name' => 'New Name',
            'description' => 'New Desc.'
        ]);

        $this->assertCount(1, Discipline::all());

        $newDiscipline = Discipline::first();

        $this->assertEquals($newDiscipline->name, 'New Name');
        $this->assertEquals($newDiscipline->description, 'New Desc.');

        $response->assertOk();
        
    }

    public function a_discipline_can_be_deleted(){
        /*
        Estructura de test: verifica si se puede eliminar una disciplina (u otra categoria)
        1. Crea una disciplina con una peticion POST a la ruta /disciplines.
        2. Verifica que haya exactamente una disciplina en la base de datos.
        3. Obtiene la disciplina creada.
        4. Verifica que los datos de la disciplina creada coincidan con los datos enviados
        5. Hace una peticion DELETE a la ruta /disciplines/{id} para eliminar la disciplina.
        6. Verifica que ya no haya disciplinas en la base de datos.
        7. Verifica que la respuesta sea OK (200).
        */

        $this->withoutExceptionHandling();
        $this->post('/disciplines', [
            'name' => 'Disc Name',
            'description' => 'Disc Desc.'
        ]);

        $this->assertCount(1, Discipline::all());

        $discipline = Discipline::first();

        $this->assertEquals($discipline->name, 'Disc Name');
        $this->assertEquals($discipline->description, 'Disc Desc.');

        $response = $this->delete('/disciplines/'.$discipline->id);
        $this->assertCount(0, Disciplines::all());
        $response->assertOk();
        
    }


    

}
