<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chinhanh extends Model
{
    protected $table = 'chinhanh';
    protected $fillable = ['tenchinhanh', 'diachi'];
}
