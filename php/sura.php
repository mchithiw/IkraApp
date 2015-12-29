<?php 

         if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
            $_POST = json_decode(file_get_contents('php://input'), true);
        
        //include("head.php");

        $db = new mysqli('localhost', 'root', 'bismillah786', 'ikra');

        $sura = $_POST['sura'];

        $arr = array();

        $q = $db->prepare('select ayat, content from ikra4 where sura = ?');
        $q->bind_param('i', $sura);
        $q->execute();
        $q->bind_result($a, $r);
        
        while ($q->fetch())
        {
            $arr[$a] = $r;
        }

        
        header('Content-type: application/json');
        echo json_encode($arr);

    
    ?>