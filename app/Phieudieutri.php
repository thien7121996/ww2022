<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phieudieutri extends Model
{
    protected $table = 'phieudieutri';
    protected $fillable = ['idkhachhang', 'ngaylapphieu', 'chandoan', 'trangthai'];
}
