<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Labocongty extends Model
{
    protected $table = 'labocongty';
    protected $fillable = ['ten','diachi','dienthoai','email'];
}
