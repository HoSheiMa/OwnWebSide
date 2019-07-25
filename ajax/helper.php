<?php


function FormSend($success = "false", $data = "null", $errorType = "null") {

    return '{
        "success": '.$success.',
        "error": "'.$errorType.'",
        "Data": '.$data.'
    }';


}

function ERROR($type = null) {
    // code

    if ($type != null) {

        if ($type == "FILE_NOT_EXIST") {

            echo FormSend("false", "null","File ../static/staticData.json Not created!");
            return;

        }

        if ($type == "QUERY_NOT_EXIST") {
            echo FormSend("false", "null", "QUERY NOT EXIST!");
            return;
        }

        if ($type == "ARRAY : DATA NOT FOUND") {
            echo FormSend("false", "null", "ARRAY : DATA NOT FOUND");
            return;
        }

    }
}

if (isset($_POST['query'])) {
    
    
    $q = $_POST['query']; // query

    // $q[0] is request type
    
    if ($q[0] == "GET_SKILLS_DATA") {

        if (file_exists('../static/staticData.json')){

            $staticData = file_get_contents("../static/staticData.json");

            $staticData = json_decode($staticData, true);


            $from = $q[1];
            
            $to   =  $q[2] != "*" ?  $q[2] : sizeof($staticData); 

            $data = [];

            $Erorr_ = false;

            for ($i = $from; $i < $to; $i++) {

                if (isset($staticData[$i])){

                    array_push($data, $staticData[$i]);

                } else {

                    ERROR("ARRAY : DATA NOT FOUND");

                    $Erorr_ = true;
                    
                    break;
                }
            }
            
            if ($Erorr_ == false) {
               
                $data = json_encode($data, true);

                echo $data;
            }




        } else {
            ERROR('FILE_NOT_EXIST');
        }


    }


} else {
    ERROR('QUERY_NOT_EXIST');
}

