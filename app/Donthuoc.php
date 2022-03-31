<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Donthuoc extends Model
{
    protected $table = 'donthuoc';
    protected $fillable = ['idkhachhang','chandoan','chandoankhac','chidinh','ghichu','ngay','idbacsi'];
}
