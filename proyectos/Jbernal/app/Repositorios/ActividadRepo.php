<?php

namespace App\Repositorios;

use PDO;
use App\Modelos\Actividad;

class ActividadRepo extends RepositorioAbstracto {

 public function consultarCategorias() {
    $sql = "SELECT * FROM categoria ORDER BY nombre ASC";

    $query = $this->db->query($sql);
    return $query->fetchAll();
 }


    public function consultarActividadPorId($actividadId) {
        $sql = 'SELECT * FROM actividad WHERE id = :id';
        
        $query = $this->db->prepare($sql);
        $query->bindValue(':id', (int)$actividadId, PDO::PARAM_INT);
        $query->execute();

        return $query->fetch();
    }


    //paginacion
    public function consultarActividades() {
       $sql = "SELECT * FROM actividad ORDER BY categoria_id ASC, nombre ASC";

       $query = $this->db->query($sql);

       return $query->fetchAll();
    }

    public function contarActividadesPorCategoria($categoriaId) {
        $cantidad = 0;
        $sql = "SELECT COUNT(*) AS cantidad FROM actividad WHERE categoria_id = :categoria";

        $query = $this->db->prepare($sql);
        $query->bindValue(':categoria', (int)$categoriaId, PDO::PARAM_INT);
        $query->execute();

        $resultado = $query->fetch();
        if($resultado) $cantidad = (int) $resultado['cantidad'];

        return $cantidad;
    }

    public function crearActividad (actividad $actividad) {
        $sql = 'INSERT INTO actividad(nombre, instruccion, descripcion, categoria_id, ruta_archivo)';
        $sql .= ' VALUES (:nombre, :instruccion, :descripcion, :categoria, :ruta)';

        $query = $this->db->prepare($sql);
        $params = [
            ':nombre' => $actividad->nombre, ':instruccion' => $actividad->instruccion,
            ':descripcion' => $actividad->descripcion, ':categoria' => $actividad->categoriaId,
            ':ruta' => $actividad->rutaArchivo
            ];
            $query = $query->execute($params);
            
            if($query) return $this->db->lastInsertId();
            
            return false;
    }

    public function eliminarActividad($actividadId) {
        $sql = 'DELETE FROM actividad WHERE id = :id';
        
        $query = $this->db->prepare($sql);
        $query->bindValue(':id', (int)$actividadId, PDO::PARAM_INT);
        
        return $query->execute();
        }

}