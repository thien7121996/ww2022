<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thanhtoandaxoa extends Model
{
    protected $table = 'thanhtoandaxoa';
    protected $fillable = ['ngaythanhtoan', 'chitietthanhtoan', 'tongtien', 'hinhthucthanhtoan', 'ghichu', 'nguoithutien', 'idkhammoi', 'idkhachhang', 'chinhanh'];
}
