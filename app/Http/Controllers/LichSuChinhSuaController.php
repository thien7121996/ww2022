<?php

namespace App\Http\Controllers;
use App\Lichsuchinhsua;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LichSuChinhSuaController extends Controller
{
    public function danhsachlichsuchinhsua()
    {
        $lichsu = Lichsuchinhsua::with('khachhang')->get();
        $lichsutong=[];
        for($i=0;$i<count($lichsu);$i++)
        {
            if($lichsu[$i]->khachhang!=null)
            {
                $lichsutong[]=$lichsu[$i];
            }
        }
        return $lichsutong;
    }
}
