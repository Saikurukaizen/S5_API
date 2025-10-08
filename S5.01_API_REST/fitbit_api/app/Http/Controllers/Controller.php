<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Fitbit API Documentation",
 *      description="API para gestión de disciplinas, comunidades y usuarios",
 *      @OA\Contact(
 *          email="admin@fitbit.com"
 *      ),
 *      @OA\License(
 *          name="Apache 2.0",
 *          url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *      )
 * )
 *
 * @OA\Server(
 *      url=L5_SWAGGER_CONST_HOST,
 *      description="API Server"
 * )
 *
 * @OA\SecurityScheme(
 *      securityScheme="bearer_token",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 *      description="Enter token in format (Bearer <token>)"
 * )
 */

abstract class Controller
{
    //
}
