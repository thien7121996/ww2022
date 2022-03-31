<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ketquadieutri extends Model
{
    protected $table = 'kehoachdieutri';
    protected $fillable = ['idkhachhang', 'ngaylapkehoach', 'rang', 'soluong', 'dieutridichvu', 'ghichu', 'idbacsi', 'chiphi', 'giamgia', 'loaigiamgia', 'trangthai', 'idphieudieuchi'];
}
