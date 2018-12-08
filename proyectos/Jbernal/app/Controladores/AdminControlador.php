<?php

namespace App\Controladores;

use Slim\Views\Twig;

use App\Servicios\ActividadServicio;
use App\Validadores\ValidarCargaActividad;

class AdminControlador {
    private $view;
    private $actividadServicio;

    public function __construct(Twig $view, ActividadServicio $actividadServicio) {
        $this->view = $view;
        $this->actividadServicio = $actividadServicio;
    }

    public function paginaAdministracion($request, $response) {
        $datos = [
            'categorias' => $this->actividadServicio->getCategorias(),
            'actividades' => $this->actividadServicio->consultarActividades()
        ];
        return $this->view->render($response, 'admin.twig', $datos);
    }



    //public function consultarActividades($request, $response)

    public function cargarActividad($request, $response, ValidarCargaActividad $validador) {
        $datos = $request->getParams();
        $archivos = $request->getUploadedFiles();

        $errores = $validador->validarDatos($datos,$archivos['archivo']);
        if($errores) {
            return $response->withJson(['errores'=> $errores],200);
        }

        $resultado = $this->actividadServicio->cargarActividad($datos, $archivos['archivo']);

        return $response->withJson($resultado, 200);
    }

    public function eliminarActividad($request, $response) {
        $accion = $request->getQueryParam('accion');
        if($accion == 'ELIMINAR') {
        $actividadId = $request->getQueryParam('id');
        $resultado = [
        'eliminado' => $this->actividadServicio->eliminarActividad($actividadId, true)
        ];
        
        return $response->withJson($resultado, 200);
        }
        
        return $response->withJson(['error' => 'Petición inválida'], 404);
        }
}