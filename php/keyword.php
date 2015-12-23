<?php 

        if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST))
            $_POST = json_decode(file_get_contents('php://input'), true);

        error_reporting(E_ALL ^ E_NOTICE);
        //include("head.php");

        class Matches{
            public $sura = "";
            public $ayat = "";
            public $content = "";
        }

        $db = new mysqli('localhost', 'root', 'bismillah786', 'ikra');

        $keyword = $_POST['keyword'];
        $keyword = '%'.$keyword.'%';

        $arr = array();

        $q = $db->prepare('select sura, ayat, content from ikra2 where lower(content) like ? limit 100');
        $q->bind_param('s', $keyword);
        $q->execute();
        $q->bind_result($s, $a, $r);
        
        $t = new Matches();

        while ($q->fetch())
        {
            $temp = new Matches();
            $temp->sura = $s;
            $temp->ayat = $a;
            $temp->content = $r;

            $t->sura = $s;
            $t->ayat = $a;
            $t->content = $r;

            $arr[] = $temp;
        }

        
        header('Content-type: application/json');
        echo json_encode($arr);
    
    ?>